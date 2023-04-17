<script setup>
import { ref } from 'vue';
import { useParameterStore } from '@/store/parameter';
import { useComponentStore } from '@/store/component';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import fs from 'vite-plugin-fs/browser';
import * as dayjs from 'dayjs';

const { adminRules, adminList } = storeToRefs(useParameterStore());
const { resetAdminList } = useParameterStore();
const { firstStringUpperCase, prefitList, typeList } = useComponentStore();
const router = useRouter();

const formAction = ref(null);
const adList = ref(JSON.parse(JSON.stringify(adminList)));
const showInput = ['name', 'company', 'account', 'password', 'email'];
const showSelect = ['permissions', 'status'];
const empty = {
	name: '',
	permissions: 1,
	company: '',
	status: 0,
	account: '',
	password: '',
	email: '',
	token: '',
	last_login_time: '',
};
const inputData = ref(empty);

const addAdmin = async () => {
	formAction.value.validate(async (valid) => {
		if (valid) {
			inputData.value['create_date'] = dayjs().format(
				'YYYY-MM-DD HH:mm:ss'
			);
			inputData.value['action_log'] = [];
			adList.value.push(inputData.value);
			await fs.writeFile(
				'./assets/db/admin.json',
				JSON.stringify(adList.value)
			);
			resetAdminList(adList.value);
			inputData.value = empty;
			router.push('/userList');
		}
	});
};
</script>

<template>
	<div class="user-add">
		<main>
			<el-form
				label-position="left"
				ref="formAction"
				:rules="adminRules"
				:model="inputData"
			>
				<div v-for="itemKey in showInput" :key="itemKey">
					<el-form-item
						:label="firstStringUpperCase(itemKey)"
						style="margin-bottom: 30px; width: 40em"
						class="form-label"
						:prop="itemKey"
					>
						<el-input
							type="text"
							v-model="inputData[itemKey]"
							autocomplete="off"
						>
						</el-input>
					</el-form-item>
				</div>
				<div v-for="itemKey in showSelect" :key="itemKey">
					<el-form-item
						:label="firstStringUpperCase(itemKey)"
						style="margin-bottom: 30px; width: 40em"
						class="form-label"
						:prop="itemKey"
					>
						<select v-model="inputData[itemKey]">
							<option
								v-for="item in itemKey === 'status'
									? typeList
									: prefitList"
								:key="item.opt"
								:value="item.val"
							>
								{{ item.opt }}
							</option>
						</select>
					</el-form-item>
				</div>
			</el-form>
		</main>
		<footer>
			<el-button class="btn" @click="addAdmin">Add</el-button>
		</footer>
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
	main {
		overflow: auto;
		width: 100%;
		height: 90%;
		.el-form-item__label {
			font-size: 20px;
			width: 150px;
		}
		select {
			@extend %select;
			width: 50em;
		}
	}
	footer {
		width: 100%;
		height: 10%;
		display: flex;
		justify-content: flex-end;
		.btn {
			width: 15%;
		}
	}
}
</style>
