import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export const processPDF = async (file: Blob) => {
    try {
        console.log("processPDF: Starting extraction");

        // Convert Blob to Buffer for better compatibility in Node.js
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Pass the Blob back but initialized from the Buffer to ensure it's fresh
        const loader = new PDFLoader(new Blob([buffer]), {
            splitPages: false // Try to get all text at once for better context sometimes
        });

        const rawDocs = await loader.load();

        console.log(`processPDF: Loaded ${rawDocs.length} pages`);

        if (rawDocs.length === 0 || !rawDocs[0].pageContent) {
            console.warn("processPDF: No text extracted from PDF, trying raw buffer conversion fallback");
            // Fallback for some weird PDF structures
            return [{ pageContent: buffer.toString('utf-8').replace(/[^\x20-\x7E\n]/g, ''), metadata: {} }];
        }

        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });

        const chunks = await splitter.splitDocuments(rawDocs);
        console.log(`processPDF: Split into ${chunks.length} chunks`);
        return chunks;
    } catch (error: any) {
        console.error("processPDF error details:", error);
        throw new Error(`PDF Processing Failed: ${error.message}`);
    }
};

