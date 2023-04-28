<script setup>
import { useParameterStore } from '@/store/parameter';
import { storeToRefs } from 'pinia';
import { firstStringUpperCase } from '@/utils';
import { onBeforeMount, ref } from 'vue';

const emit = defineEmits(['data', 'abort']);
const props = defineProps({
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
	isEdit: {
		type: Boolean,
		default: false,
	},
});
const { adminRules } = storeToRefs(useParameterStore());
const { fixError } = useParameterStore();
const formAction = ref(null);
const usefulInputData = ref();

const abort = () => {
	emit('abort', true);
};

const sendData = () => {
	formAction.value.validate(async (valid) => {
		// console.log(valid);
		if (valid) {
			emit('data', usefulInputData.value);
		} else
			fixError({
				title: 'Error',
				msg: 'Some data cannot be empty!',
				isShow: true,
			});
	});
};

onBeforeMount(() => {
	usefulInputData.value = props.inputData;
	console.log(usefulInputData.value);
});
</script>

<template>
	<main>
		<el-form
			label-position="left"
			ref="formAction"
			:model="usefulInputData"
			:rules="adminRules"
		>
			<div v-for="itemKey in props.showInput" :key="itemKey">
				<el-form-item
					:label="firstStringUpperCase(itemKey)"
					style="margin-bottom: 30px; width: 40em"
					class="form-label"
					:prop="itemKey"
				>
					<el-input
						type="text"
						v-model="usefulInputData[itemKey]"
						autocomplete="off"
					>
					</el-input>
				</el-form-item>
			</div>
			<div v-for="itemKey in props.showSelect" :key="itemKey">
				<el-form-item
					:label="firstStringUpperCase(itemKey)"
					style="margin-bottom: 30px; width: 40em"
					class="form-label"
					:prop="itemKey"
				>
					<select v-model="usefulInputData[itemKey]">
						<option
							v-for="item in selectItems[itemKey]"
							:key="item.opt"
							:value="item.val"
						>
							{{ item.opt }}
						</option>
					</select>
				</el-form-item>
			</div>
		</el-form>
	</main>
	<footer>
		<el-button class="btn" @click="sendData">
			{{ props.isEdit ? 'Edit' : 'Add' }}
		</el-button>
		<el-button class="btn" v-if="props.isEdit" @click="abort">
			Abort
		</el-button>
	</footer>
</template>

<style lang="scss">
@import '../assets/scss/_color.scss';
@import '../assets/scss/_style.scss';
main {
	overflow: auto;
	width: 100%;
	height: 90%;
	.el-form-item__label {
		font-size: 20px;
		width: 150px;
	}
	select {
		@extend %select;
		width: 50em;
	}
}
footer {
	width: 100%;
	height: 10%;
	display: flex;
	justify-content: flex-end;
	.btn {
		width: 15%;
	}
}
</style>
