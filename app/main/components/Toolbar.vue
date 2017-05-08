<template>
    <div class="toolbar hover_scroll" v-show="show">
        <ul class="toolbar-items" >
            <li class="item" v-for="(item,index) in items"  @contextmenu="contextmenu(index)">
                <a class="vlink" v-bind:class="{ 'active': index===active }" @click="changeTool({index,name:item.name})" name="item.plugin">
                    <img :src="getIconPath(item)" :title="item.name"  class="icon" :alt="item.name">
                </a>
            </li>
        </ul>
    </div>
</template>
<script>
    import Saber from "../../common/Saber"
    import {mapActions} from 'vuex';
    const remote = node_require('electron').remote;
    const {Menu, MenuItem} = remote;  
    export default {
        computed: {
            items () {return this.$store.state.Toolbar.items},
            active () {return this.$store.state.Toolbar.active},
            show (){
                let visiable = this.$store.state.Toolbar.visiable;
                return ( Saber.isEmpty(this.items) )
                    ? false
                    : visiable;
            }
        },
        mounted () {
            let toolbar_data = Saber.store("__toolbar");
            if( Saber.isEmpty(toolbar_data) ){                
                return;
            }
            if(!Saber.isEmpty(toolbar_data.items)){                
                this.$store.state.Toolbar.items = toolbar_data.items;
                this.$store.state.Toolbar.active = toolbar_data.active;
                this.$store.state.Toolbar.visiable = toolbar_data.visiable;
                Store.emit('changeTool', {
                    index: toolbar_data.active,
                    name: toolbar_data.items[toolbar_data.active].name 
                });
            }
            return;
        },
        methods : {
            ...mapActions({
                newTool : 'newTool',
                changeTool: 'changeTool',
                closeTool: 'closeTool'
            }),
            contextmenu( index ){
                const menu = new Menu();
                let event = window.event;
                let self = this;
                let items = this.items;
                menu.append(new MenuItem({
                    label: '新建', click(){
                        self.newTool(items[index].name)
                    }
                }));
                menu.append(new MenuItem({
                     label: '关闭', click() {
                        self.closeTool(self.items[index].name);
                    }
                }));
                
                menu.popup(remote.getCurrentWindow());
                event.preventDefault();
                event.stopPropagation();
            },
            getIconPath (plugin) {                
                const path = node_require('path');
                if(plugin&&!plugin.icon) return path.join( Saber.APP_PATH ,Saber.package.default_icon );                
                return path.resolve( Saber.__plugin_path ,plugin.name , plugin.icon )
            }
        }
    }
</script>

<style>
    .toolbar{
        background-color: var(--toolbar_bgcolor);
        text-align: center;
        width : 50px;
        z-index: 3;
    }
    .toolbar-items{
        margin: 0 auto;
        overflow-y: auto;
        height: 100%;
        padding: 0;
        width: 100%;
        flex-direction: column;
        justify-content: flex-end;
    }
    .toolbar-items .item{
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        overflow: hidden;
    }
    .toolbar-items .item .vlink{        
        padding: 20px 0;
        cursor: pointer;
        opacity: .6;
    }
    .toolbar-items .vlink:hover{
        background: var(--toolbar_bgcolor);
        opacity: 1;
    }
    .toolbar-items .vlink.active{
        background: var(--toolbar_bgcolor);
        opacity: 1;
    }
    .toolbar-items .item a{
        display: flex;
        overflow: hidden;
        margin-right: 0;
        padding: 0 20px;
        box-sizing: border-box;
        font-size: 15px;
    }
    .toolbar-items .item .icon{
        max-width: 25px;
        max-height : 25px;
    }
    .toolbar ::-webkit-scrollbar {
        background: transparent;
        width: 2px;
        height: 5px;
    }
</style>