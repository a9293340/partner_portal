import { createI18n } from 'vue-i18n';
import zh from './zh.json';
import en from './en.json';

const i18n = createI18n({
	legacy: false,
	globalInjection: true,
	locale: 'en-US',
	messages: {
		'zh-TW': zh,
		'en-US': en,
	},
	fallbackLocale: 'en-US',
});

export default i18n;
