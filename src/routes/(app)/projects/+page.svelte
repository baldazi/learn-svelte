<script lang="ts">
    import { FileUp } from '@lucide/svelte';
    import * as pdfjsLib from 'pdfjs-dist';
    import { onMount } from 'svelte';
  
    let pdfDoc: pdfjsLib.PDFDocumentProxy | null = null;
    let pageNum = 1;
    let pageRendering = false;
    let pageNumPending: number | null = null;
    let canvas: HTMLCanvasElement;
    let fileInput: HTMLInputElement;
  
    // Initialisation de PDF.js
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
  
    // Fonction pour charger un PDF
    async function loadPDF(file: File) {
      const arrayBuffer = await file.arrayBuffer();
      pdfDoc = await pdfjsLib.getDocument(arrayBuffer).promise;
      pageNum = 1;
      renderPage(pageNum);
    }
  
    // Fonction pour afficher une page
    async function renderPage(num: number) {
      if (!pdfDoc || pageRendering) return;
      
      pageRendering = true;
      const page = await pdfDoc.getPage(num);
      const viewport = page.getViewport({ scale: 1.5 });
      
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      
      const renderContext = {
        canvasContext: canvas.getContext('2d'),
        viewport: viewport
      };
      
      await page.render(renderContext).promise;
      pageRendering = false;
      
      if (pageNumPending !== null) {
        renderPage(pageNumPending);
        pageNumPending = null;
      }
    }
  
    // Gestion du changement de fichier
    function handleFileChange(e: Event) {
      const files = (e.target as HTMLInputElement).files;
      if (files && files[0]) {
        loadPDF(files[0]);
      }
    }
  
    // Navigation entre pages
    function previousPage() {
      if (pageNum <= 1 || pageRendering) return;
      pageNum--;
      renderPage(pageNum);
    }
  
    function nextPage() {
      if (!pdfDoc || pageNum >= pdfDoc.numPages || pageRendering) return;
      pageNum++;
      renderPage(pageNum);
    }
  </script>
  
  <div class="flex flex-col items-center gap-4">
    <!-- Zone de dépôt/upload -->
    <label
      class="flex cursor-pointer appearance-none justify-center rounded-md border border-dashed border-gray-300 bg-white px-3 py-6 text-sm transition hover:border-gray-400 focus:border-solid focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 w-full max-w-md"
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
        on:change={handleFileChange}
        bind:this={fileInput}
      />
    </label>
  
    <!-- Zone d'affichage du PDF -->
    {#if pdfDoc}
      <div class="flex flex-col items-center gap-2">
        <div class="flex items-center gap-4">
          <button 
            on:click={previousPage}
            class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            disabled={pageNum <= 1}
          >
            Précédent
          </button>
          
          <span>Page {pageNum} / {pdfDoc.numPages}</span>
          
          <button 
            on:click={nextPage}
            class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            disabled={pageNum >= pdfDoc.numPages}
          >
            Suivant
          </button>
        </div>
        
        <canvas bind:this={canvas} class="border border-gray-300"></canvas>
      </div>
    {/if}
  </div>