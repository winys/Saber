module.exports =  [
    {
        label: '文件',
        submenu: [
            {
                label: '新建工具',
                click (item, focusedWindow){
                    focusedWindow.send("newtool");
                }
            },
             {
                label: '工具列表',
                click (item, focusedWindow){
                    focusedWindow.send("toollist");
                }
            },
             {
                label: '添加工具',
                click (item, focusedWindow){
                    focusedWindow.send("installtool");
                }
            },
            {
                type:"separator"
            },
            {
                label: "退出",
                role: "quit"
            }
        ]
    },
    {
        label:"界面",
        submenu: [
            {
                label: "重新载入",
                accelerator: 'F5',
                click (item, focusedWindow){
                    focusedWindow.reload();
                }
            },
            {
                type:"separator"
            },
            {
                label: "放大",
                accelerator: 'Ctrl+=',
                click (item, focusedWindow){
                    focusedWindow.send("zoomin");
                }
            },
            {
                label: "还原",
                click (item, focusedWindow){
                    focusedWindow.send("resetzoom");
                }
            },
            {
                label: "缩小",
                accelerator: 'Ctrl+-',
                click (item, focusedWindow){
                    focusedWindow.send("zoomout");
                }
            },
            {
                type:"separator"
            },
            {
                label: '全屏模式',
                accelerator: 'F11',
                role: 'togglefullscreen'
            },
            {
                label: '调试工具',
                accelerator: 'F12',
                click (item, focusedWindow){
                    if (focusedWindow) focusedWindow.webContents.toggleDevTools();
                }
            }
        ]
    },
    {
        label: "帮助",
        submenu: [
            {
                label: "开发文档",
                click(item,focusedWindow){
                
                } 
            }
        ]
    }
];
