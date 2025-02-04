const express = require('express')
const { connectToDb, getDb } = require('./db')

//init application & middleware
const app = express()

// db connection
let db

connectToDb((err) => {
if(!err) {
   app.listen(3000, () => {
       console.log('app listening on port 3000')
   })
   db =getDb()
}
})
app.listen(3000, () => {
   console.log('app listening on port 3000')
})
// routes
app.get('/books',(req, res) =>{
   res.json({mssg: "Welcome to mongodb api"})
})