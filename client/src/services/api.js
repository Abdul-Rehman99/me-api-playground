import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL+'/api' || 'http://localhost:5000/api'

export const authAPI = {
  login: async (credentials) => {
    const response = await axios.post(`${API_BASE}/auth/login`, credentials, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  },

  register: async (userData) => {
    const response = await axios.post(`${API_BASE}/auth/register`, userData, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("api");
    return response.data;
  },

  getProfile: async (token) => {
    const response = await axios.get(`${API_BASE}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  updateProfile: async (profileData, token) => {
    const response = await axios.put(`${API_BASE}/profile`, profileData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  getProjects: async (skill, token) => {
    const url = skill
      ? `${API_BASE}/profile/projects?skill=${skill}`
      : `${API_BASE}/profile/projects`;
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  getTopSkills: async (token) => {
    const response = await axios.get(`${API_BASE}/profile/skills/top`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  search: async (query, token) => {
    const response = await axios.get(
      `${API_BASE}/profile/search?q=${encodeURIComponent(query)}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  },
};

/*
export const authAPI = {
  login: async (credentials) => {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },

  register: async (userData) => {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    console.log("api")
    return response.json();
  },

  getProfile: async (token) => {
    const response = await fetch(`${API_BASE}/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },

  updateProfile: async (profileData, token) => {
    const response = await fetch(`${API_BASE}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });
    return response.json();
  },

  getProjects: async (skill, token) => {
    const url = skill ? `${API_BASE}/profile/projects?skill=${skill}` : `${API_BASE}/profile/projects`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },

  getTopSkills: async (token) => {
    const response = await fetch(`${API_BASE}/profile/skills/top`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },

  search: async (query, token) => {
    const response = await fetch(`${API_BASE}/profile/search?q=${encodeURIComponent(query)}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },
};*/