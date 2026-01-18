"use client";

import { useState } from 'react';
import { Upload, FileText, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ExamPredictor() {
    const [file, setFile] = useState<File | null>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Upload Section */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
            >
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                        <Upload size={20} className="text-blue-600" />
                    </div>
                    <h2 className="font-semibold text-gray-900">Upload Material</h2>
                </div>

                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FileText className="w-8 h-8 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PDF, DOCX (Max 10MB)</p>
                    </div>
                    <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.docx" />
                </label>

                {file && (
                    <div className="mt-4 p-3 bg-green-50 text-green-700 text-sm rounded-lg flex items-center justify-between">
                        <span className="truncate">{file.name}</span>
                        <CheckCircle2 size={16} />
                    </div>
                )}
            </motion.div>

            {/* AI Insights Placeholder */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center items-center text-center space-y-4"
            >
                <div className="p-3 bg-purple-100 rounded-full">
                    <Sparkles size={24} className="text-purple-600" />
                </div>
                <div>
                    <h3 className="text-lg font-medium text-gray-900">AI Analysis Pending</h3>
                    <p className="text-sm text-gray-500 mt-1">Upload a past paper to generate prediction insights.</p>
                </div>
                <button disabled className="px-4 py-2 bg-gray-100 text-gray-400 rounded-lg font-medium cursor-not-allowed">
                    Generate Report
                </button>
            </motion.div>
        </div>
    );
}

import { CheckCircle2 } from 'lucide-react';
