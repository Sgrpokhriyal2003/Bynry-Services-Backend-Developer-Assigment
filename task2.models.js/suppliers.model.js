import mongoose from 'mongoose'

const supplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    contactEmail: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    createdAT: {
        type: Date,
        default: Date.now
    }
})

const Supplier = mongoose.model("Supplier", supplierSchema)
export default Supplier