//copy => copy命令  ，可以是文件或文件夹
//本文件是同步的，请异步执行！！

const util = require('util')
const path = require('path')
const fs = require('fs')

function __remove(target){
    try{
        var stats =  fs.statSync( target );
        if(stats.isDirectory()){
            var flist = fs.readdirSync(target)
            flist.forEach(function(item){
                __remove(path.resolve(target,"./"+item));
                console.log(item);
            })
            fs.rmdirSync(target)
        }
        if(stats.isFile()){
            fs.unlinkSync(target);
        }   
        
    }
    catch(e){
        console.log(e);
    }
}
module.exports = __remove;