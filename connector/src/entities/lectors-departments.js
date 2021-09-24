import mongoose from 'mongoose'

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

export { LectorsDepartmentsSchema }