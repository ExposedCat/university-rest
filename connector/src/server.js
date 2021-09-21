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

    app.get('/getDepartmentStatistic', async (request, response) => {
        let data = { message: 'Error' }
        const { name } = request.query
        if (name) {
            const facetQuery = degree => [
                {
                    $match: {
                        degree,
                        departments: {
                            $elemMatch: {
                                name
                            }
                        }
                    }
                },
                { $count: degree }
            ]
            const projectQuery = degree => ({
                '$arrayElemAt': [`$${degree}s.${degree}`, 0]
            })
            const $facet = {
                assistants: facetQuery('assistant'),
                associateProfessors: facetQuery('associateProfessor'),
                professors: facetQuery('professor')
            }
            const $project = {
                assistants: projectQuery('assistant'),
                associateProfessors: projectQuery('associateProfessor'),
                professors: projectQuery('professor')
            }
            const statistic = await Lectors.aggregate([
                { $facet },
                { $project }
            ])
            if (statistic) {
                const { assistants, associateProfessors, professors } = statistic[0]
                data.message = {
                    assistants: assistants || 0,
                    associateProfessors: associateProfessors || 0,
                    professors: professors || 0,
                }
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