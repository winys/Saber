<template>
    <div class="Hotkey">
        <dl class="card">
            <dt class="category">
                <span>全局热键</span>
                <span class="addbtn"><i class="fa fa-plus" aria-hidden="true"></i></span>
            </dt>
            <dd class="item">
                <span class="tip">
                    该部分热键在Saber不具有焦点时也可以使用。最多设置5个。
                </span>
                <ul class="global_hotkeys">
                    <li class="hotkey_item" v-for="item,key in global_hotkeys">
                        <span class="key">{{key}}</span>
                        <span class="function">{{item}}</span>
                        <span class="delete" @click="removeGkey(key)"><i class="fa fa-trash-o" aria-hidden="true"></i></span>
                    </li>
                </ul>
            </dd>
        </dl>
        <dl class="card">
            <dt class="category">                
                <span>Saber热键</span>
                <span class="addbtn"><i class="fa fa-plus" aria-hidden="true"></i></span>
            </dt>
            <dd class="item">
                <span class="tip">
                    该部分热键只能在Saber具有焦点时使用。
                </span>
            </dd>
        </dl>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                global_hotkeys: {
                    "ctrl + k": "Saber_http",
                    "ctrl + a": "Saber_http",
                    "ctrl + v": "Saber_http",
                    "ctrl + d": "Saber_http",
                    "ctrl + c": "Saber_http"
                },
                local_hotkeys: {
                    "Alt + k": "Saber_iconv"
                }
            }
        },
        methods:{
            removeGkey (gkey){
                this.$delete(this.global_hotkeys,gkey);
            }
        }
    }
</script>
<style scoped>
    .Hotkey .card{
        padding: 5px 3px 10px;
        border-radius: 1px;
        box-shadow: -1px 1px 7px -1px var(--prefereces_card_shadow);
    }
    .Hotkey .category{
        padding: 10px;
        font-weight: 600;
        background: var(--prefereces_card_category);
        font-size: 12px;
    }
    .Hotkey .item{
        margin: 0;
        padding: 10px;
        font-size: 12px;
    }
    .Hotkey .tip{
        border-left: 1px solid #007acc;
        padding: 5px;
        background-color: rgba(0, 122, 204, .1);
        display: block;
    }
    .Hotkey .addbtn{
        float: right;
        cursor: pointer;
        height: 100%;
        width: 20px;
        text-align: right;
    }
    .Hotkey .hotkey_item{
        height: 30px;
        line-height: 30px;
        list-style: none;
        display: flex;
        justify-content: space-around;
        align-items: stretch;
        border-bottom: 1px solid var(--hotkey_item_border);
        cursor: pointer;
    }
    .hotkey_item .key{
        display: block;
        flex: 1;
    }
    .hotkey_item .function{
        display: block;
        flex: 1;
    }
    .hotkey_item .delete{
        color: transparent;
        display: inline-block;
        width: 30px;
        text-align: center;
    }
    .hotkey_item:hover .delete{
        color: inherit;
    }
</style>