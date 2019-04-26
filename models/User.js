const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({


	goodreadId: String,
	savednotetime:{type:Number, default:0}


})
//importopt is either sync or autoimport

mongoose.model('User', userSchema);