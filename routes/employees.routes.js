const express = require('express');
const router = express.Router();

const Employee = require('../models/employees.model');

router.get('/employees', async (req, res) => {
  try {
    res.json(await Employee.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.get('/employees/random', async (req, res) => {
  try {
    const count = await Employee.countDocuments();  //  count all items in collection
    const rand = Math.floor(Math.random() * count);
    const item = await Employee.findOne().skip(rand);  //  skip number of items from the collection
    if(!item) res.status(404).json({ message: 'Not found' });
    else res.json(item);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.get('/employees/:id', async (req, res) => {
  try {
    const item = await Employee.findById(req.params.id);   // no need ObjectId conversion, mongoose do it underneeth 
    if(!item) res.status(404).json({ message: 'Not found' });
    else res.json(item);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.post('/employees', async (req, res) => {
  try {
    const { firstName, lastName, department } = req.body;
    const newEmployee = new Employee({ firstName, lastName, department });   // create item/document for model 
    const addedItem = await newEmployee.save();                             // add item to the collection with the same model
    res.json(addedItem);
  } catch(err) {
    res.status(500).json({ message: err });
  }
});

router.put('/employees/:id', async (req, res) => {
  const { firstName, lastName, department } = req.body;
  try {
    const item = await Employee.findById(req.params.id);   // check if item exist
    if(item) {
      await Employee.updateOne({ _id: req.params.id }, { $set: { firstName, lastName, department }});
      const item = await Employee.findById(req.params.id); 
      res.json(item);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.delete('/employees/:id', async (req, res) => {
  try {
    const item = await Employee.findById(req.params.id);
    if(item) {
      await Employee.deleteOne({ _id: req.params.id });
      //  await department.remove();    // another way to remove item
      res.json(item);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
