import { useState, useEffect } from 'react';
import axios from 'axios';

const useHeaderData = () => {
  const [userData, setUserData] = useState({ name: '', avatar: '', onlineStatus: 'Offline' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError('User not found.');
        setLoading(false);
        return;
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  return { userData, loading, error };
};

export default useHeaderData;
