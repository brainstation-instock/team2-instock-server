const express = require('express');
const router = express.Router();
const warehousesController = require('../controllers/warehouses-controller');
const {v4:uuidv4} = require("uuid");
const fs = require("fs");
const { error } = require('console');
const knex = require('knex')(require('../../knexfile'));



/*===============
    WAREHOUSES
================*/

// GET All Warehouses
router
.route('/')
.get(warehousesController.getWarehouses);

// GET a Single Warehouse
router.get('/:id', warehousesController.getWarehouseDetail);

// GET All Inventories for a Single Warehouse
router.get('/:id/inventories', (req, res) => {

});

// POST a Single Warehouse
router.post('/', async (req, res) => {
   

// checking to make sure the entire form is filled out, if not you will get an 400 error message 
if (!req.body.warehouse_name ||
    !req.body.address || !req.body.city || !req.body.country ||!req.body.contact_name 
    ||!req.body.contact_position || !req.body.contact_phone || !req.body.contact_email ) {
    return res.status(400).json({
        message: 'All fields must be filled!'
    });
}

// we still need to validate phone number & email below



try {
    const newWarehouse =  await knex("warehouses").insert(req.body)
    console.log(newWarehouse);
    res.json(newWarehouse)
    

} catch(error){
   res.status(500).json(error)
}
});




// EDIT a Single Warehouse
router.put('/:id', (req, res) => {

});

// DELETE a Single Warehouse
router.delete('/:id', (req, res) => {

});

module.exports = router;

