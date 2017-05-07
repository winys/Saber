<template>
    <div class="global-message-list" v-if="visiable" style="top: 0px;">
        <ul class="message-list">
            <li class="message-list-entry" v-for="(item,index) in items">
                <div class="message-action" >
                    <a class="restart btn" v-if="item.restart" tabindex="0" role="button" @click="restart">
                        立即重启
                    </a><a class="action-button btn" tabindex="0" role="button" @click="close(index)">
                        关闭
                    </a>
                 </div><div class="message-left-side">
                     <span class="app-info" v-bind:style="{background: item.bkcolor}">{{item.type}}
                     </span><span class="info-left-side" v-bind="{ title: item.text }">{{item.text}}</span>
                 </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import Saber from "../../common/Saber"
    export default {
        computed: {
            items () { return this.$store.state.Message.items; },
            visiable () { return this.$store.state.Message.visiable; } 
        },
        methods:{            
            close(index){
                this.items.splice(index,1);
            },
            restart(){
                Saber._restart(0, "老子不玩了");
            }
        }
    }
</script>

<style>
   
    .global-message-list {
        background-color: var(--message_bgcolor); 
        box-shadow: 0 2px 8px var(--message_shadow);
        font-size: 12px;
        position: absolute;
        z-index: 2000;
        color: var(--message_fontColor);
        list-style-type: none;
        line-height: 35px;
        margin: 0;
        padding: 0;
        width: 70%;
        left: 15%;
    }
    .global-message-list .message-list {
        margin: 0;
        padding: 0;
        display: block;
        list-style-type: disc;
    }
   .global-message-list .message-list-entry {
        padding-right: 0;
        padding-left: 10px;
        overflow: hidden;
        box-sizing: border-box;
        height: 35px;
        display: list-item;
        text-align: left;
        box-shadow: 0 2px 8px var(--message_shadow);
        display: list-item;
        text-align: -webkit-match-parent;
    }
    .global-message-list .message-action {
        user-select: none;
    }
    .global-message-list .action-button,.restart {
        padding-left: 10px;
        padding-right: 10px;
        display: inline-block;
        text-decoration: none;
        cursor: pointer;
    }
    .global-message-list .message-left-side {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: block;
        user-select: text;
    }
    .global-message-list .app-info {
        background-color: var(--message_info_type);
        padding: 2px 4px;
        margin-right: 10px;
        font-weight: 700;
        font-size: 11px;
        user-select: none;
        color: #FFF;
    }
    .global-message-list .info-left-side {
        user-select: text;
        white-space: nowrap;
    }
    .global-message-list li.message-list-entry .message-action {
        float: right;
    }
</style>
