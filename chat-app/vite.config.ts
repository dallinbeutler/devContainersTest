import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	server: {
		host:true,
		port: 5000,
	}, preview: {
		port: 3000,
	},
	plugins: [sveltekit()]
});
