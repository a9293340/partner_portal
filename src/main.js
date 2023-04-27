import { createApp } from 'vue';
import VueClientRecaptcha from 'vue-client-recaptcha';
import ElementPlus from 'element-plus';
import App from './App.vue';
import router from '@/router';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { createPinia } from 'pinia';
import './index.css';

const app = createApp(App); // 生成 Vue 实例 app

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}

app.use(router).use(createPinia()); // 引用路由实例
app.use(ElementPlus);

// app.use(VueRecaptchaPlugin, {
// 	v2SiteKey: '6LeF7IclAAAAAND7_-mtziFp4YZqxDIhtyRyGmqG',
// });
// app.component('paginate', Paginate);
app.component('VueClientRecaptcha', VueClientRecaptcha);
app.mount('#app'); // 挂载到 #app
