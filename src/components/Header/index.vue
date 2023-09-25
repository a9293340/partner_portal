<script setup>
import { useComponentStore } from "@/store/useComponentsStatusStore";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import topbar_bg from "@/assets/img/png/topbar_bg.png";

const {
	setFontSizeController,
	showSideBarExecute,
	font_size_options,
	language_i18n_options,
} = useComponentStore();
const { fontSizeController, isShowSideBar } = storeToRefs(useComponentStore());
const { locale } = useI18n();
</script>

<template>
	<div class="header" :style="`background-image: url(${topbar_bg})`">
		<!--//! 1280以下 -->
		<div class="is-not-xl">
			<div class="burger" @click="showSideBarExecute(!isShowSideBar)">
				<el-icon :size="28" color="white">
					<i-iconamoon-menu-burger-horizontal />
				</el-icon>
			</div>
			<el-dropdown
				trigger="click"
				:hide-on-click="false"
				placement="bottom-end"
			>
				<el-icon :size="28" color="white">
					<i-tabler-tool />
				</el-icon>
				<template class="drop-down" #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item>
							<div class="icon">
								<el-dropdown
									trigger="click"
									placement="left"
									:show-timeout="0"
									@command="
										(lang) => {
											locale = lang;
										}
									"
								>
									<div class="-xl-dropdown-font-style">
										<el-icon :size="fontSizeController">
											<i-ion-language />
										</el-icon>
										<p>{{ $t("header.i18nSetting") }}</p>
									</div>
									<template #dropdown>
										<el-dropdown-menu>
											<el-dropdown-item
												v-for="item in language_i18n_options"
												:key="item.opt"
												:command="item.val"
												:disabled="item.val === locale"
											>
												<el-icon :size="fontSizeController">
													<i-cif-us v-if="item.val === 'en-US'" />
													<i-cif-tw v-else-if="item.val === 'zh-TW'" />
												</el-icon>
												{{ item.opt }}
											</el-dropdown-item>
										</el-dropdown-menu>
									</template>
								</el-dropdown>
							</div>
						</el-dropdown-item>
						<el-dropdown-item>
							<div class="icon">
								<el-dropdown
									trigger="click"
									placement="left"
									:show-timeout="0"
									@command="
										(size) => {
											setFontSizeController(size);
										}
									"
								>
									<div class="-xl-dropdown-font-style">
										<el-icon :size="fontSizeController">
											<i-ion-text />
										</el-icon>
										<p>{{ $t("header.fontSize") }}</p>
									</div>
									<template #dropdown>
										<el-dropdown-menu>
											<el-dropdown-item
												v-for="item in font_size_options"
												:key="item.opt"
												:command="item.val"
												:disabled="item.val === fontSizeController"
											>
												{{ item.opt }}
											</el-dropdown-item>
										</el-dropdown-menu>
									</template>
								</el-dropdown>
							</div>
						</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
		<!--//! 1280以上 -->
		<div class="xl-tools-box is-xl">
			<!-- Language Setting -->
			<el-tooltip
				class="box-item"
				effect="light"
				:content="language_i18n_options.find((el) => el.val === locale).opt"
				placement="bottom"
			>
				<div class="icon">
					<el-dropdown
						trigger="click"
						@command="
							(lang) => {
								locale = lang;
							}
						"
					>
						<el-icon :size="28" color="white">
							<i-ion-language />
						</el-icon>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item
									v-for="item in language_i18n_options"
									:key="item.opt"
									:command="item.val"
									:disabled="item.val === locale"
								>
									<el-icon :size="fontSizeController">
										<i-cif-us v-if="item.val === 'en-US'" />
										<i-cif-tw v-else-if="item.val === 'zh-TW'" />
									</el-icon>
									{{ item.opt }}
								</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</div>
			</el-tooltip>
			<!-- Font Size -->
			<el-tooltip
				class="box-item"
				effect="light"
				:content="
					font_size_options.find((el) => el.val === fontSizeController).opt
				"
				placement="bottom"
			>
				<div class="icon">
					<el-dropdown
						trigger="click"
						@command="
							(size) => {
								setFontSizeController(size);
							}
						"
					>
						<el-icon :size="28" color="white">
							<i-ion-text />
						</el-icon>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item
									v-for="item in font_size_options"
									:key="item.opt"
									:command="item.val"
									:disabled="item.val === fontSizeController"
								>
									{{ item.opt }}
								</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</div>
			</el-tooltip>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.header {
	@apply w-full h-16 bg-header-img bg-no-repeat bg-left flex justify-end items-center p-5;
	.burger {
		@apply mr-3 flex justify-center items-center cursor-pointer;
		i {
			@apply hover:text-green-100 duration-200;
		}
	}
}

.xl-tools-box {
	@apply hidden flex-row;
}

.icon {
	@apply flex items-center m-2;
	.-xl-dropdown-font-style {
		@apply flex flex-row;
	}
}

.is-not-xl {
	@apply flex flex-row xl:hidden;
}

.is-xl {
	@apply xl:flex;
}

.el-menu {
	border-bottom: none !important;
	width: 150px;
	justify-content: end;
}
</style>
