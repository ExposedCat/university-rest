import * as departmentDAL from './department-dal.js'
import { escapeRegExp } from '../utilites/escape-regex.js'

async function getHead(departmentName) {
    const head = await departmentDAL.getHead(departmentName)
    return head
}

async function getStatistic(departmentName) {
    const statistic = await departmentDAL.getStatistic(departmentName)
    if (statistic) {
        const { assistants, associateProfessors, professors } = statistic[0]
        return ({
            assistants: assistants || 0,
            associateProfessors: associateProfessors || 0,
            professors: professors || 0,
        })
    }
    return null
}

async function getAverageSalary(departmentName) {
    const salary = await departmentDAL.getAverageSalary(departmentName)
    return salary ? Number(salary.toFixed(3)) : null
}

async function getCountOfEmployee(departmentName) {
    const count = await departmentDAL.getCountOfEmployee(departmentName)
    return count
}

async function globalSearch(query) {
    const escaped = escapeRegExp(query)
    const regexQuery = new RegExp(escaped, 'i')
    const lectors = await departmentDAL.globalSearch(regexQuery)
    return lectors
}

export {
    globalSearch,
    getHead,
    getStatistic,
    getAverageSalary,
    getCountOfEmployee
}