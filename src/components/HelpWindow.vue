<script setup>
import { onBeforeMount, reactive, ref } from 'vue';

const emit = defineEmits(['data', 'abort']);
const props = defineProps({
	mode: {
		type: Number,
		default: 0,
	},
	source: {
		type: String,
		default: '',
	},
});

const detail = reactive({
	p_mode_0: [
		{
			title: 'Mode',
			contents: [
				{ l: 'NORMAL', r: '僅需選單列表' },
				{ l: 'ASCII', r: '僅為填入文字' },
				{ l: 'ASCII_2', r: '選單列表+填入文字' },
				{ l: 'NUMBER', r: '僅為填入數字' },
				{ l: 'NUMBER1', r: '選單列表+填入數字' },
			],
		},
		{
			title: 'Scanner Type',
			contents: [
				{ l: 'HS', r: '槍型' },
				{ l: 'BT', r: '藍芽' },
				{ l: 'CS', r: 'Pocket' },
				{ l: 'FX', r: 'Fixded Mount(分0,1,9)' },
				{ l: 'OC', r: 'On-counter' },
				{ l: 'SE', r: '分0,1,9' },
				{ l: 'Lxx', r: '雷射' },
			],
		},
	],
	p_mode_1: [
		{
			title: 'Mode',
			contents: [
				{ l: 'none', r: '僅需選單列表' },
				{ l: 'ASCII', r: '僅為填入文字' },
				{ l: 'ASCII_3', r: '選單列表+填入文字' },
				{ l: 'NUMBER', r: '僅為填入數字' },
			],
		},
		{
			title: 'Scanner Type',
			contents: [
				{ l: 'HS', r: '槍型' },
				{ l: 'BT', r: '藍芽' },
				{ l: 'CS', r: 'Pocket' },
				{ l: 'FX', r: 'Fixded Mount(分0,1,9)' },
				{ l: 'OC', r: 'On-counter' },
				{ l: 'SE', r: '分0,1,9' },
				{ l: 'Lxx', r: '雷射' },
			],
		},
	],
});

const nowDetail = ref([]);

const abort = () => {
	emit('abort', true);
};

onBeforeMount(() => {
	nowDetail.value =
		detail[
			props.source === 'parameterList'
				? `p_mode_${props.mode}`
				: props.source
		];
});
</script>

<template>
	<div class="pop">
		<header>
			<h1
				class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900"
			>
				Help Window
			</h1>
		</header>
		<main>
			<div class="flex flex-col w-11/12 h-full pt-3">
				<div class="w-full h-11/12 flex flex-col overflow-auto">
					<div
						v-for="detail in nowDetail"
						class="w-full flex flex-col mb-2"
					>
						<h2 class="mb-1 text-lg text-cyan-500">
							。{{ detail.title }}
						</h2>
						<div
							v-for="content in detail.contents"
							class="ml-4 w-full flex flex-row mb-2 text-sm"
						>
							<span class="w-16">{{ content.l }}</span>
							<span class="mr-2 ml-2">:</span>
							<span>{{ content.r }}</span>
						</div>
					</div>
				</div>
				<el-button @click="abort">Abort</el-button>
			</div>
		</main>
	</div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/_color.scss';
@import '../assets/scss/_style.scss';
.pop {
	position: fixed;
	width: 600px;
	height: 400px;
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
