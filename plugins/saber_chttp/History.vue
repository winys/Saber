<template>
    <div class="history_queue hover_scroll">
        <label for="">历史纪录</label>
        <ul>
            <li :class="'item _'+(item.status||'').toString().charAt(0)+'00'" @click="replay(index)" @contextmenu="contextmenu(index)" v-for="item,index in history_queue">
                <span class="host">{{urlobj(item.url).host||"Undefined"}}</span>
                <span class="status"><span :class="'method method_'+item.method.toLowerCase()">{{item.method.toUpperCase()}}</span>{{item.status}}</span>
                <span class="url">{{item.url}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
    const remote = node_require('electron').remote;
    const {Menu, MenuItem} = remote;
    export default {
        data () {
            let data = Saber.store("saber_http");
            if(Saber.isEmpty(data)){
                return {
                    history_queue : []
                }
            }
            return data;
        },
		mounted(){
			//添加到历史记录
			this.$parent.eventhub.$on("Add2history",this.add2history);
		},
		methods:{
			add2history( frame ){
                let length = this.history_queue.unshift( frame );
                //最多保存20条
                this.history_queue.splice(20,length - 20);
                Saber.store("saber_http",this.$data);

			},
            urlobj( url ){
                return node_require('url').parse(url);
            },
            contextmenu( index ){
                const menu = new Menu();
                let event = window.event;
                let self = this;
                menu.append(new MenuItem({
                    label: '移除', click(){
						self.history_queue.splice(index,1);
                        self.$parent.eventhub.$emit("replay",this.history_queue[index]);
                    }
                }));

                menu.popup(remote.getCurrentWindow());
                event.preventDefault();
                event.stopPropagation();
            },
            replay( index ){
                this.$parent.eventhub.$emit("replay",this.history_queue[index]);
            }
		}
	}
    
</script>

<style scoped>
    .history_queue{
        height: 100%;
        width: 100%;
        overflow: auto;
        padding: 10px 5px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .history_queue label{
        color: #007acc;
        display: inline-block;
        padding: 5px 0;
        margin-top: 10px;
    }
    .history_queue ul{
        flex: 1;
        overflow: auto;
    }
    .item{
        border-left: 2px solid #3c3c3c;
        background: rgba(60, 60, 60, .05);
        display: block;
        text-overflow: ellipsis;
        padding: 5px;
        margin-bottom: 4px;
        cursor: pointer
    }
    .item._200{
        border-left: 2px solid green;
        background: rgba(0, 255, 0, .05)
    }
    .item._400{
        border-left: 2px solid #007acc;
        background: rgba(0, 122, 204, .05)
    }
    .item._500{
        border-left: 2px solid red;
        background: rgba(255, 0, 0, .05)
    }
    .item._300{
        border-left: 2px solid purple;
        background: rgba(128, 0, 128, .05)
    }

    .item span{
        display: block;
        font-size: 13px;
    }
    .item .host{
        color: #007acc;        
        height: 20px;
        font-weight: 700;
        line-height: 20px;
        text-overflow: ellipsis;
        width: 100%;
        overflow: hidden;
    }
    .item .status,.item .url{
        color: #a9a9a9;
        height: 20px;
        line-height: 20px;
        text-overflow: ellipsis;
        width: 100%;
        overflow: hidden;
    }    
    .item .method{
        background: #3c3c3c;
        display: inline-block;
        margin-right: 5px;
        height: 19px;
        line-height: 14px;
        font-size: 12px;
        padding: 3px 5px;
        box-sizing: border-box;
        color: #FFF;
        border-radius: 2px;
    }
    .item .method_get{
        background: green;
    }
    .item .method_post{
        background: #007acc;
    }
</style>