import Vue from 'vue';
let Test = {
    state : {
        items: [],
        visiable : false,
        active:0
    },
    mutations : {
        'test'(state){
            alert(state.v)
        }
    }
}
let Toolbar = {
    state : {
        items: [],
        visiable : false,
        active:0
    },
    mutations : {
        'NEW_TOOL' ( state, toolid ) {
            let temp = state.items;
            let has = -1;
            for (let index in temp){
                if(temp[index].name === toolid){
                    has = index;
                    break;
                }
            }
            if( has < 0 ){
                let newitem = Saber.plugins[toolid];
                temp.push( newitem );
                state.visiable = true;
                Store.commit("CHANGE_TOOL",{
                    index: temp.length-1,
                    name: newitem.name
                });
            }
            else{
                Store.commit("CHANGE_TOOL",{
                    index: has,
                    name: state.items[has].name
                });
                Vue.nextTick(()=>{
                    Store.commit("NEW_PLUGIN_PAGE",state.items[has].name);
                })
            }
            const {ipcRenderer} = node_require('electron');
            ipcRenderer.send("update_mini_tools");
        },
        'CHANGE_TOOL' (state, item ){
            let items = state.items;
            state.active = parseInt(item.index);                     
            Saber.store("__toolbar", {
                items: state.items,
                visiable: state.visiable,
                active: state.active
            });
        },
        'CLOSE_TOOL' (state, name){
            if( Saber.isEmpty(name) ) return;                
            let items = state.items;
            for (let index in items){
                if (items[index].name === name){
                    items.splice(index,1);
                    if( items.length > 0 ){
                        index = (index+1)%items.length;
                        Store.emit("changeTool", {
                            index,
                            name: items[index].name
                        });
                    }
                    break;
                }
            }
            if( Saber.isEmpty(state.items) ){
                Store.commit('CLEAR_WORKINK')
                Saber.store("__toolbar", null );
            }
            else {
                Saber.store("__toolbar", {
                    items: state.items,
                    visiable: state.visiable,
                    active: state.active
                });
            }
            Saber.store("__pageinfo_"+name, null );
            Saber.store(new RegExp("^" + name + "_[\\S]+$"), null );
            const {ipcRenderer} = node_require('electron');
            ipcRenderer.send("update_mini_tools");
        }
    }
}

let ToolManager = {
    state : {
        logo: "fa-wrench",
        title:"工具管理",
        visiable:false,
        currentView:"",
        option:{},
        width: 300
    },
    mutations : {
        'OPEN_TOOLMANAGER'( state, options ){;
            state.title = options.title;
            if(options.option){
                let opt = options.option;
                if( Saber.isFunction(opt.logoClick) ) opt.logoClick = opt.logoClick.bind(this);
                if( Saber.isFunction(opt.computed) ) opt.computed = opt.computed.bind(this);
                state.option = opt;
            }
            
            state.visiable = true;
            state.currentView = options.type;
        },
        "CLOSE_TOOLMANAGER" ( state ){
            state.visiable = false;
        },
        "RESIZE_TOOLMANAGER" ( state, width){
            state.width = width;
        }
    }
}

let Workink = {
    state : {
        currentView:"",
        visiable:true
    },
    mutations : {
        'CHANGE_TOOL' (state,item){
            state.currentView = item.name;
        },
        'CLEAR_WORKINK' (state){
            state.currentView = "";
        }
    }
}

let PluginWrapper = {
    state:{
        pages:[],
        curpage: "",
    },
    mutations : {
        'CHANGE_TOOL' (state, item ){
            let toolbar_data = Saber.store("__pageinfo_"+item.name);
            if( !Saber.isEmpty(toolbar_data) ){                
                state.pages = toolbar_data.pages;
                state.curpage = toolbar_data.curpage;
            }
            else{
                state.pages = [];
                state.curpage = "";
                Store.emit('newPage',item.name);
            }
        },
        'CLEAR_WORKINK' (state){
            state.pages = [];
            state.curpage = "";
        },
        'NEW_PLUGIN_PAGE'(state,name) {
            let id = Saber.guid();                
            state.pages.push({title:"page"+(state.pages.length+1),id})
            Store.emit('changePage',id);
            Vue.nextTick( ()=>{
                Saber.store("__pageinfo_"+name, {
                    pages: state.pages,
                    curpage: state.curpage
                });
            });
        },
        'CHANGE_PLUGIN_PAGE' (state, pageId) {
            state.curpage = pageId;
        }
    }
}

let Statusbar = {
    state:{
        visiable : true,
        statusMsg : "欢迎使用 Saber"
    },
    mutations : {
        'CHAGE_STATUS' (state,item){
            state.currentView = item.name;
        }
    }
}

let Message = {
    state:{
        items :[],
        visiable : true
    },
    mutations:{
        'PUSH_MESSAGE' ( state,item ){
            let bkcolor = "#007acc";
            if(item.type == "错误"){
                bkcolor = 'red';
            }
            else if(item.type == "警告"){
                bkcolor = "#ff8f00";
            }
            state.items.push({
                type: item.type || "信息",
                text : item.text || "",
                restart : item.restart || false,
                bkcolor
            });
            
            if(state.items.length>=5){
                state.items.splice(0,1);
            }
            
            state.visiable = true;
        }
    }
}

let Preferences = {
    state: Saber.config
}

export default {
    Toolbar,
    ToolManager,
    Workink,
    PluginWrapper,
    Statusbar,
    Message,
    Preferences
}