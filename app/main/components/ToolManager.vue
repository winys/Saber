<template>
    <div class="toolManager hover_scroll" :class={active:visiable}>
        <div class="header">             
            <a class="header_op" @click="closeToolManager"><i class="fa fa-times" aria-hidden="true"></i></a>
            <span class="header_text"> {{title}}</span>
            <a class="header_logo" @click="option.logoClick && option.logoClick(title)">
                <i class="fa" v-bind:class="option.logo || 'fa-wrench'" aria-hidden="true"></i>
            </a>
        </div>
        
        <div class="content">
            <component class="main-content" id="currentView" :width="width"
                :option="option"
                :is="currentView">
            </component>
            <div class="resize-x" @mousedown="resize"></div>
        </div>
        
    </div>
</template>
<script>
    import { mapActions } from 'vuex'

    import toollist from "./ToolList";
    import toolpanel from "./ToolPanel";
    import installtool from "./InstallTool";
    import tooldetail from "./ToolDetail";
    import preferences from "./Preferences";
    import hotkey from "./Hotkey";
    import feedback from "./Feedback";feedback
    
    const MIN_WIDTH = 150;

    export default {
        data(){
            return {
                width: 300
            }
        },
        computed:{
            'title' () {return this.$store.state.ToolManager.title},
            'visiable' () {return this.$store.state.ToolManager.visiable},
            'currentView'  ()  {return this.$store.state.ToolManager.currentView},
            'option' ()  {return this.$store.state.ToolManager.option}
        },
        components: {
            toollist,installtool,toolpanel,tooldetail,preferences,hotkey,feedback
        },
        methods: {
            ...mapActions({
                closeToolManager : 'closeToolManager'
            }),
            resize(){
                let e = window.event;                
                if(!e) return;
                
                let offset = {
                    x: event.clientX - event.target.offsetLeft
                };
                let target = e.target;
                let vm = this;
                document.addEventListener("mousemove",mousemove);
                document.addEventListener("mouseup",mouseup);
                function mousemove(event){
                    let x = event.clientX-offset.x;
                    vm.$el.style.width = x + "px";
                    vm.width = x;
                    document.body.classList.add("ew-resize");
                    if(x <= MIN_WIDTH){
                        mouseup();              
                        Store.emit("closeToolManager");                        
                        vm.$el.style.width = 300 + "px";
                        vm.width = 300;
                    }
                }
                function mouseup(){                    
                    document.body.classList.remove("ew-resize");
                    document.removeEventListener('mousemove',mousemove);
                    document.removeEventListener('mouseup',mouseup);
                }
            }
        }
    }
</script>
<style>
    .toolManager{
        width:0px;
        display: none;
        overflow:hidden;
        color: var(--toolManager_fontColor);
        flex-direction: column;
        z-index: 1;
    }
    .toolManager.active{        
        display: flex;
        width: 300px;
        min-width: 150px;
        background: var(--toolManager_active_bgColor);
        border-right: 1px solid var(--toolbar_bgcolor);
    }
    .toolManager .header{
        background: var(--toolManager_header_bgColor);
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
        color :  var(--fontColor);
    }
    .toolManager .header_op:hover{
        background: var(--toolManager_header_btnhover_bgColor);
    }
    .toolManager .header_text{
        cursor: default;
    }
    .toolManager .header_logo{
        cursor: pointer;
        width: 20px;
        text-align: center;
        color :  var(--fontColor);
    }
    .toolManager .content{
        flex:1;
        overflow: auto;
        display: flex;
        justify-content: space-around;
        align-items: stretch;
    }
    .toolManager .main-content{
        flex:1;
        overflow: auto;
    }
    .resize-x{
        width: 4px;
        opacity: 0;
        cursor: ew-resize;
        margin-left: -4px;
    }
    .ew-resize{
        cursor: ew-resize;
    }
</style>