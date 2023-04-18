<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import product from '@/assets/db/product.json';
import { useMakeImage } from '@/assets/util';

const route = useRoute();
const router = useRouter();
const products = ref(null);

const goToProductList = () => router.push('/productionList');

onBeforeMount(() => {
	products.value = product.find((el) => el.name === route.params.id);
});
</script>

<template>
	<div class="product-page">
		<header>
			<div class="logo-box">
				<div class="font-box w-112 mr-8 p-8">
					<h1 class="text-5xl mb-5">{{ products.name }} Series</h1>
					<p class="text-2xl text-gray-300">{{ products.slogan }}</p>
				</div>
				<div class="img-box w-128 flex justify-center">
					<img
						class="w-auto h-full"
						:src="useMakeImage(products.photo)"
						alt=""
					/>
				</div>
			</div>
			<div class="utility-box">
				<span class="cursor-pointer text-lg" @click="goToProductList()">
					Go Back
				</span>
			</div>
		</header>
	</div>
</template>

<style lang="scss">
.product-page {
	@apply overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-50 scrollbar-thumb-rounded-md w-full h-full;
	header {
		@apply w-full bg-gradient-to-t from-blue-50 to-white h-80 flex flex-col-reverse items-center;
		.logo-box {
			@apply w-5/6 h-3/4 flex justify-start;
		}
		.utility-box {
			@apply w-full h-auto flex justify-end px-6;
		}
	}
}
</style>
