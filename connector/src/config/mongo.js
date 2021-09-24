import mongoose from 'mongoose'
import { manifest } from './manifest.js'

async function setupDatabase() {
    const { host, name, port } = manifest.database
    console.info(`Connecting to database "${name}" on "mongodb://${host}:${port}"...`)
    try {
        mongoose.Promise = global.Promise
        const db = await mongoose.connect(`mongodb://${host}:${port}/${name}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.info(`Done`)
        return db
    } catch (error) {
        console.error('CRITICAL: Cannot connect to database:')
        console.error(error)
        process.exit(1)
    }
}

export { setupDatabase }