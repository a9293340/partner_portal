<script setup>
import AddTemplate from './AddTemplate.vue';

const emit = defineEmits(['data', 'abort']);
const props = defineProps({
	title: {
		type: String,
		default: 'EMPTY',
	},
	inputData: {
		type: Object,
		default: () => ({}),
	},
	showInput: {
		type: Array,
		default: () => [],
	},
	showSelect: {
		type: Array,
		default: () => [],
	},
	showMultiSelct: {
		type: Array,
		default: () => [],
	},
	showSpecial: {
		type: Array,
		default: () => [],
	},
	selectItems: {
		type: Object,
		default: () => ({}),
	},
});
// const editTarget = ref(JSON.parse(props.foo));
// const formData = ref(null);

const editAdmin = (data) => {
	emit('data', data);
};

const abort = (bool) => {
	emit('abort', bool);
};
</script>

<template>
	<div class="edit-pop">
		<header class="flex justify-start items-center">
			<h1
				class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900"
			>
				{{ props.title }}
			</h1>
		</header>
		<AddTemplate
			:input-data="props.inputData"
			:show-input="props.showInput"
			:show-select="props.showSelect"
			:select-items="props.selectItems"
			:is-edit="true"
			@data="editAdmin"
			@abort="abort"
		/>
	</div>
</template>

<style lang="scss">
@import '../assets/scss/_color.scss';
@import '../assets/scss/_style.scss';
.edit-pop {
	position: fixed;
	width: 800px;
	height: 600px;
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
		height: 80%;
		overflow: auto;
		select {
			@extend %select;
		}
	}
	footer {
		// margin-top: 50px;
		width: 100%;
		height: 10%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
}
.el-popper {
	z-index: 1000000;
}
</style>
