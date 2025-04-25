<script>
	import { PUBLIC_API_BASE_URL } from "$env/static/public";

	let { data } = $props();
</script>

<a class="m-2 rounded border" href={`/task/${data.id}`}>
	{data.title}
</a>
