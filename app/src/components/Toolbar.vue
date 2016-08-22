<template>
    <div class="toolbar" v-show="visiable">
        <ul class="toolbar-items">
            <li class="item" v-for="item in items"><a><img src="{{item.icon}}" class="icon" alt="{{item.name}}"></a></li>
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
        display:inline-block;
        margin: 0 auto;
        padding: 0;
        width: 100%;
        justify-content: flex-end;
    }
    .toolbar-items .item{
        display: block;
        position: relative;
        margin: 10px 0;
    }

    .toolbar-items .item a{
        display: flex;
        overflow: hidden;
        height: 40px;
        line-height: 40px;
        margin-right: 0;
        padding: 0 20px;
        box-sizing: border-box;
        background-position: 9px;
        background-repeat: no-repeat;
        opacity: .6;
        font-size: 15px;
        color: #fff;
        text-shadow: 0 1px 0 rgba(0,0,0,.8);
    }
    .toolbar-items .item .icon{
        width: 25px;
        height : 25px;
    }
</style>