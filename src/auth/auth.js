const express = require('express');
const jwt = require("jsonwebtoken");
const router = express.Router();

const mysqlConnection = require('../database');

router.post('/auth/login', (req , res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    mysqlConnection.query(query, [username, password], (err, rows) => {
        if(!err) {
            if(rows.length === 1) {
                jwt.sign({rows}, '3dzIjpbeyJpZCI6MSwidXNlcm5hbWUiOiJqdWFubWEiLCJwYXNzd29yZCI6ImFzZGZhc2RmI', {expiresIn: '24h'}, (err, token) => {
                    if(err) {
                        console.log(err)
                    } else {
                        res.json({
                            token, rows
                        });
                    }
                });            
            } else {
                res.sendStatus(403);
            }
        } else {
            console.log(err);
        }
    });
});

module.exports = router;