import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export const processPDF = async (file: Blob) => {
    const loader = new PDFLoader(file);
    const rawDocs = await loader.load();

    // Split into chunks of 1000 characters with 200 character overlap
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    });

    const chunks = await splitter.splitDocuments(rawDocs);
    return chunks;
};
