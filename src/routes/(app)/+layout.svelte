<script lang="ts">
	import '$styles/app.css';
	import Header from '$components/Header.svelte';
	let { children } = $props();
</script>


<Header/>


{@render children()}


<footer class="text-center bg-teal-600/10">
	&copy; 2025 
</footer>

