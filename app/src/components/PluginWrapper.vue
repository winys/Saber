<template>
    <div class="PluginWrapper">
        <div class="tablist" @mousewheel="scroll()">
            <div class="tab-item" v-for="page in pages" title="{{page.title}}" data-tabid={{page.id}} @click="changeItem(page.id)">
                <div class="tab-label">{{page.title}}</div>
                <div class="action-label" @click="closeTab($index)">x</div>
            </div>
        </div>
        <div class="pluginink">
            <div v-for="page in pages" class="tabpage" data-tabid={{page.id}}>
            <component 
                :is="curview"
                :id="page.id"
                keep-alive>
            </component>
            </div>
        </div>
    </div>
</template>
<script>
    import Saber from "../Saber"
    let components = {};
    for ( let key in  Saber.plugins ){
        let plugin = Saber.plugins[key];
        components[plugin.name]  =  (resolve) => {
            require(['../../plugin/'+plugin.name], resolve);
        };
    }
    
    components["notfound"] = (resolve) => {
        require(["./Notfound"], resolve);
    };
    export default {
        data () {
            this.name = this.curview;
            let pageinfo = Saber.store("__pageinfo_"+this.curview);
            if(Saber.isEmpty(pageinfo)){
                pageinfo = {pages:[],curpage:""};
            }
            return pageinfo;
        },
        props: ['curview'],
        components,        
        ready(){
            if(Saber.isEmpty(this.pages))
                this.newPage();
            this.curpage = this.pages[0].id;
            this.$el.querySelectorAll("[data-tabid='" + this.curpage + "']").forEach(function(item){
                    item.classList.add("active");
                });

            this.$on(`newpage_${this.name}`,  function(name){
                this.newPage();
            });
        },
        methods:{
            newPage () {
                let id = Saber.guid();                
                this.pages.push({title:"page"+(this.pages.length+1),id})
                this.$nextTick (function(){
                    this.changeItem(id);
                    Saber.store("__pageinfo_"+this.name, this.$data);
                });
            },
            changeItem ( pageId ){
                if (pageId === this.curpage) {
                    this.resetPage();
                    return;
                }
                this.$el.querySelectorAll("[data-tabid='" + this.curpage + "']").forEach(function(item){
                    item.classList.remove("active");
                });
                this.$el.querySelectorAll("[data-tabid='"+pageId+"']").forEach(function(item){
                    item.classList.add("active");
                });
                this.curpage = pageId;
            },
            resetPage (){
                this.$el.querySelectorAll("[data-tabid='"+this.curpage+"']").forEach(function(item){
                    item.classList.add("active");
                });
            },
            closeTab(index){
                let pageid = this.pages[index].id;
                if(this.pages[index] && this.curpage === pageid){                              
                    this.pages.splice( index , 1);
                    this.$nextTick(function(){                        
                        this.changeItem(this.pages[index%this.pages.length].id);
                        Saber.store("__pageinfo_"+this.name, this.$data);
                    });
                }
                else{
                    this.pages.splice( index , 1);
                    this.$nextTick(function(){                        
                        this.resetPage();
                        Saber.store("__pageinfo_"+this.name, this.$data);
                    });
                }
                Saber.store(pageid,null);
                window.event.stopPropagation();
            },
            scroll(){
                let event = window.event;
                let target = this.$el.getElementsByClassName("tablist")[0];
                let pos = parseInt(target.style.marginLeft||0) + event.wheelDelta;
                if(
                    target.lastElementChild.offsetLeft+target.lastElementChild.offsetWidth<=target.offsetWidth+target.offsetLeft||
                    pos>0||
                    Math.abs(pos)>target.offsetWidth+target.offsetLeft
                )return;
                target.style.marginLeft = pos +"px";
                
                event.stopPropagation();
            }
        },
        events:{
            "storage" : (id, data) => {
                if(Saber.isEmpty(id))
                    Saber.store(id.toString(),JSON.stringify(data));
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
    -webkit-user-select : none;
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
    display:none;
}
.PluginWrapper .tabpage.active{
    display:block;
}
</style>