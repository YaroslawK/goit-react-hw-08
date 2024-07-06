
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.goit.global'; 

export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      
      const response = await axios.post('https://connections-api.goit.global/users/signup', userData);
       axios.defaults.headers.common.Authorization = `Bearer ${response.token}`;
      return response.data;
    } catch (error) {
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
      axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      console.log('Response data:', data); 
      return data;
    } catch (error) {
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
      axios.defaults.headers.common.Authorization = '';
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
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      const { data } = await axios.get('/users/current');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
