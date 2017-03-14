<template>
      <li>
        <div>
            <span v-if="itemName">
                <span class="itemkey" v-if="itemName"
                >"{{itemName}}"</span>
            :</span>
            <div class="itemvalue object" v-if="type === 'object'" :class="{hover: hover}">
                <span>{</span>
                <ul>
                    <item
                        class="item"
                        v-for="model,name,num in itemObj"
                        :itemObj="Object.freeze(model)"
                        :itemName="name"
                        :isLast="!islast(num)">
                    </item>
                </ul>
                <span>}</span><span class="dot" v-if="isLast">,</span>
            </div>
            
            <div class="itemvalue array" v-else-if="type === 'array'" :class="{hover: hover}"><span>[</span>
                <ul>
                    <item
                        class="item"
                        v-for="model,num in itemObj"
                        :itemObj="Object.freeze(model)"
                        :isLast="!islast(num)">
                    </item>
                </ul>
                <span>]</span><span class="dot" v-if="isLast">,</span>
            </div>

            <span class="itemvalue string" v-else-if="type === 'string'">"{{value}}"<span class="dot" v-if="isLast">,</span>
            </span>            
            <span class="itemvalue number" v-else-if="type === 'number'" >{{value}}<span class="dot" v-if="isLast">,</span>
            </span>
            <span class="itemvalue boolean" v-else-if="type === 'boolean'">{{value}}<span class="dot" v-if="isLast">,</span>
            </span>
        </div>
    </li>
</template>
<script>
    export default {
        name: "item",
        data(){
            return {
                hover:false
            }
        },
        props : ['itemObj','itemName','isLast'],
        mounted(){
            this.$on('sethover',(bool)=>{
                this.hover = bool;
            });
        },
        computed:{
            isFolder (){
                return toString.call(this.itemObj) === "[object Object]"||Array.isArray(this.itemObj);
            },
            value (){
                switch( toString.call(this.itemObj) ){
                    case "[object Number]":
                }
                return this.itemObj.valueOf();
            },
            type(){
                return this.type = toString.call(this.itemObj).match(/(\w*)]$/)[1].toLowerCase();
            }
        },
        methods:{            
            islast( num ){
                if(this.type === 'array'){
                    return num === this.itemObj.length-1;
                }
                else if(this.type === "object"){
                    let i=0;
                    for(let key in this.itemObj){
                        i++;
                    }
                    return num === i-1;
                }
                return false;
            },
            toggle(){
            }
        }
    }
</script>

<style scoped>
    .item{
        font-family: Menlo, Consolas, monospace;
        cursor: pointer;
    }
    .itemkey{
        display: inline-block;
        color: rgba(156, 220, 254, 1);
    }
    ul {
        padding-left: 2em;
        line-height: 1.5em;
        list-style-type: none;
        vertical-align: top;

    }
    .itemvalue.object{
        display: block;
    }
    .itemvalue.array{
        display: block;
    }
    .itemvalue.number {
        color: rgba(181, 206, 168, 1);
    }
    .itemvalue.string {
        color: rgba(206, 145, 120, 1);
    }
    .itemvalue.boolean {
        color: rgba(86, 156, 214, 1);
    }
    .hover{
            background: #3c3c3c;
    }
    .dot{
        color: #ccc;
    }
</style>