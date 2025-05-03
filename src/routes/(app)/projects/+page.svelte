<script lang="ts">
	import {loadPDF, renderPDF, type PDFDocumentProxy} from "$lib/pdfjs";
	import { ChevronLeft, ChevronRight, FileUp } from "@lucide/svelte";
	import type { Action } from "svelte/action";

	let files: FileList | null = $state(null)

	let pdfDocument: PDFDocumentProxy|null = $state(null)

	let indexPage = $state(1)
	let totalPage = $derived(pdfDocument?.numPages)

	const renderPDFAction: Action<HTMLCanvasElement> = (node)  => {
		const render = async () => {
			if (!pdfDocument) return
			const page = await pdfDocument.getPage(indexPage);

			const scale = 1;
			const viewport = page.getViewport({ scale });

			const context = node.getContext("2d");
			if (!context) return;

			node.height = viewport.height;
			node.width = viewport.width;

			const renderContext = {
				canvasContext: context,
				viewport,
			};

			await page.render(renderContext).promise;
		};

		render();
	}
	
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
		console.log("url",pdfDocument)
		console.log("pages", totalPage)
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
			<button aria-label="preview"><ChevronLeft/></button>
			<div class="bg-gray-200">
				<input type="text" bind:value={indexPage} class="">
				<span class="p-5">{totalPage}</span>
			</div>
			
			<button aria-label="preview"><ChevronRight/></button>
		</div>
		<canvas use:renderPDFAction class="ring-2 ring-green-300/60 mx-auto"></canvas>
	</div>
{/if}

