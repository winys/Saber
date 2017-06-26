<template>
    <div class="tool_detail" :class="{'loading':busy}">
        <div class="tool_readme">
            <link rel="stylesheet" href="../static/css/github-markdown.css" scoped>
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
            detail.tool = this.$store.state.ToolManager.option.data;
            return detail;
        },
        mounted(){
            let self = this;
            const marked = require('marked');
            https.get(`https://raw.githubusercontent.com${self.tool.resourcePath}/master/README.md`,function(res){
                let md = "";
                res.on('data', function( data ){
                    md += data;
                });
                res.on('end',function(){
                    self.busy = false;
                    self.readme = marked(md);
                    self.$nextTick(function(){                        
                        require("../../static/js/prettify.js");
                        document.querySelectorAll('code, pre').forEach(function(item){item.classList.add("prettyprint")});  
                        prettyPrint(); 
                    })
                })
            })
        }
    }
</script>
<style scoped>
    .tool_detail{
        overflow-x: hidden;
    }
    .tool_readme{
        overflow: auto;
        user-select: text;
    }
    .tool_readme .markdown_dark{
        min-width:300px;
        padding-left: 5px; 
    }
</style>