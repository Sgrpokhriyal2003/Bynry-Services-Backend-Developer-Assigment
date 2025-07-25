import mongoose from 'mongoose'

const productBundleSchema = new mongoose.Schema({
    bundle: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true
    },

    product: {
        type:  mongoose.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        default: 1
    }
},{timestamps: true})

//ensure unqiueness
productBundleSchema.index({bundle: 1, product: 1}, {unique: true})

const Bundle = mongoose.model('ProductBundle', productBundleSchema)
export default Bundle