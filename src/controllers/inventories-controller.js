const knex = require('knex')(require('../../knexfile'));

module.exports.getInventories = async(_req, res) => {
    
    const inventories = await knex('inventories')
    .join("warehouses", "inventories.warehouse_id", "warehouses.id");
    res.json({inventories});
}

module.exports.addItem = async(req,res) => {
    console.log(req.body)

    const result = await knex("inventories").insert(req.body);
    const newItemId = result[0];
    
    const createdItem = await knex("inventories").where({id: newItemId});

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

module.exports.getSingleItem = async(req, res) => {

    const {id} = req.params;

    try{
        const item = await knex('inventories').where('id', id);

        if(item.length === 0){
            return res.status(404).json({
                message: `Item with ID: ${id} is not found`
            });
        }

        res.status(200).json(item[0]);
        
    }
    catch(error){
        res.status(404).json({
            message: `Item with ID: ${id} is not found`,
        });
    }
    
};

