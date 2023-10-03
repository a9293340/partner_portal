<script setup>
import { storeToRefs } from 'pinia';
import { useComponentStore } from '@/store/useComponentsStatusStore';
import { ref } from 'vue';
import sidebar_bg from '@/assets/img/png/sidebar_bg.png';

const { isShowSideBar, useful_tv, fontSizeController } = storeToRefs(useComponentStore());

const defaultOpens = ref(['1', '1-1']);
</script>

<template>
  <div
    :class="['side-bar', { 'side-bar-show': isShowSideBar }, 'side-bar-xl']"
    :style="`background-image: url(${sidebar_bg})`"
  >
    <div class="menu">
      <el-menu
        active-text-color="#ffd04b"
        background-color="rgba(0,0,0,0)"
        class="el-menu-vertical-demo"
        :default-openeds="defaultOpens"
        text-color="#fff"
        :router="true"
      >
        <template v-for="(tv_1, t1) in useful_tv" :key="tv_1.name">
          <el-sub-menu :index="`${t1 + 1}`" v-if="tv_1.path === ''">
            <template #title>
              <el-icon :size="fontSizeController + 2"><Watermelon /></el-icon>
              <h1>{{ $t(tv_1.name) }}</h1>
            </template>
            <el-menu-item-group>
              <template v-for="(tv_2, t2) in tv_1.children" :key="tv_2.name">
                <el-sub-menu :index="`${t1 + 1}-${t2 + 1}`" v-if="tv_2.path === ''">
                  <template #title>
                    <el-icon :size="fontSizeController + 2">
                      <GobletSquareFull />
                    </el-icon>
                    <h1>{{ $t(tv_2.name) }}</h1>
                  </template>
                  <template v-for="tv_3 in tv_2.children" :key="tv_3.name">
                    <el-menu-item :index="tv_3.path" :disabled="false">
                      <el-icon :size="fontSizeController + 2"><Pear /></el-icon>
                      <h1>{{ $t(tv_3.name) }}</h1>
                    </el-menu-item>
                  </template>
                </el-sub-menu>
                <el-menu-item :index="tv_2.path" :disabled="false" v-else>
                  <el-icon :size="fontSizeController + 2"><GobletSquareFull /></el-icon>
                  <h1>{{ $t(tv_2.name) }}</h1>
                </el-menu-item>
              </template>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item :index="tv_1.path" :disabled="false" v-else>
            <el-icon :size="fontSizeController + 2"><Watermelon /></el-icon>
            <h1>{{ $t(tv_1.name) }}</h1>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.side-bar {
  @apply m-0 h-full w-76 ease-linear duration-200 fixed -left-76  flex flex-col bg-no-repeat bg-bottom bg-cover;
  .logo {
    @apply w-full h-32;
  }
  .menu {
    @apply w-full h-full select-none overflow-y-auto overflow-x-hidden no-scrollbar;
  }
}
.side-bar-xl {
  @apply xl:-start-0.5 xl:relative;
}

.side-bar-show {
  @apply -start-0.5;
}

.el-menu {
  border-right: none !important;
  h1 {
    @apply ml-3;
  }
}

.el-sub-menu:first-child {
  @apply top-0;
}
.el-sub-menu [class^='el-icon-'] {
  vertical-align: -1px !important;
}
</style>
