<template>
    <div class="saber_iconv">
		<section class="source-data">
			<textarea v-model="sdata"></textarea>
		</section>
		<section class='opreation'>
			<div class="opreation-wrapper">
			<a class="crypto-type" :class="{active:key===cur_crypto}" href="javascript:void(0)" v-for="item,key in crypto_type" @click="code(key)">
				<span>{{item}}</span>
			</a>
			</div>
		</section>
		<section class="target-data">
			<textarea v-model="tdata"></textarea>
		</section>
		
	</div>
</template>

<script>
	const iconv = node_require(Saber.__plugin_path + '/saber_iconv/node_modules/iconv-lite');
	const crypto = node_require('crypto');
	export default {
		name:"saber_iconv",
		data (){
			return {
				sdata:"\u51b7\u996e\u51bb\u98df",
				crypto_type : {
					uniDecode: "Unicode 解码",
					uniEncode: "Unicode 编码",
					utf8Decode: "UTF8 解码",
					utf8Encode: "UTF8 编码",
					base64Decode: "Base64 解码",
					base64Encode: "Base64 编码",
					md5: "MD5 加密"
				},
				cur_crypto: "uniDecode" 
			}
		},
		computed : {
			tdata (){
				return this[this.cur_crypto].call(this);
				//return unescape(this.sdata.toLowerCase());
			}
		},
		methods : {
			code (type) {
				this.cur_crypto = type;
			},
			md5(){
				var md5sum = crypto.createHash('md5');
				md5sum.update(this.sdata);
				let str = md5sum.digest('hex');
				return str;
			},
			uniDecode (){
				let n = this.sdata.replace(/\\/g, "%").replace(/\%U/g, "%u").replace(/\%u0025/g, "%25");
				n = unescape(n.toString().replace(/%2B/g, "+"));
				let l = n.match(/(%u00([0-9A-F]{2}))/gi);
				if (l) {
					for (let m = 0; m < l.length; m++) {
						let k = l[m].substring(1, 3);
						let j = Number("0x" + k);
						if (j >= 128) {
							n = n.replace(l[m], k)
						}
					}
				}
				n = unescape(n.toString().replace(/%2B/g, "+"));
				return n
			},
			uniEncode () {
				let m = escape(this.sdata.toString()).replace(/\+/g, "%2B");
				let k = m.match(/(%([0-9A-F]{2}))/gi);
				if (k) {
					for (let l = 0; l < k.length; l++) {
						let j = k[l].substring(1, 3);
						if (parseInt(j, 16) >= 128) {
							m = m.replace(k[l], "%u00" + j)
						}
					}
				}
				m = m.replace("%25", "%u0025").replace(/%/g, "\\");
				return m
			},
			utf8Encode (){
				return encodeURIComponent(this.sdata);
			},
			utf8Decode (){
				return decodeURIComponent(this.sdata);
			},
			base64Encode (){
				return this._base64Encode(this._urf8Encode(this.sdata));
			},
			_base64Encode( p ){
				var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
				var l, n, j;
				var o, m, k;
				j = p.length;
				n = 0;
				l = "";
				while (n < j) {
					o = p.charCodeAt(n++) & 255;
					if (n == j) {
						l += c.charAt(o >> 2);
						l += c.charAt((o & 3) << 4);
						l += "==";
						break
					}
					m = p.charCodeAt(n++);
					if (n == j) {
						l += c.charAt(o >> 2);
						l += c.charAt(((o & 3) << 4) | ((m & 240) >> 4));
						l += c.charAt((m & 15) << 2);
						l += "=";
						break
					}
					k = p.charCodeAt(n++);
					l += c.charAt(o >> 2);
					l += c.charAt(((o & 3) << 4) | ((m & 240) >> 4));
					l += c.charAt(((m & 15) << 2) | ((k & 192) >> 6));
					l += c.charAt(k & 63)
				}
				return l
			},
			_urf8Encode ( m ){
				let k, l, j, n;
				k = "";
				j = m.length;
				for (l = 0; l < j; l++) {
					n = m.charCodeAt(l);
					if ((n >= 1) && (n <= 127)) {
						k += m.charAt(l)
					} else {
						if (n > 2047) {
							k += String.fromCharCode(224 | ((n >> 12) & 15));
							k += String.fromCharCode(128 | ((n >> 6) & 63));
							k += String.fromCharCode(128 | ((n >> 0) & 63))
						} else {
							k += String.fromCharCode(192 | ((n >> 6) & 31));
							k += String.fromCharCode(128 | ((n >> 0) & 63))
						}
					}
				}
				return k
			},
			base64Decode () {
				return this._utf8Decode(this._base64Decode(this.sdata));
			},
			_utf8Decode ( o ){
				var k, m, j, p;
				var n, l;
				k = "";
				j = o.length;
				m = 0;
				while (m < j) {
					p = o.charCodeAt(m++);
					switch (p >> 4) {
					case 0:case 1:case 2:case 3:
					case 4:case 5:case 6:
					case 7:
						k += o.charAt(m - 1);
						break;
					case 12:
					case 13:
						n = o.charCodeAt(m++);
						k += String.fromCharCode(((p & 31) << 6) | (n & 63));
						break;
					case 14:
						n = o.charCodeAt(m++);
						l = o.charCodeAt(m++);
						k += String.fromCharCode(((p & 15) << 12) | ((n & 63) << 6) | ((l & 63) << 0));
						break
					}
				}
				return k
			},
			_base64Decode ( q ) {
				var h = new Array(-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,-1,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1);
				var p, o, m, k;
				var n, j, l;
				j = q.length;
				n = 0;
				l = "";
				while (n < j) {
					do {
						p = h[q.charCodeAt(n++) & 255]
					} while (n < j && p == -1);if (p == -1) {
						break
					}
					do {
						o = h[q.charCodeAt(n++) & 255]
					} while (n < j && o == -1);if (o == -1) {
						break
					}
					l += String.fromCharCode((p << 2) | ((o & 48) >> 4));
					do {
						m = q.charCodeAt(n++) & 255;
						if (m == 61) {
							return l
						}
						m = h[m]
					} while (n < j && m == -1);if (m == -1) {
						break
					}
					l += String.fromCharCode(((o & 15) << 4) | ((m & 60) >> 2));
					do {
						k = q.charCodeAt(n++) & 255;
						if (k == 61) {
							return l
						}
						k = h[k]
					} while (n < j && k == -1);if (k == -1) {
						break
					}
					l += String.fromCharCode(((m & 3) << 6) | k)
				}
				return l
			}
		}
	}
