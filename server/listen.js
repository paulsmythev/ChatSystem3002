let express = require('express');
let app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

module.exports = function(http) {
  
     app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    let server = http;

    const port = process.eventNames.PORT || 3000;
    server.listen(port, () => {
        console.log('started on port: ' + port);
    });
}