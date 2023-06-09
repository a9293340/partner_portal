<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useParameterStore } from '@/store/parameter';
import { useComponentStore } from '@/store/component';
import { sessionSet, sessionGet, encode } from '@/utils';
import { login, postList } from '@/utils/api';
import VueClientRecaptcha from 'vue-client-recaptcha';

const inputValue = ref(null);
const checkValue = ref(null);

const { fixLoading, getProductList } = useComponentStore();

const checkValidCaptcha = (value) => (checkValue.value = value);
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
const loginStore = useParameterStore();
const { fixError } = loginStore;
const router = useRouter();

const submitForm = async () => {
	if (!checkValue.value) return;
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
			fixLoading(true);
			let token = '';
			try {
				const resp = await login(
					encode({
						account: state.ruleForm.username,
						password: state.ruleForm.password,
					})
				);
				token = resp.token;
				sessionSet('cinoT', token);
			} catch (error) {
				if (error.response)
					fixError({
						title: 'Error',
						msg: error.response.data.error_code,
						isShow: true,
					});
				fixLoading(false);
			}

			try {
				const adminDetail = await postList(
					'admin',
					encode({
						tokenReq: state.ruleForm.username,
						token: sessionGet('cinoT'),
						limit: 1,
						page: 0,
						filter: {
							account: state.ruleForm.username,
						},
					})
				);
				loginStore.loginAction(adminDetail.list[0]);
				await getProductList();
				router.push('/');
				fixLoading(false);
			} catch (error) {
				console.log(error);
				const errCode = error.response?.data.error_code;
				if (error.response)
					fixError({
						title: 'Error',
						msg: errCode,
						isShow: true,
					});
				fixLoading(false);
				if (errCode === 10005) router.push('/login');
			}
		}
	});
};
</script>

<template>
	<div class="login-body">
		<div class="login-container">
			<div class="head">
				<img class="logo" src="../assets/img/product-img/A560.png" />
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
