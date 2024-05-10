/** @type {import('next').NextConfig} */

const nextConfig = {
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
