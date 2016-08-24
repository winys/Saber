<template>
    <div class="toolbar" v-show="visiable">
        <ul class="toolbar-items">
            <li class="item" v-bind:class="{ 'active': item.active }" v-for="item in items"><a><img src="{{item.icon}}" class="icon" alt="{{item.name}}"></a></li>
        </ul>
    </div>
</template>

<script>
    export default {
        data (){
            return Saber.toolbar;
        }
    }
</script>

<style>
    .toolbar{
        background: #252526;
        text-align: left;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
    }
    .toolbar-items{
        margin: 0 auto;
        padding: 0;
        width: 100%;
        flex-direction: column;
        justify-content: flex-end;
    }
    .toolbar-items .item{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 0;
        cursor: pointer;
        opacity: .6;
    }
    .toolbar-items .item:hover{
        background: #252526;
        opacity: 1;
    }
    .toolbar-items .item.active{
        background: #252526;
        opacity: 1;
    }
    .toolbar-items .item a{
        display: flex;
        overflow: hidden;
        margin-right: 0;
        padding: 0 20px;
        box-sizing: border-box;
        font-size: 15px;
        color: #fff;
        text-shadow: 0 1px 0 rgba(0,0,0,.8);
    }
    .toolbar-items .item .icon{
        width: 25px;
        height : 25px;
    }
</style>