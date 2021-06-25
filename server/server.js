
var express = require('express');
var cors = require('cors')
var app = express();
app.use(cors())
global.__basedir = __dirname;

const db = require('./app/config/db.config.js');

// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('Database created');
});

require('./app/routers/upload.router.js')(app);

// Create a Server
var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("App listening at http://%s:%s", host, port)

})
