export default class ToolManager {
    static plugins = require ("../../plugins/plugin.json");
    
    constructor () {
    }

    install ( path ){

    }

    uninstall ( pluginId ){

    }
    search ( keyword ){
        const token = "ce6fdf5dcc06e5664b11ce9acd0bc9b02d0ef702";

        const HttpsProxyAgent = require('https-proxy-agent');
        const agent = new HttpsProxyAgent("http://dev-proxy.oa.com:8080");

        const query = `
            {
                search(query:"${keyword}",first:20,type:REPOSITORY){
                    repositoryCount
                    edges{
                        cursor
                    }
                    nodes{
                    ...on Repository{
                        id
                        name
                        resourcePath
                        homepageUrl
                        url
                        description
                        createdAt
                        stargazers{
                        totalCount
                        }
                        owner{
                            login
                        }
                    }
                    }
                }
            }
        `;
        
        return Saber.request({
            url: 'https://api.github.com/graphql',
            method: 'POST',
            body: JSON.stringify({query}),
            headers:{'Authorization': `bearer ${token}`},
            dataType: 'json'
        }).then(function(data){
            return data;
        });
    }

    update ( pluginId ){

    }

    check ( pluginId ){

    }
}