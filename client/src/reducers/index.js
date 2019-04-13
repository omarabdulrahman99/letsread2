import { combineReducers } from 'redux';


import authReducer from './authReducer';
import bookReducer from './bookReducer';

export default combineReducers({

	auth: authReducer,
	bknid:bookReducer,


})