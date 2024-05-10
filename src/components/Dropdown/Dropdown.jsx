import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dropdown.css';

const Dropdown = () => {
  const [options, setOptions] = useState([]);
  const [newOption, setNewOption] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/options');
      setOptions(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const addOption = async () => {
    try {
      setLoading(true);
      await axios.post('http://localhost:3000/options', { name: newOption });
      setNewOption('');
      fetchOptions();
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setNewOption(e.target.value);
  };

  return (
    <div id='background'>
      <h1>Dropdown Example</h1>
          <div className="dropdown-container">
      <select>
        {loading ? (
          <option>Loading...</option>
        ) : error ? (
          <option>Error: {error}</option>
        ) : (
          options.map((option) => (
            <option key={option.id}>{option.name}</option>
          ))
        )}
      </select>
      <div className="form-container">
        <input
          type="text"
          value={newOption}
          onChange={handleInputChange}
          placeholder="Enter new option"
        />
        <button onClick={addOption}>Add</button>
      </div>
    </div>
    </div>
  );
};

export default Dropdown;
