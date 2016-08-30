<template>
    <div class="toolbar" v-show="visiable">
        <ul class="toolbar-items">
            <li class="item" v-for="item in items">
                <a class="vlink" v-bind:class="{ 'active': item.active }" @click="changeTool($index)" name="{{item.plugin}}"><img v-bind:src="{{item.icon}}" class="icon" alt="{{item.name}}"></a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data (){
            return Saber.toolbar;
        },
        methods : {
            changeTool ( index ) {
                this.items.forEach( (item,key) => {
                    item.active = false;
                });
                this.items[index].active = true;
                this.$parent.$broadcast('changeTool',this.items[index].name);
            }
        }
    }
</script>

<style>
    .toolbar{
        background: #252526;
        text-align: center;
        width : 50px;
        z-index: 3
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
    }
    .toolbar-items .item .vlink{        
        padding: 20px 0;
        cursor: pointer;
        opacity: .6;
    }
    .toolbar-items .vlink:hover{
        background: #252526;
        opacity: 1;
    }
    .toolbar-items .vlink.active{
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