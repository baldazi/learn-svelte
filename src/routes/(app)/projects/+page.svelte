<script lang="ts">
	import {loadPDF, renderPDF, type PDFDocumentProxy} from "$lib/pdfjs";
	import { ChevronLeft, ChevronRight, FileUp } from "@lucide/svelte";
	import { untrack } from "svelte";
	import {slide} from "svelte/transition";

	let files: FileList | null = $state(null)

	let pdfDocument: PDFDocumentProxy|null = $state(null)

	let indexPage = $state(1)
	let totalPage = $derived(pdfDocument?.numPages)

	
	$effect(()=>{
		const loadPDFDocument = async () =>{
		if (!files || files.length === 0)
			return
		const file :File| null = files.item(0)

		if (file?.type === "application/pdf")
			pdfDocument = await loadPDF(URL.createObjectURL(file))
		}

		loadPDFDocument()

		console.log(files)
		console.log("url",untrack(()=>pdfDocument))
		console.log("pages", untrack(()=>totalPage))
	})

	let canvas:HTMLCanvasElement

	$effect(()=>{
		const render = async () => {
			if (!pdfDocument) return
			const page = await pdfDocument.getPage(indexPage);

			const scale = 1.2;
			const viewport = page.getViewport({ scale });

			const context = canvas.getContext("2d");
			if (!context) return;

			canvas.height = viewport.height;
			canvas.width = viewport.width;

			const renderContext = {
				canvasContext: context,
				viewport,
			};

			await page.render(renderContext).promise;
		};

		render();

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

{#if files}
	<div class="p-2">
		<div class="flex gap-2 justify-center p-3">
			<button aria-label="preview" disabled={ indexPage === 1} onclick={()=>indexPage--}><ChevronLeft/></button>
			<div class="bg-gray-200">
				<input type="number" bind:value={indexPage} class="" min="1" max={totalPage}>
				<span class="p-5">{totalPage}</span>
			</div>
			
			<button aria-label="preview" disabled={ indexPage === totalPage} onclick={()=>indexPage++}><ChevronRight/></button>
		</div>
		<canvas bind:this={canvas} class="ring-2 ring-green-300/60 mx-auto" in:slide></canvas>
	</div>
{/if}

