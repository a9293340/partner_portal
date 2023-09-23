import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import fs from "vite-plugin-fs";
// import { fileURLToPath } from 'node:url';
import path from "path";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import ElementPlus from "unplugin-element-plus/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

export default ({ mode }) =>
	defineConfig({
		plugins: [
			vue(),
			fs({
				rootDir: "./src",
			}),
			Components({
				resolvers: [
					ElementPlusResolver({
						importStyle: "sass",
					}),
					IconsResolver(),
				],
			}),
			ElementPlus(),
			Icons({ autoInstall: true }),
		],
		optimizeDeps: {
			include: ["dayjs", "element-plus"],
		},
		resolve: {
			alias: {
				"~": path.resolve(__dirname, "./"),
				"@": path.resolve(__dirname, "src"),
			},
		},
		base: "./",
		server: {
			hmr: true,
			cors: true,
			proxy: {
				"/api": {
					target: "http://localhost:3300",
					changeOrigin: true,
					rewrite: (path) => path,
				},
			},
		},
		css: {
			postcss: {
				plugins: [require("tailwindcss"), require("autoprefixer")],
			},
			preprocessorOptions: {
				scss: {
					charset: false,
				},
			},
		},
		build: {
			minify: "terser",
			terserOptions: {
				compress: {
					drop_console: true,
					drop_debugger: true,
				},
			},
		},
		define: {
			__VUE_I18N_FULL_INSTALL__: true,
			__VUE_I18N_LEGACY_API__: false,
			__INTLIFY_PROD_DEVTOOLS__: false,
		},
	});
