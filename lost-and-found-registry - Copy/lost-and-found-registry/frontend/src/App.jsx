import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    lostLocation: '',
    ownerContact: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!/^\d{10}$/.test(formData.ownerContact)) {
      setMessage('Contact number must be 10 digits');
      return;
    }
    try {
      await axios.post("http://localhost:8000/api/items", formData);
      setMessage('Item submitted successfully!');
      setFormData({ itemName: '', description: '', lostLocation: '', ownerContact: '' });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <div className="form-wrapper">
      <h1>Lost and Found Registry</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="itemName"
          placeholder="Item Name"
          value={formData.itemName}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          name="lostLocation"
          placeholder="Lost Location"
          value={formData.lostLocation}
          onChange={handleChange}
          required
        />
        <input
          name="ownerContact"
          placeholder="Owner Contact (10 digits)"
          value={formData.ownerContact}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default App;
