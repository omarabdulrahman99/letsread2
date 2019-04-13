export default function(state = null, action){

	switch(action.type){


		case 'notebookid':
			return action.payload || false

		case 'calbookid':
			return action.payload || false
		default:
			return state;



	}
}