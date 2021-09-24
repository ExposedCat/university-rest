import { setupServer } from './config/server.js'
import { setupDatabase } from './config/mongo.js'
import { startHandlingRequests } from './controllers/department.js'

await setupDatabase()
const app = setupServer()
startHandlingRequests(app)