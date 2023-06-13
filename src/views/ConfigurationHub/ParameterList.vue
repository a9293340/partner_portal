<script setup>
import { encode, sessionGet } from '@/utils';
import { postList } from '@/utils/api';
import { onBeforeMount, reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useParameterStore } from '@/store/parameter';
import { useComponentStore } from '@/store/component';

const { loginAdmin } = storeToRefs(useParameterStore());
const { page_limit } = storeToRefs(useComponentStore());
const { fixLoading, fixPage_limit } = useComponentStore();

// options
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

const typeOption_1d = [
	{
		desc: 'ALL',
		val: 'ALL',
	},
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

const nowMode = ref(0);
const nowList = ref([]);
const totalData = ref(0);
const nowPage = ref(0);
const filter = reactive({
	desc: '',
	offset: 0,
	type: 'ALL',
});
const nowFilter = ref({});

const pageChange = async (page) => {
	nowPage.value = page - 1;
	await getPModeData();
};

const sizeChange = async (size) => {
	fixPage_limit(size);
	nowPage.value = 0;
	await getPModeData();
};

const getPModeData = async () => {
	try {
		fixLoading(true);
		const data = await postList(
			`p_mode_${nowMode.value}`,
			encode({
				tokenReq: loginAdmin.value.account,
				token: sessionGet('cinoT'),
				limit: page_limit.value,
				page: nowPage.value,
				filter: nowFilter.value,
			})
		);
		nowList.value = data.list;
		totalData.value = data.total;
		fixLoading(false);
		console.log(nowList.value);
	} catch (error) {
		nowList.value = [];
	}
};

// Mode 0

const makeFilter = async (type) => {
	nowFilter.value = {};
	if (type === 's') {
		if (filter.desc) nowFilter.value['description'] = filter.desc;
		if (filter.offset) nowFilter.value['offset'] = filter.offset;
		if (filter.type !== 'ALL') nowFilter.value['val.type'] = filter.type;
	} else {
		filter.desc = '';
		filter.offset = 0;
		filter.type = 'ALL';
	}

	await getPModeData();
};

const editAdmin = (row) => {
	console.log(row);
};

//

onBeforeMount(async () => {
	try {
		await getPModeData();
	} catch (error) {}
});
</script>

<template>
	<div class="w-full h-11/12 flex flex-col items-center">
		<div class="h-11/12 overflow-auto">
			<el-form-item
				label="Mode :"
				style="margin-bottom: 30px; width: 40em"
				class="form-label"
			>
				<el-select
					v-model="nowMode"
					placeholder="Select"
					@change="getPModeData"
				>
					<el-option
						v-for="item in modeOptions"
						:key="item.val"
						:value="item.val"
						:label="item.desc"
					></el-option>
				</el-select>
			</el-form-item>
			<div class="flex flex-row items-start">
				<el-form-item label="Desc:">
					<el-input
						type="text"
						v-model="filter.desc"
						style="width: 300px; margin-right: 10px"
						autocomplete="off"
					/>
				</el-form-item>
				<el-form-item label="Offset:">
					<el-input
						type="number"
						v-model.number="filter.offset"
						style="width: 100px; margin-right: 10px"
						autocomplete="off"
					/>
				</el-form-item>
				<el-form-item
					v-if="!nowMode"
					label="Mode :"
					style="width: 20em"
					class="form-label"
				>
					<el-select v-model="filter.type" placeholder="Select">
						<el-option
							v-for="item in typeOption_1d"
							:key="item.val"
							:value="item.val"
							:label="item.desc"
						></el-option>
					</el-select>
				</el-form-item>
				<el-button @click="makeFilter('s')">Select</el-button>
				<el-button @click="makeFilter('r')">Reset</el-button>
			</div>
			<!-- Table Mode 0 -->
			<el-table
				:data="nowList"
				border
				stripe
				style="max-width: 100%"
				height="100%"
			>
				<!-- offset -->
				<el-table-column
					prop="offset"
					label="Offset"
					width="120"
					v-if="!nowMode"
				/>
				<!-- key -->
				<el-table-column prop="key" label="Key" width="180" />
				<!-- description -->
				<el-table-column
					prop="description"
					label="Description"
					width="300"
				/>
				<!-- Type -->
				<el-table-column
					prop="val.type"
					label="Type"
					width="100"
					v-if="!nowMode"
				/>
				<el-table-column
					prop="offset.typeStyle"
					label="Type"
					width="100"
					v-else
				/>
				<!-- Scanner Type -->
				<el-table-column
					prop="scanType"
					label="Scanner Type"
					width="300"
				/>
				<!-- edit -->
				<el-table-column align="center" label="Action">
					<template #default="scope">
						<el-button
							plain
							type="warning"
							size="small"
							@click.prevent="editAdmin(scope.row)"
							>Edit</el-button
						>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="w-full h-1/12 flex justify-center items-center">
			<el-pagination
				v-if="totalData"
				background
				:page-sizes="[5, 10, 20, 50]"
				layout="total,sizes,prev, pager, next"
				:total="totalData"
				:page-count="Math.ceil(totalData / page_limit)"
				:page-size="page_limit"
				@size-change="sizeChange"
				@current-change="pageChange"
			/>
			<el-button class="ml-10">Create</el-button>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
