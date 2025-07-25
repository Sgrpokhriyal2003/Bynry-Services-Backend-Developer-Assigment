import express from 'express'
import mongoose from 'mongoose'

const router = express.Router()

//import models
import Warehouse from './task2.models.js/warehouse.model.js'
import Product from './task2.models.js/product.model.js'
import Inventory from './task2.models.js/inventory.model.js'
import Supplier from './task2.models.js/suppliers.model.js'
import SupplierProduct from './task2.models.js/supplier.products.model.js'
import Sales from './task2.models.js/sales.model.js'

//get : /api/companies/:companyId/alerts/low-stock
router.get("/companies/:companyId/alerts/low-stock", async(req, res) => {
    const {companyId} = req.params
    const Thirty_Days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) //we alert for product that have recent sales in 30 days

    try{
        //get all warehouses for a company
        const warehouses = await Warehouse.find({ company: companyId })
        const alerts = [] //alert array for storing alert 

        //get all inventory items for each warehouse
        for(const warehouse of warehouses){
            const inventories = await Inventory.find({ warehouse: warehouse._id}).populate('product')
        
            for(const inventory of inventories){
                const product = inventory.product

                //check threshold value of product if 0 then skip
                if(!product.threshold || product.threshold === 0) continue

                //get sales for the last 30 days for this product and its warehouse
                const sales = await Sales.find({
                    product: product._id,
                    warehouse: warehouse._id,
                    date: { $gte: Thirty_Days }
                })

                //check if sales is 0 
                if(sales.length === 0) continue 

                //calculate avg daily sales
                const totalSold = sales.reduce((sum, sale) => sum + sale.quantity, 0)
                const avgDailySales = totalSold / 30
                
                //check if product quantity < product threshold capacity
                if(inventory.quantity < product.threshold){
                    const supplierProduct = await SupplierProduct.find({ product: product._id }).populate('supplier')
                
                    alerts.push({
                        product_id: product._id,
                        product_name: product.name,
                        sku: product.sku,
                        warehouse_id: warehouse._id,
                        warehouse_name: warehouse.name,
                        current_stock: inventory.quantity,
                        threshold: product.threshold,
                        days_until_stockout: avgDailySales > 0 ? Math.ceil(inventory.quantity / avgDailySales) : null,
                        supplier: supplierProduct ? {
                            id: supplierProduct.supplier._id,
                            name: supplierProduct.supplier.name,
                            contact_email: supplierProduct.supplier.contactEmail
                        } : null
                    }) 
                }
            }
        }

        return res.status(200).json({
            alerts,
            total_alerts: alerts.length
        })
    }
    catch(error){
        console.log('Error while generating low-stock alerts: ', err)
        return res.status(500).json({
            success: false,
            error : "Internal server error"
        });
    }
})

export default router