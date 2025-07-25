import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    sku: {
        type: String,
        unique: true,
        required: true,
    },

    name:{
        type: String,
        required: true,
    },

    price: {
        type: mongoose.Types.Decimal128,
        required: true,
    },
    threshold:{
        type: Number, //minumum stock threshold value
        default: 0,
    },

    isBundle:{
        type: Boolean,
        default: false,
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Product = mongoose.model("Product", productSchema)
export default Product
