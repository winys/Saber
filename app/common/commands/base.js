const cp = require( 'child_process' );
const iconv = require('iconv-lite');

/**
 * 解码函数
 * @param {*} buffer 
 * @param {*} encoding 
 * @param {*} options 
 */
function decode(buffer, encoding, options) {
	return iconv.decode(buffer, encoding, options);
}

/**
 * 执行命令
 * @param {childprocess} child 进程
 * @param {string} encoding 边抹格式
 */
function exec(child, encoding = 'utf8') {
	//const disposables = [];

	const once = (ee, name, fn) => {
		ee.once(name, fn);
		//disposables.push(toDisposable(() => ee.removeListener(name, fn)));
	};

	const on = (ee, name, fn) => {
		ee.on(name, fn);
		//disposables.push(toDisposable(() => ee.removeListener(name, fn)));
	};

	return Promise.all([
		new Promise((c, e) => {
			once(child, 'error', e);
			once(child, 'exit', c);
		}),
		new Promise(c => {
			let buffers = [];
			on(child.stdout, 'data', b => buffers.push(b));
			once(child.stdout, 'close', () => c(decode(Buffer.concat(buffers), encoding)));
		}),
		new Promise(c => {
			let buffers = [];
			on(child.stderr, 'data', b => buffers.push(b));
			once(child.stderr, 'close', () => c(decode(Buffer.concat(buffers), encoding)));
		})
	]).then(values => {

		return {
			exitCode: values[0],
			stdout: values[1],
			stderr: values[2]
		};
	});
}


/**
 * 到某个目录中运行命令
 * @param {string} cwd  目录
 * @param {array} args 参数列表
 * @param {array} options 选项
 */
function run(cwd, args, options) {
	options = Object.assign({ cwd: cwd }, options || {});

	const child = spawn(args,options)
	return exec(child).then(result => {
		if (result.exitCode) {
			let gitErrorCode = null;
			console.log(result.stderr)
		}
		return result;
	});
}

modules.exports = {
	exec,
	decode,
	run
}

