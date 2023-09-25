<script setup>
import Login from "@/components/Login/index.vue";
import { useUserStore } from "@/store/useUserStore";
import { useRoute } from "vue-router";
import loginPath from "@/assets/img/jpg/login-1.jpg";

const { loginExecute } = useUserStore();
const route = useRoute();

const login = async (user) => {
	console.log(route.path, user);
};
</script>

<template>
	<div
		class="partner-portal-login xl-login"
		:style="`background-image: url(${loginPath})`"
	>
		<div class="bg-img-zone"></div>
		<div class="login">
			<Login
				:title="$t('login.partner_title')"
				:desc="$t('login.partner_desc')"
				@login-go="login"
			/>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.partner-portal-login {
	@apply flex flex-col w-full h-full;
	.bg-img-zone {
		@apply w-full h-52 bg-no-repeat bg-cover;
		background-position: center -11rem;
	}
	.login {
		@apply w-full h-full bg-indigo-950 flex flex-col items-center justify-center;
	}
}
.xl-login {
	@apply xl:flex-row;
	.bg-img-zone {
		@apply xl:w-3/5 xl:h-full xl:bg-cover xl:bg-no-repeat xl:bg-center xl:bg-fixed;
	}
	.login {
		@apply xl:w-2/5;
	}
}
</style>
