/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'k.kakaocdn.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'search.pstatic.net',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'rave-dev.ddns.net',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://rave-dev.ddns.net:8080/:path*',
      },
    ]
  },
}

export default nextConfig
