<template>
    <div class="http_parser">
		<label for="parser">结果解析</label>
		<section id="parser">
			<div class="status">
				<span>响应状态：{{status}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>传输字节：{{bytes}}Bytes</span>
			</div>
			
			<label>响应头部</label>
			<div class="res_header">
        		<textarea name="http_header" id="" cols="30" rows="10" v-model="headers"></textarea>
			</div>
			
			<label>响应内容</label>
			<div class="res_content" :class="{fullscreen: fullscreen}"  @click="jsonactive($event)" @contextmenu="contextmenu">
        		<!--<textarea name="http_header" id="" cols="30" rows="10" v-model="content"></textarea>-->
				<json-viewer class="json-view" v-if="data" :itemObj="data"></json-view>
			</div>
		</section>
    </div>
</template>
<script>
	import jsonViewer from "./JsonViewer.vue"
	
    const remote = node_require('electron').remote;
    const {Menu, MenuItem} = remote;
	const {clipboard} = node_require('electron');

    export default {
		data () {
			return{
				header:{},
				data: "",
				status:"",
				bytes:0,
				activeItem:null,
				fullscreen:false
			}
		},
		components:{
			jsonViewer
		},
		computed : {			
			headers(){
				let headers = "";
				for (let key in this.header){
					headers += key+" : "+this.header[key]+"\n";
				}
				return headers;
			}
		},
		created () {
			//解析http报文
			this.$parent.eventhub.$on("ParseHttp", this.parseHttp)
		},
		methods:{
			jsonactive(event){		
				event.stopPropagation();
				this.activeItem && this.activeItem.$emit("sethover",false);
				let pli = event.target.closest("li");
				let vue_pli = pli&&pli.__vue__;
				if(!vue_pli) return;

				for(;vue_pli.type !== 'object'&& vue_pli.type !== 'array';){
					pli = pli.parentElement.closest("li");
					vue_pli = pli&&pli.__vue__;
					if(!vue_pli) return;
				}
				this.activeItem = vue_pli;
				vue_pli.$emit("sethover",true);
			},
			parseHttp(res){
				let res_data = ""
				this.status = res.statusCode;
				this.bytes = res.socket.bytesRead;
				this.header = res.headers;
				res.on('data', (chunk) => {
					res_data += chunk;
				});
				res.on('end', () => {
					try{
						this.data = Object.freeze(JSON.parse(res_data));
					}
					catch(e){
						this.data = Object.freeze(res_data);
					}
				});   
            },
            contextmenu( index ){
                const menu = new Menu();
                let event = window.event;
                let self = this;
                let items = this.items;
                menu.append(new MenuItem({
                    label: '复制', click(){
						let t = JSON.stringify(self.data,null,4);
						clipboard.writeText(t.toString());
                    }
                }));
                menu.append(new MenuItem({
                     label: '全屏', click() {
                        self.fullscreen = true;
                    }
                }));
				menu.append(new MenuItem({
                     label: '还原', click() {
                        self.fullscreen = false;
                    }
                }));
                
                menu.popup(remote.getCurrentWindow());
                event.preventDefault();
                event.stopPropagation();
            }
		}
	}
</script>
<style scoped>
.http_parser{
	height: 100%;
	padding: 10px 5px;
}
.http_parser label{
	color: #007acc;
	display: inline-block;
	padding: 5px 0;
	margin-top: 10px;
}
.http_parser .status{
	padding-left: 20px;
}
.http_parser textarea{
	width: 100%;
	height: 100%;
	line-height: 18px;
	box-sizing: border-box;
	padding: 4px;
	border: 1px solid transparent;
	-webkit-appearance: textfield;
	background-color: #252526;
	color:#ccc;
}
.http_parser textarea:focus{
	outline-offset: -1px;
	outline:1px solid rgba(14,99,156,.6);
}
#parser{
	height: calc(100% - 74px);
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
.res_header{
	flex:1
}

.res_content{
	flex:2;
	width: 100%;
	overflow-x: hidden; 
	overflow-y: auto;
}
.res_content .json-view{
	list-style: none;
}
.fullscreen{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background: #1e1e1e;
}
</style>