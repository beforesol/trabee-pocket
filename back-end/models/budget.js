var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var budgetSchema = new Schema({
  tripId: String,
  type: String,
  title: String,
  amount: String,
  amountType: String,
  currency: Object,
  category: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('budget', budgetSchema);
