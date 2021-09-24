import { Lectors } from '../entities/lector.js'

async function getHead(departmentName) {
    const head = await Lectors.findOne({
        departments: {
            $elemMatch: {
                name: departmentName,
                isHead: true
            }
        }
    })
    return head
}

async function getStatistic(departmentName) {
    const facetQuery = degree => [
        {
            $match: {
                degree,
                departments: {
                    $elemMatch: {
                        name: departmentName
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
    return statistic
}

async function getAverageSalary(departmentName) {
    const $match = {
        'departments.name': departmentName
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
    return salary[0]?.averageSalary
}

async function getCountOfEmployee(departmentName) {
    const count = await Lectors.count({
        departments: {
            $elemMatch: {
                name: departmentName
            }
        }
    })
    return count
}

async function globalSearch(query) {
    const lectors = await Lectors.find({
        name: query
    })
    return lectors
}

export {
    globalSearch,
    getHead,
    getStatistic,
    getAverageSalary,
    getCountOfEmployee
}