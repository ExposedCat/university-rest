import { config } from './config.js'
import { connectToDb, Lectors } from '../database.js'


await connectToDb(config.db)

console.info(`Clearing exisitng lectors..`)
await Lectors.deleteMany()
console.info(`Done`)
console.info(`__________`)

await Lectors.create({
    name: 'Nik',
    degree: 'professor',
    departments: [{
        salary: 160,
        name: 'Dep2',
        isHead: true
    }]
})
console.info(`Nik:\n  Degree: Professor\n  Departments: Dep2 150 Head`)
console.info(`__________`)
await Lectors.create({
    name: 'Joe',
    degree: 'assistant',
    departments: [{
        salary: 50,
        name: 'Dep1',
        isHead: false
    }, {
        salary: 75,
        name: 'Dep2',
        isHead: false
    }]
})
console.info(`Joe:\n  Degree: Assistant\n  Departments: Dep1 50, Dep2 75`)
console.info(`__________`)
await Lectors.create({
    name: 'Yulia',
    degree: 'professor',
    departments: [{
        salary: 110,
        name: 'Dep1',
        isHead: true
    }, {
        salary: 150,
        name: 'Dep2',
        isHead: false
    }]
})
console.info(`Yulia:\n  Degree: Professor\n  Departments: Dep1 110 Head, Dep2 150`)
console.info(`__________`)
await Lectors.create({
    name: 'Artem',
    degree: 'associateProfessor',
    departments: [{
        salary: 100,
        name: 'Dep1',
        isHead: true
    }]
})
console.info(`Yulia:\n  Degree: Associate Professor\n  Departments: Dep1 100`)
console.info(`__________`)

console.info('Done')
process.exit(0)