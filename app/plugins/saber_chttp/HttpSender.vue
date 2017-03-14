<template>
    <div class="http_sender">        
        <section >
            <label>控制台</label>
            <div class="console_wrapper" >
                <div class="select_wrapper method">
                    <select title="请求方法" v-model="method">
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="DELETE">DELETE</option>
                        <option value="UPDATE">PUT</option>
                    </select>
                </div>
                <div class="select_wrapper encode">
                    <select title="回执编码" v-model="encode">
                        <option value="utf8">UTF-8</option>
                        <option value="gbk">GBK</option>
                    </select>
                </div>
                <div class="clear" @click="clear">
                    <i title="清空表单" class="fa fa-trash-o" aria-hidden="true"></i>                   
                </div>
                <div class="sendbtn">
                    <i @click="send" title="发送" class="fa fa-paper-plane-o" aria-hidden="true"></i>
                </div>
                
            </div>

            <label>请求地址</label>
            <div class="url_wrapper" :class="{url_wrapper_focus:url_focus}">
                <input @focus="onurlfocus" placeholder="例如： http://example.com" @blur="onurlblur" v-on:keyup.enter="send" type="text" v-model="url">
            </div>
        </section>
        <section>
            <label>请求头部</label>
            <div>
                <textarea v-model="header" placeholder="key:value的格式,一行一条。"></textarea>
            </div>
        </section>
        <section>
            <label>Cookies</label>
            <div>
                <textarea v-model="Cookies" placeholder="cookie的格式：key=value;key2=value2;key3=value3"></textarea>
            </div>
        </section>
        <section>
            <label>报文内容</label>
            <div>
                <textarea name="http_data" v-model="content" placeholder="参数例：a=b&c=d&f=e,get和head方式除外"></textarea>
            </div>
        </section>
        
    </div>
</template>
<script>
    export default{
        data () {
            return{
                method:"GET",
                url:"",
                header:"",
                content:"",
                url_focus:false,
                encode:"utf8",
                Cookies:""
            }
        },
        mounted (){
            this.$parent.eventhub.$on('replay',this.replay);
        },
        methods:{
            onurlfocus(){this.url_focus = true;},
            onurlblur(){this.url_focus = false;},
            send(){
                let urlobj = node_require('url').parse(this.url);
                let querystring  = node_require('querystring'),
                    http = node_require(urlobj.protocol&&urlobj.protocol.substring(0,urlobj.protocol.length-1)||'http');
                let headers = {}
                this.header.trim().split("\n").forEach((item) => {
                    let itemobj = item.split(/\s*:\s*/);
                    if(itemobj.length>1)
                        headers[itemobj[0]] = itemobj[1];
                });
                
                if(this.Cookies){
                    headers.Cookie = this.Cookies;
                }
                
                let options = {
                    hostname: urlobj.hostname,
                    port: urlobj.port||(urlobj.protocol&&urlobj.protocol.substring(0,urlobj.protocol.length-1) === 'http' ?80:443),
                    path: urlobj.path,
                    method: this.method,
                    headers
                };
                let req = http.request(options, (res) => {
                    res.setEncoding(this.encode);
                    this.$parent.eventhub.$emit("Add2history",{
                        method:this.method,
                        url: this.url,
                        header: this.header,
                        encode: this.encode,
                        Cookies: this.Cookies,
                        content: this.content,
                        status: res.statusCode
                    })
                    this.$parent.eventhub.$emit("ParseHttp",res);
                });

                req.on('error', (e) => {
                    console.log(`problem with request: ${e.message}`);
                });

                // write data to request body
                req.write(this.content);
                req.end();
            },
            replay( frame ){
                //delete frame.status;
                for(let key in frame){
                    if(key === 'status') continue;
                    this[key] = frame[key];
                }
            },
            clear(){
                this.method = "GET";
                this.url="";
                this.header="";
                this.content="";
                this.url_focus=false;
                this.encode="utf8";
                this.Cookies="";
            }

        }
    }
</script>

<style scoped>
    .http_sender{
        height: 100%;
        padding:10px 5px;
    }
    .http_sender label{
        color: #007acc;
        display: inline-block;
        padding: 5px 0;
        margin-top: 10px;
    }
    .console_wrapper{
        color: #ccc;
        display: flex;
        justify-content: space-around; 
    }
    .console_wrapper select{
        width: 100%;
        height: 28px;
        line-height: 18px;
        box-sizing: border-box;
        padding: 4px;
        border: 1px solid transparent;
        background-color: #252526;
        color:#ccc;
    }
    .console_wrapper .method{
        flex: 1;
    }
    .console_wrapper .encode{
        flex: 1;
    }
    .console_wrapper .clear{
        width: 28px;
        background-color: #252526;
        color: #FFF;
        width: 30px;
        height: 30px;
        vertical-align: top;
        line-height: 28px;
        text-align: center;
        cursor: pointer;
        border: 1px solid #3c3c3c;
    }
    .console_wrapper .sendbtn{
        width: 28px;
        background-color: #252526;
        color: #FFF;
        width: 30px;
        height: 30px;
        vertical-align: top;
        line-height: 28px;
        text-align: center;
        cursor: pointer;
        border: 1px solid #3c3c3c;
    }
    .select_wrapper{
        border: 1px solid #3c3c3c;
        width: 100%;
    }
    .console_wrapper select:focus {
        outline-offset: -1px;
        outline: 1px solid rgba(14,99,156,.6);
    }
    .url_wrapper{
        border: 1px solid #3c3c3c;
    }
    .url_wrapper input{
        width: 100%;
        height: 28px;
        line-height: 18px;
        box-sizing: border-box;
        padding: 4px;
        border: 1px solid transparent;
        -webkit-appearance: textfield;
        background-color: #252526;
        color:#ccc;
    }
    .url_wrapper_focus{
        outline-offset: -1px;
        outline:1px solid rgba(14,99,156,.6);
    }
    .url_wrapper input:focus{
        outline: none;
    }
    textarea{
        width: 100%;
        height: 100px;
        line-height: 18px;
        box-sizing: border-box;
        padding: 4px;
        border: 1px solid transparent;
        -webkit-appearance: textfield;
        background-color: #252526;
        color:#ccc;
    }
    textarea:focus{
        outline-offset: -1px;
        outline:1px solid rgba(14,99,156,.6);
    }
</style>