const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/users',{useCreateIndex:true,useFindAndModify:false,useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log('Database connected..');
}).catch((error)=>{
    console.log(error);
})