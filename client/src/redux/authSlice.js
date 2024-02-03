import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import history from '../history';
import { toast } from 'react-toastify';

const initialUser = localStorage.getItem('auth')
	? JSON.parse(localStorage.getItem('auth'))
	: null;

const initialState = {
	isLoading: false,
	currentUser: initialUser,
	error: null,
};
export const authSlice = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		loginSuccess: (state, action) => {
			state.currentUser = action.payload;
			state.isLoading = false;
		},
		loginFailure: (state, action) => {
			state.error = action.payload;
		},
		registerSuccess: (state, action) => {
			state.currentUser = action.payload;
			state.isLoading = false;
		},
		registerFailure: (state, action) => {
			state.error = action.payload;
		},
		logoutSuccess: (state) => {
			state.currentUser = null;
		},
	},
});

export const {
	loginFailure,
	loginSuccess,
	registerFailure,
	registerSuccess,
	logoutSuccess,
   } = authSlice.actions;

export default authSlice.reducer;

export const register = (user) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'content-type': 'application/json',
			},
		};

		const response = await axios.post(
			'http://localhost:4000/auth/register',
			user,
			config
		);

		if (response) {
			dispatch(registerSuccess(response.data));
			toast.success('register successfull');
			history.push('/LOGIN');
			window.location.reload();
			window.location.replace();
			
		} else {
			dispatch(registerFailure());
			toast.error('registration failed');
		}
	} catch (error) {
		console.log(error);
		dispatch(registerFailure());
	}
};

export const LOGIN = (user) => async (dispatch) => {
	console.log(user);
	try {
		const config = {
			headers: {
				'content-type': 'application/json',
			},
		};
		const response = await axios.post(
			'http://localhost:4000/auth/LOGIN',
			user,
			config
		);
		if (response) {
			localStorage.setItem('auth', JSON.stringify(response.data));
			dispatch(loginSuccess(response.data));

			//history.push('/Dashboard');
			toast.success('login successfull');

			window.location.reload();
		} else {
			dispatch(loginFailure());
			toast.error('login failed');
		}
	} catch (error) {
		dispatch(loginFailure());
	}
};