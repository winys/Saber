<template>
    <div class="workink" daata-type="{{currentView}}">
        <component id="{{currentView}}"
            :is="currentView"
            :curview="currentView"
            keep-alive>
        </component>
    </div>
</template>
<script>
    //在Vue初始化前没有Saber
    import Saber from "../Saber"
    import PluginWrapper from './PluginWrapper'
    let components = {};
    
    for ( let key in  Saber.plugins ){
        let plugin = Saber.plugins[key];
        components[plugin.name]  = function (resolve) {
            resolve(Object.assign({},PluginWrapper))
        };
    }
    console.log(components.foo === components.Bar)
    global.PluginWrapper =  require('./PluginWrapper')
    components["notfound"] = require("./Notfound");
    
    console.log(components);
    export default {
        data(){
            return {
                currentView : "notfound",
            }
        },
        components,
        events: {
            "changeTool" (name) {
                
                console.log(this);
                this.$set("currentView", name)
            }
        }
    }
</script>
<style>
    .workink{
        flex:1;
        color: #FFF;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        width: calc(100% - 50px);
    }
</style>