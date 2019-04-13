if(process.env.NODE_ENV === 'production'){

	module.exports = require('./dev');

}else if(process.env.NODE_ENV === 'ci'){

	module.exports = require('./ci');
	
}else{

	module.exports = require('./dev');
}