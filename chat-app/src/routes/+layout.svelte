<script>
	import Header from './Header.svelte';
	import './styles.css';
</script>
<div class="app">

	<Header />
	
	<main>
		<slot />
	</main>
	
	<footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer>
</div>

<style>
	.app {
		min-height: 100vh;
		max-height: 100vh;
		display: flex;
  	flex-direction: column;
  	align-content: space-between;
	}

	main {
		padding: 1rem;
		max-width: 64rem;		
		display: contents;
		flex-grow: 1;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
