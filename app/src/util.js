import crypto from 'crypto'
export default {
    //发送通知
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
    //关闭通知
    closeMessage(config,callback){
        let msg = Saber.message;
        var i;
        msg.items.splice(
            config.num,
            1
        );
    },
    //底部消息
    statusMsg( config, callback) {
        Saber.statusbar.statusMsg = config.statusMsg;
        callback && callback.call(saber,saber.statusbar);
    },
    //重启
    _restart(code, text) {
        ipcRenderer.send('relaunch',{code,text})
    },
    //唯一id
    guid (length){
		'use strict';
        length = length||32;
		let ratio = Math.log(64) / Math.log(256);
		let numbytes = Math.ceil(length * ratio);
		let str = crypto.randomBytes(numbytes).toString('base64').slice(0, length);
		return str.replace(/\+/g, '_').replace(/\//g, '-');
	},
    isArray : Array.isArray,
    isObject (obj) {
        return toString.call(obj) === "[object Object]";

    },
    isEmpty : function(obj){
		var type = toString.call(obj);	
		switch (type) {
			case '[object Object]' :
				for( var key in obj ){
					return false;
				}
				return true;
			case '[object Array]' :
				return obj.length === 0;
			case '[object String]' :
				return obj.length === 0;
			case '[object Null]' :
				return true;
			case '[object Undefined]' :
				return true;
			case '[object Boolean]' :
				return !obj;
			default :
				return false;
		}
	},
    store(id,data){
        let storage = window.localStorage;        
        if(id === undefined){
            return null;
        }
        if(id === null){
            return storage.clear();
        }
        if(data === null){
            return storage.removeItem(id);
        }
        if(this.isEmpty(data))
            return JSON.parse(storage.getItem(id.toString())) || {};

        return storage.setItem(id.toString(), JSON.stringify(data));  
    },
    _existFile(path){
        let fstat;
        try {
            fstat = fs.statSync(path);
        }catch(e){
            return null;
        }
        return fstat;
    },
    hasPlugin( path ){
        console.log(path)
        //TODO:后期修改
        let fstat = Saber._existFile(path);
        return fstat && fstat.isDirectory()
            ? Saber._existFile(path+"/Saber.json") !== null
            : Saber._existFile(path + ".vue") !== null
    },
    _dictSort( obj ){
        let obj2  = {},
            keys = Object.keys(obj).sort();
        for (var i = 0, n = keys.length, key; i < n; ++i) {
            key = keys[i];
            obj2[key] = obj[key];
        }
        return obj2;
    }
}