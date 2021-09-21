import express from 'express'

function setupServer(port) {
    const app = express()

    app.use(express.json())
    app.use(express.urlencoded({
        extended: true
    }))

    app.get('/', async (request, response) => {
        let data = { message: 'Error' }
        const { query } = request.query
        if (query) {
            data.message = 'Success'
        }
        response.send(data)
    })

    app
        .listen(port, () => {
            console.info(`"Client" server is running on ${port}`)
        })
        .on('error', error => {
            console.error(`Can't start "Client" server:`)
            console.error(error)
        })
}

export { setupServer }