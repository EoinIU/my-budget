# MyBudget

MyBudget is an app that keeps track of your regular income and expenses, and calculates your disposable income, empowering you to make better financial decisions.

# How to Install and Run the Project

## Prerequisites

### Node.js

Download and install the latest version of Node.js: [Node.js](https://nodejs.org/en/download).

### Angular CLI

Install the Angular CLI globally from the terminal with: **npm install -g @angular/cli**.

### MongoDB Atlas

This app uses MongoDB Atlas in order to persist user data. You should create an account at: [MongoDB Atlas](https://cloud.mongodb.com) and create a database under the free tier.

## Installation Steps

### 1. Download source code

Download the source code from the GitHub repository, unzip the file, and navigate to the directory in the terminal.

### 2. Download and Install npm Packages

Run the command: **npm install**

### 3. Connect MongoDB Atlas

To connect the app to your MongoDB Atlas database, use the MongoDB driver for Node.js and copy and paste the connection string into line 7 in the **backend/rest.js** file, as follows:

Log in to your MongoDB Atlas account and under your database deployments click "Connect" on your desired database.

<img width="714" alt="Screenshot 2023-08-31 at 10 22 38" src="https://github.com/EoinIU/my-budget/assets/140261376/2b1a69cb-2e1a-45d7-9f16-270849306141">

Next, click "Drivers" under "Connect to your application".

<img width="774" alt="Screenshot 2023-08-31 at 10 22 54" src="https://github.com/EoinIU/my-budget/assets/140261376/b2e5fa58-14ff-4523-b8d1-1140220e9602">

In the terminal, run the command: **npm install mongodb**

Finally, copy and paste your connection string into line 7 of the file **backend/rest.js** - making sure to replace 'password' with your password.

### 4. Start the Node.js server

In the terminal, run the command: **node backend/server.js** - You should get a message saying "Connected to MongoDB". If you get a message saying "Error connecting to MongoDB," make sure that your IP address is not being blocked by MongoDB's IP restriction and try again.

### 5. Run Application

In the terminal, run the command: **ng serve**

To see the application in the browser, go to http://localhost:4200/

# How to Use the App

## Overview

This app keeps track of your regular income and expenses, and calculates your disposable income, empowering you to make better financial decisions. For this app to work as intended, you must add your regular income and expenses - these are the income and expenses that occur on an ongoing basis and usually have the same value. For example: salary, rent, phone bill, Netflix subscription, or car payment. For expenses that can vary from week to week, e.g., groceries, you should add the average value, or if you prefer to be more conservative with your estimates, you can add the upper limit of the range of values. One-off payments (payments that will never occur again) should not be included.

## App Interface

The app is split into two main sections: the Summary Section, and the Budget Section. The summary section is on top and gives the total values for income, expenses, and disposable income for the selected frequency. The budget section is below this and is split into two subsections, income and expenses.

## Adding Income and Expenses

Click the "Add Income" or "Add Expense" button to add a new payment. This will open a form where you can add the description, value, and frequency for the payment. Once you have added these values, click the submit button. This will bring you back to the main app page, and the payment you have just added will appear in the respective income or expense section of the budget section.

## Editing or Deleting Budget Entries

If you wish to edit or delete one of the payments you have added to the budget, you can click the "Edit" or "Delete" button to the right of the payment in question. Clicking "Edit" will open the same form that was used to add the payment initially; you can now edit the values and click submit when finished. Clicking "Delete" will remove the payment in question.

## Using the Budget Summary

The Summary section displays total values for income, expenses, and disposable income for the selected frequency. The default frequency is "weekly," but you can change this by clicking on the dropdown box and selecting from the other options.

## How to Use this App to Make Better Financial Decisions

Assuming you have correctly entered all of your regular income and expenses into the app, you now wish to work out if you can afford, for example, a new €50 per month gym membership. Simply go to the summary section of the app, and change the frequency to "Monthly." Now take a look at your disposable income. If your monthly disposable income is above €50, you can certainly afford this new membership. Consider that your monthly disposable income will now fall by €50 - if this leaves you with less disposable income than you are comfortable with, maybe it is worth looking for a cheaper gym membership, cutting down on your expenses, or waiting until you are earning more money. If your monthly disposable income is below €50, you clearly cannot afford this new gym membership.

## Notes

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.4.

## Lisence

GNU GENERAL PUBLIC LICENSE v3.0
