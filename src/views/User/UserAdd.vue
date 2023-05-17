<script setup>
import { onBeforeMount, ref } from 'vue';
import { useComponentStore } from '@/store/component';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import * as dayjs from 'dayjs';
import { depCopy } from '@/utils';
import AddTemplate from '@/components/AddTemplate.vue';

const { getCreatorList, addItem } = useComponentStore();
const { prefitList, statusList } = storeToRefs(useComponentStore());
const router = useRouter();

const showInput = ['name', 'company', 'account', 'password', 'email'];
const showSelect = ['permissions', 'status'];
const selectItems = ref({
	permissions: prefitList.value,
	status: statusList.value,
});
const empty = {
	name: '',
	permissions: 1,
	company: '',
	status: 0,
	account: '',
	password: '',
	email: '',
	last_login_time: '',
};
const inputData = ref(depCopy(empty));
const addAdmin = async (data) => {
	inputData.value = data;
	inputData.value['create_date'] = dayjs().format('YYYY-MM-DD HH:mm:ss');
	inputData.value['action_log'] = [];
	await addItem(inputData.value, 'admin', async () => {
		await getCreatorList();
		inputData.value = empty;
		router.push('/userList');
	});
};

onBeforeMount(async () => {
	selectItems.value.permissions = prefitList.value;
});
</script>

<template>
	<div class="user-add">
		<AddTemplate
			:input-data="inputData"
			:show-input="showInput"
			:show-select="showSelect"
			:select-items="selectItems"
			@data="addAdmin"
		/>
	</div>
</template>

<style lang="scss">
@import '../../assets/scss/_color.scss';
@import '../../assets/scss/_style.scss';
.user-add {
	padding: 30px;
	position: relative;
	box-sizing: border-box;
	height: 100%;
}
</style>
