import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import pdf from "pdf-parse";

export const processPDF = async (file: Blob) => {
    try {
        console.log("processPDF: Starting extraction");

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Use pdf-parse for more direct and reliable text extraction
        const data = await pdf(buffer);
        const text = data.text;

        console.log(`processPDF: Extracted ${text.length} characters`);

        if (!text || text.trim().length < 10) {
            console.warn("processPDF: Very little text extracted, PDF might be scanned/image-based");
            // No fallback for images yet, but at least we know
        }

        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });

        // Create virtual document for splitter
        const chunks = await splitter.createDocuments([text]);
        console.log(`processPDF: Split into ${chunks.length} chunks`);
        return chunks;
    } catch (error: any) {
        console.error("processPDF error details:", error);
        throw new Error(`PDF Processing Failed: ${error.message}`);
    }
};

