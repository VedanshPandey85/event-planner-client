import axios from "axios";

const API_URL = "http://localhost:8080/api/events";

export const getEvents = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getEventById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createEvent = async (eventData) => {
  const response = await axios.post(API_URL, eventData);
  return response.data;
};

export const updateEvent = async (id, eventData) => {
  const response = await axios.put(`${API_URL}/${id}`, eventData);
  return response.data;
};

export const deleteEvent = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
