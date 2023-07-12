<script setup>
import { depCopy } from '@/utils';
import { onBeforeMount, reactive, ref } from 'vue';

// default
const p_mode_1_empty = ref({
	key: '',
	description: '',
	binMode: 1,
	scanType: [],
	unit: [],
	sCMD: false,
	offset: {
		number: 0,
		start: 0,
		totalLens: 2,
		totalOffset: [0, 0],
		type: {},
		typeStyle: 'none',
	},
});

const optionsMode_1 = [
	{
		desc: 'none',
		val: 'none',
	},
	{
		desc: 'ASCII',
		val: 'ASCII',
	},
	{
		desc: 'ASCII_3',
		val: 'ASCII_3',
	},
	{
		desc: 'NUMBER',
		val: 'NUMBER',
	},
];

const isMax = [
	{
		desc: 'Max',
		val: 1,
	},
	{
		desc: 'Min',
		val: 0,
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
const option_1 = ref([]);
const variable = reactive({
	desc: 'User-defined',
	limit: 3000,
	min: 0,
	control: [],
	isMax: 1,
});

const checkEmpty = () =>
	nowData.value.key &&
	nowData.value.description &&
	nowData.value.scanType.length &&
	nowData.value.offset.totalLens >= 2 &&
	!nowData.value.offset.totalOffset.find((el) => !el);

const checkHasOption = () =>
	nowData.value.offset.typeStyle === 'none' ||
	nowData.value.offset.typeStyle === 'ASCII_3';

const abort = () => {
	emit('abort', true);
};

const getPMode1 = () => {
	if (!checkEmpty()) return;
	if (checkHasOption() && !option_1.value.length) return;
	const typeStyle = nowData.value.offset.typeStyle;
	// Start
	nowData.value.offset.start = Math.min.apply(
		null,
		nowData.value.offset.totalOffset
	);

	if (typeStyle === 'ASCII' || typeStyle === 'ASCII_3') {
		nowData.value.offset.type = {
			variable: {
				description: variable.desc,
				set: 'ud',
			},
			...nowData.value.offset.type,
		};
	}

	if (typeStyle === 'NUMBER') {
		nowData.value.offset.type = {
			variable: {
				description: variable.desc,
				set: 'ud',
				limit: variable.limit,
				min: variable.min,
			},
			...nowData.value.offset.type,
		};
		nowData.value.offset['control'] = [...variable.control, variable.isMax];
	}

	if (checkHasOption()) {
		let obj = {};
		option_1.value.forEach((opt, o) => {
			obj[o] = opt;
		});
		nowData.value.offset.type = {
			...obj,
			...nowData.value.offset.type,
		};
	}
	emit('data', nowData.value);

	// console.log(nowData.value);
};

const pickAllScanType = (type) => {
	nowData.value['scanType'] = type === 'a' ? props.scanTypeOptions : [];
};

const generalSet = (x = 1) => {
	if (x) nowData.value.offset.totalOffset = [];
	if (
		nowData.value.offset.totalLens !==
		nowData.value.offset.totalOffset.length
	)
		for (let i = 0; i < nowData.value.offset.totalLens; i++) {
			nowData.value.offset.totalOffset.push(0);
		}

	if (option_1.value.length) {
		for (let i = 0; i < option_1.value.length; i++) {
			option_1.value[i].set = nowData.value.offset.totalOffset.map(
				() => 0
			);
		}
	}
	variable.control = nowData.value.offset.totalOffset.map(() => 0);
};

const addNewOption = () =>
	option_1.value.push({
		description: '',
		set: nowData.value.offset.totalOffset.map(() => 0),
	});

const optionObj2Arr = (obj) => {
	const { variable, ...other } = obj;
	let arr = [];
	for (const key in other) {
		arr.push(other[key]);
	}

	return arr;
};

onBeforeMount(() => {
	// console.log(props.useData);
	btnName.value = !Object.keys(props.useData).length ? 'Add' : 'Edit';
	nowData.value = !Object.keys(props.useData).length
		? depCopy(p_mode_1_empty.value)
		: depCopy(props.useData);
	if (nowData.value.offset.control)
		variable.isMax = nowData.value.offset.control[2];
	generalSet(0);
	if (checkHasOption())
		option_1.value = optionObj2Arr(nowData.value.offset.type);
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
			<!-- Offset Length -->
			<el-form-item
				label="Total Length :"
				style="margin-bottom: 30px; width: 20em"
				class="form-label mr-6"
			>
				<el-input
					type="text"
					v-model="nowData.offset.totalLens"
					autocomplete="off"
					@input="generalSet"
				/>
			</el-form-item>
			<!-- Total Offset -->
			<el-form-item
				label="Total Offset :"
				style="margin-bottom: 30px; width: 80em"
				class="form-label mr-6"
			>
				<div class="flex flex-row w-full">
					<el-input
						type="number"
						v-for="(set, i) in nowData.offset.totalOffset"
						v-model="nowData.offset.totalOffset[i]"
						autocomplete="off"
						style="width: 8%"
						class="mr-2"
					/>
				</div>
			</el-form-item>
			<!-- Type Style -->
			<el-form-item
				label="Scanner Type :"
				style="margin-bottom: 30px; width: 25em"
				class="form-label mr-6"
			>
				<el-select
					v-model="nowData.offset.typeStyle"
					placeholder="Select"
					style="width: 500px"
					@change="generalSet"
				>
					<el-option
						v-for="item in optionsMode_1"
						:key="item.val"
						:value="item.val"
						:label="item.desc"
					></el-option>
				</el-select>
			</el-form-item>
			<!-- INPUT NUMBER -->
			<el-form-item
				label="Customize Number :"
				style="margin-bottom: 30px; width: 20em"
				class="form-label mr-6"
			>
				<el-input
					type="text"
					v-model="nowData.offset.number"
					autocomplete="off"
				/>
			</el-form-item>
			<!-- OPTION type -->
			<div v-if="checkHasOption()" class="mb-3">
				<el-form-item
					label="Options :"
					style="margin-bottom: 30px; width: 40em"
					class="form-label"
				>
					<el-button @click="addNewOption">+</el-button>
				</el-form-item>
				<div
					class="flex items-center"
					v-for="(opt, o) in option_1"
					:key="o + '1'"
				>
					<el-button type="danger"> - </el-button>
					<div
						class="w-144 h-30 border-2 rounded-lg flex flex-col p-3 ml-8 overflow-auto"
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
							style="width: 40em"
							class="form-label"
						>
							<el-input
								type="number"
								v-for="(set, i) in opt.set"
								v-model.number="opt.set[i]"
								style="width: 60px; margin-right: 5px"
								autocomplete="off"
							>
							</el-input>
						</el-form-item>
					</div>
				</div>
			</div>
			<!-- MAKE USER DEFINED DESC -->
			<div v-if="nowData['offset']['typeStyle'] !== 'none'">
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
			<!-- MAKE LIMITED & MIN & CONTROL-->
			<div v-if="nowData['offset']['typeStyle'] === 'NUMBER'">
				<el-form-item
					label="Limited :"
					style="margin-bottom: 30px; width: 25em"
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
					style="margin-bottom: 30px; width: 25em"
					class="form-label"
				>
					<el-input
						type="number"
						v-model.number="variable.min"
						autocomplete="off"
						control="false"
					/>
				</el-form-item>
				<!-- Control -->
				<el-form-item
					label="Control Offset :"
					style="margin-bottom: 30px; width: 80em"
					class="form-label mr-6"
				>
					<div class="flex flex-row w-full">
						<el-input
							type="number"
							v-for="(set, i) in variable.control"
							v-model="variable.control[i]"
							autocomplete="off"
							style="width: 8%"
							class="mr-2"
						/>
					</div>
				</el-form-item>
				<!-- Is Max || Min -->
				<el-form-item
					label="Is this parameter the max ?"
					style="margin-bottom: 30px; width: 25em"
					class="form-label mr-6"
				>
					<el-select
						v-model="variable.isMax"
						placeholder="Select"
						style="width: 500px"
					>
						<el-option
							v-for="item in isMax"
							:key="item.val"
							:value="item.val"
							:label="item.desc"
						></el-option>
					</el-select>
				</el-form-item>
			</div>
		</el-form>
		<div class="flex justify-end mt-3">
			<el-button @click="getPMode1">{{ btnName }}</el-button>
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
