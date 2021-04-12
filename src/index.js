const express = require('express');
const app = express();


// Settings
app.set('port', process.env.port || 3001);

// Middlewares
app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
// Routes
app.use(require('./routes/employees'));
app.use(require('./auth/auth'));
app.use(require('./auth/verifyToken'));

// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})