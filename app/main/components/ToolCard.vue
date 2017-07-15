<template>
    <li class="toolcard" @click="toolDetail(tool.name,tool)" :id="tool.name" v-once>
        <div class="tool_icon" v-show="width > 250">
            <img class="icon" @error="imgError($event)" :src="tool.icon"  :title="tool.name" :alt="tool.name">
        </div>
        <div class="tool_des">
            <div class="tool_header" v-if="tool.installed">
                <span class="tool_name">{{tool.name}}</span>
                <span title="基本信息" class="fa fa-info-circle" aria-hidden="true" @click="toolDetail(tool.name,tool)"></span>
                <span title="检查更新" class="fa fa-arrow-circle-up" aria-hidden="true" @click="checkUpdate"></span>
                <span title="卸载工具" class="fa fa-trash" aria-hidden="true" @click="removeTool(tool.name)"></span>
            </div>
            <div class="tool_header" v-if="!tool.installed">
                <span class="tool_name">{{tool.name}}</span>
                <span title="安装" class="fa fa-download" aria-hidden="true" @click="toolInstall($event, tool)"></span>
            </div>
            <div class="tool_descript">{{tool.descript || "No descript"}}</div> 
            <div class="tool_author">
                <span class="author">{{tool.author || "Unknown author" }} </span>
                <span class="tool_star">{{tool.star}}<i aria-hidden="true" class="fa fa-star" ></i></span>
            </div>  
        </div> 
    </li>
</template>

<script>
    import path from 'path';
    import Saber from "../../common/Saber"

    export default {
        computed :{
            'width' () { return this.$store.state.ToolManager.width},
        },
        props: ['tool'],
        methods: {
            toolInstall ( event, tool ){
                event.stopPropagation();
                Saber.toolManager.install( tool );
            },
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
                Saber.uninstall( name )
                event.stopPropagation();
            },
            imgError( event ){
                event.target.closest('img').src = path.join( Saber.APP_PATH ,Saber.package.default_icon );
                event.stopPropagation();
                event.preventDefault();
                return false;
            }
        }
    }
</script>

<style>
     .toolcard{
        cursor: pointer;
        height:62px;
        display: flex;
        flex-direction: row;
        align-items: stretch;
        padding: 0 10px;
        overflow: hidden;
    }
    .toolcard:hover{
        background-color: var(--toolpanel_toolitem_hover_bgColor);
        box-shadow: 1px 1px 10px -4px var(--toolpanel_toolitem_boxShadow);
    }
    .toolcard .tool_icon{
        text-align: center;
        overflow: hidden;
        width: 60px;
        border: 1px solid transparent;
    }
    .toolcard .tool_des{
        flex:1;
        font-size:13px;
        padding:4px 0;
        overflow:hidden;
    }
    .toolcard .tool_des .tool_header{
        display:flex;
        align-items:baseline;
        overflow: hidden;
    }
    .toolcard .tool_header .fa{
        padding: 0 5px;
    }
    .toolcard .tool_header .fa-download{
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
    }
    .toolcard .tool_header .fa:hover{
        color: var(--toolpanel_toolitem_btn_hover_color);
    }
    .tool_des .tool_name{
        font-weight: 700;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        flex: 1;
    }
    .tool_des .tool_descript{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;        
        height: 19px;
    }
    .tool_des .tool_author{
        font-size: 90%;
        padding-right: 6px;
        font-weight: 600;
        display: flex;
        flex-direction: row;
        align-items: stretch;
        justify-content: space-around;
    }
    .tool_author .author {
        flex: 1;
        opacity: .6;
    }
    .tool_des .tool_star{
        opacity: 1;
        font-size: 80%;
        padding-left: 6px;
        letter-spacing: 2px;    
           
    }
    .tool_des .tool_star .fa-star{
        color: #ffa700;
    }
    .toolcard .tool_des .tool_footer{
        display:flex;
        align-items:baseline;
        height: 16px;
        overflow: hidden;
    }
    .toolcard .tool_footer .opbtn{
        padding: 0 3px;
        line-height: 14px;
        display: inline-block;
        color: #FFF;
        margin-right:5px;
    }
    .toolcard .tool_icon .icon{
        max-width:42px;
        max-height: 42px;
        padding: 10px 14px 10px 0;
    }
</style>