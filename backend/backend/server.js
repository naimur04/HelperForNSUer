const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());  // To parse incoming JSON requests

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nsu_data"
});

// POST route for signup
app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (name, email, password) VALUES(?)";  // Fixed SQL query
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];

    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error("Error: ", err);  // Log the error for debugging
            return res.status(500).json("Error");
        }
        return res.json(data);
    });
});

// Listen on port 8081
app.listen(8081, () => {
    console.log("Server is listening on port 8081...");
});
