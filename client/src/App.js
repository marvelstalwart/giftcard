import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [giftCards, setGiftCards] = useState([]);
  const [newGiftCard, setNewGiftCard] = useState({ code: '', balance: 0 });

  useEffect(() => {
    axios.get('http://localhost:5000/api/gift-cards')
      .then(response => setGiftCards(response.data))
      .catch(error => console.error('Error fetching gift cards:', error));
  }, []);

  const handleCreateGiftCard = () => {
    axios.post('http://localhost:5000/api/gift-cards', newGiftCard)
      .then(response => setGiftCards([...giftCards, response.data]))
      .catch(error => console.error('Error creating gift card:', error));
  };

  return (
    <div>
      <h1>Gift Card App</h1>
      <ul>
        {giftCards.map(giftCard => (
          <li key={giftCard._id}>{`code: ${giftCard.code} balance: ${giftCard.balance}`}</li>
        ))}
      </ul>
      <div>
        <h2>Create Gift Card</h2>
        <input
          type="text"
          placeholder="Code"
          value={newGiftCard.code}
          onChange={(e) => setNewGiftCard({ ...newGiftCard, code: e.target.value })}
        />
        <input
          type="number"
          placeholder="Balance"
          value={newGiftCard.balance}
          onChange={(e) => setNewGiftCard({ ...newGiftCard, balance: e.target.value })}
        />
        <button onClick={handleCreateGiftCard}>Create</button>
      </div>
    </div>
  );
}

export default App;