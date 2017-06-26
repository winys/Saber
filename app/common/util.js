const path = node_require('path');
const crypto = node_require('crypto');
const fs = node_require('fs');
const spawn = node_require('child_process').spawn;
const {dialog, BrowserWindow} = node_require('electron').remote;
const {ipcRenderer} = node_require('electron');
const process = node_require('process');
const __package = node_require(path.join(process.cwd(), "./package.json"));
const __config = node_require(path.join(process.cwd(), "./preferences.json"));
let _util = {
    
    APP_PATH :  process.cwd(),

    __plugin_path : path.join(process.cwd(), "./plugins/"),
    
    //Saber 信息
    package: Object.freeze(__package),

    //个人偏好信息
    config:  Object.freeze(__config),

    //发送通知
    sendMessage ( config, callback ){
        Store.emit( 'sendMessage', config );
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

    /**
     * 产生唯一的ID
     * @param {int} length 产生ID长度
     */
    guid (length){
		'use strict';
        length = length||32;
		let ratio = Math.log(64) / Math.log(256);
		let numbytes = Math.ceil(length * ratio);
		let str = crypto.randomBytes(numbytes).toString('base64').slice(0, length);
		return str.replace(/\+/g, '_').replace(/\//g, '-');
	},

    isArray : Array.isArray,

    isFunction ( obj ) {
        return toString.call(obj) === "[object Function]";
    },

    isObject (obj) {
        return toString.call(obj) === "[object Object]";

    },

    isString (obj) {
        return toString.call(obj) === "[object String]";

    },

    isRegExp (obj) {
        return toString.call(obj) === "[object RegExp]";

    },
     
    isEmpty (obj){
		let type = toString.call(obj);	
		switch (type) {
			case '[object Object]' :
				for( let key in obj ){
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

    isError ( obj ){
        return toString.call(obj) === "[object Error]";
    },
    
    clone : require('deepcopy'),
    /**
     * Localstorage存储
     * @param {string} id 存储ID
     * @param {object} data 存储Object，将会Json化后存储，如果不存在 \
     *        返回localstorage.getItem("ID")
     */
    store (id, data){
        let storage = window.localStorage;        
        if(id === undefined){
            return null;
        }
        if(id === null){
            return storage.clear();
        }
        if( Saber.isRegExp(id) ){
            for(var key in storage){
                if(id.test(key)){
                    this.store(key,data);
                }
            }
        }
        else{
            if(data === null){
                return storage.removeItem(id);
            }
            if(this.isEmpty(data)){
                return JSON.parse(storage.getItem(id.toString())) || {};
            }
            return storage.setItem(id.toString(), JSON.stringify(data));  
        }
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


    _checkPlugin( plugin_path ){
        //TODO:后期修改
        let fstat = Saber._existFile(plugin_path);
        return fstat !== null;
    },


    _copyFile: async function( dst, src){
        //检查是否存在源文件（夹）
        if( !Saber._existFile(src) )return false;
        //复制目录
        let files = await fs.readdir(src);
        console.log(files);
        //复制文件
    },

    /**
     * 字典排序
     * @param {object} obj 要排序的本体
     */
    _dictSort ( obj ){
        let obj2  = {},
            keys = Object.keys(obj).sort();
        for (let i = 0, n = keys.length, key; i < n; ++i) {
            key = keys[i];
            obj2[key] = obj[key];
        }
        return obj2;
    },
    /**
     * 调用系统默认浏览器打开指定 URL
     * @param {string} url 目标路径以 http/https 开头
     */
    goToLink ( url ){
        const urlReg = /^http(s?):\/\/(?:[A-za-z0-9-\.]+)(?:[\/\?#][\/=\?%\-&~`@[\]\':+!\.#\w]*)?$/;
        if(!urlReg.test(url)) return false;
                        
        ipcRenderer.send('goToLink',url);
    },
    
    /**
     * 模拟 window.alert() 函数
     * @param {*} opt 选项 
     *              - title： 标题 默认 "Saber"
     *              - message：信息 默认未 ""
     *              - type： 信息类型 默认为 "none", 可用类型 "none", "info", "error", "question" or "warning"
     */
    alert ( opt ){
        if ( Saber.isString(opt) ){
            opt = {
                message: opt
            }
        }
        dialog.showMessageBox( BrowserWindow.getFocusedWindow(),{
            type: opt.type||"none",
            buttons: ["确定"],
            defaultId: 1,
            cancelId: 1,
            title : opt.title||"Saber",
            message : (opt.message||"").valueOf().toString()
        });
    },

    /**
     * http 客户端
     * @param {*} req 请求对象 包括url，body，headers 
     */
    request ( req ) {
        return new Promise ((rs,rj)=>{
            ipcRenderer.send('request', req);
            ipcRenderer.on('request_callback',function(sender ,data){
                rs(data);
            })
        });
    }
}

if(__package.NODE_ENV === "development"){

    /**
     * 输出日志，将会在控制器输出和调试工具输出，仅在调试模式下使用
     * @param {*} args 
     */
    _util.log =  (...args) => {          
            console.log(...args)
            ipcRenderer.send("log",args);
    }

}

export default _util;