<script setup>
import { depCopy } from '@/utils';
import { onBeforeMount, ref, watch, reactive } from 'vue';

// default
const p_mode_0_empty = ref({
	key: '',
	description: '',
	binMode: 0,
	scanType: [],
	offset: 0,
	val: {
		type: 'NORMAL',
	},
	unit: [],
});

const optionsMode_0 = [
	{
		desc: 'NORMAL',
		val: 'NORMAL',
	},
	{
		desc: 'ASCII',
		val: 'ASCII',
	},
	{
		desc: 'ASCII_2',
		val: 'ASCII_2',
	},
	{
		desc: 'NUMBER',
		val: 'NUMBER',
	},
	{
		desc: 'NUMBER1',

		val: 'NUMBER1',
	},
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
	scanTypeOptions: {
		type: Array,
		default: [],
	},
});

const btnName = ref('');
const nowData = ref({});
const hasUnit = ref(false);
const options_0 = ref([]);
const variable = reactive({
	desc: 'User-defined',
	limit: 255,
	min: 0,
});

watch(hasUnit, (newIndex) => {
	if (newIndex) setUnit();
});

// check
const checkOptions_0 = () =>
	nowData.value.val.type === 'NORMAL' ||
	nowData.value.val.type === 'ASCII_2' ||
	nowData.value.val.type === 'NUMBER1';

const checknowData_0 = () =>
	nowData.value.key &&
	nowData.value.description &&
	nowData.value.scanType.length &&
	nowData.value.offset;

const addNewOption_0 = () =>
	options_0.value.push({
		description: '',
		set: 0,
	});

const removeOptions_0 = (o) => options_0.value.splice(o, 1);

const pickAllScanType = (type) => {
	nowData.value['scanType'] = type === 'a' ? props.scanTypeOptions : [];
	setUnit();
};

const setUnit = () => {
	if (!hasUnit.value || !nowData.value['scanType'].length)
		nowData.value['unit'] = [];
	else {
		nowData.value['unit'] = [];
		nowData.value['scanType'].forEach((st) => {
			nowData.value['unit'].push({
				scannerType: st,
				desc: '',
			});
		});
	}
};

const pickOptionMode = () => {
	if (
		nowData.value.val.type === 'ASCII' ||
		nowData.value.val.type === 'NUMBER'
	)
		options_0.value = [];
};

const getPMode0 = () => {
	// console.log(0);
	if (checkOptions_0() && !options_0.value.length) return;
	// console.log(1);
	if (!checknowData_0()) return;
	// console.log(2);

	if (
		nowData.value['val']['type'] === 'ASCII' ||
		nowData.value['val']['type'] === 'ASCII_2'
	) {
		nowData.value['val'] = {
			variable: {
				description: variable.desc,
				set: 'ud',
				limited: false,
			},
			...nowData.value['val'],
		};
	} else if (
		nowData.value['val']['type'] === 'NUMBER' ||
		nowData.value['val']['type'] === 'NUMBER1'
	) {
		nowData.value['val'] = {
			variable: {
				description: variable.desc,
				set: 'ud',
				limited: variable.limit,
				min: variable.min,
			},
			...nowData.value['val'],
		};
	}

	if (checkOptions_0()) {
		let obj = {};
		options_0.value.forEach((opt) => {
			obj[`${opt.set}`] = opt;
		});

		nowData.value['val'] = {
			...obj,
			...nowData.value['val'],
		};
	}
	emit('data', nowData.value);
};

const optionObj2Arr = (obj) => {
	const { type, variable, ...other } = obj;
	let arr = [];
	for (const key in other) {
		arr.push(other[key]);
	}

	return arr;
};

const abort = () => {
	emit('abort', true);
};

onBeforeMount(() => {
	btnName.value = !Object.keys(props.useData).length ? 'Add' : 'Edit';
	nowData.value = !Object.keys(props.useData).length
		? depCopy(p_mode_0_empty.value)
		: depCopy(props.useData);
	if (nowData.value['unit'].length) {
		hasUnit.value = true;
		setUnit();
	}
	if (checkOptions_0()) options_0.value = optionObj2Arr(nowData.value['val']);
	// console.log();
});
</script>

