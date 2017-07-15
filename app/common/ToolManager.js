const path = node_require('path');
const fsExtra = require('fs-extra');
const {dialog, BrowserWindow} = node_require('electron').remote;
const spawn = node_require('child_process').spawn;
const GitRepoReg = /^https:\/\/github.com\/[\s\S]+$/;

export default class ToolManager {
    static plugins = require ('../../plugins/plugin.json');
    
    constructor () {
    }

    async preInstall ( plugin_path ) {

        if( GitRepoReg.test(plugin_path) ){
            
            const git = node_require(path.join(Saber.APP_PATH,"./app/common/commands/git/git.js"));
            
            let tmppath = './tmp/' + Saber.guid();

            await git.clone( plugin_path, path.join(Saber.APP_PATH,`${tmppath}`), 'release' )
            
            return await this.preInstall( path.join(Saber.APP_PATH,`${tmppath}`) );
        }
        else {
            const plugin_info_path = path.resolve(plugin_path,"./saber.json");
            const plugin_info = node_require( plugin_info_path );
            if ( !Saber._checkPlugin(plugin_info_path) ){
                Saber.sendMessage({
                    type: "错误",
                    text: "插件安装失败：并未发现插件"
                });
                return;
            }
            else {
                plugin_info.temp_path = plugin_path;
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
        }

    }

    async install ( tool ){
        const plugin_path = tool.url;        
        
        Saber.statusMsg("正在检查插件" + tool.name +"...");
        
        const plugin_info = await this.preInstall( plugin_path );
        
        if( Saber.isEmpty(plugin_info) ){
            Saber.statusReset(); 
            return;
        }

        Saber.statusMsg("正在安装插件" + tool.name +"...");

        const dest_path = path.resolve( Saber.__plugin_path, plugin_info.name );
        let copyRes = await this.copyDir(plugin_info.temp_path, dest_path);
        
        if( Saber.isError(copyRes) ){
            Saber.sendMessage({
                type: "错误",
                text: "插件" + plugin_info.name + "安装失败，请重新启动。",
                reload: true
            });
            Saber.statusReset();
            return;
        }

        delete plugin_info.temp_path;
        plugin_info.url = tool.url;

        ToolManager.plugins[plugin_info.name] = plugin_info;
        let res = await this.saveConfig()
        if( Saber.isError(res) ){
            Saber.sendMessage({
                type: "错误",
                text: "插件" + plugin_info.name + "安装失败，请重新启动。",
                reload: true
            });
        }
        else{
            Saber.sendMessage({
                type: "信息",
                text: "插件" + plugin_info.name + "安装成功，请重新启动。",
                reload: true
            });
            Saber.statusReset();
        }
        Saber.statusReset();
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

    async uninstall ( plugin_name ){
        Saber.statusMsg("正在检查插件" + plugin_name +"...");

        const confirm = this.preUninstall( plugin_name );

        const plugin_info = ToolManager.plugins[plugin_name];
        if ( confirm !== 0 ){
            Saber.statusReset();
            return;
        }
        delete ToolManager.plugins[plugin_name];
        const res = await this.saveConfig();
        if( Saber.isError(res) ){
            Saber.sendMessage({
                type: "错误",
                text: "插件" + plugin_name + "卸载失败，请重新启动。",
                reload: true
            });
            Saber.statusReset();
            return;
        }
        const removeRes = await this.removeDir( path.join(Saber.__plugin_path, "./" + plugin_info.name ) );
        if( removeRes ){
            Saber.sendMessage({
                type: "错误",
                text: "插件" + plugin_info.name + "卸载失败，请重新启动。",
                reload: true
            });                        
            reject(err);
            return;
        }
        Saber.sendMessage({
            type: "信息",
            text: "插件卸载成功 《" + plugin_info.name + "》",
            reload: true
        });
        Store.emit("closeTool",plugin_info.name);
        resolve();
    }

    async search ( keyword ){
        const token = Saber.config.token;

        const HttpsProxyAgent = require('https-proxy-agent');
        const agent = new HttpsProxyAgent("http://dev-proxy.oa.com:8080");

        const query = `
            {
                search(query:"Live with a palette called saber ${keyword}",first:20,type:REPOSITORY){
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
        
        const data = await Saber.request({
            url: 'https://api.github.com/graphql',
            method: 'POST',
            body: JSON.stringify({query}),
            headers:{'Authorization': `bearer ${token}`},
            dataType: 'json'
        });
        return data;
    }

    preUpdate( plugin_name ){

    }
    
    async update ( plugin_name ){
        const pluginInfo = ToolManager.plugins[plugin_name];
        const canUpdate = await this.preUpdate( plugin_name );

        if( canUpdate ){    
            await this.uninstall( plugin_name , true );
            await this.install( pluginInfo.url, true );
        }
    }

    hasPlugin ( plugin_name ){
        return plugin_name in ToolManager.plugins;
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

    copyDir ( src, dest ){
        return new  Promise( (resolve, reject) => {
            fsExtra.copy(src, dest, (err) =>{
                resolve(err);
            });
        });
    }

    removeDir ( target ){
        return new  Promise( (resolve, reject) => {
            fsExtra.remove( target, (err) =>{
                resolve(err);
            });
        });

    }
}