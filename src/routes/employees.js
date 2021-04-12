const express = require('express');
const router = express.Router();
const verifyToken = require('../auth/verifyToken');

const mysqlConnection = require('../database');

router.get('/employees/', verifyToken, (req, res) => {
    const query = 'select * from employees';
    mysqlConnection.query(query, (err, rows) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
})

router.get('/employees/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    const query = 'select * from employees where id = ?';
    mysqlConnection.query(query, [id], (err, rows) => {
        if(!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
});

router.post('/employees/', verifyToken, (req, res) => {
    const {id, name, salary} = req.body;
    const query = 'CALL employeeAddOrEdit(?, ?, ?)';
    // mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
    mysqlConnection.query(query, [id, name, salary], (err) => {
        if(!err) {
            res.json({Status: '201'});
        } else {
            console.log(err);
        }
    });
});

router.put('/employees/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    const {name, salary} = req.body;
    const query = 'CALL employeeAddOrEdit(?, ?, ?)';
    mysqlConnection.query(query, [id, name, salary], (err) => {
        if(!err) {
            res.json({Status: '201'});
        } else {
            console.log(err);
        }
    });
});

router.delete('/employees/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    const query = 'delete from employees where id = ?';
    mysqlConnection.query(query, [id], (err) => {
        if(!err) {
            res.json({Status: '201'});
        } else {
            console.log(err);
        }
    });

})

module.exports = router;