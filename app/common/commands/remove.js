//copy => copy命令  ，可以是文件或文件夹
//本文件是同步的，请异步执行！！

const path = require('path')
const remove = require('./__remove')
const fs = require('fs')


var target = path.resolve(process.argv[2]);

remove(target);