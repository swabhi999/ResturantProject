const testUserController =(req,res)=>{
    try {
        res.status(200)
        .send(
            {
                success:true,
                message:"test User API"
            }
        )

    } catch (error) {
        console.log(error.message);
    }
}
module.exports = {testUserController}