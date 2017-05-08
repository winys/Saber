<template>
    <div class="statusbar" v-if="visiable">
        <span class="status-item left"> {{statusMsg}}</span>        
        <span class="status-item feedbck right" @click="feedback"></span>     
        <span class="status-item right" @click="version">V0.0.1</span>
        <span class="status-item right">UTF-8</span>
    </div>
</template>

<script>
    export default {
        computed:{
            visiable () { return this.$store.state.Statusbar.visiable },
            statusMsg () { return this.$store.state.Statusbar.statusMsg }
        },
        methods:{
            version () {
                Saber.sendMessage({
                    type: "信息",
                    text: "当前版本 V1.0.0， 欢迎使用Saber！"
                });
            },
            feedback(){
                Store.emit("openToolManager",{
                    type:"feedback",
                    title:"Saber反馈",
                    option:{
                        logo: "fa-smile-o"
                    }       
                });
            }
        }
    }
</script>

<style>
    .statusbar{
        background: var(--statusbar_bgColor);
        height: 22px;
        font-size: 14px;
        z-index: 25;
        padding: 0 10px;
        color: var(--statusbar_color);
        
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
    .feedbck{
        background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath fill='%23fff' d='M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm2.45 2.8c.58 0 1.05.627 1.05 1.4 0 .773-.47 1.4-1.05 1.4-.58 0-1.05-.627-1.05-1.4 0-.773.47-1.4 1.05-1.4zm-4.9 0c.58 0 1.05.627 1.05 1.4 0 .773-.47 1.4-1.05 1.4S4.5 5.973 4.5 5.2c0-.773.47-1.4 1.05-1.4zm6.901 5.775A4.733 4.733 0 0 1 8 12.725a4.733 4.733 0 0 1-4.451-3.149.525.525 0 1 1 .989-.35c.519 1.465 1.91 2.45 3.461 2.45s2.941-.984 3.461-2.45a.527.527 0 0 1 .991.349z'/%3E%3C/svg%3E") 50% no-repeat;
        height: 100%;
        cursor: pointer;
    }
</style>