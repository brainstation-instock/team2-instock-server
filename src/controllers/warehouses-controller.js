const knex = require('knex')(require('../../knexfile'));

module.exports.getWarehouses = async(_req, res) => {

    const warehouses = await knex('warehouses');
    res.json({warehouses, inventories});
}

