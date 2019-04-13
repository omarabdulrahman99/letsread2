export default function(state = null, action){

	switch(action.type){

		case 'fetch_user':
			
			console.log(action.payload)
			return action.payload || false;
		case 'callbacklul':
			console.log(action.payload)
			return action.payload || false;
		default:
			
			return state;
	}

}
