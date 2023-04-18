<script setup>
import production_type from '@/assets/db/production_type.json';
import product from '@/assets/db/product.json';
import { useMakeImage } from '@/assets/util';
import { onBeforeMount, reactive, ref } from 'vue';
import { useParameterStore } from '@/store/parameter.js';
import { useRouter } from 'vue-router';

const router = useRouter();
const login = useParameterStore();
const { isPassPrefit } = login;

const usefulProductType = ref();
const usefulProducts = ref();
const pTList = ref();
const showProduct = ref();
const nowPickTypeIndex = ref(0);
const usefulProdctTypePoint = ref(0);
const arrowImg = reactive({
	right: useMakeImage('svg/arrow_small_right.svg'),
	left: useMakeImage('svg/arrow_small_left_wbg.svg'),
});

const pickpTList = (caculate) => {
	if (
		(usefulProdctTypePoint.value + caculate < 0 ||
			usefulProdctTypePoint.value + caculate + 5 >
				usefulProductType.value.length) &&
		caculate
	)
		return;
	usefulProdctTypePoint.value = usefulProdctTypePoint.value + caculate;
	pTList.value = usefulProductType.value.slice(
		usefulProdctTypePoint.value,
		usefulProdctTypePoint.value + 5
	);
	arrowImg.left = useMakeImage(
		`svg/arrow_small_left${
			usefulProdctTypePoint.value === 0 ? '_wbg' : ''
		}.svg`
	);
	arrowImg.right = useMakeImage(
		`svg/arrow_small_right${
			usefulProdctTypePoint.value + 5 >= usefulProductType.value.length
				? '_wbg'
				: ''
		}.svg`
	);
	nowPickTypeIndex.value = 0;
	pickProductsGroup(
		pTList.value[nowPickTypeIndex.value].name,
		nowPickTypeIndex.value
	);
};

// 後續需改成production type ID
const pickProductsGroup = (name, i) => {
	nowPickTypeIndex.value = i;
	showProduct.value = usefulProducts.value.filter(
		(el) => el.production_type_id === name
	);
};

const goToProductPage = (id) => {
	console.log(id);
	router.push(`/Product/${id}`);
};

onBeforeMount(() => {
	usefulProductType.value = production_type.filter(
		(el) => !isPassPrefit(el.prefit)
	);
	usefulProducts.value = product.filter((el) => !isPassPrefit(el.prefit));
	pickpTList(0);
	pickProductsGroup('Corded', 0);
	console.log(showProduct.value);
});
</script>

<template>
	<div class="production-list">
		<!-- search -->
		<div class="search-zone"></div>
		<!-- Image Pick -->
		<div class="select-zone">
			<div class="type-zone">
				<img
					:src="arrowImg.left"
					:style="{
						cursor:
							arrowImg.left.indexOf('wbg') !== -1
								? 'not-allowed'
								: 'pointer',
					}"
					alt=""
					class="arrow"
					@click="pickpTList(-1)"
				/>
				<div>
					<div
						class="img-box"
						v-for="(productType, p) in pTList"
						:key="productType.name"
						@click="pickProductsGroup(productType.name, p)"
					>
						<img
							class="product-type-img"
							:src="useMakeImage(productType.photo)"
							:alt="productType.name"
						/>
						<span
							:class="{
								'text-sky-500': nowPickTypeIndex === p,
							}"
							>{{ productType.name }}</span
						>
					</div>
				</div>
				<img
					:src="arrowImg.right"
					alt=""
					class="arrow"
					@click="pickpTList(1)"
					:style="{
						cursor:
							arrowImg.right.indexOf('wbg') !== -1
								? 'not-allowed'
								: 'pointer',
					}"
				/>
			</div>
			<div
				class="content-zone overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-50 scrollbar-thumb-rounded-md p-4"
			>
				<div class="product-area w-full" style="height: 99%">
					<div
						class="product-card w-36 h-48 inline-block cursor-pointer mr-5"
						v-for="pro in showProduct"
						:key="pro.name"
					>
						<div
							class="flex-col justify-center items-center w-full h-full group"
							@click="goToProductPage(pro.name)"
						>
							<img
								:src="useMakeImage(pro.photo)"
								class="w-full h-auto bg-white group-hover:bg-slate-200 rounded ease-linear duration-300"
								alt=""
							/>
							<div
								class="text-l group-hover:text-xl w-full ease-linear duration-100 text-center"
							>
								{{ pro.name }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
@import '../assets/scss/_color.scss';
@import '../assets/scss/_style.scss';
.production-list {
	width: 100%;
	height: 100%;
	padding: 30px;
	display: flex;
	flex-direction: column;
	.search-zone {
		width: 100%;
		height: 10%;
	}
	.select-zone {
		width: 100%;
		height: 90%;
		.type-zone {
			width: 100%;
			height: 15%;
			@extend %flex-row-c;
			div {
				width: 100%;
				height: 100%;
				@extend %flex-row-c;
				.img-box {
					cursor: pointer;
					height: 100%;
					width: 20%;
					margin-right: 40px;
					display: flex;
					flex-direction: column;
					&:first-child {
						margin-left: 40px;
					}
					img.product-type-img {
						height: 80%;
						width: auto;
					}
				}
			}
			.arrow {
				cursor: pointer;
				width: 30px;
				height: auto;
			}
		}
		.content-zone {
			width: 100%;
			height: 80%;
			margin-top: 2%;
			border: 1px solid $main-font-color;
			border-radius: 6px;
		}
	}
}
</style>
