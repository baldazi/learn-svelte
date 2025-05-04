import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

// Configure worker
pdfjsLib.GlobalWorkerOptions.workerSrc =  pdfjsWorker;

export type PDFDocumentProxy = pdfjsLib.PDFDocumentProxy
export type PDFPageProxy = pdfjsLib.PDFPageProxy
export type PDFPageViewport = pdfjsLib.PageViewport

export const loadPDF = async (url: string):Promise<PDFDocumentProxy> =>{
	return pdfjsLib.getDocument(url).promise
}

export const getPage = async (doc: PDFDocumentProxy, page:number):Promise<PDFPageProxy> => {
	return doc.getPage(page)
}

export const renderTextLayer = (pageProxy: PDFPageProxy, textLayerContainer: HTMLDivElement, viewport: PDFPageViewport) => {
	const { scale } = viewport;
	textLayerContainer.style.setProperty("--scale-factor", `${scale}`);
	textLayerContainer.style.setProperty("--total-scale-factor", `${scale}`);
	pageProxy.getTextContent().then((content) => {
		textLayerContainer.innerText = ""
		const renderTask = new pdfjsLib.TextLayer({
			container: textLayerContainer,
			textContentSource: content,
			viewport: viewport.clone({ dontFlip: true })
		})

		return renderTask.render()
	})
}