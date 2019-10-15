<template>
	<transition name="down">
		<div class="wrapper">
			<div class="logo"></div>
			<div class="input_name">
				<input type="text" placeholder="请输入昵称" autocomplete="off" id="name" v-model="name" autofocus="autofocus" @keyup.enter="login">
				<p v-if="warning" class="iconfont icon-gantanhao warning_text" >请输入昵称</p>
				<p class="log_in" @click="login"><span>进入群聊</span></p>
			</div>
		</div>
	</transition>
	
</template>

<script>
	export default {
		name: 'Home',
		data() {
			return {
				name: '',
				warning: false
			}
		},
		computed: {},
		methods: {
			login() {
				this.warning = this.name.length == 0 || this.name.length > 20;
				if (!this.warning) {
					localStorage.name = this.name;	//把用户名储存到localStorage
					this.$store.commit('setName',this.name);	//vuex
					this.$router.push('/Chat');
				}
			}
		}

	}
</script>

<style lang="scss" scoped="scoped">
	@import '@/style/attributes.scss';

	.wrapper {
		@extend .box
	}

	.logo {
		width: 200px;
		height: 180px;
		background-image: url(../assets/chatlogo.png);
		background-repeat: no-repeat;
		margin: 100px auto 0;
	}

	.input_name {
		position: relative;
		margin-top: 50px;
		font-size: 1.6rem;
		font-weight: 800;
		display: flex;
		flex-direction: column;
		align-items: center;
		&>input {
			font-size: 1.6rem;
			font-weight: 800;
		}

	}

	#name {
		width: 400px;
		width: 65%;
		padding: 10px 0;
		outline: none;
		border: none;
		border-bottom: 2px solid $themeColor;
		background-color: #f5f5f5;
	}

	.log_in {
		margin-top: 20px;
		// width: 400px;
		width: 65%;
		height: 50px;
		line-height: 50px;
		color: $bg;
		background-color: $themeColor;
		cursor: pointer;
		font-size: 1.6rem;
	}

	.warning_text {
		position:absolute ;
		top: 45px;
		color: $red;
		font-weight: 400;
		font-size: 1.3rem;
		// width: 65%;
		width: 400px;
		margin: 0 auto;
		text-align: left;
	}

	/* 动画 */
	.down-enter {
		transform: translateX(-20rem);
		opacity: 0;
	}

	.down-enter-active{
		transition: all .4s;
	}
</style>
