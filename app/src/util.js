export default {
    sendMessage ( config, callback ){
        let msg = Saber.message;
        
        msg.items.push({
            type: config.type || "default",
            text : config.text || "",
            restart : config.restart || false
        });
        
        if(msg.items.length>=5){
            msg.items.splice(0,1);
        }
        
        msg.visiable = true;
    },
    closeMessage(config,callback){
        let msg = Saber.message;
        var i;
        msg.items.splice(
            config.num,
            1
        );
    },
    statusMsg( config, callback) {
        Saber.statusbar.statusMsg = config.statusMsg;
        callback && callback.call(saber,saber.statusbar);
    },
    _restart(code, text) {
        ipcRenderer.send('relaunch',{code,text})
    }
}