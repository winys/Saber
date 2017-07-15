<template>
    <div class="install_tool">
        <div>
            <div class="tool_seacher">
                <input type="text" v-model="toolurl" @input="searchTool" placeholder="Github 项目路径/项目关键词" lazy/>
            </div>
            <div class="toolul_panel">
                <ul class="toolul">
                    <toolcard :tool="tool" v-for="tool of nodes" key="tool.id"></toolcard>
                </ul>
            </div>
            
        </div>
    </div>
</template>

<script>
    import Saber from "../../common/Saber"
    import toolcard from "./ToolCard"

    export default {
        data(){
            return {
                toolurl: "",
                status:"",
                cursor: "",
                repositoryCount: 0,
                nodes: []
            }
        },
        components : {
            toolcard
        },
        computed:{
            github_status () {
                return !!Saber.Github.token.length;
            }
        },
        methods:{
            async searchTool (){
                const data = await Saber.toolManager.search( this.toolurl );
                if ( data.code ){
                    this.status = 1;
                    return;
                }                    
                this.formatData(data);
            },
            formatData (data){
                if(!data || !data.data || !data.data.search) return;
                const {edges,nodes,repositoryCount} = data.data.search;
                this.repositoryCount = repositoryCount;

                edges.forEach( (item, index) => {
                    nodes[index].cursor = item.cursor;
                });

                this.cursor = edges.length > 0 ? edges[edges.length-1].cursor : "";

                nodes.forEach( (item) => {
                    item.author = item.owner.login;
                    item.star = item.stargazers.totalCount;
                    item.icon = `https://raw.githubusercontent.com${item.resourcePath}/release/logo.png`;
                    if ( Saber.toolManager.hasPlugin( item.name )){
                        item.installed = true;
                    }
                });
                this.nodes = nodes;
            }
        }
    }
</script>

<style>
.install_tool{
    font-size: 14px;
    padding: 10px 0;
}
.install_tool label{
    margin: 10px 0;
    display: block;
    height: 20px;
    overflow-x: hidden;
}
.install_tool .tool_seacher{
    padding: 0 10px;
}
.install_tool .toolul{
    padding: 10px 0;
}
.install_tool .op{
    padding: 10px 0;
    display: flex;
    width:100%;
    flex-direction: row-reverse;
    align-items: stretch;
    height: 40px;
}
.install_tool .install_start{
    width: 50px;
    height: 20px;
    font-size: 14px;
    line-height: 20px;
    order:1;
    text-align: center;
    overflow: hidden;
    cursor: pointer;
}
</style>