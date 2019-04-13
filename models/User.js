const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({


	goodreadId: String,
	profilePic:String,
	displayName:String,
	bio:String,
	importopt:String




})
//importopt is either sync or autoimport

mongoose.model('User', userSchema);