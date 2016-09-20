<template>
    <div><input type="text" v-model="msg" @blur="cache">{{msg|md5  }}</div>

</template>
<script>
    const path = node_require('path');
    const crypto = node_require('crypto');
    export default {
        data(){
            let data = Saber.store(this.id);
            if(Saber.isEmpty(data)){
                return {
                    msg:""
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
                //alert(path.resolve("./","./ttt"));
            }
        },
        filters:{
          
            md5 (text) {
              return crypto.createHash('md5').update(text).digest('hex');
            }
        }
    }
</script>