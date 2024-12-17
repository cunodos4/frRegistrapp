import axios from 'axios';


export const apiUrl = axios.create({
    baseURL: 'https://api-registrapp-nx3w.onrender.com/api/',
    headers: {
      'Content-Type': 'application/json',  
    }
});
  
