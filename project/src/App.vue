<template>
	<div id="app">
		<keep-alive>
			<router-view />
		</keep-alive>

	</div>
</template>

<script>
	export default {
		name: 'App'
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		width: 100%;
		height: 100%;
	}

	body:before {
		content: '';
		background-image: url(assets/beach_aerial_view_4k_2-3840x2160.jpg);
		background-size: cover;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		filter: blur(10px);
		-moz-filter: blur(10px);
		-ms-filter: blur(10px);
		z-index: -100;
		transform: scale(1.02);
	}

	html {
		overflow: hidden;
	}
</style>
