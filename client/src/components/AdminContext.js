import React, { createContext, useState, useContext } from 'react';

// Create the context object with a default value
const AdminContext = createContext({
  isAdmin: false,
  toggleAdmin: () => {},
});

// Custom hook to use the admin context
export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  // Function to toggle the admin state
  const toggleAdmin = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, toggleAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};
