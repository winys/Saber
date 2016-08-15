export default {
    message ( config, callback ){},

    statusMsg( config, callback) {
        Saber.statusbar.statusMsg = config.statusMsg;
        callback & callback.call(saber,saber.statusbar);
    }
}