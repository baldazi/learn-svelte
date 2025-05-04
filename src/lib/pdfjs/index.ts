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