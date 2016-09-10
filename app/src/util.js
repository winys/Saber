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
    _existFile(spath){
        let fstat;
        try {
            fstat = fs.statSync(spath);
        }catch(e){
            return null;
        }
        return fstat;
    },
    _hasPlugin( plugin_path ){
        //TODO:后期修改
        let fstat = Saber._existFile(plugin_path);
        return fstat !== null;
    },
    _copyFile: async function( dst, src){
        //检查是否存在源文件（夹）
        console.log(src);
        if( !Saber._existFile(src) )return false;
        //复制目录
        let files = await fs.readdir(src);
        console.log(files);
        //复制文件
    },
    install ( plugin_path ){        
        let plugin_info_path = path.resolve(plugin_path,"./saber.json");
        if ( !Saber._hasPlugin(plugin_info_path) ){
            Saber.sendMessage({
                type: "错误",
                text: "插件安装失败：并未发现插件"
            });
            return;
        }
        let plugin_info = node_require(plugin_info_path);
        let confirm = dialog.showMessageBox( BrowserWindow.getFocusedWindow(),{
            type: "none",
            buttons: ["安装","取消"],
            defaultId: 0,
            cancelId: 1,
            title : "确认安装",
            message : "检查到插件 " + plugin_info.name + "（V" + (plugin_info.version || "1.0.0") + "）,您确认安装么？",
            detail : "版本：" + (plugin_info.version || "1.0.0") + "\n描述：" + plugin_info.descript + "\n作者：" + plugin_info.author.join(",")
        })
        
        if ( confirm === 0 ){
            //同意安装
            //1.copy
            Saber._copyFile("",plugin_path);
            //2.change the config file
            Saber.sendMessage({
                type: "信息",
                text: "插件安装成功，重启以使用插件 《" + plugin_info.name + "》",
                reload: true
            });
        }
        return;
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