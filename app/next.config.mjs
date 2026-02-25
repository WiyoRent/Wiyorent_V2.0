/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */

  images : {
    remotePatterns : [
      new URL('https://res.cloudinary.com/**')]
  }
};

export default nextConfig;
