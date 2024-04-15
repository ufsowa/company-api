const express = require('express');
const cors = require('cors');

const mongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

const employeesRoutes = require('./routes/employees.routes');
const departmentsRoutes = require('./routes/departments.routes');
const productsRoutes = require('./routes/products.routes');

// mongoClient.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
//   console.log('Connect db')
//   if (err){
//     console.log(err);
//   }
//   else {
//     console.log('Successfully connected to the database');
//     const db = client.db('companyDB');

    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // app.use((req, res, next) => {
    //   req.db = db;
    //   next();
    // });

    app.use('/api', employeesRoutes);
    app.use('/api', departmentsRoutes);
    app.use('/api', productsRoutes);

    app.use((req, res) => {
      res.status(404).send({ message: 'Not found...' });
    })

    // connects our backend code with the database
    const NODE_ENV = process.env.NODE_ENV;
    let dbUri = '';

    if(NODE_ENV === 'production'){
      dbUri = 'url to remote db';
    } else if(NODE_ENV === 'test'){
      dbUri = 'mongodb://0.0.0.0:27017/companyDBtest';
    } else {
      dbUri = 'mongodb://0.0.0.0:27017/companyDB';
    } 
    mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;   
    // mongoose.connect('mongodb://0.0.0.0:27017/companyDB', { useNewUrlParser: true, useUnifiedTopology: true });
    // const db = mongoose.connection;

    db.once('open', () => {
      console.log('env: ', NODE_ENV);
      console.log('Connected to the database', dbUri, db.name);
    });
    db.on('error', err => console.log('Error ' + err));
    console.log('Connected to DB: ', db.name);

    const server = app.listen('8000', () => {
      console.log('Server is running on port: 8000');
    });
    
    module.exports = server;

    
//  }
//});
