const mongoose = require('mongoose');

const userAuthSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
}, { 
  collection: 'userAuth' // Force collection name
});

module.exports = mongoose.model('UserAuth', userAuthSchema);