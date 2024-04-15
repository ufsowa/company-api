const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
//  _id: { type: mongoose.Types.ObjectId, required: true },     // added by default by mongoose, can be skipped
  name: { type: String, required: true, minlength: 5, maxlength: 20 }
});

module.exports = mongoose.model('Department', departmentSchema);    // model Department is assosiated with database collection named departments
                                                                    // mongoose automaticly create collection for defined model
