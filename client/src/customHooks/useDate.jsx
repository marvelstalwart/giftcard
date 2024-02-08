import React, { useState, useEffect } from 'react';

export function useDate() {
  const [defaultDate, setDefaultDate] = useState('');

  useEffect(() => {
    // Get today's date
    const today = new Date();
    
    // Format today's date to YYYY-MM-DD
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const dd = String(today.getDate()).padStart(2, '0');
    const todayFormatted = `${yyyy}-${mm}-${dd}`;
    
    // Set the default date state to today's date
    setDefaultDate(todayFormatted);
  }, []);

  return {
    defaultDate
  }
}


