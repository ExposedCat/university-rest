import {config} from 'config.js'

function setupServer() {
    const app = express()

    app.use(express.json())
    app.use(express.urlencoded({
        extended: true
    }))

    app.get('/', async (request, response) => {
        const data = await apiCall('lists/names.json')
        const genresList = data.results.map((genre: genre) => genre.list_name_encoded)
        response.send(genresList)
    })

    app
        .listen(config.port, () => {
            console.info(`Server is running on ${config.port}`)
        })
        .on('error', error => {
            console.error(`Can't start server:`)
            console.error(error)
        })
}