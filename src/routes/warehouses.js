const express = require('express');
const router = express.Router();
const warehousesController = require('../controllers/warehouses-controller');

/*===============
    WAREHOUSES
================*/

// GET All Warehouses
router
.route('/')
.get(warehousesController.getWarehouses);

// GET a Single Warehouse
router.get('/:id', (req, res) => {

});

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
router.delete('/:id', (req, res) => {

});

module.exports = router;