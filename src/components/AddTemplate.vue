<script setup>
import { useParameterStore } from '@/store/parameter';
import { storeToRefs } from 'pinia';
import { firstStringUpperCase, getBase64, depCopy } from '@/utils';
import { onBeforeMount, ref, watch } from 'vue';
import { genFileId } from 'element-plus';
import dayjs from 'dayjs';

const emit = defineEmits(['data', 'abort']);
const props = defineProps({
	inputData: {
		type: Object,
		default: () => ({}),
	},
	path: {
		type: String,
		default: '',
	},
	showInput: {
		type: Array,
		default: () => [],
	},
	showSelect: {
		type: Array,
		default: () => [],
	},
	showMultiInput: {
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
	isVersionEdit: {
		type: Number,
		default: -1,
	},
	showVersion: {
		type: Array,
		default: null,
	},
});

const nowPath = ref('');
const versionTarget = ref({});
const { adminRules, loginAdmin } = storeToRefs(useParameterStore());
const { fixError } = useParameterStore();
const formAction = ref(null);
const usefulInputData = ref(depCopy(props.inputData));
const upload = ref();

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
	}

	if (props.isVersionEdit !== -1) {
		// Creator
		versionTarget.value['creator'] = loginAdmin.value._id;
		usefulInputData.value['version'].splice(
			props.isVersionEdit,
			1,
			versionTarget.value
		);
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

const handleRemoveMultiInputData = (key, i) => {
	usefulInputData.value[key].splice(i, 1);
};

const handleNewMultiInputData = (key, i) => {
	usefulInputData.value[key].push('');
};

onBeforeMount(() => {
	if (props.isVersionEdit !== -1) {
		versionTarget.value = depCopy(
			usefulInputData.value['version'][props.isVersionEdit]
		);
		versionTarget.value['create_date'] = dayjs(new Date()).format(
			'YYYY-MM-DD'
		);

		console.log(versionTarget.value);
	}
	nowPath.value = props.path;
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
			<div v-if="props.isVersionEdit === -1">
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
				<!-- Multi Input -->
				<div v-for="itemKey in props.showMultiInput" :key="itemKey">
					<el-form-item
						:label="firstStringUpperCase(itemKey)"
						style="margin-bottom: 30px; width: 40em"
						class="form-label"
						:prop="itemKey"
					>
						<el-button @click="handleNewMultiInputData(itemKey, i)">
							+
						</el-button>
					</el-form-item>
					<div
						v-for="(multiIn, mi) in usefulInputData[itemKey]"
						:key="mi"
						class="pl-60 mb-3"
					>
						<el-input
							type="text"
							v-model="usefulInputData[itemKey][mi]"
							autocomplete="off"
							style="width: 450px"
							class="mr-3"
						>
						</el-input>
						<el-button
							type="danger"
							@click="handleRemoveMultiInputData(itemKey, mi)"
						>
							-
						</el-button>
					</div>
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
			</div>
			<!-- Version -->
			<div v-if="props.showVersion && props.isVersionEdit !== -1">
				<el-form-item
					label="Version :"
					style="margin-bottom: 30px; width: 40em"
					class="form-label"
				>
					<el-input
						type="text"
						v-model="versionTarget['version']"
						autocomplete="off"
					>
					</el-input>
				</el-form-item>
				<el-form-item
					label="Status :"
					style="margin-bottom: 30px; width: 40em"
					class="form-label"
				>
					<el-select
						v-model="versionTarget['status']"
						placeholder="Select"
					>
						<el-option
							v-for="item in props.selectItems['status']"
							:key="item.val"
							:value="item.val"
							:label="item.opt"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					label="Language :"
					style="margin-bottom: 30px; width: 40em"
					class="form-label"
				>
					<el-select
						v-model="versionTarget['language']"
						placeholder="Select"
					>
						<el-option
							v-for="item in props.selectItems['lang']"
							:key="item.val"
							:value="item.val"
							:label="item.opt"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					label="Language Version :"
					style="margin-bottom: 30px; width: 40em"
					class="form-label"
				>
					<el-input
						type="number"
						v-model="versionTarget['language_version']"
						autocomplete="off"
					>
					</el-input>
				</el-form-item>
				<el-form-item
					label="Creator Date :"
					style="margin-bottom: 30px; width: 40em"
					class="form-label"
				>
					<el-date-picker
						v-model="versionTarget['create_date']"
						type="date"
						placeholder="Pick a day"
						size="default"
					/>
				</el-form-item>
			</div>
		</el-form>
	</main>
	<footer>
		<el-button class="btn" @click="sendData">
			{{ props.isEdit ? 'Edit' : 'Add' }}
		</el-button>
		<el-button class="btn" @click="abort"> Abort </el-button>
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
		@apply w-144 h-auto border-2 rounded-lg flex flex-col p-3 ml-8 mb-10;
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
