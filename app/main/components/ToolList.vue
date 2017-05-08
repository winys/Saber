<template>
    <div class="toollist">
        <div class="groups">
            <div v-for="(item,key) in items" class="group">
                <div class="group_title"> {{key}} </div>
                <ul class="group_content">
                    <li class="toolitem" v-for="(tool, index) in item" @click="createTool(tool.name)">
                        <img class="icon" :title="tool.name"  :src="getIconPath(tool)" :alt="tool.name">                    
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            let toolinfo = {items:{}}
            
            for ( let key in  Saber.plugins ){
                let plugin = Saber.plugins[key];
                let group = plugin.name.charAt(0).toUpperCase();
                if ( toolinfo.items[ group ] === undefined ){
                    toolinfo.items[ group ] = []
                }
                toolinfo.items[ group ].push(plugin);
            }
            return toolinfo;
        },
        mounted (){
            this.$on("toolManager_resize",function(){
                alert("s");
            });
        },
        methods: {
            createTool(name){
                Store.emit("newTool",name);
            },
            getIconPath (plugin) {
                if(plugin&&!plugin.icon) return "";
                const path = node_require('path');
                return path.resolve( Saber.__plugin_path ,plugin.name , plugin.icon )
            }
        }
    }
</script>
<style>
    
    .toollist .groups{  
        overflow-y: auto;
        height: 100%;
        overflow-x:hidden
    }
    .toollist .group{
        margin-bottom: 20px;
        padding: 0 10px;
    }
    .toollist .group_title{
        font-size:22px;
        padding :10px 0;
        border-bottom: 1px solid var(--toollist_title_border);
    }
    .toollist .group_content{
        display: flex;
        list-style: none;
        flex-wrap: wrap;
    }
    .toollist .toolitem{
        padding: 10px 10px 0px;
        cursor: pointer;
        text-align: center;
        overflow: hidden;
        width: 25px;
    }
    .toollist .group .icon{
        max-width: 25px;
        max-height: 25px;
    }
</style>








              