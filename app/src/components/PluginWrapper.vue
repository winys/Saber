<template>
    <div class="PluginWrapper">
        <div class="tablist" @mousewheel="scroll()" @dragover="allowDrop()" @drop="drop()">
            <div class="tab-item" v-for="(page,index) in pages" :data-index="index" :title="page.title" draggable="true" 
                v-bind:class="{ 'active': (curpage===page.id) }" :data-tabid="page.id" 
                @click="changeItem(page.id)" 
                @contextmenu="contextmenu(index)" 
                @dragstart="drag(index)"
            >
                <div class="tab-label" >{{page.title}}</div>
                <div class="action-label" @click="closeTab(index)"><i class="fa fa-times" aria-hidden="true"></i></div>
            </div>
        </div>
        <div class="pluginink">
            <div v-for="page in pages" class="tabpage" :data-tabid="page.id" :key="page.id" v-bind:class="{ 'active': (curpage===page.id) }">
            <component 
                :is="curview"
                :id="curview + '_' + page.id"
                >
            </component>
            </div>
        </div>
    </div>
</template>
<script>
    import Saber from "../Saber"
    import {mapGetters} from 'vuex'
    const path = node_require('path'); 
    const remote = node_require('electron').remote;
    const {Menu, MenuItem} = remote;  
    let components = {};
    for ( let key in  Saber.plugins ){
        let plugin = Saber.plugins[key];
        components[plugin.name]  =  (resolve) => {
            if(plugin.entry){
                //console.log(require(path.join('../../plugins/'+plugin.name,plugin.entry ).toString()))
                require(['../../plugins/'+plugin.name+ "/" +plugin.entry ], resolve);
            }
            else 
                require(['../../plugins/'+plugin.name ], resolve);
        };
    }
    
    components["notfound"] = (resolve) => {
        require(["./Notfound"], resolve);
    };
    export default {
        computed: {
            pages (){
                return this.$store.state.PluginWrapper.pages;
            },
            curpage(){
                return this.$store.state.PluginWrapper.curpage;
            }
        },
        props: ['curview'],
        components,        
        mounted(){
            if(Saber.isEmpty(this.pages))
                return;
            
            let toolbar_data = Saber.store("__pageinfo_"+this.curview);
            let state = this.$store.state;
            if( !Saber.isEmpty(toolbar_data) ){
                state.PluginWrapper.pages = toolbar_data.pages;
                state.PluginWrapper.curpage = toolbar_data.curpage;
            }
        },
        methods:{
            //切换标签页
            changeItem ( pageId ){
                Saber.emit("changePage",pageId);                
                this.$nextTick( ()=>{
                    Saber.store("__pageinfo_"+this.curview, {
                        pages: this.pages,
                        curpage: this.curpage
                    });
                });
            },
            //关闭标签页
            closeTab(index){
                let pageid = this.pages[index].id;
                if(this.pages.length <=1 ){
                    this.pages.splice( index , 1);
                    Saber.store("__pageinfo_"+this.curview, null);
                    Saber.emit("closeTool", this.curview);
                }
                else if(this.pages[index] && this.curpage === pageid){                              
                    this.pages.splice( index , 1);
                    this.$nextTick(function(){                        
                        this.changeItem(this.pages[index%this.pages.length].id);
                        Saber.store("__pageinfo_"+this.curview, {
                            pages: this.pages,
                            curpage: this.curpage
                        });
                    });
                }
                else{
                    this.pages.splice( index , 1);
                    this.$nextTick(function(){
                        Saber.store("__pageinfo_"+this.curview, {
                            pages: this.pages,
                            curpage: this.curpage
                        });
                    });
                }
                Saber.store(this.curview + "_" + pageid,null);
                window.event && window.event.stopPropagation();
            },
            //滚动
            scroll(){                
                let event = window.event;
                let target = this.$el.getElementsByClassName("tablist")[0];
                target.scrollLeft = target.scrollLeft - event.wheelDelta/5;
            },
            //右键菜单
            contextmenu( index ){
                const menu = new Menu();
                let event = window.event;
                let self = this;
                menu.append(new MenuItem({label: '关闭', click() { self.closeTab(index) }}));
                menu.append(new MenuItem({label: '关闭右侧', click(){
                    let closed = self.pages.splice(index+1);
                    closed.forEach(function (item) {
                        Saber.store(self.curview + "_" + item.id,null);
                    })
                    self.$nextTick(() => {                        
                        self.changeItem(self.pages[index%self.pages.length].id);
                    });
                }}));
                menu.append(new MenuItem({label: '关闭左侧',  click(){
                    let pageid = self.pages[index%self.pages.length].id;
                    let closed = self.pages.splice(0,index);
                    closed.forEach(function (item) {
                        Saber.store(self.curview + "_" + item.id,null);
                    })
                    self.$nextTick(() => {                        
                        self.changeItem(pageid);
                    });
                }}));
                menu.append(new MenuItem({label: '关闭其它',  click(){
                    let pages = self.pages.splice(index,1);
                    self.pages.forEach( function (item) {
                        Saber.store(self.curview + "_" + item.id,null);
                    });
                    self.$store.state.PluginWrapper.pages = pages;

                    self.$nextTick(() => {                        
                        self.changeItem(self.pages[0].id);
                    });
                }}));
                event.preventDefault();
                menu.popup(remote.getCurrentWindow());
                //阻止冒泡
                event.stopPropagation();
            },
            //开始拖动
            drag( index ){
                //start
                let event = window.event;
                let tablis = document.getElementsByClassName('tab-item');
                let tab = tablis[index];
                let self = this;
                self.changeItem(self.pages[index%self.pages.length].id)
                event.dataTransfer.setData("Text",index);
            },
            //拖动
            drop(){
                let event = window.event;
                let index = event.dataTransfer.getData("Text");
                let tagindex = index;
                let ele = event.target.closest(".tab-item");
                
                //获取拖动位置的index
                if(Saber.isEmpty(ele))
                    tagindex= this.pages.length-1;
                else
                    tagindex = parseInt(ele.getAttribute("data-index"));
                
                //调换页面                
                if(index == tagindex)return;
                let pagedrag = this.pages[index];
                this.pages.splice(index,1);
                this.pages.splice(tagindex,0,pagedrag);
                this.$nextTick( ()=>{
                    Saber.store("__pageinfo_"+this.curview, {
                        pages: this.pages,
                        curpage: this.curpage
                    });
                });
                event.preventDefault();
            },
            //放下
            allowDrop(){
                let event = window.event;
                event.preventDefault();
            }
        }
    }
