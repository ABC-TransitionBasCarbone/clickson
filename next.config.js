const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.csv$/,
      loader: 'csv-loader',
      options: {
        dynamicTyping: true,
        header: true,
        transformHeader: (h) =>
          h
            .replace(/[^\w\s]|_/g, '')
            .replace(/\s+/g, '')
            .toLowerCase(),
        skipEmptyLines: true,
      },
    })

    return config
  },
  images: {
    remotePatterns: [{ hostname: 'flagcdn.com' }, { hostname: 'flags.fmcdn.net' }],
  },
}

module.exports = withNextIntl(nextConfig)
