<script setup>
import { useMakeImage } from '@/assets/util';
import { onBeforeMount, reactive, ref } from 'vue';
import { useParameterStore } from '@/store/parameter.js';
import { useComponentStore } from '@/store/component';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

const router = useRouter();
const login = useParameterStore();
const { isPassPrefit } = login;
const { products } = storeToRefs(login);
const { fixLoading, whichSelectOptionsShouldBeGet } = useComponentStore();
const { productTypeList } = storeToRefs(useComponentStore());

const usefulProductType = ref();
const usefulProducts = ref([]);
const pTList = ref();
const showProduct = ref();
const nowPickTypeIndex = ref(0);
const usefulproductTypePoint = ref(0);
const arrowImg = reactive({
	right: useMakeImage('svg/arrow_small_right.svg'),
	left: useMakeImage('svg/arrow_small_left_wbg.svg'),
});

const pickpTList = (caculate) => {
	if (
		(usefulproductTypePoint.value + caculate < 0 ||
			usefulproductTypePoint.value + caculate + 5 >
				usefulProductType.value.length) &&
		caculate
	)
		return;
	usefulproductTypePoint.value = usefulproductTypePoint.value + caculate;
	pTList.value = usefulProductType.value.slice(
		usefulproductTypePoint.value,
		usefulproductTypePoint.value + 5
	);
	arrowImg.left = useMakeImage(
		`svg/arrow_small_left${
			usefulproductTypePoint.value === 0 ? '_wbg' : ''
		}.svg`
	);
	arrowImg.right = useMakeImage(
		`svg/arrow_small_right${
			usefulproductTypePoint.value + 5 >= usefulProductType.value.length
				? '_wbg'
				: ''
		}.svg`
	);
	nowPickTypeIndex.value = 0;
	pickProductsGroup(
		pTList.value[nowPickTypeIndex.value]._id,
		nowPickTypeIndex.value
	);
};

// 後續需改成production type ID
const pickProductsGroup = (name, i) => {
	nowPickTypeIndex.value = i;
	// console.log(nowPickTypeIndex.value);
	showProduct.value = usefulProducts.value.filter(
		(el) => el.production_type_id === name
	);
};

const goToProductPage = (id) => {
	// console.log(id);
	router.push(`/production/${id}`);
};

onBeforeMount(async () => {
	fixLoading(true);
	await whichSelectOptionsShouldBeGet(98);
	usefulProducts.value = products.value.filter(
		(el) => !isPassPrefit(el.prefit)
	);
	if (!usefulProducts.value.length) return;
	usefulProductType.value = productTypeList.value.filter((el) =>
		usefulProducts.value.find((x) => x.production_type_id === el.val)
	);

	pickpTList(0);
	pickProductsGroup(usefulProductType.value[0]._id, 0);
	// console.log(showProduct.value);
	fixLoading(false);
});
</script>

<template>
	<div class="production-list">
		<!-- search -->
		<div class="search-zone"></div>
		<!-- Image Pick -->
		<div class="select-zone" v-if="usefulProducts.length">
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
						:key="productType.opt"
						@click="pickProductsGroup(productType._id, p)"
					>
						<img
							class="product-type-img"
							:src="productType.photo"
							:alt="productType.opt"
							:title="productType.opt"
						/>
						<span
							:class="{
								'text-sky-500': nowPickTypeIndex === p,
							}"
							>{{ productType.opt }}</span
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
								:src="pro.photo"
								class="w-full h-auto bg-white group-hover:bg-slate-200 rounded ease-linear duration-300"
								alt=""
							/>
							<div
								class="text-l w-full ease-linear duration-100 text-center"
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

<style lang="scss" scoped>
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
