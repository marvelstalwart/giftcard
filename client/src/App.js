import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [giftCards, setGiftCards] = useState([]);
  const [newGiftCard, setNewGiftCard] = useState({ code: '', balance: 0, message: '' });

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

  const handleDownloadCard = (giftCard) => {
    // Implement card download logic here
    console.log(`Downloading card with code ${giftCard.code}`);
  };

  const handleSendEmail = (giftCard) => {
    // Implement email sending logic here
    console.log(`Sending card with code ${giftCard.code} to email`);
  };

  return (
    <div>
      <h1>Gift Card App</h1>
      <ul>
        {giftCards.map(giftCard => (
          <li key={giftCard._id}>
            {`Code: ${giftCard.code}, Balance: $${giftCard.balance}, Message: ${giftCard.message || 'No message'}`}
            <button onClick={() => handleDownloadCard(giftCard)}>Download</button>
            <button onClick={() => handleSendEmail(giftCard)}>Send Email</button>
          </li>
        ))}
      </ul>
      <div>
        <h2>Create Gift Card</h2>
        <form>
          <label>
            Code:
            <input
              type="text"
              value={newGiftCard.code}
              onChange={(e) => setNewGiftCard({ ...newGiftCard, code: e.target.value })}
            />
          </label>
          <label>
            Balance:
            <input
              type="number"
              value={newGiftCard.balance}
              onChange={(e) => setNewGiftCard({ ...newGiftCard, balance: e.target.value })}
            />
          </label>
          <label>
            Message:
            <input
              type="text"
              value={newGiftCard.message}
              onChange={(e) => setNewGiftCard({ ...newGiftCard, message: e.target.value })}
            />
          </label>
          <button type="button" onClick={handleCreateGiftCard}>Create</button>
        </form>
      </div>
    </div>
  );
}

export default App;