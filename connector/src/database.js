import mongoose from 'mongoose'

async function connectToDb({ host, name, port }) {
    try {
        console.info('Connecting to database..')
        mongoose.Promise = global.Promise
        const db = await mongoose.connect(`mongodb://${host}:${port}/${name}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
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

const UserDepartmentsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isHead: {
        type: Boolean,
        required: true,
        default: false
    }
})

const LectorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    headOf: {
        type: [String],
        required: true
    },
    departments: {
        type: [UserDepartmentsSchema],
        required: true,
        default: []
    }
})

const Lector = mongoose.model('Lector', LectorSchema)

export {
    Lector,
    connectToDb
}