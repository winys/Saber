const {ipcRenderer} = node_require('electron')

ipcRenderer.on("newtool",function(){
    if(global.App === undefined){
        alert("未发现应用");
        return;
    }
    Saber.emit("openToolManager",{
        title:"请选择工具",
        type:"toollist",
    });
})

ipcRenderer.on("toollist",function(){
    if(global.App === undefined){
        alert("未发现应用");
        return;
    }
    Saber.emit("openToolManager",{
        title:"工具管理",
        type:"toolpanel",
    });
})

ipcRenderer.on("installtool",function(){
    if(global.App === undefined){
        alert("未发现应用");
        return;
    }
    Saber.emit("openToolManager",{
        title:"安装工具",
        type:"installtool",
    });
})
ipcRenderer.on("zoomin",function(){
    let size = parseInt(document.body.style.zoom,10)||100;
    if(size+10 > 500){
        return;
    }
    document.body.style.zoom = (size+10) + "%";
})
ipcRenderer.on("zoomout",function(){
    let size = parseInt(document.body.style.zoom,10)||100;
    if(size-10 <= 0){
        return;
    }
    document.body.style.zoom = (size-10) + "%";
})
ipcRenderer.on("resetzoom",function(){
    document.body.style.zoom = "100%";
})