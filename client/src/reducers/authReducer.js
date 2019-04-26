export default function(state = null, action){

	switch(action.type){

		case 'fetch_user':
			
			
			return action.payload || false;
		default:
			
			return state;
	}

}
