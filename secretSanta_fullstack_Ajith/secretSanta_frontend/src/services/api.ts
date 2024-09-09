import axios from 'axios';

const API_URL = 'http://localhost:5000/assign-santas';

export const fetchSantaAssignments = async () => {
  const response = await axios.get(`${API_URL}/assign-santas`);
  return response.data;
};
