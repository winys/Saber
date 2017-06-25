<template>
    <div class="saber_iconv">
		<section ref="terminal_container" class="terminal-container">
		</section>		
	</div>
</template>

<script>
	const cp = node_require('child_process');
	const xterm = node_require(Saber.__plugin_path + '/TeminalHelper/node_modules/xterm/dist/xterm');
	export default {
		name:"saber_iconv",
		data (){
			return {
				__process : null,
				__xterm : null
			}
		},
		mounted (){
			this._createProcess();
			this._createXterm();
		},
		methods:{
			_createXterm(){
				this._xterm = xterm({
				});
				this._xterm.open( this.$refs.terminal_container );
				this._process.on('message', (message) => this._sendPtyDataToXterm(message));
				this._xterm.on('data', (data) => {
					if (this._process) {
						this._process.send({
							event: 'input',
							data: this._sanitizeInput(data)
						});
					}
					return false;
				});
			},
			_createProcess(){
				this._process = cp.fork('./terminalProcess', [], {
					cwd: Saber.APP_PATH
				});
				this._process.on('message', (message) => {
					if (message.type === 'pid') {
						this._processId = message.content;
						this._onProcessIdReady.fire(this);
					}
				});
				this._process.on('exit', exitCode => this._onPtyProcessExit(exitCode));
			},
			_sendPtyDataToXterm (message) {
				if (message.type === 'data') {
					if (this._xterm) {
						this._xterm.write(message.content);
					}
				}
			},
			_sanitizeInput(data) {
				return typeof data === 'string' ? data.replace(/\r?\n/g, os.EOL) : data;
			},
			_onPtyProcessExit(){
			}
		}
	}
</script>
<style scoped>
	.saber_iconv{
		height: 100%;
		width: 100%;
		position: relative;
		padding: 5px;
	}
</style>