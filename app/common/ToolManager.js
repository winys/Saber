import path from 'path';
const {dialog, BrowserWindow} = node_require('electron').remote;
const spawn = node_require('child_process').spawn;

export default class ToolManager {
    static plugins = require ('../../plugins/plugin.json');
    
    constructor () {
    }

    preInstall ( plugin_path ) {        
        const plugin_info_path = path.resolve(plugin_path,"./saber.json");
        const plugin_info = node_require( plugin_info_path );

        if ( !Saber._checkPlugin(plugin_info_path) ){
            Saber.sendMessage({
                type: "错误",
                text: "插件安装失败：并未发现插件"
            });
            return;
        }
        const confirm = dialog.showMessageBox( BrowserWindow.getFocusedWindow(),{
            type: "none",
            buttons: ["安装","取消"],
            defaultId: 0,
            cancelId: 1,
            title : "确认安装",
            message : "检查到插件 " + plugin_info.name + "（V" + (plugin_info.version || "1.0.0") + "）,您确认安装么？",
            detail : "版本：" + (plugin_info.version || "1.0.0") + "\n描述：" + plugin_info.descript + "\n作者：" + plugin_info.author.join(",")
        });
        
        return confirm === 0 ? plugin_info : null;

    }

    install ( plugin_path ){
        const plugin_info = this.preInstall( plugin_path );
        if( Saber.isEmpty(plugin_info) )
            return;
        return new Promise( ( resolve, reject )=>{
            //同意安装
            let copy = spawn('node', [ 
                path.join(Saber.APP_PATH,"./app/common/commands/file/copy.js"), 
                plugin_path,
                path.resolve(Saber.__plugin_path)
            ]);
            copy.stderr.on('data', (data) => {
                console.log(`stderr: ${data}`);
            });
            copy.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
            });
            copy.on('close', (code) => {
                if (code === 0 ){
                    ToolManager.plugins[plugin_info.name] = plugin_info;
                    this.saveConfig().then(()=>{
                        Saber.sendMessage({
                            type: "错误",
                            text: "插件" + plugin_info.name + "安装失败，请重新启动。",
                            reload: true
                        });
                    }, (err) => {
                        Saber.sendMessage({
                            type: "错误",
                            text: "插件" + plugin_info.name + "安装失败，请重新启动。",
                            reload: true
                        });
                    });                    
                    resolve();                  
                }
                else{
                    Saber.sendMessage({
                        type: "错误",
                        text: "插件" + plugin_info.name + "安装失败，请重新启动。",
                        reload: true
                    });
                    reject();
                }
            });            
        });
    }

    preUninstall ( plugin_name ) {
        const plugin_info = ToolManager.plugins[plugin_name];
        if ( Saber.isEmpty(plugin_info) ){
            Saber.sendMessage({
                type: "错误",
                text: "插件卸载失败：并未发现插件"
            });
            return;
        }
        return confirm = dialog.showMessageBox( BrowserWindow.getFocusedWindow(),{
            type: "none",
            buttons: ["卸载","取消"],
            defaultId: 1,
            cancelId: 1,
            title : "确认卸载",
            message : "确定卸载 " + plugin_info.name + "（V" + (plugin_info.version || "1.0.0") + "）吗？",
            detail : "版本：" + (plugin_info.version || "1.0.0") + "\n描述：" + plugin_info.descript + 
                "\n作者：" + ( plugin_info.author&&plugin_info.author.join(",")||"未知" )
        })

    }

    uninstall ( plugin_name ){
        const confirm = this.preUninstall( plugin_name );
        const plugin_info = ToolManager.plugins[plugin_name];
        if ( confirm !== 0 ){
            return;
        }
        return new Promise( ( resolve, reject ) => {
            delete ToolManager.plugins[plugin_name];
            this.saveConfig().then(()=>{
                let remove = spawn('node', [ 
                    path.join(Saber.APP_PATH,"./app/common/commands/file/remove.js"), 
                    path.join(Saber.__plugin_path, "./" + plugin_info.name)
                ]);
                remove.stderr.on('data', (data) => {
                    console.log(`stderr: ${data}`);
                });
                remove.on('close', (code) => {
                    console.log("code : %d",code);
                    if(code === 0 ){                        
                        Saber.sendMessage({
                            type: "信息",
                            text: "插件卸载成功 《" + plugin_info.name + "》",
                            reload: true
                        });
                        Store.emit("closeTool",plugin_info.name);
                        resolve()
                    }
                    else{
                        Saber.sendMessage({
                            type: "错误",
                            text: "插件" + plugin_info.name + "卸载失败，请重新启动。",
                            reload: true
                        });                        
                        reject(code)
                    }
                });
            },(err)=>{
                Saber.sendMessage({
                    type: "错误",
                    text: "插件" + plugin_name + "卸载失败，请重新启动。",
                    reload: true
                });
            });
        });
    }

    search ( keyword ){
        const token = Saber.config.token;

        const HttpsProxyAgent = require('https-proxy-agent');
        const agent = new HttpsProxyAgent("http://dev-proxy.oa.com:8080");

        const query = `
            {
                search(query:"${keyword}",first:20,type:REPOSITORY){
                    repositoryCount
                    edges{
                        cursor
                    }
                    nodes{
                    ...on Repository{
                        id
                        name
                        resourcePath
                        homepageUrl
                        url
                        description
                        createdAt
                        stargazers{
                        totalCount
                        }
                        owner{
                            login
                        }
                    }
                    }
                }
            }
        `;
        
        return Saber.request({
            url: 'https://api.github.com/graphql',
            method: 'POST',
            body: JSON.stringify({query}),
            headers:{'Authorization': `bearer ${token}`},
            dataType: 'json'
        }).then(function(data){
            return data;
        });
    }

    update ( pluginId ){

    }

    check ( pluginId ){

    }

    saveConfig (){
        const fs = node_require('fs');
        return new Promise( ( resolve, reject )=>{
            fs.writeFile(
                path.resolve(Saber.__plugin_path, "./plugin.json"),
                JSON.stringify(ToolManager.plugins,null,4),
                "utf8",(err) =>{
                if(err){
                    reject( err );
                }
                else resolve();              
            });
        });
    }
}