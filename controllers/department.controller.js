const Department = require('../models/department.model');

exports.getAll = async (req, res) => {
    try {
      res.json(await Department.find());    // mongoose.findById({ _id: id })   mongoose.findOne()  mongoose.find({ name: { $ne: 'IT' }})
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getRandom = async (req, res) => {
    try {
      const count = await Department.countDocuments();  //  count all items in collection
      const rand = Math.floor(Math.random() * count);
      const dep = await Department.findOne().skip(rand);  //  skip number of items from the collection
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
      const dep = await Department.findById(req.params.id);   // no need ObjectId conversion, mongoose do it underneeth 
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.addItem = async (req, res) => {
    try {
      const { name } = req.body;
      const newDepartment = new Department({ name: name });   // create item/document for model Department
      const addedItem = await newDepartment.save();                             // add item to the collection with the same model -> departments
      res.json(addedItem);
    } catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.updateItem = async (req, res) => {
    const { name } = req.body;
    try {
      const dep = await Department.findById(req.params.id);   // check if item exist
      if(dep) {
        await Department.updateOne({ _id: req.params.id }, { $set: { name: name }});
        const dep = await Department.findById(req.params.id);
        res.json(dep);
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.deleteItem = async (req, res) => {
    try {
      const dep = await Department.findById(req.params.id);
      if(dep) {
        await Department.deleteOne({ _id: req.params.id });
        //  await department.remove();    // another way to remove item
        res.json(dep);
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};