<script setup>
import { useParameterStore } from '@/store/parameter';
import { storeToRefs } from 'pinia';
import { firstStringUpperCase, getBase64, depCopy } from '@/utils';
import { ref, watch } from 'vue';
import { genFileId } from 'element-plus';

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
		type: String,
		default: '',
	},
	selectItems: {
		type: Object,
		default: () => ({}),
	},
	isEdit: {
		type: Boolean,
		default: false,
	},
	showVersion: {
		type: Array,
		default: null,
	},
});
const versionTemplate = {
	version: '',
	create_date: '',
	creator: '',
	download_path: '',
	status: 0,
};
const { adminRules } = storeToRefs(useParameterStore());
const { fixError } = useParameterStore();
const formAction = ref(null);
const usefulInputData = ref(depCopy(props.inputData));
const upload = ref();
const versionCheck = ref([]);
const versionInputKeys = ref(['version', 'download_path']);

const abort = () => {
	emit('abort', true);
};

const getBase = async (files) => {
	usefulInputData.value[props.showSpecial] = await getBase64(files.raw);
};
const removeImg = () => (usefulInputData.value[props.showSpecial] = '');

const sendData = () => {
	if (
		props.showSpecial &&
		!usefulInputData.value[props.showSpecial] &&
		!props.isEdit
	) {
		fixError({
			title: 'Error',
			msg: 'Need to upload Image!',
			isShow: true,
		});
		return;
	} else if (versionCheck.value.filter((x) => x).length) {
		fixError({
			title: 'Error',
			msg: `Version detail Can't be empty!`,
			isShow: true,
		});
		return;
	}
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

const handleExceed = async (files) => {
	upload.value.clearFiles();
	const file = files[0];
	file.uid = genFileId();
	upload.value.handleStart(file);
};

const addNewVersion = () => {
	usefulInputData.value[props.showVersion].push(depCopy(versionTemplate));
	versionCheck.value.push(true);
};

const removeVersion = (v) => {
	usefulInputData.value[props.showVersion].splice(v, 1);
	versionCheck.value.splice(v, 1);
};

const checkVersionEmpty = (v) =>
	Object.values(usefulInputData.value[props.showVersion][v]).filter(
		(ver) => ver === ''
	).length;

watch(usefulInputData.value, () => {
	if (!props.showVersion) return;
	usefulInputData.value[props.showVersion].forEach((ver, v) => {
		versionCheck.value[v] = checkVersionEmpty(v);
	});
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
			<!-- Input -->
			<div v-for="itemKey in props.showInput" :key="itemKey">
				<el-form-item
					:label="firstStringUpperCase(itemKey)"
					style="margin-bottom: 30px; width: 40em"
					class="form-label"
					:prop="itemKey"
				>
					<el-input
						:type="itemKey === 'prefit' ? 'Number' : 'text'"
						v-model="usefulInputData[itemKey]"
						autocomplete="off"
					>
					</el-input>
				</el-form-item>
			</div>
			<!-- Select -->
			<div v-for="itemKey in props.showSelect" :key="itemKey">
				<el-form-item
					:label="firstStringUpperCase(itemKey)"
					style="margin-bottom: 30px; width: 40em"
					class="form-label"
					:prop="itemKey"
				>
					<el-select
						v-model="usefulInputData[itemKey]"
						placeholder="Select"
					>
						<el-option
							v-for="item in props.selectItems[itemKey]"
							:key="item.val"
							:value="item.val"
							:label="item.opt"
						></el-option>
					</el-select>
				</el-form-item>
			</div>
			<!-- Multi Select -->
			<div v-for="itemKey in props.showMultiSelct" :key="itemKey">
				<el-form-item
					:label="firstStringUpperCase(itemKey)"
					style="margin-bottom: 30px; width: 40em"
					class="form-label"
					:prop="itemKey"
				>
					<el-select
						v-model="usefulInputData[itemKey]"
						placeholder="Select"
						multiple
					>
						<el-option
							v-for="item in props.selectItems[itemKey]"
							:key="item.val"
							:value="item.val"
							:label="item.opt"
						></el-option>
					</el-select>
				</el-form-item>
			</div>
			<!-- Image -->
			<el-form-item
				v-if="props.showSpecial"
				:label="firstStringUpperCase(props.showSpecial)"
				style="margin-bottom: 30px; width: 40em"
				class="form-label"
				:prop="props.showSpecial"
			>
				<el-upload
					ref="upload"
					class="upload-demo"
					:limit="1"
					:on-exceed="handleExceed"
					:auto-upload="false"
					accept="image/jpg,image/jpeg,image/png,image/svg"
					:on-remove="removeImg"
					:on-change="getBase"
					list-type="picture"
				>
					<template #trigger>
						<el-button type="primary">select file</el-button>
					</template>
					<template #tip>
						<div class="el-upload__tip text-red">
							limit 1 file, new file will cover the old file
						</div>
					</template>
				</el-upload>
			</el-form-item>
			<!-- Version -->
			<el-form-item
				v-if="props.showVersion"
				label="Version :"
				style="margin-bottom: 30px; width: 40em"
				class="form-label"
				:prop="props.showVersion"
			>
				<el-button @click="addNewVersion">+</el-button>
			</el-form-item>
			<div
				class="flex items-center"
				v-for="(ver, v) in usefulInputData[props.showVersion]"
			>
				<el-button type="danger" @click="removeVersion(v)">
					-
				</el-button>
				<div
					:class="[
						'version-box',
						{
							'version-box-error': versionCheck[v],
						},
					]"
				>
					<el-form-item
						v-for="key in versionInputKeys"
						:key="key"
						:label="firstStringUpperCase(key.replace('_', ' '))"
						style="margin-bottom: 30px; width: 40em"
						class="form-label"
					>
						<el-input
							type="text"
							v-model="ver[key]"
							style="width: 300px"
							autocomplete="off"
						>
						</el-input>
					</el-form-item>
					<el-form-item
						label="Creator :"
						style="margin-bottom: 30px; width: 40em"
						class="form-label"
						:props="ver"
					>
						<el-select v-model="ver.creator" placeholder="Select">
							<el-option
								v-for="item in props.selectItems['creator']"
								:key="item.val"
								:value="item.val"
								:label="item.opt"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item
						label="Create Date :"
						style="margin-bottom: 30px; width: 40em"
						class="form-label"
						:props="ver"
					>
						<el-date-picker
							v-model="ver.create_date"
							type="date"
							placeholder="Pick a day"
							size="default"
						/>
					</el-form-item>
					<el-form-item
						label="Status :"
						style="margin-bottom: 30px; width: 40em"
						class="form-label"
						:props="ver"
					>
						<el-select v-model="ver.status" placeholder="Select">
							<el-option
								v-for="item in props.selectItems['status']"
								:key="item.val"
								:value="item.val"
								:label="item.opt"
							></el-option>
						</el-select>
					</el-form-item>
				</div>
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
	height: 80%;
	.el-form-item__label {
		font-size: 16px;
		width: 240px;
	}
	.version-box {
		@apply w-144 h-80 border-2 rounded-lg flex flex-col p-3 ml-8 mb-10;
	}
	.version-box-error {
		@apply border-red-500;
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
