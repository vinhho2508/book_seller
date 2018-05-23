var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var UserSchema=new Schema({
    name: {type: String, required: true, min: 6, max: 15},
    password:{type:String,required:true,min:6,max:15},
    type:{type:Number,required:true,default:0    }
})

module.exports=mongoose.model('User',UserSchema);