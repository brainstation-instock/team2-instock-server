const knex = require('knex')(require('../../knexfile'));

module.exports.getWarehouses = async(_req, res) => {

    const warehouses = await knex('warehouses');
    res.status(200).json({warehouses});
}

module.exports.getWarehouseDetail = async(req, res) => {

    const {id} = req.params;

    try{
        const warehouse = await knex('warehouses').where('id', id);

        if(warehouse.length === 0){
            return res.status(404).json({
                message: `Warehouse with ID: ${id} is not found`
            });
        }

        res.status(200).json(warehouse[0]);
        
    }
    catch(error){
        res.status(404).json({
            message: `Warehouse with ID: ${id} is not found`,
        });
    }
    
};

