Expense Tracker

A simple full-stack expense tracking application built with:

HTML, CSS, Bootstrap, JavaScript

Node.js and Express

PostgreSQL

The application allows users to manage expenses through a browser while all data is stored in PostgreSQL.

Project Architecture

Frontend
HTML + CSS + Bootstrap + JavaScript
        |
        | HTTP requests using fetch()
        v
Backend
Node.js + Express
        |
        | SQL queries using pg
        v
Database
PostgreSQL

The frontend never connects directly to PostgreSQL.

Project Structure

expense-tracker-starter/
│
├── backend/
│   ├── server.js
│   ├── schema.sql
│   ├── package.json
│   ├── package-lock.json
│   └── .env.example
│
├── frontend/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
│
├── testcases/
│   └── screenshots/
│
├── .gitignore
└── README.md

Backend

The backend is responsible for:

Receiving HTTP requests

Validating request data

Running SQL queries

Reading and writing data in PostgreSQL

Returning JSON responses

Returning the correct HTTP status codes

Backend Technologies

Node.js

Express

PostgreSQL

pg

cors

dotenv

API Endpoints

Method

Endpoint

Purpose

Success

GET

/api/expenses

Get all expenses

200

GET

/api/expenses/:id

Get one expense

200

POST

/api/expenses

Add a new expense

201

PUT

/api/expenses/:id

Update an expense

200

DELETE

/api/expenses/:id

Delete an expense

200

Backend Validation

The server checks that:

title is not empty

amount is a number greater than 0

category is one of:

Food

Transport

Bills

Entertainment

Other

date is in YYYY-MM-DD format

id is a valid positive integer

User values are sent to PostgreSQL using parameters such as:

pool.query(
    "SELECT * FROM expenses WHERE id = $1",
    [id]
);

This keeps user data separate from SQL code.

Database

The project uses PostgreSQL.

The expenses table contains:

id
title
amount
category
date

The database is created using:

backend/schema.sql

The database stores the data permanently, so expenses are still available after restarting the Node.js server.

Frontend

The frontend is responsible for:

Displaying expenses

Adding expenses

Editing expenses

Deleting expenses

Filtering by category

Showing summary information

Showing loading and error states

Frontend Technologies

HTML

CSS

Bootstrap

JavaScript

Fetch API

DOM manipulation

Frontend Flow

User action
    ↓
JavaScript
    ↓
fetch()
    ↓
Express API
    ↓
PostgreSQL
    ↓
JSON response
    ↓
JavaScript updates the page

After adding, editing, or deleting an expense, the frontend calls:

refresh();

refresh() gets the latest expenses from the backend again and redraws the table and summary.

This keeps the frontend synchronized with the real data stored in PostgreSQL.

Features

Add an expense

Validate expense data

Edit an expense

Delete an expense

Filter by category

Show total amount

Show number of expenses

Show highest expense

Store data in PostgreSQL

Show loading spinner

Show Bootstrap error alerts

Responsive design

Summary cards using CSS Grid

How to Run

1. Database

Open pgAdmin and create a database named:

expense_tracker

Open the Query Tool for that database.

Run:

backend/schema.sql

This creates the expenses table and inserts sample data.

2. Environment File

Inside the backend folder, copy:

.env.example

and create:

.env

Example:

DB_USER=postgres
DB_HOST=localhost
DB_NAME=expense_tracker
DB_PASSWORD=YOUR_POSTGRES_PASSWORD
DB_PORT=5432

Replace:

YOUR_POSTGRES_PASSWORD

with your local PostgreSQL password.

Do not upload or submit the real .env file.

3. Backend

Open a terminal inside:

backend

Install the packages:

npm install

Start the server:

node server.js

The backend runs on:

http://localhost:3000

4. Frontend

Open:

frontend/index.html

with VS Code Live Server.

The frontend will connect to:

http://localhost:3000/api/expenses

Testing

The project was tested for:

GET all expenses

GET one expense

POST valid expense

POST invalid expense

PUT existing expense

PUT invalid expense

DELETE existing expense

DELETE missing expense

Invalid IDs

Database errors

Frontend loading

Frontend add

Frontend edit

Frontend delete

Frontend filtering

Screenshots are stored in:
testcases/

and inside it there is video to show you project while working


What Was the Hardest Part?
The hardest part was keeping the frontend synchronized with the backend after adding, editing, or deleting an expense.
Instead of changing the table manually, the frontend calls refresh() after every change. refresh() sends a new GET request to the backend and redraws the page using the latest data from PostgreSQL.
This ensures that PostgreSQL remains the source of truth.
Delivery
The final ZIP should include:

backend/
frontend/
testcases/
README.md
.gitignore

Do not include:

node_modules/
.env

node_modules can be recreated using:

npm install

The .env file should be created locally from .env.example.
=======