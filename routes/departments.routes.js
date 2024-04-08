const express = require('express');
const router = express.Router();
//const ObjectId = require('mongodb').ObjectId;
const DepartmentController = require('../controllers/department.controller');

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

router.get('/departments', DepartmentController.getAll);

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

router.get('/departments/random', DepartmentController.getRandom);

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

router.get('/departments/:id', DepartmentController.getById);

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

router.post('/departments', DepartmentController.addItem);

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

router.put('/departments/:id', DepartmentController.updateItem);

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

router.delete('/departments/:id', DepartmentController.deleteItem);

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
