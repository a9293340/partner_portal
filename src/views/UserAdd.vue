<script setup>
import { ref } from 'vue';
import { useParameterStore } from '@/store/parameter';
import { useComponentStore } from '@/store/component';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import * as dayjs from 'dayjs';
import { encode, sessionGet } from '@/utils';
import AddTemplate from '../components/AddTemplate.vue';

const { loginAdmin } = storeToRefs(useParameterStore());
const { fixError } = useParameterStore();
const { fixLoading, prefitList, statusList } = useComponentStore();
const router = useRouter();

const showInput = ['name', 'company', 'account', 'password', 'email'];
const showSelect = ['permissions', 'status'];
const selectItems = {
	permissions: prefitList,
	status: statusList,
};
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
const inputData = ref(empty);
const addAdmin = async (data) => {
	inputData.value = data;
	fixLoading(true);
	inputData.value['create_date'] = dayjs().format('YYYY-MM-DD HH:mm:ss');
	inputData.value['action_log'] = [];
	try {
		await axios.post('/api/admin/add', {
			data: encode({
				tokenReq: loginAdmin.value.account,
				token: sessionGet('cinoT'),
				...inputData.value,
			}),
		});
	} catch (error) {
		console.log(error);
		if (error.response)
			fixError({
				title: 'Error',
				msg: error.response.data.error_code,
				isShow: true,
			});
	}
	inputData.value = empty;
	router.push('/userList');
	fixLoading(false);
};
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
@import '../assets/scss/_color.scss';
@import '../assets/scss/_style.scss';
.user-add {
	padding: 30px;
	position: relative;
	box-sizing: border-box;
	height: 100%;
}
</style>
