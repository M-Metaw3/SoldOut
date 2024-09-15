import axios from 'axios';

const API_BASE_URL = 'https://us-central1-soldout-99b4c.cloudfunctions.net/api'; // Replace with your Firebase Functions URL

export const getAuctions = async () => {
  const response = await axios.get(`${API_BASE_URL}/get`);
  return response.data.data;
};

export const updateCooldown = async (auctionId, cooldown) => {
  console.log(auctionId)
  console.log(cooldown)
  
  try {
    const response = await axios.patch(`${API_BASE_URL}/updateCooldown`, { auctionId, cooldown });
    return response.data;
  } catch (error) {
    console.error('Error updating cooldown:', error.response || error.message);
    throw error;
  }
};

export const removeCooldown = async (auctionId) => {
  const response = await axios.patch(`${API_BASE_URL}/removeCooldown`, { auctionId });
  return response.data;
};
