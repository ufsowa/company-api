const express = require('express');
const router = express.Router();
//const ObjectId = require('mongodb').ObjectId;

const Department = require('../models/department.model');

// router.get('/departments', (req, res) => {
//   req.db.collection('departments')
//     .find()
//     .toArray()
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => {
//       res.status(500).json({ message: err });
//     });
// });

router.get('/departments', async (req, res) => {
  try {
    res.json(await Department.find());    // mongoose.findById({ _id: id })   mongoose.findOne()  mongoose.find({ name: { $ne: 'IT' }})
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

// router.get('/departments/random', (req, res) => {
//   req.db.collection('departments')
//     .aggregate([{ $sample: { size: 1 } }])
//     .toArray()
//     .then((data) => {
//       res.json(data[0]);
//     })
//     .catch((err) => {
//       res.status(500).json({ message: err });
//     });
// });

router.get('/departments/random', async (req, res) => {
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
});

// router.get('/departments/:id', (req, res) => {
//   req.db.collection('departments')
//     .findOne({ _id: ObjectId(req.params.id) })
//     .then((data) => {
//       if(!data) res.status(404).json({ message: 'Not found' });
//       else res.json(data);
//     })
//     .catch((err) => {
//       res.status(500).json({ message: err });
//     });
// });

router.get('/departments/:id', async (req, res) => {
  try {
    const dep = await Department.findById(req.params.id);   // no need ObjectId conversion, mongoose do it underneeth 
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

// router.post('/departments', (req, res) => {
//   const { name } = req.body;
//   req.db.collection('departments')
//     .insertOne({name: name})
//     .then(() => {
//       res.json({ message: 'OK' });
//     })
//     .catch((err) => {
//       res.status(500).json({ message: err });
//   })  
// });

router.post('/departments', async (req, res) => {
  try {
    const { name } = req.body;
    const newDepartment = new Department({ name: name });   // create item/document for model Department
    const addedItem = await newDepartment.save();                             // add item to the collection with the same model -> departments
    res.json(addedItem);
  } catch(err) {
    res.status(500).json({ message: err });
  }
});

//  same as above but with promises
// router.post('/departments', (req, res) => {

//   const { name } = req.body;
//   const newDepartment = new Department({ name });
//   newDepartment.save()
//     .then(() => {
//       res.json({ message: 'OK' });
//     })
//     .catch(err => {
//       res.status(500).json({ message: err });
//     });
// });

// router.put('/departments/:id', (req, res) => {
//   const { name } = req.body;

//   req.db.collection('departments')
//     .updateOne({ _id: ObjectId(req.params.id) }, { $set: { name: name }})
//     .then(() => {
//       res.json({ message: 'OK' });
//     })
//     .catch((err) => {
//       res.status(500).json({ message: err });
//     })
// });

router.put('/departments/:id', async (req, res) => {
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
});

//  same as above but with mongoose.save
// router.put('/departments/:id', async (req, res) => {
//   const { name } = req.body;
//   try {
//     const dep = await Department.findById(req.params.id);
//     if(dep) {
//       dep.name = name;
//       await dep.save();
//       res.json({ message: 'OK' });
//     }
//     else res.status(404).json({ message: 'Not found...' });
//   }
//   catch(err) {
//     res.status(500).json({ message: err });
//   }
// });

router.delete('/departments/:id', async (req, res) => {
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
});

// router.delete('/departments/:id', (req, res) => {
//   req.db.collection('departments')
//     .deleteOne({ _id: ObjectId(req.params.id) })
//     .then(() => {
//       res.json({ message: 'OK' });
//     })
//     .catch((err) => {
//       res.status(500).json({ message: err });
//     })
// });

module.exports = router;
