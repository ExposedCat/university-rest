import mongoose from 'mongoose'

async function connectToDb({ host, name, port }) {
    try {
        console.info(`Connecting to database "${name}" on ${host}:${port}..`)
        mongoose.Promise = global.Promise
        const db = await mongoose.connect(`mongodb://${host}:${port}/${name}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.info(`Connected`)
        return db
    } catch (error) {
        console.error('CRITICAL: Cannot connect to database:')
        console.error(error)
        process.exit(1)
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