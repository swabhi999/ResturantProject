const express = require("express")
const colors = require('colors')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require("dotenv")
//Rest object
const app = express();
 
//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'));
dotenv.config();
const dbConnect = require('./config/db_connection')

//db connection
dbConnect();

//routes
// ('/')=> https://localhost:3000/

const testRouter = require('./routes/testRouter')
const authRouter = require('./routes/authRouter')

app.use('/api/v1/test',testRouter)
app.use('/api/v1/user',authRouter)


app.get('/',(req,res)=>{  
 res.send("<h1>Welcome to food server</h1>")
});


//port 
const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`the server is running on port ${PORT}`.black.bgYellow)
});