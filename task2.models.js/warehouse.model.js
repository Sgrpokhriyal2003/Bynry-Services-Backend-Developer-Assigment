import mongoose from 'mongoose'

const warehouseSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    location:{
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Warehouse = mongoose.model('Warehouse', warehouseSchema)
export default Warehouse