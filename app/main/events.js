const {ipcRenderer} = node_require('electron');

ipcRenderer.on("newtool",function(){
    if(global.App === undefined){
        alert("未发现应用");
        return;
    }
    Store.emit("openToolManager",{
        option : {
            logo: 'fa-plus'
        },
        title:"请选择工具",
        type:"toollist",
    });
});

ipcRenderer.on("toollist",function(){
    if(global.App === undefined){
        alert("未发现应用");
        return;
    }
    Store.emit("openToolManager",{
        option : {
            logo: 'fa-wrench'
        },
        title:"工具管理",
        type:"toolpanel",
    });
});

ipcRenderer.on("installtool",function(){
    if(global.App === undefined){
        alert("未发现应用");
        return;
    }
    Store.emit("openToolManager",{
        option : {
            logo: 'fa-inbox'
        },
        title:"安装工具",
        type:"installtool",
    });
});

ipcRenderer.on("preferences",function(){
    if(global.App === undefined){
        alert("未发现应用");
        return;
    }
    Store.emit("openToolManager",{
        option : {
            logo: 'fa-cogs'
        },
        title:"偏好设定",
        type:"preferences",
    });
});

ipcRenderer.on("zoomin",function(){
    let size = parseInt(document.body.style.zoom,10)||100;
    if(size+10 > 500){
        return;
    }
    document.body.style.zoom = (size+10) + "%";
});

ipcRenderer.on("zoomout",function(){
    let size = parseInt(document.body.style.zoom,10)||100;
    if(size-10 <= 0){
        return;
    }
    document.body.style.zoom = (size-10) + "%";
});

ipcRenderer.on("resetzoom",function(){
    document.body.style.zoom = "100%";
});

ipcRenderer.on("mini_command",function(sender,data){
    Store.emit("changeTool",data)
});


ipcRenderer.on('feedback',function(sender,data){
    Store.emit("openToolManager",{
        type:"feedback",
        title:"Saber反馈",
        option:{
            logo: "fa-smile-o"
        }       
    });
});