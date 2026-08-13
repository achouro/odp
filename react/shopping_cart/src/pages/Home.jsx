import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <h1>Welcome to MyStore</h1>
      <p>Discover our amazing collection of products.</p>
      <Link to="/shop">
        <button style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', cursor: 'pointer' }}>
          Shop Now
        </button>
      </Link>
    </div>
  );
}

export default Home;