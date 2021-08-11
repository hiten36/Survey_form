const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');

const mySchema=mongoose.Schema({
    name:String,
    age:Number,
    tokens:[
        {
            token:String
        }
    ]
})

mySchema.methods.generateAuthToken=async function()
{
    try {
        let token=await jwt.sign({_id:this._id.toString()},process.env.SK);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
    
}

const MyUser=mongoose.model("MyUser",mySchema);

module.exports=MyUser;