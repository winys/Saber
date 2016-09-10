<template>
    <div class="toolManager" :class={active:visiable}>
        <div class="header">             
            <a class="header_op" @click="close"><i class="fa fa-times" aria-hidden="true"></i></a>
            <span class="header_text"><i class="fa fa-wrench" aria-hidden="true"></i> {{title}}</span>
        </div>
        <component id="{{currentView}}"
            :is="currentView">
        </component>
        
    </div>
</template>
<script>
    import toollist from "./ToolList";
    import installtool from "./InstallTool";
    export default {
        data(){
            let toolinfo = {title:"工具管理",visiable:false,currentView:""};
            return toolinfo;
        },
        components: {
            toollist,installtool
        },
        methods: {
            createTool( name ){
                this.close();
                this.$root.$broadcast("newtool",name);
            },
            close(){
                this.$set("visiable",false);
            }
        },
        events: {
            "ToolList" (opt) {
                this.$set("title",opt.title);
                this.$set("visiable",true);
                this.$set("currentView","toollist");
            },
            "InstallTool" (opt) {
                this.$set("title",opt.title);
                this.$set("visiable",true);
                this.$set("currentView","installtool");
            },
            "close"(){
                this.$set("visiable", false);
            }
        }
    }
</script>
<style>
    .toolManager{
        width:0px;
        overflow:hidden;
        color: #ccc;
        transition:width ease-in-out 0.5s, background ease-in-out 0.5s;
    }
    .toolManager.active{
        width: 250px;
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
</style>