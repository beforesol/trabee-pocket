var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var countrySchema = new Schema({
  continent: String,
  countries: Array,
});

module.exports = mongoose.model('mergeCountry', countrySchema);
