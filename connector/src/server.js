import express from 'express'

function setupServer(port) {
    const app = express()

    app.use(express.json())
    app.use(express.urlencoded({
        extended: true
    }))

    app.get('/', async (request, response) => {
        const data = { message: 'Test' }
        response.send(data)
    })

    app
        .listen(port, () => {
            console.info(`Server is running on ${port}`)
        })
        .on('error', error => {
            console.error(`Can't start server:`)
            console.error(error)
        })
}

export { setupServer }