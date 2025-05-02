<script lang="ts">
	import {loadPDF} from "$lib/pdfjs";
	import { FileUp } from "@lucide/svelte";

	let files = $state(null)
	let fileUrl = $derived(files ?? URL.createObjectURL(files[0]))

	$effect(()=>{
		console.log(files)
		console.log("url",fileUrl)
	})
</script>

<div class="flex flex-col items-center gap-4">
	  <!-- Zone de dépôt/upload -->
	<label
	class="flex cursor-pointer appearance-none justify-center rounded-md border border-dashed border-gray-300 bg-white px-3 py-6 te
	xt-sm transition hover:border-gray-400 focus:border-solid focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 w-
	full max-w-md"
	>
	<span class="flex items-center space-x-2">
		<FileUp class="h-6 w-6 stroke-gray-400" />
		<span class="text-xs font-medium text-gray-600">
		Déposer un PDF à visualiser, ou
		<span class="text-blue-600 underline">parcourir</span>
		</span>
	</span>
	<input 
		id="photo-dropbox" 
		type="file" 
		accept=".pdf" 
		class="sr-only"
		bind:files={files}
	/>
	</label>
</div>


<div class="p-2">
<canvas use:loadPDF={ fileUrl } class="ring-2 ring-green-300/60 mx-auto"></canvas>
</div>

