import express from 'express'
import { localApiCall } from './utilites/api.js'
import { matchByRegex } from './utilites/regexSwitch.js'


function setupServer(port) {
    const app = express()

    app.use(express.json())
    app.use(express.urlencoded({
        extended: true
    }))

    app.get('/', async (request, response) => {
        const { query } = request.query
        let result = {
            message: 'Error'
        }
        if (query) {
            await matchByRegex(query, [
            ])
        }
        response.send(result)
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