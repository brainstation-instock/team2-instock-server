const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../../knexfile'));
const warehousesController = require('../controllers/warehouses-controller');

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
router.post('/', (req, res) => {

});

// EDIT a Single Warehouse
router.put('/:id', (req, res) => {

});

// DELETE a Single Warehouse
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const deleteRow = await knex('warehouses').where({id: id}).delete(); // Delete the warehouse
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