<template>
    <div class="workink" daata-type="{{currentView}}" v-show="visiable|hasItem">
        <component id="{{currentView}}"
            :is="currentView"
            :curview="currentView"
            >
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
    components["notfound"] = (resolve) => {
        require(["./Notfound"], resolve);
    };

    export default {
        data(){
            return Saber.workink;
        },
        components,
        events: {
            "changeTool" (name) {
                if(name in Saber.plugins){
                    this.$set("currentView", name);
                }
                else{
                     this.$set("currentView", "notfound");
                }
                this.$set("visiable", true);
            },
            "closetool" ( name ){
                Saber.store("__pageinfo_"+name, null );
            }
        },
        filters:{
            hasItem(){
                return ( Saber.isEmpty(this.currentView) )
                    ? (this.visiable=false)
                    : this.visiable;
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
        overflow: hidden;
    }
</style>