import { defineConfig } from 'cypress'

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            on('task', {
                log(message) {
                    console.log(message)
                    return null
                },
            })
            return config
        },
    },
    component: {
        devServer: {
            framework: 'next',
            bundler: 'webpack',
        },
    },
})