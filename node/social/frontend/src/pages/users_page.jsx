import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function users_page() {
  const [users, set_users] = useState([]);

  const fetch_users = async () => {
    const res = await fetch('/api/users', { credentials: 'include' });
    if (res.ok) set_users(await res.json());
  };

  useEffect(() => { fetch_users(); }, []);

  const handle_follow = async (id, is_following) => {
    const method = is_following ? 'DELETE' : 'POST';
    const endpoint = is_following ? `/api/users/${id}/unfollow` : `/api/users/${id}/follow`;
    await fetch(endpoint, { method, credentials: 'include' });
    fetch_users();
  };

  return (
    <div className="container">
      <h2>Discover Users</h2>
      {users.map(u => (
        <div key={u.id} className="user-row">
          <div className="user-info">
            <img src={u.profile_picture} className="avatar-sm" alt="avatar" />
            <Link to={`/users/${u.id}`}>@{u.username}</Link>
          </div>
          <div>
            {u.status === 'accepted' ? (
              <button onClick={() => handle_follow(u.id, true)} className="btn-unfollow">Unfollow</button>
            ) : (
              <button onClick={() => handle_follow(u.id, false)} className="btn-follow">Follow</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}