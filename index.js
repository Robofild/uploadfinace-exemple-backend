const express=require('express')
const app =express()
const db=require('./config/db')
const consign= require('consign')
const cors= require('cors')


consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.db=db

app.use(cors())
app.use(express.json())
const PORT=process.env.port || 3000
app.listen(PORT,()=>{
    console.log('Backend execultando ok...')
})
app.use(require('./config/routes'))