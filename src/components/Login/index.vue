<script setup>
import { ref } from "vue";
import { useComponentStore } from "@/store/useComponentsStatusStore";

const { showErrorMsgAlert } = useComponentStore();

const emit = defineEmits(["loginGo"]);

const props = defineProps({
	title: {
		type: String,
		default: "",
	},
	desc: {
		type: String,
		default: "",
	},
});

const user = ref({
	account: "",
	password: "",
});

const validationInput = ref(null);
const checkValue = ref(null);

const checkValidCaptcha = (value) => (checkValue.value = value);

const summitLogin = () => {
	if (!checkValue.value) return;
	if (
		!(checkValue.value.toUpperCase() === validationInput.value.toUpperCase())
	) {
		showErrorMsgAlert(30002);
		return;
	}

	emit("loginGo", user.value);
};
</script>

<template>
	<div class="title">{{ props.title }}</div>
	<div class="p">
		{{ props.desc }}
	</div>
	<el-input
		size="large"
		class="login-input"
		:placeholder="$t('login.account_placeholder')"
		v-model.trim="user.account"
		autocomplete="off"
	>
		<template #prepend>
			<el-icon :size="28" color="black">
				<i-mdi-account />
			</el-icon>
		</template>
	</el-input>
	<el-input
		type="password"
		size="large"
		class="login-input"
		:placeholder="$t('login.password_placeholder')"
		v-model.trim="user.password"
		autocomplete="off"
	>
		<template #prepend>
			<el-icon :size="28" color="black">
				<i-mdi-password />
			</el-icon>
		</template>
	</el-input>
	<div class="login-validation">
		<el-input
			class="validation-input"
			size="default"
			:placeholder="$t('login.validation_placeholder')"
			v-model.trim="validationInput"
			autocomplete="off"
			@keyup.enter.native="summitLogin"
		/>
		<VueClientRecaptcha :value="validationInput" @getCode="checkValidCaptcha" />
	</div>

	<el-button class="login-btn" @click="summitLogin">LOGIN</el-button>
</template>

<style lang="scss" scoped>
.title {
	@apply text-white text-3xl mb-6;
}
.p {
	@apply text-white text-sm w-112 h-20 flex justify-center;
}
.login-input {
	@apply w-96 h-10 mb-8;
}
.login-validation {
	@apply mb-14 w-96 h-14 rounded bg-white flex justify-between pl-3 items-center;
}
.validation-input {
	@apply w-48 h-14;
}
.login-btn {
	@apply w-96 h-10 bg-blue-500 border-blue-500 text-white text-lg;
}

:deep(.el-input-group__prepend) {
	@apply border-none w-14 bg-white;
}
:deep(.el-input__wrapper) {
	@apply shadow-none bg-white;
}
:deep(.vue_client_recaptcha) {
	@apply flex justify-start items-center;
}
</style>
