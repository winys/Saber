<template>
    <div class="Preferences">
        <dl class="card">
            <dt class="category">账户</dt>
            <dd class="item">
                <span class="incoming">该功能正在开发。。。</span>
            </dd>
        </dl>
        <dl class="card">
            <dt class="category">外观</dt>
            <dd class="item">
                <span class="label">主题：</span>
                <select v-model="theme">
                    <option value="Saber-dark" >暗色主题</option>
                    <option value="Saber-light" checked>亮色主题</option>
                </select>
            </dd>
        </dl>
        <dl class="card">
            <dt class="category">语言</dt>
            <dd class="item">
                <span class="label">语言：</span>
                <select name="lang" id="lang" v-model="lang">
                    <option value="CN" >中文</option>
                </select>
            </dd>
        </dl class="card">
        <dl class="card">
            <dt class="category">热键</dt>
            <dd class="item"><div class="hotkey btn" @click="hotkeyManage">热键管理</div></dd>
        </dl>
        <dl class="card">
            <dt class="category">Mini 窗口</dt>
            <dd class="item">
                <span class="label">是否开启：</span>
                <input type="checkbox" class="switch" v-model="mini_enable">
            </dd>
            <dd class="item" v-show="mini_enable">
                <span class="label">与主窗口关系：</span>
                <select name="mini_method" id="mini_method" v-model="mini_method">
                    <option value="alternative" >交换打开</option>
                    <option value="both" >同时打开</option>
                </select>
            </dd>
        </dl>
        <dl class="card">
            <dt class="category">高级选项</dt>
            <dd class="item">
                <span class="label">关闭主窗口操作：</span>
                <select v-model="close">
                    <option value="close" >关闭主窗口</option>
                    <option value="exit" >退出程序</option>
                </select>
            </dd>
            <dd class="item">
                <span class="label">开发者模式：</span>
                <input type="checkbox" v-model="devmodel" class="switch">
            </dd>
        </dl>
        <dl class="card" v-if="devmodel">
            <dt class="install_tool">本地安装工具</dt>
            <dd class="item">
                <div class="slide_item">
                    <div class="openfolder" :class="{openfolder_focus:installpath_focus}">
                        <input type="text" @focus="installpathFocus" @blur="installpathBlur" v-model="toolpath" v-text="toolpath.toString()" placeholder="目前仅支持文件夹" lazy/><i class="fa fa-folder-open-o folder" aria-hidden="true" @click="openFolder"></i>
                    </div>
                </div>
                <div class="install_tool_op">
                    <a class="install_start btn" @click="localInstall">安装</a>
                </div>
            </dd>
        </dl>
    </div>
</template>
<script>
    import Saber from "../../common/Saber"
    const {dialog,BrowserWindow} = node_require('electron').remote;

    export default {
        data(){
            let data = Object.assign({}, this.$store.state.Preferences, {
                toolpath: "",
                installpath_focus: false
            })
            return data;
        },
        methods:{
            installpathFocus(){
                this.installpath_focus = true;
                console.log(this.installpath_focus)
            },
            installpathBlur(){
                this.installpath_focus = false;
            },
            hotkeyManage (){
                Store.emit("openToolManager",{
                    type:"hotkey",
                    title:"热键管理",
                    option:{
                        logo: "fa-chevron-left",
                        logoClick: function( name ){
                            Store.emit("openToolManager",{
                                title: "偏好设定",
                                type: "preferences",
                                option: "fa-wrench"
                            })
                        }
                    }       
                });
            },
            openFolder(){
                let path = dialog.showOpenDialog(BrowserWindow.getFocusedWindow(),{
                    properties :["openDirectory"]
                })
                if( !Saber.isEmpty(path) ){
                    this.toolpath = path;
                }
            },
            localInstall(){
                if (Saber.isArray(this.toolpath))
                    Saber.toolManager.install(this.toolpath[0]);
                else Saber.toolManager.install(this.toolpath);
            }
        }
    }
</script>
<style scoped>
    .Preferences .card{
        padding: 5px 3px 10px;
        border-radius: 1px;
        box-shadow: -1px 1px 7px -1px var(--prefereces_card_shadow);
    }
    .Preferences .category{
        padding: 10px;
        font-weight: 600;
        background: var(--prefereces_card_category);
        font-size: 12px;
    }
    .Preferences .item{
        margin: 0;
        padding: 10px;
        font-size: 12px;
    }
    .hotkey{
        padding: 5px;
    }    
    .openfolder{
        height: 28px;
        overflow-x: hidden;
    }
    .openfolder input{
        width: calc(100% - 28px);
        border: 1px solid var(--input_border);
        border-right: none;
    }
    .openfolder .folder{
        background-color: var(--input_background);
        width: 28px;
        height: 28px;
        vertical-align: top;
        line-height: 28px;
        text-align: center;
        cursor: pointer;
        border: 1px solid var(--input_border);
        box-sizing: border-box;
        border-left: none;
    }
    .install_start{
        width: 50px;
        height: 20px;
        font-size: 14px;
        line-height: 20px;
        order:1;
        text-align: center;
        overflow: hidden;
        cursor: pointer;
    }
    .install_tool_op{
        padding: 10px 0;
        display: flex;
        width:100%;
        flex-direction: row-reverse;
        align-items: stretch;
        height: 40px;
    }
    .openfolder_focus>input{
        outline: none;
        border: 1px solid var(--input_outline);
        border-right: none;
    }
    .openfolder_focus .folder{
        border: 1px solid var(--input_outline);
        box-sizing: border-box;
        border-left: none;
    }
</style>








              