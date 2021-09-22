import express from 'express'
import { Lectors } from './database.js'

function setupServer(port) {
    const app = express()

    app.use(express.json())
    app.use(express.urlencoded({
        extended: true
    }))

    app.get('/getHeadOfDepartment', async (request, response) => {
        let data = { data: 'Error' }
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
                data.data = head.name
            }
        }
        response.send(data)
    })

    app.get('/getDepartmentStatistic', async (request, response) => {
        let data = { data: 'Error' }
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
                data.data = {
                    assistants: assistants || 0,
                    associateProfessors: associateProfessors || 0,
                    professors: professors || 0,
                }
            }
        }
        response.send(data)
    })

    app.get('/getAverageSalaryOfDepartment', async (request, response) => {
        let data = { data: 'Error' }
        const { name } = request.query
        if (name) {
            const $match = {
                'departments.name': name
            }
            const $group = {
                _id: '$departments.name',
                averageSalary: {
                    $avg: '$departments.salary'
                }
            }
            const salary = await Lectors.aggregate([
                { $unwind: '$departments' },
                { $match },
                { $group }
            ])
            if (salary[0]) {
                data.data = Number(salary[0].averageSalary.toFixed(3))
            }
        }
        response.send(data)
    })

    app.get('/getCountOfEmployeeForDepartment', async (request, response) => {
        let data = { data: 'Error' }
        const { name } = request.query
        if (name) {
            const count = await Lectors.count({
                departments: {
                    $elemMatch: {
                        name
                    }
                }
            })
            data.data = count
        }
        response.send(data)
    })

    app.get('/globalSearch', async (request, response) => {
        let data = { data: 'Error' }
        const { query } = request.query
        if (query) {
            const lectors = await Lectors.find({
                name: new RegExp(query, 'i')
            })
            if (lectors.length) {
                data.data = lectors.map(lector => lector.name)
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