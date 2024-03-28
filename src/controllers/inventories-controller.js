const knex = require('knex')(require('../../knexfile'));

module.exports.getInventories = async(_req, res) => {
    
    const inventories = await knex('inventories');
    res.json({inventories});
}

module.exports.addItem = async(req,res) => {

    if (!req.body.item_name || !req.body.description || !req.body.category || !req.body.quantity) {
        return res.status(400).json({
            message: 'All fields must be filled!'
        })
    }

    function isNumber(str) {
        return /^-?\d+$/.test(str);
    }

    if(isNumber(req.body.quantity)){
        return res.status(400).json({
            message: 'Quantity must be a valid number!'
        })
    }

    try{
    const result = await knex("inventories").insert(req.body);
    const newItemId = result[0];
    const createdItem = await knex("inventories").where({id: newItemId});

    res.status(201).json(createdItem);
    } catch(error) {
        res.status(500).json({
            message: `Unable to add item: ${error}`
        })
    }
}

module.exports.editItem = async(req,res) => {

    if (!req.body.item_name || !req.body.description || !req.body.category || !req.body.quantity) {
        return res.status(400).json({
            message: 'All fields must be filled!'
        })
    }

    function isNumber(str) {
        return /^-?\d+$/.test(str);
    }

    if(isNumber(req.body.quantity)){
        return res.status(400).json({
            message: 'Quantity must be a valid number!'
        })
    }
    
    try {
        const rowsUpdated = await knex("inventories")
            .where({
                id: req.params.id
            })
            .update(req.body);

        if(rowsUpdated === 0) {
            return res.status(404).json({
                message: `Item with ID ${req.params.id} not found.`
            });
        
        }

        const updatedItem = await knex("inventories")
            .where({
                id: req.params.id
            });
        
        res.json(updatedUser[0]);
    } catch(error) {
        res.status(500).json({
            message: `Unable to update item with ID ${req.params.id}: ${error}`
        })
    }
};