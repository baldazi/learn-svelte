<script lang="ts">
	import {loadPDF, renderTextLayer, type PDFDocumentProxy} from "$lib/pdfjs";
	import { ChevronLeft, ChevronRight, Download, FileUp, ZoomIn, ZoomOut } from "@lucide/svelte";
	import { untrack } from "svelte";
	import {slide} from "svelte/transition";
	// import "pdfjs-dist/web/pdf_viewer.css";

	let files: FileList | null = $state(null)

	let pdfDocument: PDFDocumentProxy|null = $state(null)

	let indexPage = $state(1)
	let totalPage = $derived(pdfDocument?.numPages)
	let scale = $state(1.0)

	
	$effect(()=>{
		const loadPDFDocument = async () =>{
		if (!files || files.length === 0)
			return
		const file :File| null = files.item(0)

		if (file?.type === "application/pdf")
			pdfDocument = await loadPDF(URL.createObjectURL(file))
			scale = 1.0
		}

		loadPDFDocument()

		console.log(files)
		
		console.log("url",untrack(()=>pdfDocument))
		console.log("pages", untrack(()=>totalPage))
	})

	let pdfCanvas:HTMLCanvasElement
	let pdfTextLayer:HTMLDivElement

	$effect(()=>{
		const render = async () => {
			if (!pdfDocument) return
			const page = await pdfDocument.getPage(indexPage);
			const viewport = page.getViewport({ scale: scale < 2? scale: 2 });
			const context = pdfCanvas.getContext("2d");
			if (!context) return;

			pdfCanvas.height = viewport.height;

			pdfCanvas.width = viewport.width;
			const renderContext = {
				canvasContext: context,
				viewport,
			};

			// pdfCanvas.offsetHeight
			renderTextLayer(page, pdfTextLayer, viewport)
			const rect = pdfCanvas.getBoundingClientRect()
			Object.assign(pdfTextLayer.style,
			{
				left:`${pdfCanvas.offsetLeft-rect.left}px`,
				top: `${pdfCanvas.offsetTop}px`, 
				width: `${pdfCanvas.width}px`,
				height: `${pdfCanvas.height}px`
			});
			await page.render(renderContext).promise;
		};

		console.log(scale)
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
		<div class="flex justify-center items-center">
			<div class="flex gap">
				<button aria-label="zoom-out" onclick={()=>scale = scale - scale * 0.2}
					disabled={scale<=0.8}><ZoomOut/></button>
				<span>{Math.floor(scale*100)}%</span>
				<button aria-label="zoom-in" onclick={()=>scale = scale * 1.2} disabled={scale>=2}><ZoomIn/></button>
			</div>
			<div class="flex gap-2 justify-center p-3">
				<button aria-label="preview" disabled={ indexPage === 1} onclick={()=>indexPage--}
					class="disabled:text-gray-800/50 disabled:cursor-not-allowed"><ChevronLeft/></button>
				<div class="bg-gray-200">
					<input type="number" bind:value={indexPage} class="" min="1" max={totalPage}>
					<span class="p-5">/{totalPage}</span>
				</div>
				
				<button aria-label="preview" disabled={ indexPage === totalPage} onclick={()=>indexPage++}
					class="disabled:text-gray-800/50 disabled:cursor-not-allowed"><ChevronRight/></button>
			</div>

			<a aria-label="download" href={URL.createObjectURL(files.item(0))} download="simple.pdf"><Download/></a>

		</div>

		<div class="pdf__layers">
			<div class="pdf__canvas-layer">
				<canvas bind:this={pdfCanvas} class="ring-2 ring-green-300/60 mx-auto" in:slide></canvas>
			</div>
			<div bind:this={pdfTextLayer} class="pdf__text-layer"></div>
		</div>

	</div>
{/if}
	


