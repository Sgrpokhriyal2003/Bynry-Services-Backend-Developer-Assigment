const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const Product = require("./model/Product")
const Inventory = require("./model/Inventory")

//post /api/products 
router.post("/products", (req, res) => {
  const session = await mongoose.startSession()
  session.startTransaction()
  
  try{
    const {name, sku, price, warehouse_id, initial_quantity} = req.body
    //validation
    if(!name || !sku || !price || !warehouse_id || !initial_quantity === undefined){
      return res.status(400).json({error: "Missing required fields"})
    }

    //check if the sku is already present or not with any product
    const existingProduct = await Product.findOne({ sku }).session(session)
    if(existingProduct){
      return res.status(409).json({error: "SKU already exists!"})
    }

    //create new product
    const newProduct = await Product.create({
      name,
      sku,
      price
    })

    //save product in db
    await newProduct.save({session})

    //check if inventory already exists for this product and warehouse
    const existingInventory = await Inventory.findOne({
      product_id: newProduct._id,
      warehouse_id
    }).session(session)

    if(existingInventory){
        return res.status(409).json({error: "Inventory already exists for this product in the warehouse})      
    }

    //create new inventory
    const inventory = await Inventory.create({
        product_id: newProduct._id,
        warehouse_id,
        quantity: initial_quantity
    })

    //save in db
    await inventory.save({session})
    //commit transaction as we complete both task
    await session.commitTransaction()
    //end session
    session.endSession()
    //send json response
    res.status(201).json({
      message: "Product Created",
      product_id: newProduct._id
    })
  }
  
  catch(error){
    //if product or inventory is not created then we stop the transaction ensure atomicity
    await session.abortTransaction()
    session.endSession()
    res.status(500).json({
      error: "Internal server error",
      details: error.message
    })
  }
})
