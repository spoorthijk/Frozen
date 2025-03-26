import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const DesertContext = createContext({ deserts: [], error: null });

export const DesertProvider = ({ children }) => {
  const [deserts, setDeserts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeserts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/deserts'); // Update endpoint as needed
        setDeserts(response.data.data);
        console.log(response.data)
      } catch (err) {
        console.log('Error fetching deserts:', err.message);
        setError('Failed to load deserts. Please try again later.');
      }
    };

    fetchDeserts();
  }, []);

  return (
    <DesertContext.Provider value={{ deserts, error }}>
      {children}
    </DesertContext.Provider>
  );
};
