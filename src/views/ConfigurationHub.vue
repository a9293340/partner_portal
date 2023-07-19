<script setup>
import { useComponentStore } from '@/store/component.js';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

const router = useRouter();
const { usefulPath, nowConfiguration } = storeToRefs(useComponentStore());

const goToPath = (path) => {
	nowConfiguration.value = path;
	router.push(`/configurationHub/${path}`);
};
</script>

<template>
	<div class="w-full h-full flex flex-col">
		<router-view class="w-full h-11/12" />
		<div class="w-full h-1/12 flex justify-around">
			<el-button
				v-for="path in usefulPath"
				:color="nowConfiguration === path.path ? '#626aef' : ''"
				@click="goToPath(path.path)"
				:key="path.path"
				>{{ path.btnName }}</el-button
			>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
