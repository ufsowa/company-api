const mongoose = require('mongoose');

const productsSchema  = new mongoose.Schema({
  name: { type: String, required: true },
  client: { type: String, required: true },
});


module.exports = mongoose.model('Product', productsSchema );    // model Product is assosiated with database collection named products

