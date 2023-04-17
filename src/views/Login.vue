<script setup>
import { reactive, ref, inject, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useParameterStore } from '@/store/parameter.js';
import { storeToRefs } from 'pinia';
import { sessionSet } from '@/utils';
import * as dayjs from 'dayjs';
import fs from 'vite-plugin-fs/browser';
import VueClientRecaptcha from 'vue-client-recaptcha';
import { useMakeImage } from '../assets/util';
import productList from '@/assets/db/production_type.json';

const inputValue = ref(null);
const checkValue = ref(null);

const checkValidCaptcha = (value) => (checkValue.value = value);
const cryoptojs = inject('cryptojs');
const loginForm = ref(null);
const state = reactive({
	ruleForm: {
		username: '',
		password: '',
	},
	checked: false,
	rules: {
		username: [
			{
				required: 'true',
				message: "Account can't be empty",
				trigger: 'blur',
			},
		],
		password: [
			{
				required: 'true',
				message: "Password can't be empty",
				trigger: 'blur',
			},
		],
	},
});
const login = useParameterStore();
const { tokenKey, adminList } = storeToRefs(login);
const adList = ref(JSON.parse(JSON.stringify(adminList.value)));
const { fixError, resetAdminList } = login;
const router = useRouter();

const submitForm = async () => {
	if (!(checkValue.value.toUpperCase() === inputValue.value.toUpperCase())) {
		fixError({
			title: 'Error',
			msg: 'The Verification code is wrong!',
			isShow: true,
		});
		return;
	}

	loginForm.value.validate(async (valid) => {
		if (valid) {
			const target = adList.value.findIndex(
				(adm) =>
					adm.account === state.ruleForm.username &&
					adm.password === state.ruleForm.password
			);
			if (target !== -1) {
				if (target.status) {
					fixError({
						title: 'Error',
						msg: 'Your account has been suspended!',
						isShow: true,
					});

					return;
				}
				adList.value[target].token = cryoptojs.AES.encrypt(
					JSON.stringify({
						account: adList.value[target].account,
						password: adList.value[target].password,
					}),
					tokenKey.value
				).toString();
				adList.value[target].last_login_time = dayjs().format(
					'YYYY-MM-DD HH:mm:ss'
				);
				login.loginAction(adList.value[target]);
				sessionSet('cinoT', adList.value[target].token);
				await fs.writeFile(
					'./assets/db/admin.json',
					JSON.stringify(adList.value)
				);
				resetAdminList(adList.value);
				router.push('/');
			} else {
				fixError({
					title: 'Error',
					msg: 'Account or Password is not exist!',
					isShow: true,
				});
			}
		}
	});
};
</script>

<template>
	<div class="login-body">
		<div class="login-container">
			<div class="head">
				<img class="logo" :src="useMakeImage(productList[0].photo)" />
				<div class="name">
					<div class="title">CINO</div>
					<div class="tips">Partner Portal</div>
					<!-- text-amber-400 -->
				</div>
			</div>
			<el-form
				label-position="top"
				:rules="state.rules"
				:model="state.ruleForm"
				ref="loginForm"
			>
				<el-form-item
					label="Account"
					prop="username"
					style="margin-bottom: 30px"
					class="form-label"
				>
					<el-input
						type="text"
						v-model.trim="state.ruleForm.username"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item
					label="Password"
					prop="password"
					style="margin-bottom: 30px"
				>
					<el-input
						type="password"
						v-model.trim="state.ruleForm.password"
						autocomplete="off"
						@keyup.enter.native="submitForm"
					></el-input>
				</el-form-item>
				<div class="recaptcha mb-2">
					<el-input
						type="text"
						v-model.trim="inputValue"
						autocomplete="off"
						@keyup.enter.native="submitForm"
					></el-input>
					<VueClientRecaptcha
						:value="inputValue"
						@getCode="checkValidCaptcha"
					/>
				</div>
				<p class="text-red-600 m-0 mb-1">*case insensitive</p>
				<el-form-item>
					<el-button
						class="btn"
						style="width: 100%"
						type="primary"
						@click="submitForm"
						>Log in</el-button
					>
					<!-- <el-checkbox
						v-model="state.checked"
						@change="!state.checked"
						>下次自动登录</el-checkbox
					> -->
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/_color.scss';
@import '../assets/scss/_style.scss';
@import url('/node_modules/vue-client-recaptcha/dist/style.css');

.login-body {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	background-color: #fff;
}
.login-container {
	width: 420px;
	height: 500px;
	background-color: #fff;
	border-radius: 4px;
	box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
}
.head {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 40px 0 20px 0;
	img {
		width: 100px;
		height: 100px;
		margin-right: 20px;
	}
	.title {
		font-size: 28px;
		color: $main-style-color;
		font-weight: bold;
	}
	.tips {
		font-size: 12px;
		color: $main-font-color;
	}
}

.el-form {
	width: 70%;
	margin: 0 auto;
	.el-form-item {
		.el-form--label-top,
		.el-form-item__label {
			padding: 0;
		}
		.el-form-item {
			margin-bottom: 0;
		}
	}
}
.el-form-item__label {
	color: $main-font-color;
}
.recaptcha {
	// margin-bottom: 20px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	.el-input {
		width: 100px;
	}
	.vue_client_recaptcha {
		width: 200px;
	}
}
</style>
