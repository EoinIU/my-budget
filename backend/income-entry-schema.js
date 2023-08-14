const mongoose = require('mongoose');

// Schema for income entries
const incomeSchema = mongoose.Schema({
    incomeValue: Number,
    incomeFrequency: String,
    incomeDescription: String,
    incomeYearly: Number
});

module.exports = mongoose.model('incomeEntry', incomeSchema);