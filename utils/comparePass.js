const bcrypt = require('bcryptjs')

//function to compare password


const comparePassword = async(password,hashPassword)=>{
    try {
        const isMatch = await bcrypt.compare(password,hashPassword)
        return isMatch
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = comparePassword