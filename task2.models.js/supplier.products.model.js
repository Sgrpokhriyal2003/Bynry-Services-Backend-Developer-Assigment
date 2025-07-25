import mongoose from 'mongoose'

const SupplierProdutschema = new mongoose.Schema({
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier",
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    price: {
        type: mongoose.Types.Decimal128
    }
}, {timestamps: true})

//ensure uniqueness
SupplierProdutschema.index({supplier: 1, product: 1}, {unique: true})

const SupplierProduct = mongoose.model("SupplierProduct", SupplierProdutschema)
export default SupplierProduct