<script setup>
import { ref, onBeforeMount } from 'vue';
import { depCopy, firstStringUpperCase } from '@/utils';
import { useComponentStore } from '@/store/component';
import { useParameterStore } from '@/store/parameter';
import { storeToRefs } from 'pinia';
import dayjs from 'dayjs';

const { creatorList, statusList, page_limit, isOpenAddPop } = storeToRefs(
	useComponentStore()
);
const { loginAdmin } = storeToRefs(useParameterStore());
const { loginAction } = useParameterStore();
const {
	fixPage_limit,
	getDataByPage,
	getEditData,
	removeItem,
	whichSelectOptionsShouldBeGet,
	fixLoading,
	fixOpenAddPop,
	addItem,
	tableRowClassName,
} = useComponentStore();

const emit = defineEmits(['row']);
const empty = [
	{
		path: 'admin',
		val: {
			name: '',
			permissions: 1,
			company: '',
			status: 0,
			account: '',
			password: '',
			email: '',
			last_login_time: '',
		},
	},
	{
		path: 'document',
		val: {
			name: '',
			document_type_id: '',
			version: [],
			prefit: [0],
		},
	},
	{
		path: 'documentType',
		val: {
			name: '',
		},
	},
	{
		path: 'firmware',
		val: {
			name: '',
			version: [],
			prefit: [0],
		},
	},
	{
		path: 'prefit',
		val: {
			name: '',
			prefit: 0,
		},
	},
	{
		path: 'product',
		val: {
			name: '',
			production_type_id: '',
			photo: '',
			slogan: '',
			documents_id: [],
			firmware_id: [],
			prefit: [0],
		},
	},
	{
		path: 'productionType',
		val: {
			name: '',
			photo: '',
		},
	},
];
const props = defineProps({
	routerType: {
		type: Number,
		default: 0,
	},
	path: {
		type: String,
		default: '',
	},
	normalKeys: {
		type: Array,
		default: () => [],
	},
	hasVersion: {
		type: Boolean,
		default: false,
	},
	hasImage: {
		type: Array,
		default: () => [],
	},
	hasRemove: {
		type: Boolean,
		default: false,
	},
	title: {
		type: String,
		default: 'EMPTY',
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
	showVersion: {
		type: Array,
		default: null,
	},
});

const triggerEditOrAdd = ref(null);

const adList = ref();
const totalData = ref();
const nowPage = ref(0);
const editTarget = ref({});

const specialList = ref([]);
const selectItems = ref({});

const totalWidth = ref(0);

const emptyData = ref({});
const filter = ref({});

const editAdmin = (row) => {
	triggerEditOrAdd.value = 'E';
	editTarget.value = row;
	fixOpenAddPop(true);
};

const removeAdmin = async (data) => {
	await removeItem(data, props.path, async () => {
		await resetData('R', data);
	});
};

const getAddItem = async (data) => {
	const final = async () => {
		await resetData(triggerEditOrAdd.value, data);
		triggerEditOrAdd.value = null;
		fixOpenAddPop(false);
		console.log(isOpenAddPop.value);
	};
	if (props.path === 'admin' && triggerEditOrAdd.value === 'A') {
		data['create_date'] = dayjs().format('YYYY-MM-DD HH:mm:ss');
		data['action_log'] = [];
	}
	if (triggerEditOrAdd.value === 'A') await addItem(data, props.path, final);
	if (triggerEditOrAdd.value === 'E')
		await getEditData(data, props.path, final);
};

const actionLog = async (type, data) => {
	let detail = {
		path: props.path,
		target: data._id,
		from: {},
		to: {},
	};
	if (type === 'E') {
		const keys = Object.keys(data);
		let from = {};
		let to = {};
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			if (
				JSON.stringify(data[key]) !==
				JSON.stringify(editTarget.value[key])
			) {
				if (key !== 'version') {
					from[key] = editTarget.value[key];
					to[key] = data[key];
				} else {
					for (let x = 0; x < data[key].length; x++) {
						const after = data[key][x];
						const before = editTarget.value[key][x];
						if (JSON.stringify(after) !== JSON.stringify(before)) {
							const childKeys = Object.keys(after);
							childKeys.forEach((ke) => {
								if (ke === 'version') {
									from['ver_target'] = before[ke];
									to['ver_target'] = after[ke];
								} else if (before[ke] !== after[ke]) {
									from[ke] = before[ke];
									to[ke] = after[ke];
								}
							});
						}
					}
				}
			}
		}
		detail.from = from;
		detail.to = to;
	}
	const log = {
		time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
		type,
		detail,
	};

	const final = depCopy(loginAdmin.value['action_log']);
	final.push(log);
	if (final.length > 100) final.shift();

	await getEditData(
		{ action_log: final, _id: loginAdmin.value['_id'] },
		'admin',
		() => {
			let newTarget = depCopy(loginAdmin.value);
			newTarget['action_log'] = final;
			loginAction(newTarget);
			emit('row', true);
		},
		false
	);
};

