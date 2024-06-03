/** @type {import('next').NextConfig} */
if (!URL.canParse(process.env.WORDPRESS_API_URL)) {
  console.log("🚀 ~ process.env:", process.env.WORDPRESS_API_URL)
  throw new Error(`
    Please provide a valid WordPress instance URL.
    Add to your environment variables WORDPRESS_API_URL.
  `);
}

const { protocol, hostname, port, pathname } = new URL(
  process.env.WORDPRESS_API_URL,
);

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: protocol.slice(0, -1),
        hostname,
        port,
        pathname: `${pathname}/**`,
      },
      {
        protocol: 'http',
        hostname: '0.gravatar.com',
        port: '',
        pathname: '/avatar/**',
      },
      {
        protocol: 'http',
        hostname: 'abc-transitionbascarbone.scienceontheweb.net',
        port: '',
        pathname: '/**',
      },
    ],
  },

  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  i18n: {
    locales: ['en-GB', 'fr'],
    defaultLocale: 'fr',
    localeDetection: false,
  },
};

export default nextConfig;
