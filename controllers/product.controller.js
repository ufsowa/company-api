const Product = require('../models/products.model');

exports.getAll = async (req, res) => {
    try {
      res.json(await Product.find());
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getRandom = async (req, res) => {
    try {
      const count = await Product.countDocuments();  //  count all items in collection
      const rand = Math.floor(Math.random() * count);
      const item = await Product.findOne().skip(rand);  //  skip number of items from the collection
      if(!item) res.status(404).json({ message: 'Not found' });
      else res.json(item);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
      const item = await Product.findById(req.params.id);   // no need ObjectId conversion, mongoose do it underneeth 
      if(!item) res.status(404).json({ message: 'Not found' });
      else res.json(item);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.addItem = async (req, res) => {
    const { name, client } = req.body;
    try {
      const newProduct = new Product({ name, client });   // create item/document for model
      const addedItem = await newProduct.save();                             // add item to the collection with the same model
      res.json(addedItem);
    } catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.updateItem = async (req, res) => {
    const { name, client } = req.body;
    try {
      const item = await Product.findById(req.params.id);   // check if item exist
      if(item) {
        await Product.updateOne({ _id: req.params.id }, { $set: { name, client }});
        const item = await Product.findById(req.params.id); 
        res.json(item);
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    } 
};

exports.deleteItem = async (req, res) => {
    try {
      const item = await Product.findById(req.params.id);
      if(item) {
        await Product.deleteOne({ _id: req.params.id });
        //  await department.remove();    // another way to remove item
        res.json(item);
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};