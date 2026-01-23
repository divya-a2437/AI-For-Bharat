/** @type {import('next').NextConfig} */
const nextConfig = {
  // This is the most important part for pdfjs-dist
  serverExternalPackages: ['pdfjs-dist', 'pdf-parse'],
};

export default nextConfig;