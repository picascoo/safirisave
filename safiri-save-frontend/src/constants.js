// src/constants.js

// Use Vite environment variables for backend and Socket.io
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const SOCKET_IO_URL = import.meta.env.VITE_SOCKET_URL || BACKEND_URL;
