<script setup></script>

<template>
	<div class="dashboard-container">
		<div class="text1">Welcome!</div>
		<div class="text2">Welcome!</div>
		<div class="text3">Welcome!</div>
		<div class="text4">Welcome!</div>
	</div>
</template>

<style lang="scss" scoped>
.dashboard-container {
	height: 300px;
	text-align: center;
	border-radius: 10px;
	background-color: rgba(255, 255, 255, 0.7);
	padding-top: 90px;
	overflow: hidden;
	position: relative;
	.text1 {
		position: absolute;
		top: 80px;
		left: 280px;
		font-size: 17em;
		color: rgba(0, 0, 0, 0.08);
		font-weight: bold;
	}
	.text2 {
		position: absolute;
		top: -50px;
		left: -60px;
		font-size: 17em;
		color: rgba(0, 0, 255, 0.05);
		font-weight: bold;
	}
	.text3 {
		position: absolute;
		top: -120px;
		left: 550px;
		font-size: 17em;
		color: rgba(255, 0, 0, 0.05);
		font-weight: bold;
	}
	.text4 {
		font-size: 5em;
		font-weight: bold;
		font-family: Righteous;
		color: rgba(0, 0, 0, 0.7);
		&:after {
			content: "";
			display: block;
			background-color: rgba(0, 0, 0, 0.4);
			height: 2px;
			width: 400px;
			border-radius: 50%;
			margin: 5px auto;
		}
	}
}
</style>
