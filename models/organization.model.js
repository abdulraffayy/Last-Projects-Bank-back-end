const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: String,
  address: String,
  terms: String,
});

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = {
  Organization,
};
