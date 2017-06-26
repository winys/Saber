export const test =  ({commit}) => {
    commit("TEST");
}

//ToolManager
export const openToolManager = ({commit},options) => {
    commit("OPEN_TOOLMANAGER",options);    
}
export const closeToolManager = ({commit}) =>{
    commit('CLOSE_TOOLMANAGER');
}
export const resizeToolManager = ({commit}, width ) => {
    commit('RESIZE_TOOLMANAGER', width)
}

//Toolbar
export const newTool = ({commit},name) =>{
    commit('CLOSE_TOOLMANAGER');
    commit('NEW_TOOL', name);
}
export const changeTool = ({commit},item) => {
    commit('CHANGE_TOOL',item);
}
export const closeTool = ({commit}, name) => {
    commit('CLOSE_TOOL',name);
}

//PluginWrapper
export const changePage = ({commit}, pageId) => {
    commit('CHANGE_PLUGIN_PAGE',pageId);
}
export const newPage = ({commit},name) => {
    commit('NEW_PLUGIN_PAGE',name);
}

export const sendMessage = ({commit}, message) => {
    commit('PUSH_MESSAGE', message)
}
