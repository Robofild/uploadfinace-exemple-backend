const express=require('express')
const app =express()
const db=require('./config/db')
const consign= require('consign')



consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.db=db
app.set( 'port', ( process.env.PORT || 3000));

// Start node server
app.listen( app.get( 'port' ), function() {
  console.log( 'Node server is running on port ' + app.get( 'port' ));
  });
app.use(require('./config/routes'))