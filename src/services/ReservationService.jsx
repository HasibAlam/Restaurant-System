import axios from 'axios';

const API_URL = 'https://swe30003-assignment3-express.vercel.app';

class ReservationService {
  async createReservation(reservationData) {
    try {
      const response = await axios.post(`${API_URL}/reservations`, {
        customer_name: reservationData.customerName,
        reservation_date: reservationData.date,
        reservation_time: reservationData.time,
        num_guests: reservationData.numberOfGuests
      });
      return response.data;
    } catch (error) {
      console.error('Error creating reservation:', error.response?.data || error.message);
      throw error;
    }
  }  

  async deleteReservation(reservationId) {
    try {
      const response = await axios.delete(`${API_URL}/reservations/${reservationId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting reservation:', error.response?.data || error.message);
      throw error;
    }
  }

  async getAllReservations() {
    try {
      const response = await axios.get(`${API_URL}/reservations`);
      return response.data;
    } catch (error) {
      console.error('Error fetching reservations:', error.response?.data || error.message);
      throw error;
    }
  }

  async updateReservation(reservationId, updatedData) {
    try {
      const response = await axios.put(`${API_URL}/reservations/${reservationId}`, updatedData);
      return response.data;
    } catch (error) {
      console.error('Error updating reservation:', error.response?.data || error.message);
      throw error;
    }
  }

  async confirmReservation(reservationId) {
    try {
      const response = await axios.put(`${API_URL}/reservations/${reservationId}/confirm`);
      return response.data;
    } catch (error) {
      console.error('Error confirming reservation:', error.response?.data || error.message);
      throw error;
    }
  }

  async cancelReservation(reservationId) {
    try {
      const response = await axios.delete(`${API_URL}/reservations/${reservationId}`);
      return response.data;
    } catch (error) {
      console.error('Error canceling reservation:', error.response?.data || error.message);
      throw error;
    }
  }
}

export default ReservationService;
