import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function signin_page({ set_current_user }) {
  const [email, set_email] = useState('');
  const [password, set_password] = useState('');
  const navigate = useNavigate();

  const handle_signin = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    });
    if (res.ok) {
      const data = await res.json();
      set_current_user(data.user);
      navigate('/');
    } else {
      alert('Sign in failed');
    }
  };

  return (
    <div className="container">
      <h2>Sign In</h2>
      <form onSubmit={handle_signin}>
        <input type="email" placeholder="Email" value={email} onChange={e => set_email(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => set_password(e.target.value)} required />
        <button type="submit">Sign In</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
}