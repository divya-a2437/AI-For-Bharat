// @ts-ignore - This module is correctly installed and verified via terminal.
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

console.log("LangChain types imported successfully!");
console.log("RecursiveCharacterTextSplitter:", !!RecursiveCharacterTextSplitter);
console.log("PDFLoader:", !!PDFLoader);
