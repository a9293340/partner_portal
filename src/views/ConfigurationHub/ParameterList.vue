<script setup>
import { depCopy } from '@/utils';
import { onBeforeMount, reactive, ref, watch } from 'vue';

// empty
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

const p_mode_1_empty = ref({
	key: '',
	description: '',
	binMode: 1,
	scanType: [],
	offset: {
		totalLens: 2,
		start: 0,
		totalOffset: [0, 1],
		number: 0,
		typeStyle: 'none',
		type: {},
	},
});

// Options
const modeOptions = [
	{
		desc: 'One by One',
		val: 0,
	},
	{
		desc: 'One by More',
		val: 1,
	},
];

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

// parameter
const modeSelect = ref(0);
const nowEmpty = ref({});
const options_0 = ref([]);
const hasUnit = ref(false);
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
	nowEmpty.value.val.type === 'NORMAL' ||
	nowEmpty.value.val.type === 'ASCII_2' ||
	nowEmpty.value.val.type === 'NUMBER1';

const checkNowEmpty_0 = () =>
	nowEmpty.value.key &&
	nowEmpty.value.description &&
	nowEmpty.value.scanType.length &&
	nowEmpty.value.offset;

// function
const pickEmpty = () => {
	nowEmpty.value = modeSelect.value
		? depCopy(p_mode_1_empty.value)
		: depCopy(p_mode_0_empty.value);
};

const pickAllScanType = (type) => {
	nowEmpty.value['scanType'] = type === 'a' ? scanTypeOptions : [];
	setUnit();
};

const setUnit = () => {
	if (!hasUnit.value || !nowEmpty.value['scanType'].length)
		nowEmpty.value['unit'] = [];
	else {
		nowEmpty.value['unit'] = [];
		nowEmpty.value['scanType'].forEach((st) => {
			nowEmpty.value['unit'].push({
				scannerType: st,
				desc: '',
			});
		});
	}
};

const addNewOption_0 = () =>
	options_0.value.push({
		description: '',
		set: 0,
	});

const removeOptions_0 = (o) => options_0.value.splice(o, 1);

const getPMode0 = () => {
	if (checkOptions_0()) if (!options_0.value.length) return;
	if (!checkNowEmpty_0()) return;

	if (
		nowEmpty.value['val']['type'] === 'ASCII' ||
		nowEmpty.value['val']['type'] === 'ASCII_2'
	) {
		nowEmpty.value['val'] = {
			variable: {
				description: variable.desc,
				set: 'ud',
				limited: false,
			},
			...nowEmpty.value['val'],
		};
	} else if (
		nowEmpty.value['val']['type'] === 'NUMBER' ||
		nowEmpty.value['val']['type'] === 'NUMBER1'
	) {
		nowEmpty.value['val'] = {
			variable: {
				description: variable.desc,
				set: 'ud',
				limited: variable.limit,
				min: variable.min,
			},
			...nowEmpty.value['val'],
		};
	}

	if (checkOptions_0()) {
		let obj = {};
		options_0.value.forEach((opt) => {
			obj[`${opt.set}`] = opt;
		});

		nowEmpty.value['val'] = {
			...obj,
			...nowEmpty.value['val'],
		};
	}

	console.log(nowEmpty.value);
};

const pickOptionMode = () => {
	if (modeSelect.value) {
		// mode 1
	} else {
		// mode 0
		if (
			p_mode_0_empty.value.val.type === 'ASCII' ||
			p_mode_0_empty.value.val.type === 'NUMBER'
		)
			options_0.value = [];
	}
};

onBeforeMount(() => {
	pickEmpty();
});
</script>

<template>
	<div class=".para-zone flex flex-col p-5 overflow-auto">
		<el-form-item
			label="Mode(Parameter/Offset) :"
			style="margin-bottom: 30px; width: 40em"
			class="form-label"
		>
			<el-select
				@change="pickEmpty"
				v-model="modeSelect"
				placeholder="Select"
			>
				<el-option
					v-for="item in modeOptions"
					:key="item.val"
					:value="item.val"
					:label="item.desc"
				></el-option>
			</el-select>
		</el-form-item>
		<div v-if="modeSelect === 0" class="parameter-add flex flex-col">
			<h1 class="mb-3 text-lg font-bold">
				One By One(Parameter / Offset)
			</h1>
			<el-form label-position="left" ref="formAction" :model="nowEmpty">
				<!-- key -->
				<el-form-item
					label="Key :"
					style="margin-bottom: 30px; width: 40em"
					class="form-label"
				>
					<el-input
						type="text"
						v-model="nowEmpty['key']"
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
						v-model="nowEmpty['description']"
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
						v-model="nowEmpty['scanType']"
						placeholder="Select"
						style="width: 500px"
						multiple
						@change="setUnit"
					>
						<el-option
							v-for="item in scanTypeOptions"
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
					v-if="nowEmpty['scanType'].length"
					v-model="hasUnit"
					label="Unit"
					autocomplete="off"
					style="margin-bottom: 20px; font-size: 20px"
				/>
				<div
					v-if="hasUnit && nowEmpty['scanType'].length"
					class="w-144 h-70 overflow-auto border-2 rounded-lg flex flex-row flex-wrap p-3 ml-8 mb-10"
				>
					<div
						v-for="unit in nowEmpty.unit"
						class="flex flex-row justify-start w-1/2"
					>
						<el-form-item
							:label="`${unit.scannerType} :`"
							style="margin-bottom: 30px; width: 40em"
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
				<!-- Offset -->
				<el-form-item
					label="Offset :"
					style="margin-bottom: 30px; width: 10em"
					class="form-label"
				>
					<el-input
						type="number"
						v-model.number="nowEmpty['offset']"
						autocomplete="off"
						control="false"
					/>
				</el-form-item>
				<!-- option -->
				<el-form-item
					label="Option Type :"
					style="margin-bottom: 30px; width: 40em"
					class="form-label"
				>
					<el-select
						@change="pickOptionMode"
						v-model="nowEmpty.val.type"
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
				<div v-if="nowEmpty['val']['type'] !== 'NORMAL'">
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
						nowEmpty['val']['type'] === 'NUMBER' ||
						nowEmpty['val']['type'] === 'NUMBER1'
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
				<el-button @click="getPMode0">Add</el-button>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
