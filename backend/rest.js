// Import the 'express' module to create the application.
const express = require('express');

// Import Mongoose
const mongoose = require('mongoose');
mongoose.connect(/*PASTE CONNECTION STRING HERE*/)
    .then(() => {
        console. log ('Connected to MongoDB')
    })
    .catch(() => {
        console.log('Error connecting to MongoDe')
    })

// Import the 'body-parser' module to parse request bodies.
const bodyParser = require('body-parser');

//import income entry schema
const IncomeEntryModel = require('./income-entry-schema');

//import expense entry schema
const ExpenseEntryModel = require('./expense-entry-schema');

// Create the Express application.
const app = express();

// Declare income entries array.
const incomeEntries = [];

// Declare expense entries array.
const expenseEntries = [];


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
    IncomeEntryModel.deleteOne({_id: req.params.id})
    .then(() => {
        res.status(200).json({
            message: 'Income Entry Deleted'
        })
    })
});

// Route to remove an expense entry by ID.
app.delete('/remove-expense-entry/:id', (req, res) => {
    ExpenseEntryModel.deleteOne({_id: req.params.id})
    .then(() => {
        res.status(200).json({
            message: 'Expense Entry Deleted'
        });
    })
    
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
    const updatedIncome = new IncomeEntryModel({
        _id: req.body.id,
        incomeValue: req.body.incomeValue,
        incomeFrequency: req.body.incomeFrequency,
        incomeDescription: req.body.incomeDescription,
        incomeYearly: incomeYearly   
    })
    IncomeEntryModel.updateOne({_id: req.body.id}, updatedIncome)
        .then(() => {
            res.status(200).json({
                message: "Income update completed"
             });
        })
    
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

    const updatedExpense = new ExpenseEntryModel({
        id: req.body.id,
        expenseValue: req.body.expenseValue,
        expenseFrequency: req.body.expenseFrequency,
        expenseDescription: req.body.expenseDescription,
        expenseYearly: expenseYearly
    })
    ExpenseEntryModel.updateOne({_id: req.body.id}, updatedExpense)
        .then(() => {
            res.status(200).json({
                message: "Expense update completed"
             });
        })
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

    const incomeEntry = new IncomeEntryModel({
        incomeValue: req.body.incomeValue,
        incomeFrequency: req.body.incomeFrequency,
        incomeDescription: req.body.incomeDescription,
        incomeYearly: incomeYearly
    });
    incomeEntry.save();
    console.log(incomeEntry);
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

    const expenseEntry = new ExpenseEntryModel({
        expenseValue: req.body.expenseValue,
        expenseFrequency: req.body.expenseFrequency,
        expenseDescription: req.body.expenseDescription,
        expenseYearly: expenseYearly
    })
    expenseEntry.save();
    console.log(expenseEntry);
    res.status(200).json({
        message: 'Expense submitted'
    });
});

// Route to get all income entries.
app.get('/income-entries', (req, res, next) => {
    IncomeEntryModel.find()
        .then((incomeEntries) => {
            res.json({'incomeEntries': incomeEntries})
        })
        .catch((error) =>{
            console.log("Error fetching income entries")
        })
})

// Route to get all expense entries.
app.get('/expense-entries', (req, res, next) => {
    ExpenseEntryModel.find()
    .then((expenseEntries) => {
        res.json({'expenseEntries': expenseEntries})
    })
    .catch((error) =>{
        console.log("Error fetching expense entries")
    })
});

// Route to get the yearly income total
app.get('/total-yearly-income', (req, res) => {
    // Use the IncomeEntryModel to fetch all income entries from the database
    IncomeEntryModel.find()
        .then((incomeEntries) => {
            // Calculate the sum of all incomeYearly values using the reduce method
            const totalYearlyIncome = incomeEntries.reduce((total, entry) => total + entry.incomeYearly, 0);
            // Send the total yearly income as the response
            res.json({ totalYearlyIncome });
        })
        .catch((error) => {
            // Handle any errors that occur during the database query
            console.error("Error fetching income entries:", error);
            res.status(500).json({ error: "Error fetching income entries" });
        });
});


// Route to get the yearly expense total
app.get('/total-yearly-expense', (req, res) => {
    // Use ExpenseEntryModel to fetch all expense entries from the database
    ExpenseEntryModel.find()
    .then((expenseEntries) => {
         // Calculate the sum of all expenseYearly values using the reduce method
    const totalYearlyExpense = expenseEntries.reduce((total, entry) => total + entry.expenseYearly, 0);
    // Send the total yearly income as the response
    res.json({ totalYearlyExpense });
    })
});

// Export the Express application.
module.exports = app;
