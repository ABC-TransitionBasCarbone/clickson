module.exports = {
    webpack: (
        config
    ) => {
        config.module.rules.push({
            test: /\.csv$/,
            loader: 'csv-loader',
            options: {
                dynamicTyping: true,
                header: true,
                transformHeader: (h) => h.replace(/[^\w\s]|_/g, "").replace(/\s+/g, "").toLowerCase(),
                skipEmptyLines: true
            }
        
        })

        return config
    },
    i18n: {
        locales: ["en", "fr", "it", "es", "hr", "gr", "ro", "hu"],
        defaultLocale: "fr",
    },
    images: {
        domains: ["flagcdn.com", "flags.fmcdn.net"]
    }
}