ipcRenderer.on("newtool",function(){
    //alert("newtool");
    //弹出选择框
    if(global.App === undefined){
        alert("未发现应用");
        return;
    }
    App.$broadcast("newtool","foo");
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