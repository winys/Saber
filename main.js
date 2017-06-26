const electron = require('electron');
const { ipcMain, app, Menu, Tray, BrowserWindow, shell } = electron;
const package = require('./package.json');
const path = require("path");
const Preferences = require('./preferences.json');
let mainWindow,
    tray,
    miniWindow;

function createWindow() {
    var backgroundColor = "#FFF";
    if (Preferences.theme === "Saber-dark")
        backgroundColor = "#1e1e1e";

    //获取屏幕高宽
    const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
    // 主窗口
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.resolve(__dirname, package.icon),
        backgroundColor
    });
    mainWindow.loadURL(`file://${__dirname}/app/main/index.html`);
    mainWindow.on('close', (event) => {
        event.preventDefault();
        mainWindow.hide();
    }).on('show', event => {
        if (Preferences.mini_enable && Preferences.mini_method === "alternative") {
            event_actions.close_mini_window();
        }
    }).on('hide', event => {
        if (Preferences.mini_enable && Preferences.mini_method === "alternative") {
            event_actions.show_mini_window();
        }
    })

    const menuArr = require('./config/Menu.js');
    const menu = Menu.buildFromTemplate(menuArr)
    Menu.setApplicationMenu(menu);

    //Mini窗口
    miniWindow = new BrowserWindow({
        width: 300,
        height: 50,
        icon: path.resolve(__dirname, package.icon),
        frame: false,
        resizable: false,
        skipTaskbar: true,
        alwaysOnTop: true,
        transparent: true,
        x: width - 350,
        y: height - 200,
        backgroundColor,
        show: false
    });
    miniWindow.loadURL(`file://${__dirname}/app/mini/index.html`);
    if (Preferences.mini_enable && Preferences.mini_method === "both") {
        miniWindow.show();
    }

}

app.on('ready', function () {
    tray = new Tray(path.resolve(__dirname, package.icon));
    var contextMenu = Menu.buildFromTemplate([
        {
            label: '打开主面板', click() {
                event_actions.show_main_window();
            }
        },
        {
            label: '切换悬浮框', click() {
                event_actions.toggle_mini_window();
            }
        },
        { type: "separator" },
        {
            label: '退出', click() {
                event_actions.app_exit(0);
            }
        }
    ]);

    tray.setToolTip('Saber');
    tray.setContextMenu(contextMenu);

    createWindow();
})


app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
    else {
        event_actions.show_main_window();
    }
});

const event_actions = {
    app_exit(code) {
        app.exit(parseInt(code) || 0);
    },
    relaunch() {
        app.relaunch({ args: process.argv.slice(1) + ['--relaunch'] });
        app_actions.exit(data);
    },
    //来自mini窗口的命令，转发到主窗口
    mini_command(sender, data) {
        this.show_main_window();
        mainWindow.send("mini_command", data);
    },
    //目标路径跳转
    goToLink(sender, data) {
        shell.openExternal(data.toString());
    },
    //显示主窗口
    show_main_window() {
        mainWindow.show();
    },
    //关闭主窗口
    close_main_window() {
        mainWindow.hide();
    },
    toggle_main_window() {
        if (mainWindow.isVisible())
            mainWindow.hide();
        else mainWindow.show();
    },
    //显示mini窗口
    show_mini_window() {
        miniWindow.show();
    },
    //关闭mini窗口
    close_mini_window() {
        miniWindow.hide();
    },
    toggle_mini_window() {
        if (miniWindow.isVisible())
            miniWindow.hide();
        else miniWindow.show();
    },
    //更新迷你窗口
    update_mini_tools() {
        miniWindow.send("update_tools");
    },
    loginGithub(sender, appinfo) {
        var options = {
            client_id: appinfo.client_id,
            client_secret: appinfo.client_secret,
            scopes: ["user:email", "notifications"] // Scopes limit access for OAuth tokens.
        };

        var authWindow = new BrowserWindow({ width: 800, height: 600, show: false, 'node-integration': false });
        var githubUrl = 'https://github.com/login/oauth/authorize?';
        var authUrl = githubUrl + 'client_id=' + options.client_id + '&scope=' + options.scopes;
        authWindow.loadURL(authUrl);
        authWindow.show();

        function handleCallback(url) {
            var raw_code = /code=([^&]*)/.exec(url) || null;
            var code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
            var error = /\?error=(.+)$/.exec(url);

            if (code || error) {
                // Close the browser if code found or error
                authWindow.destroy();
            }

            // If there is a code, proceed to get token from github
            if (code) {
                requestGithubToken(options, code);
            } else if (error) {
                alert('Oops! Something went wrong and we couldn\'t' +
                    'log you in using Github. Please try again.');
            }
        }

        function requestGithubToken(options, code) {

            apiRequests
                .post('https://github.com/login/oauth/access_token', {
                    client_id: options.client_id,
                    client_secret: options.client_secret,
                    code: code,
                })
                .end(function (err, response) {
                    if (response && response.ok) {
                        // Success - Received Token.
                        // Store it in localStorage maybe?
                        window.localStorage.setItem('githubtoken', response.body.access_token);
                    } else {
                        // Error - Show messages.
                        console.log(err);
                    }
                });

        }

        // Handle the response from GitHub - See Update from 4/12/2015

        authWindow.webContents.on('will-navigate', function (event, url) {
            handleCallback(url);
        });

        authWindow.webContents.on('did-get-redirect-request', function (event, oldUrl, newUrl) {
            handleCallback(newUrl);
        });

        // Reset the authWindow on close
        authWindow.on('close', function () {
            authWindow = null;
        }, false);
    },

    request(sender, req) {
        const url = require('url');
        const HttpsProxyAgent = require('https-proxy-agent');
        const fetch = require('node-fetch');

        var proxy = process.env.http_proxy || 'http://dev-proxy.oa.com:8080';

        const agent = new HttpsProxyAgent(proxy);

        fetch(req.url, {
            method: req.method,
            body: req.body,
            headers: req.headers,
            agent
        }).then(function (res) {
            return res[req.dataType.toLowerCase()]();
        }).then(function ( data ) {
            sender.sender.send('request_callback',data);
        }).catch(function(err){ 
            sender.sender.send('request_callback',err);
        });
    }
}
for (let key in event_actions) {
    ipcMain.on(key, event_actions[key].bind(event_actions));
}


if (package.NODE_ENV === "development") {
    //日志输出
    ipcMain.on('log', (sender, data) => {
        console.log(...data);
    });
}