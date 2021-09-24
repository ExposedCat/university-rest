import { 
    getHead,
    globalSearch,
    getStatistic,
    getAverageSalary,
    getCountOfEmployee
 } from '../services/department.js'

function startHandlingRequests(app) {
    app.get('/getHeadOfDepartment', async (request, response) => {
        let data = { data: 'Error' }
        const { name } = request.query
        if (name) {
            const head = await getHead(name)
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
            const statistic = await getStatistic(name)
            if (statistic) {
                data.data = statistic
            }
        }
        response.send(data)
    }) 

    app.get('/getAverageSalaryOfDepartment', async (request, response) => {
        let data = { data: 'Error' }
        const { name } = request.query
        if (name) {
            const salary = await getAverageSalary(name)
            if (salary) {
                data.data = salary
            }
        }
        response.send(data)
    })

    app.get('/getCountOfEmployeeForDepartment', async (request, response) => {
        let data = { data: 'Error' }
        const { name } = request.query
        if (name) {
            const count = await getCountOfEmployee(name)
            data.data = count
        }
        response.send(data)
    })

    app.get('/globalSearch', async (request, response) => {
        let data = { data: 'Error' }
        const { query } = request.query
        if (query) {
            const lectors = await globalSearch(query)
            if (lectors.length) {
                data.data = lectors.map(lector => lector.name)
            }
        }
        response.send(data)
    })
}

export { startHandlingRequests }