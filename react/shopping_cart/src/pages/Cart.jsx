import React from 'react';

function Cart({ cart, updateQuantity, removeFromCart }) {
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return <div style={{ textAlign: 'center', padding: '4rem' }}><h2>Your Cart is Empty</h2></div>;
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Your Shopping Cart</h2>
      {cart.map((item) => (
        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd', padding: '1rem 0' }}>
          <div>
            <h4>{item.name}</h4>
            <p>${item.price.toFixed(2)} each</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button onClick={() => updateQuantity(item.id, -1)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, 1)}>+</button>
            <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: '1rem', color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
          </div>
        </div>
      ))}
      <div style={{ textAlign: 'right', marginTop: '2rem' }}>
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
        <button style={{ background: '#28a745', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' }}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;