import axios from 'axios';

export const fetchUser = () => async dispatch => {


	const res = await axios.get('/api/current_user');

	dispatch({ type:'fetch_user', payload:res.data })

}



export const notebookid = (bookid) => async dispatch => {


	dispatch({type:'notebookid', payload:bookid})
}


export const calendarbookid = (bookid) => async dispatch => {


	dispatch({type:'calbookid', payload:bookid})


}