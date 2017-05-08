<template>
    <div class="workink" :data-type="currentView" v-show="show">
        <component :id="currentView"
            :is="currentView"
            :curview="currentView"
            >
        </component>
    </div>
</template>
<script>
    import Saber from "../../common/Saber";
    import PluginWrapper from './PluginWrapper';

    const path = node_require('path');
    let components = {};
    
    for ( let key in  Saber.plugins ){
        let plugin = Saber.plugins[key];
        //多实例化
        if( plugin.multiple ){            
            components[plugin.name]  = function (resolve) {
                resolve(Object.assign({},PluginWrapper))
            };
        }
    }
    components["notfound"] = (resolve) => {
        require(["./Notfound"], resolve);
    };

    export default {
        computed: {
            currentView () {return this.$store.state.Workink.currentView},
            show () {
                let visiable = this.$store.state.Workink.visiable;
                return ( Saber.isEmpty(this.currentView) )
                    ? false
                    : visiable;
            }
        },
        components
    }
</script>
<style>
    .workink{
        flex:1;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        overflow: auto;
        background-color: var(--mainColor);
        z-index: 1;
    }
</style>