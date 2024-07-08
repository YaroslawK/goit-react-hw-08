
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

axios.defaults.baseURL = 'https://connections-api.goit.global'; 

export const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('/users/signup', userData);
      setAuthHeader(response.data.token); 
      return response.data;
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: error.message || 'Failed to register. Please try again.',
      });
      console.error('Error response:', error.response);
      if (error.response && error.response.status === 400) {
        if (error.response.data.code === 11000) {
          return thunkAPI.rejectWithValue('Email already exists');
        }
      }
      return thunkAPI.rejectWithValue(error.response?.data || 'Registration failed');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      console.log('Sending user data:', credentials); 
      const { data } = await axios.post('/users/login', credentials);
      setAuthHeader(data.token); 
      console.log('Response data:', data); 
      return data;
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: 'Failed to log in. Please try again.',
      });
      console.error('Error response:', error.response.data); 
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await axios.post('/users/logout');
      clearAuthHeader(); 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue('No token found');
    }

    try {
      setAuthHeader(token);
      const { data } = await axios.get('/users/current');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