const resetData = async (type, data) => {
	const tar = await getDataByPage(
		nowPage.value,
		props.path,
		false,
		filter.value
	);
	adList.value = tar.list;
	totalData.value = tar.total;
	await actionLog(type, data);
};

const pageChange = async (page) => {
	nowPage.value = page - 1;
	adList.value = (
		await getDataByPage(nowPage.value, props.path, true, filter.value)
	).list;
};

const sizeChange = async (size) => {
	fixPage_limit(size);
	adList.value = (
		await getDataByPage(0, props.path, true, filter.value)
	).list;
};

const countTotalTableLength = () => {
	totalWidth.value =
		props.normalKeys.length >= 2
			? props.normalKeys.reduce((a, b) => a.width + b.width)
			: props.normalKeys[0].width;
	totalWidth.value +=
		specialList.value.length >= 2
			? specialList.value.reduce((a, b) => a.width + b.width)
			: specialList.value[0]
			? specialList.value[0].width
			: 0;
	if (props.hasImage.length) totalWidth.value += props.hasImage[0].width;
	if (props.hasVersion) totalWidth.value += 260;
	totalWidth.value += props.hasRemove ? 300 : 150;
	if (totalWidth.value > 1440) totalWidth.value = 1620;
};

const openCreatePop = () => {
	// console.log(props.path);
	triggerEditOrAdd.value = 'A';
	emptyData.value = empty.find((el) => el.path === props.path).val;
	fixOpenAddPop(true);
};

onBeforeMount(async () => {
	if (props.path === 'admin' && loginAdmin.value.permissions) {
		filter.value = {
			permissions: [20, 21],
		};
	}
	fixLoading(true);
	if (props.routerType !== 1000) {
		const res = await whichSelectOptionsShouldBeGet(props.routerType);
		// console.log(res);
		selectItems.value = res.data;
		specialList.value = res.edit;
	}
	countTotalTableLength();
	try {
		const res = await getDataByPage(0, props.path, false, filter.value);
		totalData.value = res.total;
		adList.value = res.list;
		// console.log(adList.value);
	} catch (error) {
		adList.value = [];
	}
	fixLoading(false);
});
</script>

