const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({

	bookid: String,
	isbn:String,
	title:String,
	author:String,
	descr:String,
	service:String,
	smallimgurl:String,
	largeimgurl:String,
	shelf:[String],
	note:String,
	datesched:[{titlenum:Number,startdate:String,enddate:String}],
	chapters:[{title:String,chapnum:Number,predictions:String, quotes:String, lessons:String, general:String }],
	font:String,
	user:{type:Schema.Types.ObjectId, ref:'User'}


})



mongoose.model('Book', bookSchema);
