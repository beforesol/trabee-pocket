var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tripSchema = new Schema({
  userId: String,
  title: String,
  memo: String,
  imageUrl: String,
  country: Object,
  startDate: String,
  endDate: String,
  budgets: Array,
  totalAmount: String
});

module.exports = mongoose.model('trip', tripSchema);
