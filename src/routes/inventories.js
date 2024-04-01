const express = require('express');
const router = express.Router();
const inventoriesController = require('../controllers/inventories-controller');
const knex = require('knex')(require('../../knexfile'));

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


// EDIT a Single Inventory Item
router
.route('/:id')
.put(inventoriesController.editItem);

// DELETE a Single Inventory Items
router.delete('/:id', async (req, res) => {
        const { id } = req.params;
    
        try {
            // Delete the inventory item
            const deleteRow = await knex('inventories').where({ id: id }).delete();
            res.status(204)

            if (deleteRow === 0) {
                return res.status(404).send("Can't find this inventory item");
            }
            return res.send('Success');
        } catch (error) {
            console.error(error);
            res.status(500).json();
        };
});

module.exports = router;