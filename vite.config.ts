import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { join } from 'path';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'~': join(__dirname, 'src'),
		},
	},
	plugins: [react(), reactRefresh()],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import "./src/styles/_variables.scss";`,
			},
		},
	},
});
