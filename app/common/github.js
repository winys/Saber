const {ipcRenderer} = node_require('electron');

export default class Github {
    static token = "b9d52d5c7f675e3862e52c2de8252ebd58cb4167";
    static client_id = "7920276c3e518865c6f1";
    static client_secret= "e496eaa0acb18f5e3e8e71f8be33987c66405304";
    constructor () { 
    }

    login(){
        ipcRenderer.send('loginGithub',{
            client_id: Github.client_id,
            client_secret: Github.client_secret
        });
    }

    serch ( keyword ) {

    }

    getFile () {

    }
}