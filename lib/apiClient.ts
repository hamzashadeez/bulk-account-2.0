// lib/apiClient.ts

import { create } from 'apisauce';
import { getAuthToken } from './authUtils'; // Import your token retrieval function

// Determine the base URL based on the environment
const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api/'
    : process.env.NEXT_PUBLIC_API_BASE_URL;

if (!baseURL) {
  console.error('API base URL is not defined');
}

// define the api
const apiClient = create({
  baseURL: "http://localhost:5000/",
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});

// apiClient.addAsyncRequestTransform(async (request) => {
//   const token = getAuthToken();
//   if (token) {
//     request.headers = {
//       ...request.headers,
//       Authorization: `Bearer ${token}`,
//     };
//   }
// });

export default apiClient;