import crypto from 'crypto'
export default {
    sendMessage ( config, callback ){
        let msg = Saber.message;
        var bkcolor = "#007acc";
        if(config.type == "错误"){
            bkcolor = 'red';
        }
        else if(config.type == "警告"){
            bkcolor = "#ff8f00";
        }
        msg.items.push({
            type: config.type || "信息",
            text : config.text || "",
            restart : config.restart || false,
            bkcolor : bkcolor
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
    },
    guid (length){
		'use strict';
        length = length||32;
		let ratio = Math.log(64) / Math.log(256);
		let numbytes = Math.ceil(length * ratio);
		let str = crypto.randomBytes(numbytes).toString('base64').slice(0, length);
		return str.replace(/\+/g, '_').replace(/\//g, '-');
	}

}