<template>
    <div class="install_tool">
        <div>
            <div>
                <label>请填写工具github地址：</label>
                <input type="text" v-model="toolurl" placeholder="目前仅支持github" lazy/>
            </div>
            <div class="op">
                <a class="more_setting" @click="moreSetting">高级选项</a>
                <a class="install_start btn">安装</a>
            </div>
        </div>
        <div v-show="more_setting">
            <div class="slide_item">
                <label>本地安装路径</label>
                <div class="openfolder" :class="{openfolder_focus:focus}">
                    <input type="text" @focus="onfocus" @blur="onblur" v-model="toolpath" v-text="toolpath.toString()" placeholder="目前仅支持文件夹" lazy/><i class="fa fa-folder-open-o folder" aria-hidden="true" @click="openFolder"></i>
                </div>
            </div>
            <div class="op">
                <a class="install_start btn" @click="localInstall">安装</a>
            </div>
        </div>
    </div>
</template>

<script>
    const {dialog,BrowserWindow} = node_require('electron').remote;
    export default {
        data(){
            return {
                toolurl: "",
                toolpath: "",
                more_setting: false,
                focus: false
            }
        },
        methods : {
            moreSetting(){
                this.more_setting = !this.more_setting;
            },
            onfocus (){
                this.focus = true;
            },
            onblur (){
                this.focus = false;
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
                    Saber.install(this.toolpath[0]);
                else Saber.install(this.toolpath);
            }
        }
    }
</script>

<style>
.install_tool{
    font-size: 14px;
    padding: 10px;
}
.install_tool label{
    margin: 10px 0;
    display: block;
    height: 20px;
    overflow-x: hidden;
}

.install_tool .op{
    padding: 10px 0;
    display: flex;
    width:100%;
    flex-direction: row-reverse;
    align-items: stretch;
    height: 40px;
}
.install_tool .more_setting{
    flex:1;
    order:2;
    overflow: hidden;
    text-decoration: underline;
    cursor: pointer;
}
.install_tool .install_start{
    width: 50px;
    height: 20px;
    font-size: 14px;
    line-height: 20px;
    order:1;
    text-align: center;
    overflow: hidden;
    cursor: pointer;
}
.openfolder{
    height: 28px;
    overflow-x: hidden;
}
.openfolder input{
    width: calc(100% - 28px);
}
.openfolder .folder{
    background-color: var(--input_background);
    width: 28px;
    height: 28px;
    vertical-align: top;
    line-height: 28px;
    text-align: center;
    cursor: pointer;
}
</style>