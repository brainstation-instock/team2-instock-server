const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../../knexfile'));
const warehousesController = require('../controllers/warehouses-controller');
const { uuid } = require("uuid").v4;
const fs = require("fs");
const { error } = require('console');

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
router.get('/:id/inventories', warehousesController.getSpecificInventories);



// POST a Single Warehouse
router.post('/', async (req, res) => {
    function validateEmail(email) { //Validates the email address
        let emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return emailRegex.test(email);
    }

    function validatePhone(phone) { //Validates the phone number
        let phoneRegex = /([1]|[1]\s|[])(\d{3}|\(\d{3}\)|\d{3}\s|\d{3}[-]|\(\d{3}\)\s)(\d{3}|\d{3}\s|\d{3}[-])\d{4}$/; // Change this regex based on requirement
        return phoneRegex.test(phone);
    }
    if (!validateEmail(req.body.contact_email)) {
        return res.status(400).json({
            message: 'Invald Email Bro!'
        })
    }

    if (!validatePhone(req.body.contact_phone)) {
        return res.status(400).json({
            message: 'Invald Phone Number Bro!'
        })
    }
    // checking to make sure the entire form is filled out, if not you will get an 400 message 
    if (!req.body.warehouse_name ||
        !req.body.address || !req.body.city || !req.body.country || !req.body.contact_name
        || !req.body.contact_position || !req.body.contact_phone || !req.body.contact_email) {
        return res.status(400).json({
            message: 'All fields must be filled!'
        });
    }
    try {
        const newWarehouse = await knex("warehouses").insert(req.body)
        console.log(newWarehouse);
        res.json(newWarehouse)
    } catch (error) {
        res.status(500).json(error)
    }
});


// EDIT a Single Warehouse
router.put('/:id', async (req, res) => {

    function validateEmail(email) { //Validates the email address
        let emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return emailRegex.test(email);
    }

    function validatePhone(phone) { //Validates the phone number
        let phoneRegex = /([1]|[1]\s|[])(\d{3}|\(\d{3}\)|\d{3}\s|\d{3}[-]|\(\d{3}\)\s)(\d{3}|\d{3}\s|\d{3}[-])\d{4}$/; // Change this regex based on requirement
        return phoneRegex.test(phone);
    }
    if (!validateEmail(req.body.contact_email)) {
        return res.status(400).json({
            message: 'Invald Email Bro!'
        })
    }

    if (!validatePhone(req.body.contact_phone)) {
        return res.status(400).json({
            message: 'Invald Phone Number Bro!'
        })
    }
    // checking to make sure the entire form is filled out, if not you will get an 400 message 
    if (!req.body.warehouse_name ||
        !req.body.address || !req.body.city || !req.body.country || !req.body.contact_name
        || !req.body.contact_position || !req.body.contact_phone || !req.body.contact_email) {
        return res.status(400).json({
            message: 'All fields must be filled!'
        })}

    const { id } = req.params;
    const newSingleWarehouse = req.body;
    

    try {
        const editSingleWarehouse = await knex('warehouses').where({ id }).update(newSingleWarehouse);

        // If no rows were updated, it means the record with the given ID was not found
        if (editSingleWarehouse === 0) {
            return res.status(404).json({ message: "Record not found" });
        }

        res.status(200).json({ updated: editSingleWarehouse });
    } catch (error) {
        // Log the error for debugging purposes
        console.error(error);
        res.status(500).json({ message: "Error updating the record", error: error.message });
    }
});




//     const {id} = req.params;
//     const newSingleWarehouse = req.body;
    
    
//     try {
//         const editSingleWarehouse = await knex('warehouses').where({id:id}).update(newSingleWarehouse)
//         res.status(200).json({updated: editSingleWarehouse})
//     } catch (error) { res.status(404).json({message: "Record not found"})}

// });

// DELETE a Single Warehouse
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deleteRow = await knex('warehouses').where({ id: id }).delete(); // Delete the warehouse
        res.status(204)

        if (deleteRow === 0) {
            return res.status(404).send("Can't find this warehouse");
        }

        return res.send('Success')
    } catch (error) {
        console.error(error)
        res.status(500).json()
    }
});

module.exports = router;

