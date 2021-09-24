import express from 'express'
import { manifest } from './manifest.js'

function setupServer() {
    const { port } = manifest

    const app = express()

    app.use(express.json())
    app.use(express.urlencoded({
        extended: true
    }))

    console.info(`Running server on port "${port}"...`)
    app
        .listen(port, () => {
            console.info(`Done`)
        })
        .on('error', error => {
            console.error(`CRITICAL: Cannot start server:`)
            console.error(error)
        })

    return app
}

export { setupServer }