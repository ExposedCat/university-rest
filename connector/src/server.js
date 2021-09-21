import express from 'express'
import { Lectors } from './database.js'

function setupServer(port) {
    const app = express()

    app.use(express.json())
    app.use(express.urlencoded({
        extended: true
    }))

    app.get('/getHeadOfDepartment', async (request, response) => {
        let data = { message: 'Error' }
        const { name } = request.query
        if (name) {
            const head = await Lectors.findOne({
                departments: {
                    $elemMatch: {
                        name,
                        isHead: true
                    }
                }
            })
            if (head) {
                data.message = head.name
            }
        }
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