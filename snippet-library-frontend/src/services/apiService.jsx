// src/services/apiService.js
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

// Create an Axios instance for auth routes and snippet routes
const authApi = axios.create({
  baseURL: `${API_URL}/auth`
});

const snippetApi = axios.create({
  baseURL: `${API_URL}/snippets`
});

// Interceptor to add the auth token to snippet API requests
snippetApi.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

// --- Auth Endpoints ---
export const loginUser = (credentials) => authApi.post('/login', credentials);
export const registerUser = (userData) => authApi.post('/register', userData);

// --- Snippet Endpoints ---
export const getAllSnippets = (config) => snippetApi.get('/', config);
export const createSnippet = (snippetData) => snippetApi.post('/', snippetData);

// --- Snippet ID Specific Endpoints ---
export const getSnippetById = (id) => snippetApi.get(`/${id}`); // We'll need this for ViewSnippet
export const getCommentsForSnippet = (id) => snippetApi.get(`/${id}/comments`);
export const addComment = (id, commentData) => snippetApi.post(`/${id}/comments`, commentData);
export const getVotesForSnippet = (id) => snippetApi.get(`/${id}/votes`);
export const postVote = (id, voteType) => snippetApi.post(`/${id}/vote`, { vote_type: voteType });

export const getUserProfile = () => snippetApi.get('/../users/profile'); // This endpoint fetches the user profile and their snippets