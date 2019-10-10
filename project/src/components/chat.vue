<template>
	<transition name="chat">
		<div class="wrapper">
			<header class="chat_header">
				<i class="Back iconfont icon-fanhui" @click="back"></i>
			</header>
			<div class="content" ref="scroll">
				<ul class="list">
					<li v-for="item in messages" class="list-item" :key="item.index">
						<div class="wrapper_date">
							<p class="date"><span>{{item.date}}</span></p>
						</div>
						<div class="word" :class="{'self':item.from == 'self','other':item.from == 'other'}">
							<img :src="item.src" alt="">
							<span>{{item.name}}</span>
							<p class="messages_value">{{item.value}}</p>
							<div class="wrapper_onlineName">
								<p class="onlineName"><span>{{item.onlineName}}</span></p>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<footer class="chat_fotter">
				<input type="text" autofocus="autofocus" @keyup.enter="sendMsg" v-model="inputValue"> <!-- 敲击回车时触发endMsg事件 -->
				<button class="send" @click="sendMsg">发送</button>
			</footer>
		</div>
	</transition>

</template>

<script>
	import io from 'socket.io-client'; //引入socket.io到客户端库
	const socket = io.connect('http://localhost:8083'); //与服务端建立联系，端口与服务端相同

	export default {
		name: 'Chat',
		data() {
			return {
				inputValue: '',
				messages: [],
				name: '',
				onlineName: [],
				ico_header: "../../static/image/ico_header.png"
			}
		},
		methods: {
			back() {
				this.$router.push('/');
			},
			sendMsg() {
				if (this.inputValue !== '') {
					//socket.io 使用 emit(eventname,data) 发送数据,eventname可以是自己命名的事件
					//给服务端发送 send_event事件名的消息及其数据
					socket.emit('send_event', {
						from: 'other', //传给服务器，对于从服务器拿到这个数据到人来说，我们是'别人'，消息要在左边
						value: this.inputValue,
						date: this.getTime(),
						name: this.name,
						src: this.ico_header
					});
					this.messages.push({
						from: 'self',
						value: this.inputValue,
						date: this.getTime(),
						name: this.name,
						src: this.ico_header
					})
					this.inputValue = ''
				}
			},
			getTime() {
				return this.moment().format('YYYY-MM-DD HH:mm:ss');
			},
			scrollBottom() {
				clearTimeout(this.timer);
				var that = this;
				var timer = setTimeout(function() { //放在定时器里异步执行，针对发送信息时,如果直接进行scrollTop=scrollHeight赋值会无效
					that.$refs.scroll.scrollTop = that.$refs.scroll.scrollHeight;
				},0)
			}
		},
		created() { //生命周期钩子：
			if (localStorage.messages) {
				this.messages = JSON.parse(localStorage.messages) //还原
			}
			this.name = this.$store.state.clickName;
		},
		updated() { //生命周期钩子：数据更新时触发
			this.name = this.$store.state.clickName;
		},
		activated() {//keep-alive 组件激活时调用
			this.scrollBottom();
		},
		mounted() { //挂载		
			socket.on('callBackMsg', data => { //监听callBackMsg事件，接收从服务器分发的数据
				this.messages.push(data);
			})
			socket.emit('online', this.name)
			socket.on('online', name => {
				if (!name) {
					console.log('没有name')
					return
				}
				this.messages.push({
					onlineName: `"${name}"已上线`
				})
			})
			console.log('messages:', this.messages)
		},
		watch: {
			messages: {
				handler() {
					this.scrollBottom();
					//序化成json形式，存储到localStorage中
					localStorage.messages = JSON.stringify(this.messages);
					//**Storage只能存储字符串的数据，对于JS中常用的数组或对象却不能直接存储
					// JSON.stringify()方法可以将任意的 JavaScript 值序列化成 JSON 字符串.
				},
				deep: true
			}
		},
	}
</script>

<style lang="scss" scoped="scoped">
	@import '@/style/attributes.scss';

	.wrapper {
		@extend .box;
		animation-duration: .1s;
	}

	.chat_header {
		text-align: left;
		padding: 4px 10px;
		box-sizing: border-box;
		width: 100%;
		height: 35px;
		box-shadow: 0 0 10px $themeColor;
		background-color: $themeColor;
		margin-bottom: 12px;
	}

	.content {
		height: 558px;
		overflow: auto;

		&::-webkit-scrollbar {
			/* 既有滚动特性，又去掉滚动条，只兼容Chrome 和 Safari */
			display: none;
		}
	}

	.chat_fotter {
		width: 100%;
		height: 45px;
		padding: 8px 15px;
		box-sizing: border-box;
		box-shadow: 0 0 10px #ddd;
		text-align: left;
	}

	input {
		width: 90%;
		height: 29px;
		border: none;
		outline: none;
		border-bottom: 1px solid $themeColor;
		background-color: $bg;
		font-size: 1.6rem;
	}

	.send {
		width: 8%;
		height: 25px;
		margin: 0 3px;
		// background-color: #129611;
		background-color: $themeColor;
		border: none;
		outline: none;
		color: $bg;
	}

	.Back {
		// font-size: 1.6rem;
		color: $bg;
		cursor: pointer;
	}

	.list li:first-child {
		margin-top: 12px;
	}

	.list-item {
		height: 80px;
		padding: 0 10px;
	}

	.wrapper_date {
		color: $bg;
		line-height: 23px;
		display: flex;
		justify-content: center;
	}

	.date {
		background-color: #dadada;
		text-indent: 30px;

		span {
			position: relative;
			right: 15px;
			font-size: 1.2rem;
		}
	}

	.self {
		float: right;
		text-align: right;

		&>img {
			width: 35px;
			height: 35px;
			float: right;
		}

		&>span {
			margin-right: 10px;
			font-size: 1.2rem;
		}

		&>.messages_value {
			position: relative;
			height: 20px;
			background-color: #fff;
			box-shadow: 0 0 10px #ddd;
			margin-right: 46px;
			padding: 6px;
			line-height: 20px;
			text-align: center;
		}

		&>.messages_value:before {
			content: '';
			display: block;
			width: 0;
			border-width: 8px;
			border-style: solid;
			border-color: transparent transparent transparent #fff;
			/* transparent 设置边框颜色透明 */
			position: absolute;
			right: -15px;
			top: 7px;
		}
	}

	.other {
		float: left;
		text-align: left;

		&>img {
			width: 35px;
			height: 35px;
			float: left;
		}

		&>span {
			margin-left: 10px;
			font-size: 1.2rem;
		}

		&>.messages_value {
			position: relative;
			height: 20px;
			background-color: #fff;
			box-shadow: 0 0 10px #ddd;
			margin-left: 46px;
			padding: 6px;
			line-height: 20px;
			text-align: center;
		}

		&>.messages_value:before {
			content: '';
			display: block;
			width: 0;
			border-width: 8px;
			border-style: solid;
			border-color: transparent #fff transparent transparent;
			/* transparent 设置边框颜色透明 */
			position: absolute;
			left: -15px;
			top: 7px;
		}
	}

	.wrapper_onlineName {
		color: $bg;
		line-height: 23px;
		display: flex;
		justify-content: center;
	}

	.onlineName {
		background-color: #dadada;
		text-indent: 30px;

		span {
			position: relative;
			right: 15px;
			font-size: 1.2rem;
		}
	}



	/* 入场动画 */
	.chat-enter {
		transform: translateY(-50%);
		opacity: 0;
	}

	.chat-enter-active {
		transition: all .4s;
	}
</style>
