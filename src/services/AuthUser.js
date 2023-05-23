import axios from 'axios';

const BASE_URL = 'http://43.207.162.49/api';

// Service for logging in a user
export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, formData);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Service for retrieving user details
export const getUserDetails = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error retrieving user details:', error);
    throw error;
  }
};

// Service for creating a user
export const createUser = async (formData, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/user`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Service for updating a user
export const updateUser = async (userId, userData, token) => {
  try {
    const response = await axios.put(`${BASE_URL}/user/${userId}`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Service for logging out a user
export const logoutUser = async (token) => {
  try {
    await axios.get(`${BASE_URL}/logout`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};
