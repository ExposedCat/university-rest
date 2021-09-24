import mongoose from 'mongoose'
import { LectorsDepartmentsSchema } from './lectors-departments.js'

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

export { Lectors }