<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useParameterStore } from '@/store/parameter.js';
import { useComponentStore } from '@/store/component';
import { storeToRefs } from 'pinia';
import { encode, sessionGet, sortBy, depCopy } from '@/utils';
import { postList } from '@/utils/api';
import dayjs from 'dayjs';

const { loginAdmin, products } = storeToRefs(useParameterStore());
const { loginAction } = useParameterStore();
const { fixLoading, fixDocumentTypeList, getCreatorList, getEditData } =
	useComponentStore();
const { documentTypeList, creatorList } = storeToRefs(useComponentStore());

const route = useRoute();
const router = useRouter();
const product = ref({});
const documentType = ref([]);
const firmware_id = ref('');
const triggerVersion = ref([]);
const triggerFirmware = ref(false);

const goToProductList = () => router.push('/production');

const getTargetDatabase = async (route, target) =>
	await postList(
		route,
		encode({
			tokenReq: loginAdmin.value.account,
			token: sessionGet('cinoT'),
			limit: 100,
			page: 0,
			filter: {
				_id: target,
			},
		})
	);

const triggerVersionList = (jud, ff, cc) =>
	jud === 'd'
		? (triggerVersion.value[ff][cc] = !triggerVersion.value[ff][cc])
		: (triggerFirmware.value = !triggerFirmware.value);

const openPdf = async (_id, ver, d_path, path) => {
	const log = {
		time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
		type: 'L',
		detail: {
			path,
			target: _id,
			product: product.value['name'],
			target_version: ver,
		},
	};
	const final = depCopy(loginAdmin.value['action_log']);
	final.push(log);
	if (final.length > 100) final.shift();

	await getEditData(
		{ action_log: final, _id: loginAdmin.value['_id'] },
		'admin',
		() => {
			let newTarget = depCopy(loginAdmin.value);
			newTarget['action_log'] = final;
			loginAction(newTarget);
			window.open(d_path);
		},
		false
	);
};

const makeProductValue = async () => {
	product.value = depCopy(
		products.value.find((el) => el.name === route.params.id)
	);
	// console.log(product.value);
	firmware_id.value = product.value['firmware_id'][0];
	product.value['firmware_id'] = sortBy(
		(
			await getTargetDatabase('firmware', product.value['firmware_id'])
		).list[0].version
			.filter((el) => !el.status)
			.map((el) => ({
				version: el.version,
				download_path: el.download_path,
				create_date: dayjs(el.create_date).format('YYYY-MM-DD'),
				creator: creatorList.value.find((x) => x.val === el.creator)
					.opt,
			}))
	);

	product.value['documents_id'] = (
		await getTargetDatabase('document', product.value['documents_id'])
	).list.map((el) => ({
		name: el.name,
		prefit: el.prefit,
		version: sortBy(
			el.version
				.filter((el) => !el.status)
				.map((el) => ({
					version: el.version,
					download_path: el.download_path,
					create_date: dayjs(el.create_date).format('YYYY-MM-DD'),
					creator: creatorList.value.find((x) => x.val === el.creator)
						.opt,
				}))
		),
		_id: el._id,
		document_type_id: documentTypeList.value.find(
			(x) => x.val === el.document_type_id
		).opt,
	}));
};

const makeDocumentType = () => {
	documentType.value = [
		...new Set(
			product.value['documents_id'].map((el) => el.document_type_id)
		),
	].map((el) => ({
		title: el,
		content: product.value['documents_id'].filter(
			(x) => x.document_type_id === el
		),
	}));

	for (let i = 0; i < documentType.value.length; i++) {
		const element = documentType.value[i];
		triggerVersion.value.push(element.content.map(() => false));
	}
};

onBeforeMount(async () => {
	product.value = [];
	fixLoading(true);
	if (!documentTypeList.value.length) await fixDocumentTypeList();
	if (!creatorList.value.length) await getCreatorList();
	await makeProductValue();
	makeDocumentType();
	fixLoading(false);
});
</script>

