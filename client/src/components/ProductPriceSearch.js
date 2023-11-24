import React, { useState } from 'react';
import axios from 'axios';

const ProductPriceSearch = () => {
  const [productName, setProductName] = useState('');
  const [prices, setPrices] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/getPrice?productName=${encodeURIComponent(productName)}`);

      if (response.status === 200) {
        setPrices(response.data);
        setError(null);
      } else {
        setError(`Error: ${response.statusText}`);
        setPrices([]);
      }
    } catch (error) {
      console.error('Error fetching prices:', error.message);
      setError(`Error: ${error.message}`);
      setPrices([]);
    }
  };

  return (
    <div>
      <h1>Product Price Search</h1>
      <label htmlFor="productNameInput">Product Name:</label>
      <input
        type="text"
        id="productNameInput"
        placeholder="Enter product name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p>{error}</p>}

      {prices.length > 0 && (
        <div>
          <h2>Prices:</h2>
          <ul>
            {prices.map((price, index) => (
              <li key={index}>{`Item: ${price._id}, Price: ${price.prices}`}</li>
            ))}
          </ul>
        </div>
      )}

      {prices.length === 0 && !error && <p>No prices found for the given product name.</p>}
    </div>
  );
};

export default ProductPriceSearch;
