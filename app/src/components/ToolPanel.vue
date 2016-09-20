<template>
    <div class="toolpanel">
        <div class="toolpanel_serch">
             <input id="search" type="text" v-model="toolurl" placeholder="查找插件" lazy/>
        </div>
        <div class="toolpanel_content">
            <ul class="toolpanel_list">
                <li class="toolitem" v-for="tool of items" @click="toolDetail(tool.name,tool)" id={{tool.name}}>
                    <div class="tool_icon">
                        <img class="icon" alt="{{tool.name}}">
                    </div>
                    <div class="tool_des">
                        <div class="tool_header">
                            <span class="tool_name">{{tool.name | capitalize}}</span>
                            <span class="tool_version">V{{tool.version}}</span>
                            <span title="基本信息" class="fa fa-info-circle" aria-hidden="true" @click="toolDetail(tool.name)"></span>
                            <span title="检查更新" class="fa fa-arrow-circle-up" aria-hidden="true" @click="checkUpdate"></span>
                            <span title="卸载工具" class="fa fa-trash" aria-hidden="true" @click="removeTool"></span>
                        </div>
                        <div class="tool_descript">{{tool.descript || "No descript"}}</div>
                        <div class="tool_descript">{{tool.author || "Unknown author"}}</div>   
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
            return toolinfo;
        },
        props:['option'],
        methods: {
            toolDetail (name,tool) {
                this.$dispatch("ToolDetail",{
                    title:name,
                    logo: "fa-chevron-left",
                    logoClick: function( name ){
                        this.$dispatch("ToolPanel",{
                            title:"工具管理",
                            computed: function(){
                                document.querySelector("#"+name).scrollIntoView(true);
                            }
                        })
                    },
                    data : tool             
                });
            },
            checkUpdate( index ){
                let event = window.event;
                alert("没找着！滚边落去。");
                event.stopPropagation();
            },
            removeTool( index ){
                alert("跟谁俩呢，老子不走了！");
                event.stopPropagation();
            },
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
        border: 1px solid transparent;
        -webkit-appearance: textfield;
        background-color: #3C3C3C;
        color: #FFF;
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
        background-color: hsla(0,0%,100%,.08);
    }
    .toolpanel .toolitem .tool_icon{
        border-radius : 50%;
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
        padding: 0 3px;
    }
    .toolpanel .tool_header .fa:hover{
        color: #007acc;
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
        width:42px;
        height: 42px;
        padding: 10px 14px 10px 0;
    }
</style>








              