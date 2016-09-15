//copy => copy命令  ，可以是文件或文件夹
//本文件是同步的，请异步执行！！

const util = require('util')
const path = require('path')
const fs = require('fs')


function __copy(spath, dpath){
    var stats =  fs.statSync( spath );
    if(toString.call(stats) === "[object Error]"){console.log(stats);return}

    if(stats.isDirectory()){
      //create directory
      var tmp_path = path.resolve(dpath ,"./" + path.basename(spath) );
      console.log(tmp_path);
      fs.mkdirSync( tmp_path );
      var flist = fs.readdirSync(spath)
      flist.forEach(function(item){
        console.log(item);
        __copy(path.resolve(spath,"./"+item),tmp_path)
      })
    }
    if(stats.isFile()){
      readable = fs.createReadStream( spath );
      // 创建写入流
      writable = fs.createWriteStream( path.resolve(dpath ,"./" + path.basename(spath) ) );   
      // 通过管道来传输流
      readable.pipe( writable );
    }
}

module.exports = __copy;