import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ cartItemCount }) {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 2rem', background: '#333', color: '#fff' }}>
      <h2>MyStore</h2>
      <ul style={{ display: 'flex', listStyle: 'none', gap: '1.5rem', margin: 0, alignItems: 'center' }}>
        <li><Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link></li>
        <li><Link to="/shop" style={{ color: '#fff', textDecoration: 'none' }}>Shop</Link></li>
        <li>
          <Link to="/cart" style={{ color: '#fff', textDecoration: 'none' }}>
            Cart ({cartItemCount})
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;