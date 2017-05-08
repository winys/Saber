<template>
    <div class="mini-container">
        <div class="logo" v-once style="-webkit-app-region:drag">
            <img :src="icon" alt="Saber">
        </div>
        <div class="toollist">
            <ul class="toollist_ul" @mousewheel="scroll()">
                <li class="item" v-for="(item,index) in items" @hover="showPages()" @click="mini_command(index,item.name)">
                    <img :src="getIconPath(item)" ondragstart="return false;"  :title="item.name">
                </li>
            </ul>
        </div>
        <div class="opration">
            <ul class="opration_ul">
                <li class="item" title="关闭" @click="close_mini_window"><i class="fa fa-times"></i></li>
                <li class="item" title="主界面"  @click="show_main_window"><i class="fa fa-square-o"></i></li>
                <li class="item" title="退出" @click="app_exit"><i class="fa fa-power-off"></i></li>
            </ul>
        </div>
    </div>
</template>
<script>
    const ipcRenderer = node_require('electron').ipcRenderer;
    const path = node_require('path');
    export default {
        data (){
            return {
                icon: path.join(Saber.APP_PATH, Saber.package.icon),
                items : Saber.store("__toolbar").items
            }
        },
        mounted(){
            ipcRenderer.on("update_tools",(function() {
              this.items = Saber.store("__toolbar").items
            }).bind(this));
        },
        methods: {
            mini_command ( index, name ) {
                ipcRenderer.send('mini_command',{
                    index,name
                });
            },
            scroll(){                
                let event = window.event;
                let target = this.$el.getElementsByClassName("toollist_ul")[0];
                target.scrollLeft = target.scrollLeft - event.wheelDelta/5;
            },            
            getIconPath (plugin) {                
                const path = node_require('path');
                if(plugin&&!plugin.icon) return path.join( Saber.APP_PATH ,Saber.package.default_icon );                
                return path.resolve( Saber.__plugin_path ,plugin.name , plugin.icon )
            },
            app_exit () {
                ipcRenderer.send("app_exit",0);
            },
            show_main_window () {
                ipcRenderer.send("show_main_window");
            },
            close_mini_window () {
                ipcRenderer.send("close_mini_window");
            },
            showPages(){
            }
        }
    }
</script>
<style scoped>
    ::-webkit-scrollbar-thumb {
        background: #403f3f;
    }
    ::-webkit-scrollbar {
        background: transparent;
        width: 1px;
        height: 1px;
    }
    .mini-container{
        display: flex;
        height: 100%;
        justify-content: space-around;
        align-items: stretch;
        user-select: none;
    }
    .logo{        
        width: 50px;
        padding: 8px;
        background-color: #262626;
        text-align: center;
    }
    .logo img{
        max-width: 100%;
        max-height: 100%;
    }
    .toollist{
        flex: 1;
        height: 100%;
        overflow: hidden;
    }
    .toollist_ul{
        list-style: none;
        padding: 0;
        margin: 0;
        overflow-x: auto;
        overflow-y: hidden;
        height: 100%;
        white-space: nowrap;
        background-color: #2e2e2e;        
        color: #e1e1e1;
    }
    .toollist_ul .item{
        cursor: pointer;
        width: 50px;
        height: 100%;
        padding: 12px;
        overflow: hidden;
        display: inline-block;
        text-align: center;
    }
    .toollist_ul .item img{
        max-height: 100%;
        max-width: 100%;
    }
    .opration{
        width: 16.67px;
    }
    .opration_ul{
        list-style: none;
        padding: 0;
        margin: 0;
        border-left: 1px solid #403f3f;
        display: flex;
        flex-wrap: nowrap;
        overflow: hidden;
        flex-direction: column;
        align-items: stretch;
        justify-content: space-around;
        height: 100%;
        padding-top: 3px;
        background-color: #2e2e2e;
    }
    .opration_ul .item{
        color: #e1e1e1;
        cursor: pointer;
        text-align: center;
        font-size: .6em;
        flex:1;
        text-align: center;
    }
</style>