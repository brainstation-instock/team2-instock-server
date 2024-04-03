const knex = require('knex')(require('../../knexfile'));

module.exports.getInventories = async(_req, res) => {
    
    const inventories = await knex('inventories')
    .join("warehouses", "inventories.warehouse_id", "warehouses.id")
    .select('inventories.item_name', 'inventories.id', 'inventories.status', 'inventories.category', 'warehouses.warehouse_name', 'inventories.quantity');
    res.json({inventories});
}

module.exports.addItem = async(req,res) => {
    console.log(req.body)

    if (!req.body.item_name || !req.body.description || !req.body.category || !req.body.quantity) {
        return res.status(400).json({
            message: 'All fields must be filled!'
        })
    }

    function isNumber(str) {
        return /^-?\d+$/.test(str);
    }

    if(!isNumber(req.body.quantity)){
        return res.status(400).json({
            message: 'Quantity must be a valid number!'
        })
    }

    const warehouse = await knex("warehouses").where({id:req.body.warehouse_id})
    
    if(warehouse.length === 0){
        return res.status(400).json({
            message: "Warehouse id does not match any existing warehouse."
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

    if(!isNumber(req.body.quantity)){
        return res.status(400).json({
            message: 'Quantity must be a valid number!'
        })
    }

    const warehouse = await knex("warehouses").where({id:req.body.warehouse_id})
    
    if(warehouse.length === 0){
        return res.status(400).json({
            message: "Warehouse id does not match any existing warehouse."
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
        
        res.json(updatedItem[0]);
    } catch(error) {
        res.status(500).json({
            message: `Unable to update item with ID ${req.params.id}: ${error}`
        })
    }
};

module.exports.getSingleItem = async(req, res) => {

    const {id} = req.params;

    try{
        const item = await knex('inventories').join('warehouses', 'inventories.warehouse_id', 'warehouses.id').where('inventories.id', id).select('inventories.id', 'warehouses.warehouse_name', 'inventories.item_name', 'inventories.description', 
        'inventories.category', 'inventories.status', 'inventories.quantity');

        if(item.length === 0){
            return res.status(404).json({
                message: `Item with ID: ${id} is not found`
            });
        }

        res.status(200).json(item);
        
    }
    catch(error){
        res.status(404).json({
            message: `Item with ID: ${id} is not found`,
        });
    }
    
};

