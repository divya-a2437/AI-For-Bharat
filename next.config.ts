/** @type {import('next').NextConfig} */
const nextConfig = {
  // This is the most important part for pdfjs-dist
  serverExternalPackages: ['pdfjs-dist'],
};

export default nextConfig;