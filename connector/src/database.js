import mongoose from 'mongoose'

async function connectToDb({ host, name, port }) {
    try {
        console.info('Connecting to database..')
        mongoose.Promise = global.Promise
        const db = await mongoose.connect(`mongodb://${host}:${port}/${name}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        // Add test data
        await Lectors.deleteMany()
        await Lectors.create({
            name: 'Nik',
            degree: 'professor',
            departments: [{
                salary: 100,
                name: 'Dep1',
                isHead: false
            }]
        })
        await Lectors.create({
            name: 'Nik',
            degree: 'assistant',
            departments: [{
                salary: 50,
                name: 'Dep1',
                isHead: false
            }]
        })
        await Lectors.create({
            name: 'Maria',
            degree: 'professor',
            departments: [{
                salary: 150,
                name: 'Dep2',
                isHead: true
            }]
        })
        await Lectors.create({
            name: 'Yulia',
            degree: 'professor',
            departments: [{
                salary: 105,
                name: 'Dep1',
                isHead: true
            }]
        })

        console.clear()
        console.info(`Connected to database "${name}" on ${host}:${port}`)
        return db
    } catch (error) {
        console.error('CRITICAL: Cannot connect to database:')
        console.error(error)
        process.exit()
    }
}

const LectorsDepartmentsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    isHead: {
        type: Boolean,
        required: true,
        default: false
    }
})

const LectorsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    departments: {
        type: [LectorsDepartmentsSchema],
        required: true,
        default: []
    }
})

const Lectors = mongoose.model('Lectors', LectorsSchema)

export {
    Lectors,
    connectToDb
}