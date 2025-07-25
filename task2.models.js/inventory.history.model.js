import mongoose from 'mongoose'

const inventoryHistorySchema = new mongoose.Schema({
    inventory:{
        type: mongoose.Types.ObjectId,
        ref: "Inventory",
        required: true
    },
    changeType: {
        type: String,
        enum: ["In", "Out"],
        required: true,
    },

    quantityChanged:{
        type: Number,
        required: true,
    },

    reason: {
        type: String,
    },

    changeAT: {
        type: Date,
        default: Date.now
    }
})


const InventoryHistory = mongoose.model('InventoryHistory', inventoryHistorySchema)
export default InventoryHistory