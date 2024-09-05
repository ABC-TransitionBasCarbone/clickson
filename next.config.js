// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

const nextConfig= {
    i18n: {
        locales: ["en", "fr", "it", "es", "hr", "gr", "ro", "hu"],
        defaultLocale: "fr",
    },
    images: {
        domains: ["flagcdn.com", "flags.fmcdn.net"]
    }
};

module.exports = nextConfig;