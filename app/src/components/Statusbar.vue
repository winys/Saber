<template>
    <div class="statusbar" v-if="visiable">
        <span class="status-item left"> {{statusMsg}}</span>        
        <span @click="change" class="status-item right">V0.0.1</span>
        <span class="status-item right">UTF-8</span>
    </div>
</template>

<script>
    export default {
        data (){
            return Saber.statusbar;
        }
    }
</script>

<style>
    .statusbar{
        background: #007acc;
        position: fixed;
        bottom: 0;
        height: 22px;
        width: 100%;
        color: #FFF;
        font-size: 14px;
        z-index: 25;
        padding: 0 10px;
        
    }
    .status-item{
        display: inine-block;
        vertical-align: top;
        padding: 0 10px;        
        line-height: 22px;
    }
    .status-item.left{
        float: left;
    }
    .status-item.right{
        float: right;
    }
</style>