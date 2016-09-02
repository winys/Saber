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
    export default {
        data () {
          return {
              pages:[
                {
                    title:"page1",
                    id:Saber.guid()
                },
                {
                    title:"page2",
                    id:Saber.guid()
                },
                {
                    title:"page3",
                    id:Saber.guid()
                },
                {
                    title:"page4",
                    id:Saber.guid()
                },
                {
                    title:"page5",
                    id:Saber.guid()
                },
                {
                    title:"page6",
                    id:Saber.guid()
                },
                {
                    title:"page6",
                    id:Saber.guid()
                },
                {
                    title:"page8",
                    id:Saber.guid()
                },
                {
                    title:"page9",
                    id:Saber.guid()
                },
                {
                    title:"page10",
                    id:Saber.guid()
                },
                {
                    title:"page11",
                    id:Saber.guid()
                },
                {
                    title:"page12",
                    id:Saber.guid()
                },
                {
                    title:"page13",
                    id:Saber.guid()
                },
                {
                    title:"page14",
                    id:Saber.guid()
                },
                {
                    title:"page15",
                    id:Saber.guid()
                },
                {
                    title:"page16",
                    id:Saber.guid()
                },
                {
                    title:"page17",
                    id:Saber.guid()
                },
                {
                    title:"page18",
                    id:Saber.guid()
                },
                {
                    title:"page19",
                    id:Saber.guid()
                },
                {
                    title:"page16",
                    id:Saber.guid()
                },
                {
                    title:"page17",
                    id:Saber.guid()
                },
                {
                    title:"page18",
                    id:Saber.guid()
                },
                {
                    title:"page19",
                    id:Saber.guid()
                }
            ],
            curpage:''
          }
        },
        props: ['curview'],
        components,        
        ready(){
            this.curpage = this.pages[0].id;
            this.$el.querySelectorAll("[data-tabid='" + this.curpage + "']").forEach(function(item){
                    item.classList.add("active");
                });
        },
        methods:{
            changeItem ( pageId ){
                if (pageId === this.curpage) return;
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
                if(this.pages[index] && this.curpage === this.pages[index].id){                                        
                    this.pages.splice( index , 1);
                    this.$nextTick(function(){                        
                        this.changeItem(this.pages[index%this.pages.length].id);
                    });
                }
                else{
                    this.pages.splice( index , 1);
                    this.$nextTick(function(){                        
                        this.resetPage();
                    });
                }
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