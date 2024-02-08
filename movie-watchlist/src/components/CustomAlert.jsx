import React, { useState, useEffect } from 'react';

const CustomAlert = ({ message, type }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000); // Set timeout to hide alert after 3 seconds

    return () => clearTimeout(timer); // Cleanup function to clear timeout
  }, []);

  return (
    <div>
      {visible && (
        <div className={`alert alert-${type}`} role="alert">
          {message}
        </div>
      )}
    </div>
  );
};

export default CustomAlert;
