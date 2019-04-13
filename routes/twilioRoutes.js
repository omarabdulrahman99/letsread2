var twilio = require('twilio');







module.exports = app => {
	

	app.post('/sms', function(req,res){


		var twilio = require('twilio');
		var twiml = new twilio.TwimlResponse();
		twiml.message('The Robots are coming! Head for the hills!');
		res.writeHead(200, {'Content-Type':'text/xml'});
		res.end(twiml.toString());

	})




}