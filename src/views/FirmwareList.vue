<script setup>
import firmwareList from '../assets/db/firmwareList.json';
const handleNodeClick = (data, node) => {
	if (!data.showDownload) return;
	// console.log(node);
	// console.log(data);
};

const defaultProps = {
	children: 'children',
	label: 'label',
	showDownload: 'showDownload',
};
</script>

<template>
	<el-tree
		:props="defaultProps"
		:data="firmwareList"
		auto-expand-parent
		default-expand-all
		@node-click="handleNodeClick"
	>
		<template #default="{ node, data }">
			<span
				:class="{
					'main-style': !data.showDownload,
					'sub-style': data.showDownload,
				}"
			>
				{{ node.label }}</span
			>
			<!-- <span class="download-btn" v-if="data.showDownload">
				<a @click="handleNodeClick(node, data)">download</a>
			</span> -->
		</template>
	</el-tree>
</template>

<style lang="scss">
@import '../assets/scss/_color.scss';
@import '../assets/scss/_style.scss';

.main-style {
	color: $sub-style-color;
	font-size: 16px;
}
.sub-style {
	color: $main-font-color;
}

.download-btn {
	margin-left: 30px;
	a {
		font-style: italic;
		color: $sub-style-color;
	}
}
</style>
