<template>
    <div class="toollist">
        <div class="groups">
            <div v-for="(key,item) in items" class="group">
                <div class="group_title"> {{key}} </div>
                <ul class="group_content">
                    <li class="toolitem" v-for="tool of item" @click="createTool(tool.name)">
                        <img class="icon" alt="{{tool.name}}">                    
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
        methods: {
            createTool(name){
                this.$root.$broadcast("newtool",name);
                this.$dispatch("close");
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
        border-bottom: 1px solid #DDD;
    }
    .toollist .group_content{
        display: flex;
        list-style: none;
        flex-wrap: wrap;
    }
    .toollist .toolitem{
        padding: 10px 10px 0px;
        cursor: pointer;
    }
    .toollist .group .icon{
        width: 25px;
        height: 25px;
    }
</style>








              