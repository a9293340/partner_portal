import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import fs from 'vite-plugin-fs';
import path from 'path';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import ElementPlus from 'unplugin-element-plus/vite';

export default ({ mode }) =>
	defineConfig({
		plugins: [
			vue(),
			fs({
				rootDir: './src',
			}),
			Components({
				resolvers: [
					ElementPlusResolver({
						importStyle: 'sass',
					}),
				],
			}),
			ElementPlus(),
		],
		optimizeDeps: {
			include: ['dayjs', 'element-plus'],
		},
		resolve: {
			alias: {
				'~': path.resolve(__dirname, './'),
				'@': path.resolve(__dirname, 'src'),
			},
		},
		base: './',
		server: {
			hmr: true,
			cors: true,
			proxy: {
				'/api': {
					target: 'http://localhost:3300',
					changeOrigin: true,
					rewrite: (path) => path,
				},
			},
		},
		css: {
			postcss: {
				plugins: [require('tailwindcss'), require('autoprefixer')],
			},
			preprocessorOptions: {
				scss: {
					charset: false,
				},
			},
		},
	});
