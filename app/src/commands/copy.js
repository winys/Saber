//copy => copy命令  ，可以是文件或文件夹
//本文件是同步的，请异步执行！！

const path = require('path')
const copy = require('./__copy')
const remove = require('./__remove')
const fs = require('fs')


var spath = path.resolve(process.argv[2]);
var dpath = path.resolve(process.argv[3]);

var tmp_path = path.resolve(dpath ,"./" + path.basename(spath) );
remove(tmp_path)
copy(spath, dpath);