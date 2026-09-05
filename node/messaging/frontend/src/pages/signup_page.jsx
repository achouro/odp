import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function signup_page() {
  const [username, set_username] = useState('');
  const [email, set_email] = useState('');
  const [password, set_password] = useState('');
  const navigate = useNavigate();

  const handle_signup = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
      credentials: 'include'
    });
    if (res.ok) {
      navigate('/signin');
    } else {
      alert('Sign up failed');
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handle_signup}>
        <input type="text" placeholder="Username" value={username} onChange={e => set_username(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e => set_email(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => set_password(e.target.value)} required />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/signin">Sign In</Link></p>
    </div>
  );
}