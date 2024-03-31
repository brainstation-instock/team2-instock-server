const express = require('express');
const router = express.Router();
const inventoriesController = require('../controllers/inventories-controller');

/*================
    INVENTORIES
=================*/

// GET All Inventory items
router
.route('/')
.get(inventoriesController.getInventories)
.post(inventoriesController.addItem);

// GET a Single Inventory Item
router.get('/:id', inventoriesController.getSingleItem);

// POST a Single Inventory Item
router.post('/', (req, res) => {

});

// EDIT a Single Inventory Item
router
.route('/:id')
.put(inventoriesController.editItem);

// DELETE a Single Warehouse
router.delete('/:id', (req, res) => {

});

module.exports = router;