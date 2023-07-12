<script setup>
// default
const scanTypeOptions = [
	'2D HS',
	'2D BT',
	'2D CS',
	'2D FX-9',
	'2D OC',
	'2D FX-0',
	'2D FX-1',
	'1D HS',
	'1D BT',
	'1D CS',
	'1D FX-9',
	'1D SE-9',
	'1D LHS',
	'1D LBT',
	'1D LCS',
	'1D LSE',
	'1D FX-0',
	'1D FX-1',
	'1D SE-0',
	'1D SE-1',
];
const emit = defineEmits(['data', 'abort']);
const props = defineProps({
	mode: {
		type: Number,
		default: 0,
	},
	useData: {
		type: Object,
		default: {},
	},
});

const sendData = (data) => {
	emit('data', data);
};

const abort = (bool) => {
	emit('abort', bool);
};
</script>

<template>
	<div class="add-pop">
		<header class="flex justify-start items-center">
			<h1
				class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900"
			>
				Powertool Parameter ({{
					!props.mode ? 'One By One' : 'One By More'
				}})
			</h1>
		</header>
		<main>
			<PMode0Edit
				v-if="!props.mode"
				:mode="props.mode"
				:use-data="props.useData"
				:scan-type-options="scanTypeOptions"
				@abort="abort"
				@data="sendData"
			/>
			<PMode1Edit
				v-if="props.mode"
				:mode="props.mode"
				:use-data="props.useData"
				:scan-type-options="scanTypeOptions"
				@abort="abort"
				@data="sendData"
			/>
		</main>
	</div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/_color.scss';
@import '../assets/scss/_style.scss';
.add-pop {
	position: fixed;
	width: 1080px;
	height: 720px;
	background-color: #fff;
	border-radius: 8px;
	box-shadow: 10px 10px 10px rgba($color: $main-font-color, $alpha: 0.3);
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 1500;
	padding: 20px;
	header {
		width: 100%;
		height: 10%;
		color: $main-font-color;
	}
	main {
		width: 100%;
		height: 90%;
		overflow: auto;
		select {
			@extend %select;
		}
		.el-form-item__label {
			font-size: 16px;
		}
	}
}
.el-popper {
	z-index: 1000000;
}
.el-form-item__content {
	width: 200px;
	height: 24px;
}
</style>
