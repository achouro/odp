const API_URL = 'http://localhost:3000/api';
let token = localStorage.getItem('token');
let current_user = JSON.parse(localStorage.getItem('user')) || null;

async function api_request(endpoint, method = 'GET', data = null, requires_auth = false) {
  const headers = { 'Content-Type': 'application/json' };
  if (requires_auth && token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: data ? JSON.stringify(data) : null
  });
  return response.json();
}