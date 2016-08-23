<template>
    <div class="global-message-list" v-if="visiable" style="top: 0px;">
        <ul class="message-list">
            <li class="message-list-entry" v-for="item in items">
                <div class="message-action" >
                    <a class="restart" v-if="item.restart" tabindex="0" role="button" @click="restart">
                        立即重启
                    </a><a class="action-button" tabindex="0" role="button" @click="close">
                        关闭
                    </a>
                 </div><div class="message-left-side">
                     <span class="app-info" v-bind:style="{background: item.bkcolor}">{{item.type}}
                     </span><span class="info-left-side" v-bind="{ title: item.text }">{{item.text}}</span>
                 </div>
            </li>
        </ul>
    </div>
    <div>
        <button @click="sendInfo">信息</button><br/>
        <button @click="sendWarn">警告</button><br/>
        <button @click="sendErro">错误</button><br/>
    </div>   
</template>

<script>
    export default {
        methods:{
            sendInfo(){
                Saber.sendMessage({
                    type: "信息",
                    text: "You are SaBer.",
                    restart: true
                });
            },
            sendWarn(){
                Saber.sendMessage({
                    type: "警告",
                    text: "Repeat.You are SaBer.",
                    restart: false
                });
            },
            sendErro(){
                Saber.sendMessage({
                    type: "错误",
                    text: "Damn.You are SaBer.Bitch!",
                    restart: false
                });
            },
            close(){
                Saber.closeMessage({
                    num: this.index
                });
            },
            restart(){
                Saber._restart(0, "老子不玩了");
            }
        },
        data (){
           return Saber.message;
        }
    }
</script>

<style>
   
    .global-message-list {
        background-color: #333;
        box-shadow: 0 2px 8px #000;
        font-size: 12px;
        position: absolute;
        z-index: 2000;
        color: #eee;
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
        box-shadow: 0 2px 8px #000;
        display: list-item;
        text-align: -webkit-match-parent;
    }
    .global-message-list .message-action {
        -webkit-user-select: none;
    }
    .global-message-list .action-button,.restart {
        background-color: #0e639c;
        padding-left: 10px;
        padding-right: 10px;
        display: inline-block;
        color: inherit;
        text-decoration: none;
        cursor: pointer;
    }
    .global-message-list .message-left-side {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: block;
        -webkit-user-select: text;
    }
    .global-message-list .app-info {
        background-color: #007acc;
        padding: 2px 4px;
        margin-right: 10px;
        font-weight: 700;
        font-size: 11px;
        -webkit-user-select: none;
    }
    .global-message-list .info-left-side {
        -webkit-user-select: text;
        white-space: nowrap;
    }
    .global-message-list li.message-list-entry .message-action {
        float: right;
    }
    .global-message-list .info-left-side::selection {
        background: #007acc;
    }    
</style>