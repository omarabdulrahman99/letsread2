const passport = require('passport');
const axios = require('axios');
const parseString = require('xml2js').parseString;
const requireLogin = require('../middlewares/requireLogin');
const keys = require('../config/keys')
const mongoose = require('mongoose');
const util = require('util');
const User = mongoose.model('User');
const Book = mongoose.model('Book');
//const stringify = require('json-stringify-safe');

module.exports = app => {


	app.get('/api/author/:author', async (req,res) => {

	
		const authres = await axios.get(`https://www.goodreads.com/api/author_url/${req.params.author}?key=${process.env.GOODREADS_KEY || keys.GOODREADS_KEY}`);
		const authxml = authres.data;
		var jsonres = '';

		parseString(authxml, function(err, result){

			jsonres = JSON.stringify(result,null,2);
			


		})


		res.send(jsonres);

	});




	app.post('/api/shelflist',  async (req,res) => {

		
		let gdrdId = req.body.user.goodreadId;
	
		const shelfres = await axios.get(`https://www.goodreads.com/shelf/list.xml?user_id=${gdrdId}&key=${process.env.GOODREADS_KEY || keys.GOODREADS_KEY }`);
		
		
		const shelfxml = shelfres.data;
		var jsonres = '';

		parseString(shelfxml, function(err, result){

			jsonres = JSON.parse(JSON.stringify(result, null, 2));
	

		})


		res.send(jsonres);

	})





	app.get('/api/search/:queryall', async (req,res) => {

		const searchq = req.params.queryall;
		const searchres = await axios.get(`https://www.goodreads.com/search/index.xml?key=${process.env.GOODREADS_KEY || keys.GOODREADS_KEY}&q=${searchq}`);
		
		const resxml = searchres.data;

		var jsonres = '';

		parseString(resxml, function(err, result){

			jsonres = JSON.stringify(result, null, 2);
		

		})


		var jsonparsed = JSON.parse(jsonres);
		var columns = [

			{
				label: "Title",
				field:"title",
				sort:"asc",
				width:150

			},
			{
				label:"Author",
				field:"author",
				sort:"asc",
				width:250
			},
			{
				label:"Avg rating",
				field:"avg rating",
				sort:"asc",
				width:100
			},
			{
				label:"Year",
				field:"year",
				sort:"asc",
				width:40
			},
			{
				label:"Shelf",
				field:"shelf",
				width:40

			}

		];
		var rows = [];
		var booksarray = jsonparsed.GoodreadsResponse.search[0].results[0].work;

			

		if(booksarray){

			rows = booksarray.map(function(book){

				var ratings = '';
				var year = '';
				

				if(typeof book.average_rating[0] === "object" ){
					ratings = book.average_rating[0]._
				}else{
					ratings = book.average_rating[0]
				}

				
				if(typeof book.original_publication_year[0]._ == "undefined"){
					year = "n/a";
				}else{
					year = book.original_publication_year[0]._;
				}



				var obj = {

					title:book.best_book[0].title[0],
					author:book.best_book[0].author[0].name[0],
					rating:ratings,
					year:year

				}



				return obj;

			

			
			})
		

		}else{

			rows = [];
			columns = [];
		
		}


		//res.send(booksarray);
		//res.send(jsonparsed);
		res.send({rows:rows, columns:columns, booksarray:booksarray});
		
		


	})



	app.post('/api/usershelfbooks', async (req,res) => {

		const goodreadId = req.body.goodreadId;
		
		const shelfbooksxml = await axios.get(`https://www.goodreads.com/review/list/?v=2&key=${process.env.GOODREADS_KEY || keys.GOODREADS_KEY}&id=${goodreadId}`);
		var jsonres = ''

		parseString(shelfbooksxml.data, function(err, result){

			jsonres = JSON.stringify(result, null, 2);
		

		})

		var jsonparsed = JSON.parse(jsonres);
		var jsonparsedarray = jsonparsed.GoodreadsResponse.reviews[0].review;
	
	
		res.send({ usershelfbooks:jsonparsedarray })

	})



	app.post('/api/addtoshelf', async(req,res) => {

		var book_id = req.body.book_id;
		var name = req.body.name;
		var a = req.body.a;

	
		var shelfadded = await axios.post(`https://www.goodreads.com/shelf/add_to_shelf.xml?name=${name}&book_id=${book_id}&a=${a}`);



		res.send({shelfadded:shelfadded})

	})


	app.get('/api/friendrequests', async(req,res) => {


		var friendreqs = await axios.get(`https://www.goodreads.com//friend/requests.xml`);
	


	})


	//load initial info on mybooks component
	app.post('/api/mybooksload', async (req,res) => {


		const goodreadId = req.body.goodreadId;

		//get all books on all shelves
		const shelfbooksxml = await axios.get(`https://www.goodreads.com/review/list/?v=2&key=${process.env.GOODREADS_KEY || keys.GOODREADS_KEY}&id=${goodreadId}`);
		var jsonres = '';

		parseString(shelfbooksxml.data, function(err, result){

			jsonres = JSON.stringify(result, null, 2);
		

		})
		var jsonparsed = JSON.parse(jsonres);
		var jsonparsedarray = jsonparsed.GoodreadsResponse.reviews[0].review;
 

		//get list of shelves and the number of books on each shelf.
		const shelfres = await axios.get(`https://www.goodreads.com/shelf/list.xml?user_id=${req.body.goodreadId}&key=${process.env.GOODREADS_KEY || keys.GOODREADS_KEY }`);
		const shelfxml = shelfres.data;
		var shelflistjson = '';

		parseString(shelfxml, function(err, result){

			shelflistjson = JSON.parse(JSON.stringify(result, null, 2));
	

		})
		var shelflistarray = shelflistjson.GoodreadsResponse.shelves;

		res.send({books:jsonparsedarray, shelflist:shelflistarray })



	})


	//when shelves are each selected to return specified books on that shelf.
	app.post('/api/selectshelf', async (req,res) => {

		const goodreadId = req.body.goodreadId;
		//passed in a shelfname
		var shelfname = req.body.shelfname;
		const shelfbooksxml = await axios.get(`https://www.goodreads.com/review/list/?v=2&key=${process.env.GOODREADS_KEY || keys.GOODREADS_KEY}&id=${goodreadId}&shelf=${shelfname}`);
		var jsonres = '';

		parseString(shelfbooksxml.data, function(err, result){

			jsonres = JSON.stringify(result, null, 2);
		

		})

		var jsonparsed = JSON.parse(jsonres);
		var jsonparsedarray = jsonparsed.GoodreadsResponse.reviews[0].review;

		res.send({books:jsonparsedarray});



	})


	app.post('/api/profileinfo', async(req,res) => {

		var goodreadId = req.body.goodreadId;
		var profilexml = await axios.get(`https://www.goodreads.com/user/show.xml?key=${ process.env.GOODREADS_KEY || keys.GOODREADS_KEY}&id=${goodreadId}`)

		var jsonres = '';

		parseString(profilexml.data, function(err, result){

			jsonres = JSON.stringify(result,null,2);

		})

		var jsonparsed = JSON.parse(jsonres);


		var favbooksxml = await axios.get(`https://www.goodreads.com/review/list.xml?key=${process.env.GOODREADS_KEY || keys.GOODREADS_KEY}&v=2&id=${goodreadId}&shelf=read&sort=rating&order=a`)
		var favbooksjson = '';

		parseString(favbooksxml.data, function(err, result){

			favbooksjson = JSON.stringify(result,null,2);

		})

		var favbooks = JSON.parse(favbooksjson);
		//retrieve fav books. from those u retrieve author names!
		res.send({profileinfo:jsonparsed, favbooks:favbooks})



	})

	app.post('/api/profileonly', async(req,res) => {

		var goodreadId = req.body.goodreadId;
		var profilexml = await axios.get(`https://www.goodreads.com/user/show.xml?key=${ process.env.GOODREADS_KEY || keys.GOODREADS_KEY}&id=${goodreadId}`)

		var jsonres = '';

		parseString(profilexml.data, function(err, result){

			jsonres = JSON.stringify(result,null,2);

		})

		var jsonparsed = JSON.parse(jsonres);



		//retrieve fav books. from those u retrieve author names!
		res.send({profileinfo:jsonparsed})



	})





	app.post('/api/booksched', async(req,res) => {

		var user = req.body.user;
		
		var action = req.body.action;
		var bookid = req.body.bookid;


		switch(action){

			case "get":  

					Book.findOne({user:user._id, bookid:bookid}, function(err, book){


						
							res.send({dates:book})

						})
					
					break;


			case "save": 
				
					var datesched = req.body.datesched;
					Book.findOneAndUpdate({bookid:bookid, user:user._id}, {$push:{datesched:datesched}}, {upsert:true, new:true}, function(err,book){
						if(err) return;
					
						res.send({dates:book})

					});

					break;


			case "edit":
					var datesched = req.body.datesched;
					var startdate = datesched.startdate;
					var enddate = datesched.enddate;
					var tnum = datesched.titlenum;

					


	

					Book.findOneAndUpdate({bookid:bookid,user:user._id}, {$set:{'datesched.$[elem].startdate':startdate, 'datesched.$[elem].enddate':enddate}}, {new:true, arrayFilters:[{"elem.titlenum":tnum }]}, function(err, book){
						if(err){
				

						}

				
						

						res.send({datesched:book.datesched})
					})

			
					break;


			case "delete":
					var titlenum = req.body.titlenum;
					var startdate = req.body.startdate;
					var enddate = req.body.enddate;


			
					Book.findOneAndUpdate({bookid:bookid, user:user._id}, {$pull:{ datesched:{"titlenum":titlenum}}}, {new:true}, function(err, book){

						res.send({book:book})
					})

					Book.find({datesched:{titlenum:titlenum}}, function(err, book){
				
					})

					

					break;



		}





	})



	app.post('/api/postachapter', async(req,res) => {


		var bookid = req.body.bookid;
		var user = req.body.user._id;
		var chapnum = req.body.chapnum;
		var title = req.body.title;
		var chapter = {chapnum:chapnum, title:title}

		Book.findOneAndUpdate({bookid:bookid, user:user}, {$push:{chapters:chapter}}, {upsert:true, new:true}, function(err,book){
			if(err) return;
		
			res.send({book:book});

		});


	



	})



		app.post('/api/updatechapters', async(req,res) => {

		//replace entire chapter array.
		var bookid = req.body.bookid;
		var user = req.body.user._id;
		var chapters = req.body.chapters;

		Book.findOneAndUpdate({user:user,bookid:bookid}, {$set:{chapters:chapters}}, {new:true}, function(err, bookdoc){

					res.send({chapters:bookdoc.chapters})

		})




	})

	app.post('/api/deletechapters', async(req,res) => {

		var bookid = req.body.bookid;
		var user = req.body.user._id;
		var cardselects = req.body.cardselects;
		var chapnums = [];

		for(let key in cardselects){

			if(cardselects[key] == 'selected'){


			chapnums.push(key)

			}
		}


		Book.findOneAndUpdate({bookid:bookid,user:user}, {$pull:{chapters:{chapnum:{$in:chapnums}}}}, {new:true}, function(err,book){




				res.send({book:book})

		})


	})



	app.post('/api/saveChapEditor', async(req,res) => {


			var bookid = req.body.bookid;
			var user = req.body.user._id;
			var chapnum = req.body.chapnum;
			var editor = req.body.editor;



			Book.findOneAndUpdate({bookid:bookid,user:user}, {$set:{'chapters.$[elem].predictions':editor}}, {new:true, arrayFilters:[{"elem.chapnum":chapnum}]}, function(err,book){




				res.send({book:book})



			})








	})





}
