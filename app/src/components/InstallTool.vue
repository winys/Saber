<template>
    <div class="install_tool">
        <div>
            <label>请填写工具github地址：</label>
            <input type="text" v-model="toolurl" placeholder="目前仅支持github" lazy/>
        </div>
        <div class="op">
            <a href="">高级选项</a>
            <a href="">安装</a>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                toolurl: ""
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
}
.install_tool input{
    width: 100%;
}
</style>