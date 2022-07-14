import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5005/api" });

export const getMessages = (id) => API.get(`messages/${id}`);
export const addMessage = (data)=> API.post('/messages/', data)
