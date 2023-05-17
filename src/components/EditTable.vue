<script setup>
import { firstStringUpperCase } from '@/utils';
import { useComponentStore } from '@/store/component';
import { storeToRefs } from 'pinia';
import * as dayjs from 'dayjs';

const { creatorList, page_limit } = storeToRefs(useComponentStore());

const emit = defineEmits(['data', 'page', 'row']);
const props = defineProps({
	targetList: {
		type: Array,
		default: () => [],
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
	totalData: {
		type: Number,
		default: 0,
	},
	specialList: {
		type: Array,
		default: () => [],
	},
	hasRemove: {
		type: Boolean,
		default: true,
	},
});

const editAdmin = (row) => {
	emit('row', row);
};

const removeAdmin = (data) => {
	emit('data', data);
};

const pageChange = (page) => {
	emit('page', page);
};
</script>

<template>
	<el-table :data="props.targetList" style="width: 1200px">
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
				<img :src="scope.row.photo" alt="" />
			</template>
		</el-table-column>
		<!-- Normal -->
		<el-table-column
			v-for="normal in props.normalKeys"
			:key="normal.key"
			:prop="normal.key"
			:label="firstStringUpperCase(normal.key)"
			:width="normal.width"
		/>
		<!-- Specail List -->
		<el-table-column
			v-for="spa in props.specialList"
			:key="spa.key"
			:label="firstStringUpperCase(spa.key)"
			:prop="spa.key"
			:width="spa.width"
			sortable
		>
			<template #default="scope">
				<span>{{
					spa.list.find((el) => el.val === scope.row[spa.key]).opt
				}}</span>
			</template>
		</el-table-column>
		<!-- Version -->
		<el-table-column
			v-if="props.hasVersion"
			prop="version"
			label="Version(version/creator/date)"
			width="400"
		>
			<template class="flex flex-col" #default="scope">
				<div class="flex" v-for="ver in scope.row.version">
					<span>{{ ver.version }}/</span>
					<span class="mr-3">{{
						creatorList.find((x) => x.val === ver.creator).opt
					}}</span>
					<span class="mr-3">
						({{ dayjs(ver.create_date).format('YYYY-MM-DD') }})
					</span>
				</div>
			</template>
		</el-table-column>
		<!-- Button -->
		<el-table-column>
			<template #default="scope">
				<el-button
					link
					type="primary"
					@click.prevent="editAdmin(scope.row)"
					>Edit</el-button
				>
			</template>
		</el-table-column>
		<el-table-column v-if="props.hasRemove">
			<template #default="scope">
				<el-button
					link
					type="primary"
					@click.prevent="removeAdmin(scope.row)"
					>Remove</el-button
				>
			</template>
		</el-table-column>
	</el-table>
	<el-pagination
		v-if="props.totalData"
		background
		layout="prev, pager, next"
		:total="totalData"
		:page-count="Math.ceil(props.totalData / page_limit)"
		:page-size="page_limit"
		@current-change="pageChange"
	/>
</template>

<style lang="scss">
.el-pagination {
	justify-content: center;
}
</style>
