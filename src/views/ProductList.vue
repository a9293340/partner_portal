<script setup>
import { onMounted } from 'vue';
import { useComponentStore } from '@/store/component';

const comStore = useComponentStore();
const { fixLoading } = comStore;

onMounted(() => {
	fixLoading(false);
});
</script>

<template>Router List</template>

<style lang="scss">
@import '../assets/scss/_color.scss';
@import '../assets/scss/_style.scss';
</style>
