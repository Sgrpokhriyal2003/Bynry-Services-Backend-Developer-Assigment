import mongoose from 'mongoose'
const salesSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  warehouse:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Warehouse",
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },

  date:{
    type: Date,
    default: Date.now
    
  }
})

const Sales = mongoose.model("Sale", salesSchema)
export default Sales
