<script>
	let { data } = $props();
</script>

<a href={`/task/${data.id}`}>
	<div class="p-2 m-2 border rounded">
		<h1>{data.title}</h1>
		<p>{data.description}</p>
	</div>
</a>
