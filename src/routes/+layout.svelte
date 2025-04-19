<script lang="ts">
	import '../app.css';
	import Header from '$components/Header.svelte';

	let { children } = $props();
</script>


<Header/>

<main>
	{@render children()}
</main>

<footer class="text-center bg-teal-600/10">
	&copy; 2025 
</footer>

