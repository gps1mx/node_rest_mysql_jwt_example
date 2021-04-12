const express = require("express");
const jwt = require("jsonwebtoken");

// const app = express();

function verifyToken(req, res, next){
    const bearerHeader =  req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(" ")[1];
        req.token  = bearerToken;
        // jwt.verify(req.token, 'secretkey', (err, authData) => {
        jwt.verify(req.token, '3dzIjpbeyJpZCI6MSwidXNlcm5hbWUiOiJqdWFubWEiLCJwYXNzd29yZCI6ImFzZGZhc2RmI', (err) => {
            if(err) {
                res.sendStatus(403);
            } else {
                next();
            }
        }) 
    }else{
        res.sendStatus(403);
    }
}

module.exports = verifyToken;