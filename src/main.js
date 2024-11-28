import App from './App.svelte';
import { pb } from './lib/pocketbase';

const app = new App({
	target: document.body,
});

export default app;