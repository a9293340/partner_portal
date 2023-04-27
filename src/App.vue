<script setup>
import product from '@/assets/db/product.json';
import { reactive, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useParameterStore } from '@/store/parameter.js';
import { useComponentStore } from '@/store/component.js';
import { storeToRefs } from 'pinia';
import { sessionRemove, sessionGet, encode } from '@/utils';
import routerData from '@/assets/db/routerDb.json';

const router = useRouter();
const login = useParameterStore();
const comStore = useComponentStore();
const { showMenu, loginAdmin, errorMsg } = storeToRefs(login);
const { isShadow } = storeToRefs(comStore);
const { changeShowMenu, fixError, fixHeader, isPassPrefit, loginAction } =
	login;

const state = reactive({
	showMenu: false,
	defaultOpen: ['1', '2', '3', '4'],
	currentPath: '/',
});
const mainTitle = ref(null);

const goToIntroduce = () => router.push('/introduce');

const errorHandle = (tag = 0, path, next) => {
	fixError({
		title: 'Error',
		msg: tag ? 'Premission Error!' : 'Not Login!',
		isShow: true,
	});
	next({ path });
};

router.afterEach((to, from) => {
	changeShowMenu(!(to.path === '/login'));
	// console.log(showMenu.value);
});

router.beforeEach(async (to, from, next) => {
	// console.log(to, from);
	// console.log(to.params.id);
	if (to.path == '/login') {
		if (loginAdmin.value.account) {
			try {
				const logout = await axios.post('/api/admin/logout', {
					data: encode({
						tokenReq: loginAdmin.value.account,
						token: sessionGet('cinoT'),
					}),
				});
				sessionRemove('cinoT');
				loginAction({});
			} catch (error) {
				console.log(error);
			}
		}
		next();
	} else {
		if (!loginAdmin.value.account) errorHandle(0, '/login', next);
		// Product Document... single page check
		else if (
			to.params.id &&
			isPassPrefit(product.find((el) => el.name === to.params.id).prefit)
		)
			errorHandle(1, '/', next);
		else if (isPassPrefit(to.meta.prefit)) errorHandle(1, '/', next);
		else {
			fixHeader(to.name);
			next();
		}
	}
	state.currentPath = to.path;
});

onBeforeMount(() => {
	mainTitle.value = routerData;
	// resetAdminList(adminList);
});
</script>

<template>
	<div class="layout">
		<el-alert
			v-show="errorMsg.isShow"
			:title="errorMsg.title"
			type="error"
			:description="errorMsg.msg"
			show-icon
		/>
		<el-container v-if="showMenu" class="container">
			<el-aside class="aside">
				<div class="head title-link" @click="goToIntroduce">
					<div>
						<img
							src="//s.weituibao.com/1582958061265/mlogo.png"
							alt="logo"
						/>
						<span>CINO Partner</span>
					</div>
				</div>
				<div class="line" />
				<el-menu
					background-color="#242e33"
					text-color="#dbdbdb"
					:default-openeds="state.defaultOpen"
					:router="true"
				>
					<el-sub-menu
						v-for="(title, ti) in mainTitle"
						:key="title.name"
						:index="`${ti + 1}`"
						v-show="
							title.prefit.findIndex(
								(el) => el === loginAdmin.permissions
							) !== -1 && title.subContent
						"
					>
						<template #title>
							<span>{{ title.name }} </span>
						</template>
						<el-menu-item-group>
							<el-menu-item
								v-for="sub in title.subContent"
								:key="sub.name"
								v-show="
									sub.prefit.findIndex(
										(el) => el === loginAdmin.permissions
									) !== -1
								"
								:index="sub.path"
							>
								<el-icon>
									<Odometer />
								</el-icon>
								{{ sub.name }}
							</el-menu-item>
						</el-menu-item-group>
					</el-sub-menu>
					<el-menu-item
						v-for="(title, ti) in mainTitle"
						:key="title.name"
						v-show="
							title.prefit.findIndex(
								(el) => el === loginAdmin.permissions
							) !== -1 && !title.subContent
						"
						:index="title.path"
					>
						{{ title.name }}
					</el-menu-item>
				</el-menu>
			</el-aside>
			<el-container class="content">
				<Header />
				<div class="main">
					<router-view />
				</div>
				<Footer />
			</el-container>
		</el-container>
		<el-container v-else class="container">
			<router-view />
		</el-container>
		<div class="shadow" v-if="isShadow"></div>
	</div>
</template>

<style lang="scss" scoped>
@import './assets/scss/_color.scss';

html,
body,
#app,
.el-container {
	padding: 0;
	margin: 0;
	height: 100%;
}

.layout {
	min-height: 100vh;
	background-color: #ffffff;
	position: relative;
	width: 100%;
}
.shadow {
	position: fixed;
	z-index: 1499;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background: rgba($color: #000000, $alpha: 0.3);
}
.container {
	width: 100%;
	margin: 0;
	height: 100vh;
}
.aside {
	width: 200px !important;
	background-color: $main-style-color;
}
.head {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 50px;
}
.head > div {
	display: flex;
	align-items: center;
}

.head img {
	width: 50px;
	height: 50px;
	margin-right: 10px;
}
.head span {
	font-size: 20px;
	color: #ffffff;
}
.el-alert {
	margin-left: 50%;
	transform: translate(-50%);
	width: 450px;
	height: 80px;
	position: fixed;
	z-index: 4000000;
}

.line {
	border-top: 1px solid hsla(0, 0%, 100%, 0.05);
	border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.content {
	display: flex;
	flex-direction: column;
	max-height: 100vh;
	overflow: hidden;
}
.main {
	height: calc(100vh - 100px);
	overflow: auto;
	padding: 10px;
}
.title-link {
	cursor: pointer;
}

@media (min-width: 1024px) {
	.container {
		max-width: 100%;
	}
}
</style>

<style lang="scss">
@import './assets/scss/_color.scss';

body {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}
.el-menu {
	border-right: none !important;
}
.el-submenu {
	border-top: 1px solid hsla(0, 0%, 100%, 0.05);
	border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.el-submenu:first-child {
	border-top: none;
}
.el-submenu [class^='el-icon-'] {
	vertical-align: -1px !important;
}
a {
	color: #409eff;
	text-decoration: none;
}
.el-pagination {
	text-align: center;
	margin-top: 20px;
}
.el-popper__arrow {
	display: none;
}
</style>
