<script setup>
// import { onMounted } from "vue";
import SideBar from "@/components/SideBar/index.vue";
import Header from "@/components/Header/index.vue";
import Footer from "@/components/Footer/index.vue";
import { useComponentStore } from "@/store/useComponentsStatusStore";
import { storeToRefs } from "pinia";
// Router Navigation Guard
import "./navigationGuard";

const { isShadow, isDisplaySideBar, isLoading, errorMsg } = storeToRefs(
	useComponentStore()
);
</script>

<template>
	<!-- Alert -->
	<el-alert
		v-show="errorMsg.isShow"
		:title="errorMsg.title"
		:type="errorMsg.type"
		:description="errorMsg.msg"
		show-icon
	/>
	<!-- Normal Page -->
	<div class="page" v-if="!isDisplaySideBar">
		<SideBar />
		<main class="main xl-main">
			<Header />
			<div class="router-view">
				<router-view />
			</div>
			<Footer />
		</main>
	</div>
	<!-- Login Page & Cino System Control Page -->
	<div class="page" v-else>
		<router-view />
	</div>
	<!-- Shadow -->
	<div :class="['shadow', { 'shadow-show': isShadow }]">
		<div :class="['loading', { 'loading-show': isLoading }]">
			<img src="./assets/img/gif/loading.gif" alt="" class="loading-img" />
		</div>
	</div>
</template>

<style lang="scss">
body {
	@apply p-0 m-0 box-border;
}
h1,
h3,
p,
label {
	@apply m-0 p-0;
}
#app {
	@apply w-full h-screen m-0 p-0;
}
.el-form {
	@apply pt-5;
}
</style>

<style lang="scss" scoped>
.page {
	@apply flex justify-start w-full h-screen;
	.main {
		@apply flex w-full h-full flex-col;
	}
	.xl-main {
		@apply xl:w-[calc(100%-18.5rem)] xl:-ml-1;
	}

	.router-view {
		@apply w-full h-[calc(100%-7rem)];
	}
}

.el-alert {
	@apply ml-1/2 -translate-x-1/2 w-112 h-20 fixed z-100000;
}

.shadow {
	@apply fixed w-full h-screen z-80000 bg-black bg-opacity-30 left-0 top-0 hidden;
	.loading {
		@apply w-full h-full hidden justify-center items-center;
		.loading-img {
			@apply w-56;
		}
	}

	.loading-show {
		@apply flex;
	}
}
.shadow-show {
	@apply block;
}
</style>
