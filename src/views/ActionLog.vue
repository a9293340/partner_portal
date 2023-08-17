<script setup>
import { onBeforeMount, ref } from 'vue';
import { useComponentStore } from '@/store/component';
import { useParameterStore } from '@/store/parameter';
import { storeToRefs } from 'pinia';
import { depCopy, sessionGet, encode } from '@/utils';
import { postList } from '@/utils/api';
import { useRouter } from 'vue-router';

const router = useRouter();

const { fixPrefitList, fixLoading, tableRowClassName } = useComponentStore();
const { prefitList, originShowPath } = storeToRefs(useComponentStore());
const { loginAdmin } = storeToRefs(useParameterStore());

const selectPrefitList = ref([]);
const selectAdminList = ref([]);
const pickPrefit = ref(1000);
const pickAdmin = ref(null);
const allAdminList = ref();
const nowSearchAdmin = ref(null);
const nowLog = ref(null);

const changePrefit = async () => {
	pickAdmin.value = null;
	selectAdminList.value = depCopy(allAdminList.value)
		.filter((el) =>
			pickPrefit.value !== 1000 ? el.permissions === pickPrefit.value : el
		)
		.map((el) => ({
			val: el._id,
			opt: el.name,
		}));
};

const searchAdmin = async () => {
	let data = null;
	if (pickAdmin.value) {
		fixLoading(true);
		data = allAdminList.value.filter((el) => el._id === pickAdmin.value)[0];

		let ask = [];

		for (let i = 0; i < data['action_log'].length; i++) {
			const tar = data['action_log'][i];
			const inx = ask.findIndex((el) => el.path === tar.detail.path);
			if (inx === -1) {
				ask.push({
					path: tar.detail.path,
					target: [tar.detail.target],
				});
			} else ask[inx].target.push(tar.detail.target);
		}

		let detail = [];
		for (let i = 0; i < ask.length; i++) {
			const element = ask[i];
			detail = [
				...detail,
				...(
					await postList(
						element.path,
						encode({
							tokenReq: loginAdmin.value.account,
							token: sessionGet('cinoT'),
							limit: 100,
							page: 0,
							filter: {
								_id: element.target,
							},
						})
					)
				).list,
			];
		}
		// console.log(detail);
		for (let i = 0; i < data['action_log'].length; i++) {
			data['action_log'][i].detail.target = detail.find(
				(el) => el._id === data['action_log'][i].detail.target
			);
		}

		data['action_log'] = data['action_log'].sort(
			(a, b) => new Date(b.time) - new Date(a.time)
		);

		fixLoading(false);
	}
	nowSearchAdmin.value = data;
	if (nowSearchAdmin.value)
		nowLog.value = nowSearchAdmin.value['action_log'].slice(0, 10);

	// console.log(nowSearchAdmin.value);
};

const pageChange = (page) =>
	(nowLog.value = nowSearchAdmin.value['action_log'].slice(
		(page - 1) * 10,
		page * 10
	));

const goToList = (path) =>
	router.push(
		`/configurationHub/${
			originShowPath.value.find((el) => el.name === path).path
		}`
	);

onBeforeMount(async () => {
	fixLoading(true);
	if (!prefitList.value.length) await fixPrefitList();
	selectPrefitList.value = depCopy(prefitList.value);
	selectPrefitList.value = [
		{ val: 1000, opt: 'All' },
		...selectPrefitList.value,
	];
	allAdminList.value = (
		await postList(
			'admin',
			encode({
				tokenReq: loginAdmin.value.account,
				token: sessionGet('cinoT'),
				limit: 1000,
				page: 0,
				filter: {
					status: 0,
				},
			})
		)
	).list;
	selectAdminList.value = depCopy(allAdminList.value).map((el) => ({
		val: el._id,
		opt: el.name,
	}));
	fixLoading(false);
});
</script>

<template>
	<div class="w-full h-full flex flex-col p-6">
		<header class="w-full h-1/12 flex justify-start items-center">
			<el-form-item
				label="Prefit :"
				style="margin-bottom: 30px; width: 20em"
				class="form-label"
			>
				<el-select
					v-model="pickPrefit"
					placeholder="Select"
					@change="changePrefit"
				>
					<el-option
						v-for="item in selectPrefitList"
						:key="item.val"
						:value="item.val"
						:label="item.opt"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item
				label="Admin :"
				style="margin-bottom: 30px; width: 20em"
				class="form-label"
			>
				<el-select v-model="pickAdmin" placeholder="Select">
					<el-option
						v-for="item in selectAdminList"
						:key="item.val"
						:value="item.val"
						:label="item.opt"
					></el-option>
				</el-select>
			</el-form-item>
			<el-button class="mb-7" @click="searchAdmin"> Search</el-button>
		</header>
		<main
			class="w-full h-11/12 flex flex-col justify-center items-center overflow-auto"
		>
			<el-table
				v-if="nowLog"
				:data="nowLog"
				border
				:header-cell-style="{ 'text-align': 'center' }"
				:row-style="tableRowClassName"
				height="690"
			>
				<el-table-column
					align="center"
					prop="time"
					label="Time"
					width="250"
					:show-overflow-tooltip="true"
					sortable
				/>
				<el-table-column
					align="center"
					prop="type"
					label="Action"
					width="150"
					:show-overflow-tooltip="true"
				>
					<template #default="scope">
						<span>{{
							scope.row.type === 'E'
								? 'Edit'
								: scope.row.type === 'L'
								? 'Download'
								: 'Add'
						}}</span>
					</template>
				</el-table-column>
				<el-table-column
					align="center"
					prop="detail.path"
					label="Action Path"
					width="150"
					:show-overflow-tooltip="true"
				>
					<template #default="scope">
						<p
							class="hover:text-blue-500 cursor-pointer"
							@click="goToList(scope.row.detail?.path)"
						>
							{{ scope.row.detail?.path }}
						</p>
					</template>
				</el-table-column>
				<el-table-column
					align="center"
					prop="detail.target"
					label="Target"
					width="250"
					:show-overflow-tooltip="true"
				>
					<template #default="scope">
						<span>
							{{
								scope.row.detail?.target[
									scope.row.detail?.path.indexOf('p_mode') !==
									-1
										? 'description'
										: 'name'
								]
							}}
						</span>
					</template>
				</el-table-column>
				<el-table-column
					align="center"
					prop="detail.target"
					label="Detail"
					:show-overflow-tooltip="true"
				>
					<template #default="scope">
						<div
							class="flex flex-col"
							v-if="scope.row.type === 'L'"
						>
							<span>
								Product : {{ scope.row.detail.product }}
							</span>
							<span>
								Version : {{ scope.row.detail.target_version }}
							</span>
						</div>
						<div
							class="flex flex-col"
							v-else-if="scope.row.type === 'E'"
						>
							<span>Origin : {{ scope.row.detail.from }}</span>
							<span>New : {{ scope.row.detail.to }}</span>
						</div>
						<div
							class="flex flex-col"
							v-else-if="scope.row.type === 'A'"
						>
							<span> - </span>
						</div>
					</template>
				</el-table-column>
			</el-table>
			<div class="w-full h-1/12 flex justify-center items-center">
				<el-pagination
					v-if="nowSearchAdmin"
					background
					layout="prev, pager, next"
					:total="nowSearchAdmin['action_log'].length"
					:page-count="
						Math.ceil(nowSearchAdmin['action_log'].length / 10)
					"
					@current-change="pageChange"
					:page-size="10"
				/>
			</div>
		</main>
	</div>
</template>

<style lang="scss" scoped></style>
