module.exports = {
    webpack: (
        config,
        { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
    ) => {
        config.module.rules.push({
            test: /\.csv$/,
            loader: 'csv-loader',
            options: {
                dynamicTyping: true,
                header: true,
                skipEmptyLines: true
            }
        })

        // Important: return the modified config
        return config
    },
}
