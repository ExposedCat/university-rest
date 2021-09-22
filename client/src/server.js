import express from 'express'
import { localApiCall } from './utilites/api.js'
import { matchByRegex } from './utilites/regexSwitch.js'


function setupServer(port) {
    const app = express()

    app.use(express.json())
    app.use(express.urlencoded({
        extended: true
    }))

    app.get('/search', async (request, response) => {
        const { query } = request.query
        let result = {
            message: 'Error'
        }
        if (query) {
            await matchByRegex(query, [
                [
                    /^Who is head of department (.+)$/,
                    async name => {
                        const { error, data } = await localApiCall(
                            'getHeadOfDepartment', { name }
                        )
                        if (error === null) {
                            result.message = `Head of ${name} department is ${data.data}`
                        }
                    }
                ],
                [
                    /^Show (.+) statistic$/,
                    async name => {
                        const { error, data } = await localApiCall(
                            'getDepartmentStatistic', { name }
                        )
                        if (error === null) {
                            const { assistants, associateProfessors, professors } = data.data
                            result.message = `Assistants: ${assistants}\n`
                            result.message += `Associate professors: ${associateProfessors}\n`
                            result.message += `Professors: ${professors}`
                        }
                    }
                ],
                [
                    /^Show the average salary for department (.+)$/,
                    async name => {
                        const { error, data } = await localApiCall(
                            'getAverageSalaryOfDepartment', { name }
                        )
                        if (error === null) {
                            result.message = data.data
                        }
                    }
                ],
                [
                    /^Show count of employee for (.+)$/,
                    async name => {
                        const { error, data } = await localApiCall(
                            'getCountOfEmployeeForDepartment', { name }
                        )
                        if (error === null) {
                            result.message = data.data
                        }
                    }
                ],
                [
                    /^Global search by (.+)$/,
                    async query => {
                        const { error, data } = await localApiCall(
                            'globalSearch', { query }
                        )
                        if (error === null) {
                            result.message = data.data
                        }
                    }
                ]
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