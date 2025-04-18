import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/destinations';

// Get all destinations
export const getDestinations = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data.destinations;
  } catch (error) {
    console.error('Error fetching destinations:', error);
    throw error;
  }
};

// Create destination
// In your destinationService.js
export const createDestination = async (destinationData) => {
    try {
      const token = localStorage.getItem('token'); // Get token from storage
      if (!token) throw new Error('No authentication token found');
  
      const formData = new FormData();
      formData.append('name', destinationData.name);
      formData.append('description', destinationData.description || '');
      if (destinationData.image) {
        formData.append('images', destinationData.image);
      }
  
      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` // Include token
        }
      });
      return response.data.data.destination;
    } catch (error) {
      console.error('Error creating destination:', error.response?.data || error.message);
      throw error;
    }
  };

// Delete destination
export const deleteDestination = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
  } catch (error) {
    console.error('Error deleting destination:', error);
    throw error;
  }
};