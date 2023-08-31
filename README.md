# MyBudget

MyBudget is an app that helps users keep track of their regular income and expenses, allowing them to better understand their financial situation and empowering them to make better financial decisions.

# How to Install and Run the Project

## Prerequisites

### Node.js

Download and install the latest version of Node.js: https://nodejs.org/en/download

### Angular CLI

Install the Angular CLI globally from the terminal with: **npm install -g @angular/cli**.

### MongoDB Atlas

This app uses MongoDB Atlas in order to persist user data. You should create an account at: https://cloud.mongodb.com and create a database under the free tier.

## Installation steps


### 1. Downlaod source code

Download the source code from the GitHub repository, unzip the file, and navigate to the directory in the termnal.

### 2. Download and Install npm Packages

Run the command: **npm install**

### 3. Connect MongoDB Atlas

To connect the app to your MongoDB Atlas database use the MongoDB driver for Node.js and copy and paste the connection string into line 7 in the **backend/rest.js** file, as follows:

Log in to your MongoDB Atlas account and under your database deployments click "Connect" on your desired database.
<br>
<br>



<img width="714" alt="Screenshot 2023-08-31 at 10 22 38" src="https://github.com/EoinIU/my-budget/assets/140261376/2b1a69cb-2e1a-45d7-9f16-270849306141">

<br>
<br>


Next click "Drivers" under "Connect to your application".
 

<img width="774" alt="Screenshot 2023-08-31 at 10 22 54" src="https://github.com/EoinIU/my-budget/assets/140261376/b2e5fa58-14ff-4523-b8d1-1140220e9602">

<br>
<br>

In the terminal run the command: **npm install mongodb**

Finally, copy and paste your connection string into line 7 of the file **backend/rest.js** - making sure to replace "<password>" with your password.
<br>


### 4. Start the Node.js server

In the terminal run the command: **node backend/server.js** - You should get a message saying "Connected to MongoDB". If you get a message saying "Error connecting to MongoDB" make sure that your IP address is not being blocked by MongoBD's IP restriction and try again.

### 5. Run Application

In the terminal run the command: **ng serve**

To see the application in the browser, go to http://localhost:4200/

## Notes

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.4.



