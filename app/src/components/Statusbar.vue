<template>
    <div class="statusbar" v-if="visiable">
        <span class="status-item left"> {{statusMsg}}</span>        
        <span class="status-item right" @click="change">V0.0.1</span>
        <span class="status-item right">UTF-8</span>
    </div>
</template>

<script>
    export default {
        data (){
            return Saber.statusbar;
        },
        methods:{
            change(){
                Saber.sendMessage({
                    type: "tt",
                    text: "的话就卡时间看电视"
                });
            }
        }
    }
</script>

<style>
    .statusbar{
        background: #007acc;
        height: 22px;
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