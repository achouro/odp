import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function profile_page() {
  const { id } = useParams();
  const [profile_data, set_profile_data] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${id}`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => set_profile_data(data));
  }, [id]);

  if (!profile_data) return <div className="container">Loading...</div>;

  const { user, posts } = profile_data;

  return (
    <div className="container">
      <div className="profile-header">
        <img src={user.profile_picture} className="avatar-lg" alt="avatar" />
        <div>
          <h2>@{user.username}</h2>
          <p>Joined: {new Date(user.created_at).toLocaleDateString()}</p>
        </div>
      </div>
      <h3>Posts by @{user.username}</h3>
      {posts.map(p => (
        <div key={p.id} className="post-card">
          <p className="post-content">{p.content}</p>
          <span className="timestamp">{new Date(p.created_at).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}