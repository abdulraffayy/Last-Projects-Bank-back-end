const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: String,
  fee: Number,
});

const Service = mongoose.model('Service', serviceSchema);


module.exports = {
  Service,
};
