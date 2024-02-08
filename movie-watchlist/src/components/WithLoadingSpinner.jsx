// withLoadingSpinner.jsx
import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

const withLoadingSpinner = (WrappedComponent) => {
  return () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Simulate fetching data for a few milliseconds
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000); // Adjust the timeout as needed

      return () => clearTimeout(timer);
    }, []);

    return (
      <div>
        {loading ? <LoadingSpinner /> : <WrappedComponent />}
      </div>
    );
  };
};

export default withLoadingSpinner;
