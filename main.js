const electron = require('electron');
const {ipcMain,ipcRenderer,app,Menu,Tray,BrowserWindow, shell} = electron;
const package = require('./package.json');
const path = require("path");
const Preferences = require('./preferences.json');
let mainWindow,
    tray,
    miniWindow;
    
function createWindow () {
    var backgroundColor = "#FFF";
    if(Preferences.theme ===  "Saber-dark")
        backgroundColor = "#1e1e1e";

    //��ȡ��Ļ�߿�
    const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;
    // ������
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      icon: path.resolve(__dirname, package.icon),
      backgroundColor
    });
    mainWindow.loadURL(`file://${__dirname}/app/main/index.html`);
    mainWindow.on('close',(event) => {
      event.preventDefault();
      mainWindow.hide();
    }).on('show',event=>{
        if(Preferences.mini_enable && Preferences.mini_method === "alternative"){
            event_actions.close_mini_window();
        }
    }).on('hide',event=>{
        if(Preferences.mini_enable && Preferences.mini_method === "alternative"){
            event_actions.show_mini_window();
        }
    })

    const menuArr = require('./config/Menu.js');
    const menu = Menu.buildFromTemplate(menuArr)
    Menu.setApplicationMenu(menu);

    //Mini����
    miniWindow = new BrowserWindow({
        width: 300, 
        height: 50, 
        icon: path.resolve(__dirname, package.icon),
        frame: false,
        resizable : false,
        skipTaskbar : true,
        alwaysOnTop: true,
        transparent:true,
        x: width - 350,
        y: height - 200,
        backgroundColor,
        show: false
    });
    miniWindow.loadURL(`file://${__dirname}/app/mini/index.html`);
    if(Preferences.mini_enable && Preferences.mini_method === "both"){
        miniWindow.show();
    }

}

app.on('ready', function(){
    tray = new Tray(path.resolve( __dirname, package.icon));
    var contextMenu = Menu.buildFromTemplate([
      { label: '�������', click () {
          event_actions.show_main_window();
      }},
      { label: '�л�������' ,click(){
          event_actions.toggle_mini_window();
      }},
      {type:"separator"},
      { label: '�˳�',click(){
          event_actions.app_exit(0);
      } }
    ]);

    tray.setToolTip('Saber');
    tray.setContextMenu(contextMenu);

    createWindow();
})


app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
    else{
        event_actions.show_main_window();
    }
});

const event_actions = {
    app_exit (code) {
        app.exit(parseInt(code)||0);
    },
    relaunch (){
        app.relaunch({args: process.argv.slice(1) + ['--relaunch']});
        app_actions.exit(data);
    },
    //����mini���ڵ����ת����������
    mini_command (sender,data){
        this.show_main_window();
        mainWindow.send("mini_command",data);
    },
    //Ŀ��·����ת
    goToLink (sender,data) {
        shell.openExternal(data.toString());
    },
    //��ʾ������
    show_main_window (){
        mainWindow.show();        
    },
    //�ر�������
    close_main_window (){
        mainWindow.hide();
    },
    toggle_main_window (){
        if(mainWindow.isVisible())
          mainWindow.hide();
        else mainWindow.show();
    },
    //��ʾmini����
    show_mini_window (){
        miniWindow.show();
    },
    //�ر�mini����
    close_mini_window (){
        miniWindow.hide();
    },
    toggle_mini_window (){
        if(miniWindow.isVisible())
          miniWindow.hide();
        else miniWindow.show();
    },
    //�������㴰��
    update_mini_tools (){
        miniWindow.send("update_tools");
    }
}
for (let key in event_actions){
    ipcMain.on( key, event_actions[key].bind(event_actions) );
}


if(package.NODE_ENV === "development"){
    //��־���
    ipcMain.on('log',(sender,data) => {
        console.log(...data);
    });
}