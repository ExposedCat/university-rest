import { config } from './utilites/config.js'

import { setupServer } from './server.js'
import { connectToDb } from './database.js'

await connectToDb(config.db)
setupServer(config.port)