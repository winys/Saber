<template>
    <div class="saber_http">
		<section class="history">
			<history></history>
		</section>
		<section class="http-sender">
			<http-sender></http-sender>
		</section>
		<section class="http-parser">
			<http-parser></http-parser>
		</section>
	</div>
</template>
<script>
	import Vue from 'vue';
	import history from "./History.vue";
	import httpSender from "./HttpSender.vue";
	import httpParser from "./HttpParser.vue";
	export default {
		data () {
			return {
				eventhub : new Vue() 
			}
		},
		components: {
            history,httpSender,httpParser
        }
	}
	
</script>
<style scoped>
.saber_http{
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	align-items: stretch;
	justify-content: space-around;
	font-family: '黑体'
}
.history{
	width: 300px;
}
.http-sender{
	flex: 1;
}
.http-parser{
	width: 600px;
}
</style>