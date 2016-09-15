<template>
    <div><input type="text" v-model="msg" @blur="cache">{{msg}}</div>    
</template>
<script>
    export default {
        data(){
            let data = Saber.store(this.id);
            if(Saber.isEmpty(data)){
                return {
                    msg:"ttt"
                }
            }
            return data;
        },
        props:["id"],
        methods:{
            cache(){
                Saber.store(this.id,{
                    msg:this.msg
                })
            }
        }
    }
</script>