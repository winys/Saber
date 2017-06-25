const util = require('util')
const path = require('path')
const cp = require( 'child_process' );
const {exec,run} = require( '../base' )


function spawn ( args, options ){
    //TODO: check git
    if (!options) {
        options = {};
    }

    if (!options.stdio && !options.input) {
        options.stdio = ['ignore', null, null]; // Unless provided, ignore stdin and leave default streams for stdout and stderr
    }

    options.env = Object.assign({}, options.env || {}, this.env, {
        LANG: 'en_US.UTF-8',
    });

    if (options.log !== false) {
        console.log(`git ${args.join(' ')}\n`);
    }

    return cp.spawn("git", args, options);
}

/**
 * clone Git项目到本地
 * @param {string} giturl  Git源地址
 * @param {string} dpath 目标路径
 */
function clone(giturl, dpath){
    const urlreg = /^http[s]?:\/\/([\S]+)/;
    const child = spawn(['clone', giturl, dpath])
    exec(child).then(result => {
        if (result.exitCode) {
            let gitErrorCode = null;
            console.log(result.stderr)
        }
        console.log(result)
        return result;
    });
}

//clone("https://github.com/tj/co.git","./test")



/**
 * 获取当前版本
 * @param {string} cwd Git目录
 */
function version ( cwd ){
	const args = [ 'log', '--pretty=oneline', '-n 1' ]

	return run(cwd,args).then( (result) => {
		if( result.exitCode ){
			return Error( result.stderr );
		}
		
		let version = ( result.stdout || "" ).split( /\s* \s*/ )[0];
		if( /\w{40}/.test( version )){
			return version;
		} else {
			return Error("error version");
		}
	});
}

// version("./test").then((version)=>{
// 	console.log(version)
// })

module.exports = {
	clone,
	version
}
