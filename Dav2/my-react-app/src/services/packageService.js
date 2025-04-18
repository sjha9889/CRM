// src/services/packageService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/packages'; // Adjust based on your backend URL

// Get all packages
export const getPackages = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data.packages;
  } catch (error) {
    console.error('Error fetching packages:', error);
    throw error;
  }
};

// Get single package
export const getPackage = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data.data.package;
  } catch (error) {
    console.error('Error fetching package:', error);
    throw error;
  }
};

// Create package
export const createPackage = async (packageData) => {
  try {
    const response = await axios.post(API_URL, packageData);
    return response.data.data.package;
  } catch (error) {
    console.error('Error creating package:', error);
    throw error;
  }
};

// Update package
export const updatePackage = async (id, packageData) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, packageData);
    return response.data.data.package;
  } catch (error) {
    console.error('Error updating package:', error);
    throw error;
  }
};

// Delete package
export const deletePackage = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting package:', error);
    throw error;
  }
};