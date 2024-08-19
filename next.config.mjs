/** @type {import('next').NextConfig} */
// next.config.js
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['puppeteer-core'],
    },
    pageExtensions: ['tsx', 'ts', 'jsx', 'js'], // src 디렉토리 내에서 페이지 파일을 찾을 수 있도록 확장자 지정
    // distDir: 'build', // 빌드된 파일이 저장될 디렉토리
}

export default nextConfig;
