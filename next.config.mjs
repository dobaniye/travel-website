// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'ktyqtnsmkrrftzfpfdub.supabase.co',
          port: '',
          pathname: '/storage/v1/object/public/**',
        },
      ],
    },
    env: {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
    experimental: {
      appDir: true,
      serverActions: true,
    }
  };
  
  export default nextConfig;