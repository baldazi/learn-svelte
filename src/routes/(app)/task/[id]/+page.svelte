<script lang="ts">
	import { page } from "$app/state";
    import type {PageProps} from "./$types";

    let {data}: PageProps = $props();
</script>

<svelte:head>
    <title>Task n°{data.id}</title>
</svelte:head>

<div>
    {JSON.stringify(data)}
</div>

<div>
    {page.url.hash}
</div>