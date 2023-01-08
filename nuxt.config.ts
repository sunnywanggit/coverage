// https://nuxt.com/docs/api/configuration/nuxt-config

import istanbul from 'vite-plugin-istanbul';

export default defineNuxtConfig({
    vite: {
        plugins: [
            istanbul({
                extension: [ '.js', '.ts', '.vue' ],
                forceBuildInstrument: true
            }),
        ]
    }
})

