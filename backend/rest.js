// Import the 'express' module to create the application.
const express = require('express');

// Import the 'body-parser' module to parse request bodies.
const bodyParser = require('body-parser');

// Create the Express application.
const app = express();

// Sample data for income entries.
const incomeEntries = [
    { id: 1, incomeValue: 1000, incomeFrequency: "Weekly", incomeDescription: "Wages", incomeYearly: 52000 },
    { id: 2, incomeValue: 200, incomeFrequency: "Weekly", incomeDescription: "Side Job", incomeYearly: 10400 }
];

// Sample data for expense entries.
const expenseEntries = [
    { id: 1, expenseValue: "20", expenseFrequency: "Monthly", expenseDescription: "Phone Bill", expenseYearly: 240},
    { id: 2, expenseValue: "50", expenseFrequency: "Weekly", expenseDescription: "Groceries", expenseYearly: 2600 }
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
    // Calculate the incomeYearly based on the provided incomeValue and incomeFrequency
    const { incomeValue, incomeFrequency } = req.body;
    let incomeYearly = 0;

    if (incomeFrequency === "Weekly") {
        incomeYearly = incomeValue * 52;
    } else if (incomeFrequency === "Fortnightly") {
        incomeYearly = incomeValue * 26;
    } else if (incomeFrequency === "Four-weekly") {
        incomeYearly = incomeValue * 13;
    } else if (incomeFrequency === "Monthly") {
        incomeYearly = incomeValue * 12;
    } else if (incomeFrequency === "Yearly") {
        incomeYearly = incomeValue;
    }

    const index = incomeEntries.findIndex(el => el.id == req.params.id);
    incomeEntries[index] = {
        id: req.body.id,
        incomeValue: req.body.incomeValue,
        incomeFrequency: req.body.incomeFrequency,
        incomeDescription: req.body.incomeDescription,
        incomeYearly: incomeYearly        
    };
    res.status(200).json({
        message: "Income update completed"
    });
});

// Route to update an expense entry by ID.
app.put('/update-expense-entry/:id', (req, res) => {
    // Calculate the incomeYearly based on the provided incomeValue and incomeFrequency
    const { expenseValue, expenseFrequency } = req.body;
    let expenseYearly = 0;

    if (expenseFrequency === "Weekly") {
        expenseYearly = expenseValue * 52;
    } else if (expenseFrequency === "Fortnightly") {
        expenseYearly = expenseValue * 26;
    } else if (expenseFrequency === "Four-weekly") {
        expenseYearly = expenseValue * 13;
    } else if (expenseFrequency === "Monthly") {
        expenseYearly = expenseValue * 12;
    } else if (expenseFrequency === "Yearly") {
        expenseYearly = expenseValue;
    }
    const index = expenseEntries.findIndex(el => el.id == req.params.id);
    expenseEntries[index] = {
        id: req.body.id,
        expenseValue: req.body.expenseValue,
        expenseFrequency: req.body.expenseFrequency,
        expenseDescription: req.body.expenseDescription,
        expenseYearly: expenseYearly
    };
    res.status(200).json({
        message: "Expense update completed"
    });
});

// Route to add a new income entry.
app.post('/add-income-entry', (req, res) => {
    // Calculate the incomeYearly based on the provided incomeValue and incomeFrequency
    const { incomeValue, incomeFrequency } = req.body;
    let incomeYearly = 0;

    if (incomeFrequency === "Weekly") {
        incomeYearly = incomeValue * 52;
    } else if (incomeFrequency === "Fortnightly") {
        incomeYearly = incomeValue * 26;
    } else if (incomeFrequency === "Four-weekly") {
        incomeYearly = incomeValue * 13;
    } else if (incomeFrequency === "Monthly") {
        incomeYearly = incomeValue * 12;
    } else if (incomeFrequency === "Yearly") {
        incomeYearly = incomeValue;
    }

    // Add the new income entry to the incomeEntries array with the calculated incomeYearly
    incomeEntries.push({
        id: req.body.id,
        incomeValue: req.body.incomeValue,
        incomeFrequency: req.body.incomeFrequency,
        incomeDescription: req.body.incomeDescription,
        incomeYearly: incomeYearly
    });

    res.status(200).json({
        message: 'Income Entry submitted'
    });
});


// Route to add a new expense entry.
app.post('/add-expense-entry', (req, res) => {
    // Calculate the incomeYearly based on the provided incomeValue and incomeFrequency
    const { expenseValue, expenseFrequency } = req.body;
    let expenseYearly = 0;

    if (expenseFrequency === "Weekly") {
        expenseYearly = expenseValue * 52;
    } else if (expenseFrequency === "Fortnightly") {
        expenseYearly = expenseValue * 26;
    } else if (expenseFrequency === "Four-weekly") {
        expenseYearly = expenseValue * 13;
    } else if (expenseFrequency === "Monthly") {
        expenseYearly = expenseValue * 12;
    } else if (expenseFrequency === "Yearly") {
        expenseYearly = expenseValue;
    }
    expenseEntries.push({
        id: req.body.id,
        expenseValue: req.body.expenseValue,
        expenseFrequency: req.body.expenseFrequency,
        expenseDescription: req.body.expenseDescription,
        expenseYearly: expenseYearly

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

// Route to get the yearly income total
app.get('/total-yearly-income', (req, res) => {
    // Calculate the sum of all incomeYearly values using the reduce method
    const totalYearlyIncome = incomeEntries.reduce((total, entry) => total + entry.incomeYearly, 0);
    // Send the total yearly income as the response
    res.json({ totalYearlyIncome });
  });

// Route to get the yearly expense total
app.get('/total-yearly-expense', (req, res) => {
    // Calculate the sum of all expenseYearly values using the reduce method
    const totalYearlyExpense = expenseEntries.reduce((total, entry) => total + entry.expenseYearly, 0);
    // Send the total yearly income as the response
    res.json({ totalYearlyExpense });
  });

// Export the Express application.
module.exports = app;
