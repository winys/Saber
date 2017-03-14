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
        color: #FFF;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        overflow: hidden;
    }
</style>