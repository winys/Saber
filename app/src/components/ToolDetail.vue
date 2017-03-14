<template>
    <div class="tool_detail" :class="{'loading':busy}">
        <div class="tool_readme">
            <link rel="stylesheet" href="./static/css/markdown.css" scoped>
            <div class='markdown_dark'>
                <article class='markdown-body markdown_dark_container' v-html="readme"></article>
            </div>
        </div>
    </div>
</template>
<script>
    const https = node_require('https');
    export default {
        data(){
            let detail = {};
            detail.readme = "";
            detail.busy = true;
            return detail;
        },
        beforeCreate(){
            let self = this;
            const marked = require('marked');
            https.get("https://raw.githubusercontent.com/chjj/marked/master/README.md",function(res){
                let md = "";
                res.on('data', function( data ){
                    md += data;
                });
                res.on('end',function(){
                    self.busy = false;
                    self.readme = marked(md);
                    require("../../static/javascript/prettify.js")
                    self.$nextTick(function(){                        
                        document.querySelectorAll('code, pre').forEach(function(item){item.classList.add("prettyprint")});  
                        prettyPrint(); 
                    })
                })
            })
        },
        props:['option']
    }
</script>
<style scoped>
    .tool_readme{
        -webkit-user-select: text;
        overflow-x:hidden;
    }
    .tool_readme .markdown_dark{
        min-width:300px;
    }
    .loading{        
        position: relative;
    }
    .loading::before{
        content: ' ';
        width: 7px;
        background-color: #007acc;
        height: 3px;
        position: absolute;
        animation: loading 2s linear infinite;
    }
    @keyframes loading{
        from{left:0%;width:7px;}
        50%{left:50%;width:15px;}
        to{left:100%;width:7px}
    }
</style>