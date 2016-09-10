<template>
    <div class="toolbar" v-show="visiable|hasItem">
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
            let items = Saber.store("__toolbar");
            if( Saber.isEmpty(items) ){                
                items = [];
            }
            else{
                Saber.toolbar.items = items;
            }
            for( let item of items ){
                if(item.active){
                    Saber.workink.currentView = item.name;
                    break;
                }
            }
            return Saber.toolbar;
        },
        methods : {
            changeTool ( index, callback ) {
                for (let item of this.items){
                    item.active = false;
                }
                this.items[index].active = true;
                this.$parent.$broadcast('changeTool',this.items[index].name);
                this.$nextTick(function (){
                    callback && callback.call(this);
                })
            }
        },
        events: {
            "newtool" : function (toolid) {
                let temp = this.items;
                let has = -1;
                for (let index in temp){
                    if(temp[index].name === toolid)
                        has =index;
                }
                if( has < 0 ){
                    temp.push( Saber.plugins[toolid] );
                    this.visiable = true;
                    this.changeTool(temp.length-1,function(){                        
                        this.$parent.$broadcast('newpage',toolid);
                    });
                    Saber.store("__toolbar", Saber.toolbar.items);
                }
                else{
                    this.changeTool(has,function(){                        
                        this.$parent.$broadcast('newpage_' + toolid ,toolid);
                    });
                }
            }
        },
        filters:{
            hasItem(){
                return ( Saber.isEmpty(this.items) )
                    ? (this.visiable=false)
                    : this.visiable;
            }
        }
    }
</script>

<style>
    .toolbar{
        background: #333;
        text-align: center;
        width : 50px;
        z-index: 3;
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
        background: #333;
        opacity: 1;
    }
    .toolbar-items .vlink.active{
        background: #333;
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
        -webkit-user-select: none;
    }
</style>