const passport = require('passport');
const GoodReadsStrategy = require('passport-goodreads');
const mongoose = require('mongoose');
const keys = require('../config/keys');
const util = require('util');

const User = mongoose.model('User');

passport.serializeUser((user,done) => {

	//console.log('serialized');
	done(null, user.id);

})


passport.deserializeUser((id,done) => {

	//console.log('deserialized');
	User.findById(id).then(user => {

		done(null, user);

	})

})


passport.use(


	new GoodReadsStrategy(

	{

		consumerKey: keys.GOODREADS_KEY,
		consumerSecret: process.env.GOODREADS_SECRET || keys.GOODREADS_SECRET,
		callbackURL:'/auth/goodreads/callback',
		proxy:true

	},

	async (accessToken, refreshToken, profile, done) => {

		//console.log(util.inspect(profile,false,null,true) + 'hi im profile now ehehe');

		try{

			const existingUser = await User.findOne({ goodreadId: profile.id });

			if(existingUser){
				return done(null, existingUser);
			}

			const user = await new User({

				goodreadId: profile.id,


			}).save();

			done(null, user);

		}catch(err){

			done(err, null);
		}




	}


		)
	)