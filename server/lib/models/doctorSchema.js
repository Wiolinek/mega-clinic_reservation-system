const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema ({
  username: {
    type: String,
    unique: true,
  },
  hash: String,
  salt: String,
});

module.exports = mongoose.model('Doctor', doctorSchema);