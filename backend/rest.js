// Import the 'express' module to create the application.
const express = require('express');

// Import the 'body-parser' module to parse request bodies.
const bodyParser = require('body-parser');

// Create the Express application.
const app = express();

// Sample data for income entries.
const incomeEntries = [
    { id: 1, incomeValue: "1000", incomeFrequency: "Weekly", incomeDescription: "OF" }
];

// Sample data for expense entries.
const expenseEntries = [
    { id: 1, expenseValue: "20", Frequency: "Monthly", expenseDescription: "Phone Bill" },
    { id: 2, expenseValue: "50", expenseFrequency: "Weekly", expenseDescription: "Groceries" }
];

// Middleware to parse incoming JSON data.
app.use(bodyParser.json());

// Middleware to enable CORS (Cross-Origin Resource Sharing) for all routes.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Route to get the maximum income entry ID.
app.get('/max-income-id', (req, res) => {
    let max = 0;
    for (let i = 0; i < incomeEntries.length; i++) {
        if (incomeEntries[i].id > max) {
            max = incomeEntries[i].id;
        }
    }
    res.json({ maxIncomeId: max });
});

// Route to get the maximum expense entry ID.
app.get('/max-expense-id', (req, res) => {
    let max = 0;
    for (let i = 0; i < expenseEntries.length; i++) {
        if (expenseEntries[i].id > max) {
            max = expenseEntries[i].id;
        }
    }
    res.json({ maxExpenseId: max });
});

// Route to remove an income entry by ID.
app.delete('/remove-income-entry/:id', (req, res) => {
    const index = incomeEntries.findIndex(el => el.id == req.params.id);
    incomeEntries.splice(index, 1);
    res.status(200).json({
        message: 'Income Entry Deleted'
    });
});

// Route to remove an expense entry by ID.
app.delete('/remove-expense-entry/:id', (req, res) => {
    const index = expenseEntries.findIndex(el => el.id == req.params.id);
    expenseEntries.splice(index, 1);
    res.status(200).json({
        message: 'Expense Entry Deleted'
    });
});

// Route to update an income entry by ID.
app.put('/update-income-entry/:id', (req, res) => {
    const index = incomeEntries.findIndex(el => el.id == req.params.id);
    incomeEntries[index] = {
        id: req.body.id,
        incomeValue: req.body.incomeValue,
        incomeFrequency: req.body.incomeFrequency,
        incomeDescription: req.body.incomeDescription
    };
    res.status(200).json({
        message: "Income update completed"
    });
});

// Route to update an expense entry by ID.
app.put('/update-expense-entry/:id', (req, res) => {
    const index = expenseEntries.findIndex(el => el.id == req.params.id);
    expenseEntries[index] = {
        id: req.body.id,
        expenseValue: req.body.expenseValue,
        expenseFrequency: req.body.expenseFrequency,
        expenseDescription: req.body.expenseDescription
    };
    res.status(200).json({
        message: "Expense update completed"
    });
});

// Route to add a new income entry.
app.post('/add-income-entry', (req, res) => {
    incomeEntries.push({
        id: req.body.id,
        incomeValue: req.body.incomeValue,
        incomeFrequency: req.body.incomeFrequency,
        incomeDescription: req.body.incomeDescription
    });
    res.status(200).json({
        message: 'Income Entry submitted'
    });
});

// Route to add a new expense entry.
app.post('/add-expense-entry', (req, res) => {
    expenseEntries.push({
        id: req.body.id,
        expenseValue: req.body.expenseValue,
        expenseFrequency: req.body.expenseFrequency,
        expenseDescription: req.body.expenseDescription
    });
    res.status(200).json({
        message: 'Expense submitted'
    });
});

// Route to get all income entries.
app.get('/income-entries', (req, res, next) => {
    res.json({ 'incomeEntries': incomeEntries });
});

// Route to get all expense entries.
app.get('/expense-entries', (req, res, next) => {
    res.json({ 'expenseEntries': expenseEntries });
});

// Export the Express application.
module.exports = app;