</script>
<style scoped>
	.saber_iconv{
		height: 100%;
		width: 100%;
		position: relative;
		padding: 5px;
		display: flex;
		justify-content: space-around;
		flex-direction: row;
		font-family: '黑体'
	}
	.saber_iconv .source-data{
		height: 100%;
		padding: 10px;
		flex:1;
	}
	.saber_iconv .opreation{
		height: 100%;
		width: 200px;
		text-align: center;
		padding:  0 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.opreation-wrapper{
		display: inline-block;
		width: 100%;
	}
	.crypto-type{
		margin: 10px 0;
		padding: 10px 0;
		display: block;
		text-decoration: none;
		text-align: center;
		border: #3c3c3c solid 1px;
		border-radius: 1px;
		color: var(--fontColor);
	}
	.crypto-type.active{
		border: #007acc solid 1px;
	}
	.saber_iconv .target-data{
		height: 100%;
		padding: 10px;
		flex: 1;
	}

	.saber_iconv textarea{
		height: 100%;
		width: 100%;
		line-height: 18px;
		box-sizing: border-box;
		padding: 4px;
		-webkit-appearance: textfield;
		font-family: '黑体'
	}
	.saber_iconv textarea:focus{
		outline-offset: -1px;
		outline:1px solid rgba(14,99,156,.6);
	}
</style>