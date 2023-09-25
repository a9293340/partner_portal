<script setup>
import Login from "@/components/Login/index.vue";
import { useUserStore } from "@/store/useUserStore";
import loginPath from "@/assets/img/jpg/login-2.jpg";

const { loginExecute } = useUserStore();

const login = async (user) => {
	console.log(user);
};
</script>

<template>
	<div class="back-stage-login" :style="`background-image: url(${loginPath})`">
		<div class="blur-img">
			<div class="login">
				<Login
					:title="$t('login.staff_title')"
					:desc="$t('login.staff_desc')"
					@login-go="login"
				/>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.back-stage-login {
	@apply w-full h-screen bg-cover bg-center;
	.blur-img {
		@apply w-full h-full flex flex-col justify-center items-center backdrop-blur-lg;
		.login {
			@apply w-144 h-144 p-12 bg-black bg-opacity-30 rounded-3xl flex flex-col justify-center items-center;
		}
	}
}
</style>
