<template>
    <div class="toolbar" v-show="visiable|hasItem">
        <ul class="toolbar-items">
            <li class="item" v-for="item in items">
                <a class="vlink" v-bind:class="{ 'active': $index===active }" @click="changeTool($index)" name="{{item.plugin}}"><img v-bind:src="item.icon" class="icon" alt="{{item.name}}"></a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data (){
            let toolbar_data = Saber.store("__toolbar");
            if( Saber.isEmpty(toolbar_data) ){                
                return Saber.toolbar;
            }
            else{
                Saber.toolbar = toolbar_data;
            }
            Saber.workink.currentView = toolbar_data.items[toolbar_data.active].name;
            Saber.toolbar.active = toolbar_data.active;
            return Saber.toolbar;
        },
        methods : {
            changeTool ( index, callback ) {
                let items = this.items;
                this.$set("active",parseInt(index));
                this.$parent.$broadcast('changeTool',this.items[index].name);
                this.$nextTick(function (){
                    callback && callback.call(this);                    
                    Saber.store("__toolbar", Saber.toolbar);
                });
            },
            closeTool ( name ){                
                let items = this.items;
                for (let index in items){
                    if (items[index].name === name){
                        items.splice(index,1);
                        this.changeTool((index+1)%this.items.length);
                        break;
                    }
                }
                Saber.store("__toolbar", Saber.toolbar);
            }
        },
        events: {
            "newtool" : function (toolid) {
                let temp = this.items;
                let has = -1;
                for (let index in temp){
                    if(temp[index].name === toolid){
                        has = index;
                        break;
                    }
                }
                if( has < 0 ){
                    let newitem = Saber.plugins[toolid];
                    temp.$set( temp.length, newitem );
                    this.visiable = true;
                    this.changeTool(temp.length-1,function(){
                        this.$parent.$broadcast('newpage_' + toolid ,toolid);
                    });
                }
                else{
                    this.changeTool(has,function(){
                        this.$parent.$broadcast('newpage_' + toolid ,toolid);
                    });
                }
            },
            "closetool" (name){
                this.closeTool(name);
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