<template>
	<div class="main">
		<el-form
			label-position="left"
			ref="formAction"
			:model="nowData"
			class="h-128 overflow-auto"
		>
			<!-- key -->
			<el-form-item
				label="Key :"
				style="margin-bottom: 30px; width: 40em"
				class="form-label"
			>
				<el-input
					type="text"
					v-model="nowData['key']"
					autocomplete="off"
				/>
			</el-form-item>
			<!-- Description -->
			<el-form-item
				label="Description :"
				style="margin-bottom: 30px; width: 40em"
				class="form-label"
			>
				<el-input
					type="text"
					v-model="nowData['description']"
					autocomplete="off"
				/>
			</el-form-item>
			<!-- Offset -->
			<el-form-item
				label="Offset :"
				style="margin-bottom: 30px; width: 20em"
				class="form-label"
			>
				<el-input
					type="number"
					v-model.number="nowData['offset']"
					autocomplete="off"
					control="false"
				/>
			</el-form-item>
			<!-- Scanner Type -->
			<el-form-item
				label="Scanner Type :"
				style="margin-bottom: 30px; width: 60em"
				class="form-label"
			>
				<el-select
					v-model="nowData['scanType']"
					placeholder="Select"
					style="width: 500px"
					multiple
					@change="setUnit"
				>
					<el-option
						v-for="item in props.scanTypeOptions"
						:key="item"
						:value="item"
						:label="item"
					></el-option>
				</el-select>
				<el-button class="ml-4" @click="pickAllScanType('a')"
					>All
				</el-button>
				<el-button class="ml-4" @click="pickAllScanType('c')"
					>Clear
				</el-button>
			</el-form-item>
			<!-- unit -->
			<el-checkbox
				v-if="nowData['scanType'].length"
				v-model="hasUnit"
				label="Unit"
				autocomplete="off"
				style="margin-bottom: 20px; font-size: 20px"
			/>
			<div
				v-if="hasUnit && nowData['scanType'].length"
				class="w-168 h-70 overflow-auto border-2 rounded-lg flex flex-row flex-wrap p-3 ml-8 mb-10"
			>
				<div
					v-for="unit in nowData.unit"
					class="flex flex-row justify-start flex-wrap w-1/2"
				>
					<el-form-item
						:label="`${unit.scannerType} :`"
						style="margin-bottom: 10px"
						class="form-label"
					>
						<el-input
							type="text"
							v-model="unit.desc"
							style="width: 150px"
							autocomplete="off"
						/>
					</el-form-item>
				</div>
			</div>
			<!-- option -->
			<el-form-item
				label="Option Type :"
				style="margin-bottom: 30px; width: 40em"
				class="form-label"
			>
				<el-select
					@change="pickOptionMode"
					v-model="nowData.val.type"
					placeholder="Select"
				>
					<el-option
						v-for="item in optionsMode_0"
						:key="item.val"
						:value="item.val"
						:label="item.desc"
					></el-option>
				</el-select>
			</el-form-item>
			<!-- MAKE OPTIONS -->
			<div v-if="checkOptions_0()">
				<el-form-item
					label="Options :"
					style="margin-bottom: 30px; width: 40em"
					class="form-label"
				>
					<el-button @click="addNewOption_0">+</el-button>
				</el-form-item>
				<div
					class="flex items-center"
					v-for="(opt, o) in options_0"
					:key="o + '1'"
				>
					<el-button type="danger" @click="removeOptions_0(o)">
						-
					</el-button>
					<div
						class="w-144 h-30 border-2 rounded-lg flex flex-col p-3 ml-8 mb-10"
					>
						<el-form-item
							label="Description :"
							style="margin-bottom: 30px; width: 40em"
							class="form-label"
						>
							<el-input
								type="text"
								v-model="opt.description"
								style="width: 300px"
								autocomplete="off"
							>
							</el-input>
						</el-form-item>
						<el-form-item
							label="Set :"
							style="margin-bottom: 30px; width: 40em"
							class="form-label"
						>
							<el-input
								type="number"
								v-model.number="opt.set"
								style="width: 80px"
								autocomplete="off"
							>
							</el-input>
						</el-form-item>
					</div>
				</div>
			</div>
			<!-- MAKE USER DEFINED DESC -->
			<div v-if="nowData['val']['type'] !== 'NORMAL'">
				<el-form-item
					label="User Defined Description :"
					style="margin-bottom: 30px; width: 40em"
					class="form-label"
				>
					<el-input
						type="text"
						v-model="variable.desc"
						autocomplete="off"
						control="false"
					/>
				</el-form-item>
			</div>
			<!-- MAKE LIMITED & MIN -->
			<div
				v-if="
					nowData['val']['type'] === 'NUMBER' ||
					nowData['val']['type'] === 'NUMBER1'
				"
			>
				<el-form-item
					label="Limited :"
					style="margin-bottom: 30px; width: 10em"
					class="form-label"
				>
					<el-input
						type="number"
						v-model.number="variable.limit"
						autocomplete="off"
						control="false"
					/>
				</el-form-item>
				<el-form-item
					label="Min :"
					style="margin-bottom: 30px; width: 10em"
					class="form-label"
				>
					<el-input
						type="number"
						v-model.number="variable.min"
						autocomplete="off"
						control="false"
					/>
				</el-form-item>
			</div>
		</el-form>
		<div class="flex justify-end mt-3">
			<el-button @click="getPMode0">{{ btnName }}</el-button>
			<el-button @click="abort">Abort</el-button>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/_color.scss';
@import '../assets/scss/_style.scss';
.main {
	width: 100%;
	height: 100%;
	select {
		@extend %select;
	}
	.el-form-item__label {
		font-size: 16px;
	}
}
</style>
