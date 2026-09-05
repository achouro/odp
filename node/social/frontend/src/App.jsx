import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import SigninPage from './pages/signin_page';
import SignupPage from './pages/signup_page';
import FeedPage from './pages/feed_page';
import UsersPage from './pages/users_page';
import ProfilePage from './pages/profile_page';

export default function App() {
  const [current_user, set_current_user] = useState(null);
  const [loading, set_loading] = useState(true);

  useEffect(() => {
    fetch('/api/session', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) set_current_user(data.user);
        set_loading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      {current_user && <Navbar current_user={current_user} />}
      <Routes>
        <Route path="/signin" element={!current_user ? <SigninPage set_current_user={set_current_user} /> : <Navigate to="/" />} />
        <Route path="/signup" element={!current_user ? <SignupPage /> : <Navigate to="/" />} />
        <Route path="/" element={current_user ? <FeedPage /> : <Navigate to="/signin" />} />
        <Route path="/users" element={current_user ? <UsersPage /> : <Navigate to="/signin" />} />
        <Route path="/users/:id" element={current_user ? <ProfilePage /> : <Navigate to="/signin" />} />
      </Routes>
    </BrowserRouter>
  );
}