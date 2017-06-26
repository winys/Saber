<template>
    <div class="toolpanel">
        <div class="toolpanel_serch">
             <input id="search" type="text" v-model="toolQuery" placeholder="查找插件" lazy/>
        </div>
        <div class="toolpanel_content">
            <ul class="toolpanel_list">
                <li class="toolitem" v-for="tool of items" @click="toolDetail(tool.name,tool)" :id="tool.name">
                    <div class="tool_icon" v-show="width > 250">
                        <img class="icon" :src="getIconPath(tool)" :title="tool.name" :alt="tool.name">
                    </div>
                    <div class="tool_des">
                        <div class="tool_header">
                            <span class="tool_name">{{tool.name}}</span>
                            <span class="tool_version">V{{tool.version}}</span>
                            <span title="基本信息" class="fa fa-info-circle" aria-hidden="true" @click="toolDetail(tool.name,tool)"></span>
                            <span title="检查更新" class="fa fa-arrow-circle-up" aria-hidden="true" @click="checkUpdate"></span>
                            <span title="卸载工具" class="fa fa-trash" aria-hidden="true" @click="removeTool(tool.name)"></span>
                        </div>
                        <div class="tool_descript">{{tool.descript || "No descript"}}</div>
                        <div class="tool_descript">{{tool.author | authorList}}</div>   
                    </div> 
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            let toolinfo = {items:[]}
            
            for ( let key in  Saber.plugins ){
                toolinfo.items.push(Saber.plugins[key]);
            }
            toolinfo.toolQuery = "";
            return toolinfo;
        },
        props:['option','width'],
        filters:{
            'authorList' (author){
                if(Saber.isEmpty(author))
                    return "Unknown author";
                if( Saber.isArray(author) )
                    return author.join(',');
                return author.toString();
            }
        },
        methods: {
            toolDetail (name,tool) {
                Store.emit("openToolManager",{
                    type:"tooldetail",
                    title:name,
                    option:{
                        logo: "fa-chevron-left",
                        logoClick: function( name ){
                            Store.emit("openToolManager",{
                                title: "工具管理",
                                type: "toolpanel",
                                option: "fa-wrench",
                                computed: function(){
                                    document.querySelector("#"+name).scrollIntoView(true);
                                }
                            })
                        },
                        data : tool
                    }       
                });
            },
            checkUpdate( index ){
                let event = window.event;
                Saber.alert("没找着！滚边落去。");
                event.stopPropagation();
            },
            removeTool( name ){
                Saber.toolManager.uninstall( name )
                event.stopPropagation();
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
    .toolpanel{
        display: flex;
        flex-direction: column;
        align-items: stretch;
        height: 100%;        
        overflow-y: auto;
        overflow-x:hidden
    }
    .toolpanel .toolpanel_serch{  
        height: 40px;
        line-height:40px;
        padding: 0 10px;
    }
    .toolpanel .toolpanel_serch #search{
        width: 100%;
        height: 28px;
        line-height: 18px;
        box-sizing: border-box;
        padding: 4px;
        -webkit-appearance: textfield;
    }
    .toolpanel .toolpanel_content{
        flex:1;
        overflow-y: auto;
        overflow-x:hidden
    }
    .toolpanel .toolpanel_list{
        display: flex;
        list-style: none;
        flex-direction: column;
        align-items: stretch;
        padding: 3px 0;
    }
    .toolpanel .toolitem{
        cursor: pointer;
        height:62px;
        display: flex;
        flex-direction: row;
        align-items: stretch;
        padding: 0 10px;
        overflow: hidden;
    }
    .toolpanel .toolitem:hover{
        background-color: var(--toolpanel_toolitem_hover_bgColor);
        box-shadow: 1px 1px 10px -4px var(--toolpanel_toolitem_boxShadow);
    }
    .toolpanel .toolitem .tool_icon{
        text-align: center;
        overflow: hidden;
        width: 60px;
        border: 1px solid transparent;
    }
    .toolpanel .toolitem .tool_des{
        flex:1;
        font-size:13px;
        padding:4px 0;
        overflow:hidden;
    }
    .toolpanel .tool_des .tool_header{
        display:flex;
        align-items:baseline;
        overflow: hidden;
    }
    .toolpanel .tool_header .fa{
        padding: 0 5px;
    }
    .toolpanel .tool_header .fa:hover{
        color: var(--toolpanel_toolitem_btn_hover_color);
    }
    .toolpanel .tool_des .tool_name{
        font-weight: 700;
        min-width: fit-content;
    }
    .toolpanel .tool_des .tool_version{
        opacity: .6;
        font-size: 80%;
        padding-left: 6px;
        flex: 1;
        min-width: fit-content;        
    }
    .toolpanel .tool_des .tool_descript{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;        
        height: 19px;
    }
    .toolpanel .tool_des .tool_footer{
        display:flex;
        align-items:baseline;
        height: 16px;
        overflow: hidden;
    }
    .toolpanel .tool_footer .opbtn{
        padding: 0 3px;
        line-height: 14px;
        display: inline-block;
        color: #FFF;
        margin-right:5px;
    }
    .toolpanel .tool_icon .icon{
        max-width:42px;
        max-height: 42px;
        padding: 10px 14px 10px 0;
    }
</style>








              