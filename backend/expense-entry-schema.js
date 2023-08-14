const mongoose = require('mongoose');

//Schema for expense entries
const expenseSchema = mongoose.Schema({
    expenseValue: Number,
    expenseFrequency: String,
    expenseDescription: String,
    expenseYearly: Number
});

module.exports = mongoose.model('expenseEntry', expenseSchema);