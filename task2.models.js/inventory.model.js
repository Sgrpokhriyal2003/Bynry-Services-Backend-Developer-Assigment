import mongoose from 'mongoose'

const inventorySchema = new mongoose.Schema({
    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true
    },

    warehouse: {
        type:  mongoose.Types.ObjectId,
        ref: "Warehouse",
        required: true,
    },
    quantity: {
        type: Number,
        default: 0
    }
},{timestamps: true})

//ensure unqiueness
inventorySchema.index({product: 1, warehouse: 1}, {unique: true})

const Inventory = mongoose.model('Inventory', inventorySchema)
export default Inventory