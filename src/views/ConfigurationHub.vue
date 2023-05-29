<script setup>
import { ref } from 'vue';
import { useParameterStore } from '@/store/parameter.js';
import { useComponentStore } from '@/store/component.js';
import { useRouter } from 'vue-router';
import { firstStringUpperCase } from '@/utils';
import { storeToRefs } from 'pinia';

const router = useRouter();
const { isPassPrefit } = useParameterStore();
const { originShowPath } = storeToRefs(useComponentStore());

const usefulPath = ref(
	originShowPath.value.filter((el) => !isPassPrefit(el.prefit))
);

const goToPath = (path) => router.push(`/configurationHub/${path}`);
</script>

<template>
	<div class="w-full h-full flex flex-col">
		<router-view class="w-full h-11/12" />
		<div class="w-full h-1/12 flex justify-around">
			<el-button
				v-for="path in usefulPath"
				@click="goToPath(path.path)"
				:key="path.path"
				>{{ firstStringUpperCase(path.path) }}</el-button
			>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
