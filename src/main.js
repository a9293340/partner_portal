import { createApp } from 'vue';
import VueClientRecaptcha from 'vue-client-recaptcha';
import {
	ElButton,
	ElAlert,
	ElContainer,
	ElAside,
	ElMenu,
	ElSubMenu,
	ElMenuItemGroup,
	ElOptionGroup,
	ElMenuItem,
	ElForm,
	ElFormItem,
	ElInput,
	ElCheckbox,
	ElPopover,
	ElTag,
	ElCard,
	ElTable,
	ElTableColumn,
	ElPopconfirm,
	ElUpload,
	ElDialog,
	ElPagination,
	ElCascader,
	ElRadioGroup,
	ElRadio,
	ElSelect,
	ElOption,
	ElTree,
} from 'element-plus';
import App from './App.vue';
import router from '@/router';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import VueCryptojs from 'vue-cryptojs';
import { createPinia } from 'pinia';
import './index.css';

const app = createApp(App); // 生成 Vue 实例 app

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}

app.use(router).use(VueCryptojs).use(createPinia()); // 引用路由实例
app.use(ElButton)
	.use(ElAlert)
	.use(ElContainer)
	.use(ElAside)
	.use(ElMenu)
	.use(ElSubMenu)
	.use(ElMenuItemGroup)
	.use(ElMenuItem)
	.use(ElForm)
	.use(ElFormItem)
	.use(ElInput)
	.use(ElPopover)
	.use(ElTag)
	.use(ElCard)
	.use(ElTable)
	.use(ElTableColumn)
	.use(ElPopconfirm)
	.use(ElUpload)
	.use(ElDialog)
	.use(ElPagination)
	.use(ElCascader)
	.use(ElRadioGroup)
	.use(ElRadio)
	.use(ElSelect)
	.use(ElOption)
	.use(ElOptionGroup)
	.use(ElTree);

// app.use(VueRecaptchaPlugin, {
// 	v2SiteKey: '6LeF7IclAAAAAND7_-mtziFp4YZqxDIhtyRyGmqG',
// });
app.component('VueClientRecaptcha', VueClientRecaptcha);

app.mount('#app'); // 挂载到 #app
