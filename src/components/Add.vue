<script setup>
const emit = defineEmits(['data', 'abort']);
const props = defineProps({
	title: {
		type: String,
		default: 'EMPTY',
	},
	path: {
		type: String,
		default: '',
	},
	isEdit: {
		type: Boolean,
		default: false,
	},
	isVersionEdit: {
		type: Number,
		default: -1,
	},
	inputData: {
		type: Object,
		default: () => ({}),
	},
	showInput: {
		type: Array,
		default: () => [],
	},
	showMultiInput: {
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
		type: String,
		default: '',
	},
	selectItems: {
		type: Object,
		default: () => ({}),
	},
	showVersion: {
		type: Array,
		default: null,
	},
});

const editAdmin = (data) => {
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
				{{ props.title }}
			</h1>
		</header>
		<AddTemplate
			:path="props.path"
			:input-data="props.inputData"
			:show-input="props.showInput"
			:show-select="props.showSelect"
			:show-multi-input="showMultiInput"
			:show-multi-selct="props.showMultiSelct"
			:show-special="props.showSpecial"
			:select-items="props.selectItems"
			:show-version="props.showVersion"
			:is-edit="props.isEdit"
			:is-version-edit="props.isVersionEdit"
			@data="editAdmin"
			@abort="abort"
		/>
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
