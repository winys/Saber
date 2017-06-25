class ToolManager {
    static plugins = require ("../../plugins/plugin.json");
    
    constructor () {
    }

    install ( path ){

    }

    uninstall ( pluginId ){

    }
    serch ( keyword ){
        
    }

    update ( pluginId ){

    }

    check ( pluginId ){

    }
}

export default function (){
    if( window.pluginManager instanceof PluginManager){
        return window.pluginManager;
    }
    return new ToolManager();
}