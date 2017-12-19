const express= require('express')
const logger = require('morgan')
const errorhandler = require ('errorhandler')
const mongodb= require('mongodb')



let app  = express()

app.use(logger('dev'))
app.use(errorhandler())

app.get('/login' , (req,res)=>{
   res.send('this is the login page')
})


app.listen(8000 , ()=>{console.log('server listening in 8000')})