<template>
	<div class="w-full h-full flex flex-col items-center">
		<div
			class="h-11/12 overflow-auto"
			:style="`max-width: ${totalWidth}px`"
		>
			<el-table
				:data="adList"
				border
				:header-cell-style="{ 'text-align': 'center' }"
				:row-style="tableRowClassName"
			>
				<!-- Extend -->
				<el-table-column
					type="expand"
					v-if="props.hasVersion"
					class="p-4"
				>
					<template #default="props">
						<div class="m-10">
							<el-table
								:data="props.row.version"
								style="width: 1200px; margin-left: 0px"
								:row-style="tableRowClassName"
							>
								<el-table-column
									width="200"
									label="Version"
									prop="version"
								/>
								<el-table-column width="150" label="Creator">
									<template #default="propsChild">
										<div>
											<span
												v-if="
													Object.keys(creatorList)
														.length
												"
												>{{
													creatorList.find(
														(x) =>
															x.val ===
															propsChild.row
																.creator
													).opt
												}}</span
											>
										</div>
									</template>
								</el-table-column>
								<el-table-column
									width="200"
									label="Create Date"
									prop="create_date"
								/>
								<el-table-column
									label="Status"
									prop="status"
									width="120"
								>
									<template #default="propsChild">
										<span>{{
											statusList.find(
												(x) =>
													x.val ===
													propsChild.row.status
											).opt
										}}</span>
									</template>
								</el-table-column>
								<el-table-column
									label="Download Path"
									prop="download_path"
									:show-overflow-tooltip="true"
								/>
							</el-table>
						</div>
					</template>
				</el-table-column>
				<!-- Image -->
				<el-table-column
					v-for="img in props.hasImage"
					:key="img"
					align="center"
					:prop="firstStringUpperCase(img.key)"
					:label="img.key"
					:width="img.width"
				>
					<template #default="scope">
						<img
							class="w-48 h-auto"
							:src="scope.row.photo"
							alt=""
						/>
					</template>
				</el-table-column>
				<!-- Normal -->
				<el-table-column
					v-for="normal in props.normalKeys"
					:key="normal.key"
					:prop="normal.key"
					:label="firstStringUpperCase(normal.key)"
					:width="normal.width"
					:show-overflow-tooltip="true"
				/>
				<!-- Specail List -->
				<el-table-column
					v-for="spa in specialList"
					:key="spa.key"
					:label="firstStringUpperCase(spa.key)"
					:prop="spa.key"
					:width="spa.width"
					:show-overflow-tooltip="true"
					sortable
				>
					<template #default="scope">
						<span
							v-if="
								spa.list.find(
									(el) => el.val === scope.row[spa.key]
								)
							"
							>{{
								spa.list.find(
									(el) => el.val === scope.row[spa.key]
								).opt
							}}</span
						>
					</template>
				</el-table-column>
				<!-- Version -->
				<el-table-column
					v-if="props.hasVersion"
					prop="version"
					label="Version(version/date)"
					width="200"
					:show-overflow-tooltip="true"
				>
					<template class="flex flex-col" #default="scope">
						<div v-if="scope.row.version?.length">
							<span>{{ scope.row.version[0].version }}</span>
							<span class="mr-3">
								({{
									dayjs(
										scope.row.version[0].create_date
									).format('YYYY-MM-DD')
								}})
							</span>
						</div>
					</template>
				</el-table-column>
				<!-- Button -->
				<el-table-column
					align="center"
					label="Action"
					:max-width="props.hasRemove ? 300 : 150"
					:min-width="props.hasRemove ? 250 : 100"
				>
					<template #default="scope">
						<el-button
							plain
							type="warning"
							size="small"
							@click.prevent="editAdmin(scope.row)"
							>Edit</el-button
						>
						<el-button
							v-if="props.hasRemove"
							plain
							type="danger"
							size="small"
							@click.prevent="removeAdmin(scope.row)"
							>Remove</el-button
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
			<el-button class="ml-10" @click="openCreatePop">Create</el-button>
		</div>
		<Add
			v-if="isOpenAddPop"
			:title="
				triggerEditOrAdd === 'A'
					? props.title.replace('Edit', 'Add')
					: props.title
			"
			:input-data="triggerEditOrAdd === 'A' ? emptyData : editTarget"
			:show-input="props.showInput"
			:show-select="props.showSelect"
			:show-multi-selct="props.showMultiSelct"
			:show-special="props.showSpecial"
			:select-items="selectItems"
			:show-version="props.showVersion"
			@abort="fixOpenAddPop(false)"
			@data="getAddItem"
		/>
	</div>
</template>

<style lang="scss" scoped>
.el-pagination {
	justify-content: center;
}
:deep(.el-scrollbar_bar.is-horizontal) {
	height: 0 !important;
}
.success-row {
	--el-table-tr-bg-color: var(--el-color-success-light-9);
}
.el-table {
	.warning-row {
		--el-table-tr-bg-color: var(--el-color-warning-light-9);
	}
}
</style>
