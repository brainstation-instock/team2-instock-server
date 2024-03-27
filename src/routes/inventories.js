const express = require('express');
const router = express.Router();
const inventoriesController = require('../controllers/inventories-controller');

/*================
    INVENTORIES
=================*/

// GET All Inventory items
router.get('/', (req, res) => {

});

// GET a Single Inventory Item
router.get('/:id', (req, res) => {

});

// POST a Single Inventory Item
router.post('/', (req, res) => {

});

// EDIT a Single Inventory Item
router.put('/:id', (req, res) => {

});

// DELETE a Single Warehouse
router.delete('/:id', (req, res) => {

});

module.exports = router;