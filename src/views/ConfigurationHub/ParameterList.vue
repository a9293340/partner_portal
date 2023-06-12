<script setup>
import { encode, sessionGet } from '@/utils';
import { postList } from '@/utils/api';
import { onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import { useParameterStore } from '@/store/parameter';

const { loginAdmin } = storeToRefs(useParameterStore());

onBeforeMount(async () => {
	try {
		const p0 = await postList(
			'p_mode_0',
			encode({
				tokenReq: loginAdmin.value.account,
				token: sessionGet('cinoT'),
				limit: 10000,
				page: 0,
				filter: {},
			})
		);

		console.log(p0);
	} catch (e) {}
});
</script>

<template>
	<div>123</div>
</template>

<style lang="scss" scoped></style>
