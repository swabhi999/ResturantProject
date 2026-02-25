const webToken = require("jsonwebtoken");

//function to generate token

const generateToken = (id)=>{
    try {
        return webToken.sign({id},process.env.SECRET_KEY,{expiresIn:"7d"}   )
         
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = generateToken