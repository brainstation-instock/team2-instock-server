const knex = require('knex')(require('../../knexfile'));

module.exports.getInventories = async(_req, res) => {
    
    const inventories = await knex('inventories');
    res.json({inventories});
}

module.exports.addItem = async(req,res) => {

    const result = await knex("user").insert(req.body);
    const newItemId = result[0];
    const createdItem = await("user").where({id: newItemId});

    res.status(201).json(createdItem);
}

module.exports.editItem = async(req,res) => {
    
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