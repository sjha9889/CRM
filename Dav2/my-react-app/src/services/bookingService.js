import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/bookings';

// Get all bookings (admin only)
export const getBookings = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data.bookings;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

// Get single booking
export const getBooking = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data.booking;
  } catch (error) {
    console.error('Error fetching booking:', error);
    throw error;
  }
};

// Delete booking (admin only)
export const deleteBooking = async (id) => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error('Error deleting booking:', error);
    throw error;
  }
};