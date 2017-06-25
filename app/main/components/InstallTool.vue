<template>
    <div class="install_tool">
        <div>
            <div>
                <input type="text" v-model="toolurl" placeholder="Github 项目路径/项目关键词" lazy/>
            </div>
            <button @click="loginGithub">
                点击登陆 Github
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                toolurl: ""
            }
        },
        computed:{
            github_status () {
                return !!Saber.Github.token.length;
            }
        },
        methods:{
            loginGithub (){
                Saber.Github.login();
            }
        }
    }
</script>

<style>
.install_tool{
    font-size: 14px;
    padding: 10px;
}
.install_tool label{
    margin: 10px 0;
    display: block;
    height: 20px;
    overflow-x: hidden;
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