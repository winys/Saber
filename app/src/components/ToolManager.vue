<template>
    <div class="toolManager" :class={active:visiable}>
        <div class="header">             
            <a class="header_op" @click="closeToolManager"><i class="fa fa-times" aria-hidden="true"></i></a>
            <span class="header_text"> {{title}}</span>
            <a class="header_logo" @click="option.logoClick && option.logoClick(title)">
                <i class="fa" v-bind:class="option.logo || 'fa-wrench'" aria-hidden="true"></i>
            </a>
        </div>
        
        <div class="content">
            <component id="currentView"
                :option="option"
                :is="currentView">
            </component>
        </div>
        
    </div>
</template>
<script>
    import { mapActions } from 'vuex'

    import toollist from "./ToolList";
    import toolpanel from "./ToolPanel";
    import installtool from "./InstallTool";
    import tooldetail from "./ToolDetail";
    
    export default {
        computed:{
            'title' () {return this.$store.state.ToolManager.title},
            'visiable' () {return this.$store.state.ToolManager.visiable},
            'currentView'  ()  {return this.$store.state.ToolManager.currentView},
            'option' ()  {return this.$store.state.ToolManager.option}
        },
        components: {
            toollist,installtool,toolpanel,tooldetail
        },
        methods: {
            ...mapActions({
                closeToolManager : 'closeToolManager'
            })
        }
    }
</script>
<style>
    .toolManager{
        width:0px;
        overflow:hidden;
        color: #ccc;
        transition:width ease-in-out 0.5s, background ease-in-out 0.5s;
        display: flex;
        flex-direction: column;
    }
    .toolManager.active{
        width: 300px;
        background: #252526;
    }
    .toolManager .header{
        background: #3e3e3e;
        height: 35px;
        line-height: 35px;
        font-size: 14px;
        display: flex;
        flex-direction: row-reverse;
        align-items: stretch;
    }
    .toolManager .header_text{
        flex: 1;
        padding: 0 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        word-spacing: 5px;
    }
    .toolManager .header_op{
        cursor: pointer;
        width: 35px;
        text-align: center;
    }
    .toolManager .header_op:hover{
        background: #5d5d5d;
    }
    .toolManager .header_text{
        cursor: default;
    }
    .toolManager .header_logo{
        cursor: pointer;
        width: 20px;
        text-align: center;
    }
    .toolManager .content{
        flex:1;
        overflow: auto;
    }
</style>