</script>

<style>
.PluginWrapper{
    display: flex;
    flex-direction: column;
    align-items: stretch;
    box-sizing: border-box;
    flex:1;
}
.PluginWrapper .tablist{
    display:flex;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow: auto;
    background : #252526;
    position: relative;
    margin-left:0;
}
.PluginWrapper .tablist:before {
    display: block;
    content: '';
    position: absolute;
    top: 34px;
    width: 100%;
    z-index: 1;    
    border-top: 1px solid #403f3f;
}
.PluginWrapper .tablist::-webkit-scrollbar{
    background-color: #1e1e1e;
    display:none;
    height:5px;
}
.PluginWrapper .tablist::-webkit-scrollbar-thumb{    
    background-color: hsla(0,0%,39%,0.5);
}
.PluginWrapper .tablist::-webkit-scrollbar:hover{
    display:block;
}
.PluginWrapper .tab-item{
    display: flex;
    min-width: fit-content; 
    overflow: hidden;
    background-color: #2d2d2d;
    border: 1px solid transparent;
    border-left-color: #403f3f;
    white-space: nowrap;
    cursor: pointer;
    height: 35px;
    box-sizing: border-box;
    padding-left: 10px;
}
.PluginWrapper .tab-item:first-child{
    border-left-color: transparent;
}
.PluginWrapper .tab-item.active{
    background-color: #1e1e1e;    
    z-index:2;
}
.PluginWrapper .tab-item.active:last-child{
    border-right-color: #403f3f;
}
.PluginWrapper .tab-label {
    line-height: 35px;
    font-size: 13px;    
    color: #FFF;
    opacity: 0.5;    
}
.PluginWrapper .tab-item.active .tab-label{
    opacity: 1;
}
.PluginWrapper .tab-item .action-label{
    display: inline-block;
    min-width: 20px;
    height: 35px;
    line-height: 35px;
    text-align: right;
    vertical-align: middle;
    margin: auto 10px;
    opacity: 0;   
}
.PluginWrapper .tab-item:hover .action-label{
    opacity: 0.5;
}
.PluginWrapper .tab-item.active .action-label{
    opacity: 1; 
}
.PluginWrapper .pluginink{
    flex:1;
    overflow: auto;
}
.PluginWrapper .tabpage{
    height: 100%;
    display:none;
}
.PluginWrapper .tabpage.active{
    display:block;
    -webkit-user-select: text;
}
</style>