const express = require("express")
const colors = require('colors')
const cors = require('cors')
//Rest object
const app = express();

//middleware
app.use(cors())

//routes
// ('/')=> https://localhost:3000/

app.get('/',(req,res)=>{
 res.send("<h1>Welcome to food server</h1>")
})


//port 
const port = 3000
app.listen(port,()=>{
    console.log("server is running on port 3000".black.bgYellow)
})