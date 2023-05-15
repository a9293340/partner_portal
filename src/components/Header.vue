<template>
	<div class="header">
		<div class="left">
			<el-icon class="back" v-if="state.hasBack" @click="back"
				><Back
			/></el-icon>
			<span class="now-title">{{ nowHeader }}</span>
		</div>
		<div class="right">
			<el-popover
				placement="bottom"
				:width="320"
				trigger="click"
				popper-class="popper-user-box"
			>
				<template #reference>
					<div class="author">
						<el-icon size="30px">
							<User />
						</el-icon>
					</div>
				</template>
				<div class="nickname">
					<p>Name : {{ loginAdmin.name }}</p>
					<p>company : {{ loginAdmin.company }}</p>
					<el-tag
						size="small"
						effect="dark"
						class="logout"
						@click="logout"
						>logout</el-tag
					>
				</div>
			</el-popover>
		</div>
	</div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useParameterStore } from '@/store/parameter.js';

const login = useParameterStore();
const { loginAdmin, nowHeader } = storeToRefs(login);

const router = useRouter();
const state = reactive({
	name: 'dashboard',
	userInfo: null, // 用户信息变量
	hasBack: false, // 是否展示返回icon
});

// 退出登录
const logout = async () => {
	router.push('/login');
};

// 返回方法
const back = () => {
	router.back();
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_color.scss';
.header {
	height: 50px;
	border-bottom: 1px solid #e9e9e9;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 20px;
}
.header .left .back {
	border: 1px solid #e9e9e9;
	padding: 5px;
	border-radius: 50%;
	margin-right: 5px;
	cursor: pointer;
}
.right > div > .icon {
	font-size: 18px;
	margin-right: 6px;
}
.author {
	margin-left: 10px;
	cursor: pointer;
	border-radius: 50%;
	padding: 4px;
	transition-duration: 0.3s;
	i {
		svg {
			color: $main-style-color;
		}
	}
	&:hover {
		background-color: $main-style-color;
		i {
			svg {
				color: white;
			}
		}
	}
}
</style>

<style lang="scss">
@import '../assets/scss/_color.scss';
.popper-user-box {
	background: url('https://s.yezgea02.com/lingling-h5/static/account-banner-bg.png')
		50% 50% no-repeat !important;
	background-size: cover !important;
	border-radius: 0 !important;
}
.popper-user-box .nickname {
	position: relative;
	color: #ffffff;
}
.popper-user-box .nickname .logout {
	position: absolute;
	right: 0;
	top: 0;
	cursor: pointer;
}
.popper-user-box .logout {
	background-color: $main-style-color;
	border-color: $main-style-color;
}
span.now-title {
	font-size: 20px;
	font-weight: 900;
	color: $main-style-color;
}
</style>
