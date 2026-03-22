/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images : {
    remotePatterns : [
      new URL('https://res.cloudinary.com/**'),
      new URL('https://thumbs.dreamstime.com/**')
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '200mb',
    },
  },
};

export default nextConfig;