<template>
	<div
		class="product-page"
		v-if="documentType.length && product.firmware_id.length"
	>
		<header>
			<div class="logo-box">
				<div class="font-box w-112 mr-8 p-8">
					<h1 class="text-5xl mb-5">{{ product.name }} Series</h1>
					<p class="text-2xl text-gray-300">{{ product.slogan }}</p>
				</div>
				<div class="img-box w-128 flex justify-center">
					<img class="w-auto h-full" :src="product.photo" alt="" />
				</div>
			</div>
			<div class="utility-box">
				<span class="cursor-pointer text-lg" @click="goToProductList()">
					Go Back
				</span>
			</div>
		</header>
		<main class="p-10 flex flex-col justify-center h-auto w-full">
			<div v-for="(df, ff) in documentType" :key="df" class="box mb-8">
				<div class="document-type-title">
					<span class="w-6/12">{{ df.title }}</span>
					<span class="w-1/12 text-center">Version</span>
					<span class="w-2/12 text-center">Creator</span>
					<span class="w-2/12 text-center">Date</span>
				</div>
				<div class="box" v-for="(dc, cc) in df.content" :key="dc.name">
					<div class="document-list">
						<span class="w-1/2">{{ dc.name }}</span>
						<span class="w-1/12 text-center">
							{{ dc.version[0].version }}
						</span>
						<span class="w-2/12 text-center">
							{{ dc.version[0].creator }}
						</span>
						<span class="w-2/12 text-center">
							{{ dc.version[0].create_date }}
						</span>
						<div
							class="cursor-pointer"
							@click="triggerVersionList('d', ff, cc)"
						>
							<el-icon>
								<ArrowRight v-if="!triggerVersion[ff][cc]" />
								<ArrowDown v-else />
							</el-icon>
						</div>
					</div>
					<div
						:class="[
							'version-list',
							{
								'height-12': triggerVersion[ff][cc],
							},
						]"
						v-for="dv in dc.version"
						:key="dv.version"
					>
						<span class="w-1/2">{{ dc.name }}</span>
						<span class="w-1/12 text-center">
							{{ dv.version }}
						</span>
						<span class="w-2/12 text-center">
							{{ dv.creator }}
						</span>
						<span class="w-2/12 text-center">
							{{ dv.create_date }}
						</span>
						<div
							class="doc-icon"
							@click="
								openPdf(
									dc._id,
									dv.version,
									dv.download_path,
									'document'
								)
							"
						>
							<img
								src="@/assets/img/png/icon_downloads.png"
								alt=""
								class="w-5"
							/>
						</div>
					</div>
				</div>
			</div>
			<div class="box">
				<div class="document-type-title">
					<span class="w-6/12">Firmware</span>
					<span class="w-1/12 text-center">Version</span>
					<span class="w-2/12 text-center">Creator</span>
					<span class="w-2/12 text-center">Date</span>
				</div>
				<div class="box">
					<div class="document-list">
						<span class="w-6/12">{{
							`${product.name} firmware`
						}}</span>
						<span class="w-1/12 text-center">
							{{ product.firmware_id[0].version }}
						</span>
						<span class="w-2/12 text-center">
							{{ product.firmware_id[0].creator }}
						</span>
						<span class="w-2/12 text-center">
							{{ product.firmware_id[0].create_date }}
						</span>
						<div
							class="cursor-pointer"
							@click="triggerVersionList('f')"
						>
							<el-icon>
								<ArrowRight v-if="!triggerFirmware" />
								<ArrowDown v-else />
							</el-icon>
						</div>
					</div>
					<div
						:class="[
							'version-list',
							{
								'height-12': triggerFirmware,
							},
						]"
						v-for="firm in product.firmware_id"
						:key="firm.version"
					>
						<span class="w-6/12"></span>
						<span class="w-1/12 text-center">
							{{ firm.version }}
						</span>
						<span class="w-2/12 text-center">
							{{ firm.creator }}
						</span>
						<span class="w-2/12 text-center">
							{{ firm.create_date }}
						</span>
						<div
							class="doc-icon"
							@click="
								openPdf(
									firmware_id,
									firm.version,
									firm.download_path,
									'firmware'
								)
							"
						>
							<img
								src="@/assets/img/png/icon_downloads.png"
								alt=""
								class="w-5"
							/>
						</div>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<style lang="scss" scoped>
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
	main {
		.box {
			@apply w-full h-auto flex flex-col items-center justify-center;
			.document-type-title {
				@apply w-4/5 h-8 bg-slate-600 text-cyan-50 flex justify-start items-center pl-3;
			}
			.document-list {
				@apply w-4/5 h-8 flex justify-start items-center pl-3 bg-white mt-6 mb-6 text-stone-800;
			}
			.version-list {
				@apply w-4/5 h-0 flex justify-start items-center pl-3 bg-amber-100 text-cyan-700 overflow-hidden duration-300 mt-2 mb-2;
			}
			.doc-icon {
				@apply m-2 rounded-3xl bg-teal-400 w-9 h-9 flex justify-center items-center cursor-pointer border-2 border-teal-700 hover:bg-amber-500 duration-300;
			}
			.height-12 {
				@apply h-12;
			}
		}
	}
}
</style>
