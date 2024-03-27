/*=============
    MODULES
==============*/

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;
const warehouses = require('./src/routes/warehouses');
const inventories = require('./src/routes/inventories');

// Enable cors
app.use(cors());
// Enable middleware
app.use(express.json());

// Enable Routes
app.use('/api/warehouses', warehouses);
app.use('/api/inventories', inventories);

/*==========
    PORT
===========*/
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})