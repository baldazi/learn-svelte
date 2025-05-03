import type { Action } from "svelte/action";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

// Configure worker
pdfjsLib.GlobalWorkerOptions.workerSrc =  pdfjsWorker;

export type PDFDocumentProxy = pdfjsLib.PDFDocumentProxy
export type PDFPageProxy = pdfjsLib.PDFPageProxy

export const loadPDF = async (url: string):Promise<PDFDocumentProxy> =>{
	return pdfjsLib.getDocument(url).promise
}

export const getPage = async (doc: PDFDocumentProxy, page:number):Promise<PDFPageProxy> => {
	return doc.getPage(page)
}

// number of page
export const renderPDF: Action<HTMLCanvasElement, string | undefined> = (node, url)  => {
  
	const render = async () => {
		const loadingTask = pdfjsLib.getDocument(url);
		const pdf = await loadingTask.promise;
        console.log(pdf._pdfInfo);
        
		const page = await pdf.getPage(1);

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