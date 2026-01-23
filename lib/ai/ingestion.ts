import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export const processPDF = async (file: Blob) => {
    try {
        console.log("processPDF: Starting extraction");
        const loader = new PDFLoader(file);
        const rawDocs = await loader.load();

        console.log(`processPDF: Loaded ${rawDocs.length} pages`);

        if (rawDocs.length === 0) {
            console.warn("processPDF: No text extracted from PDF");
        }

        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });

        const chunks = await splitter.splitDocuments(rawDocs);
        console.log(`processPDF: Split into ${chunks.length} chunks`);
        return chunks;
    } catch (error: any) {
        console.error("processPDF error:", error);
        throw new Error(`PDF Processing Failed: ${error.message}`);
    }
};
