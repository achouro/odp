import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function users_page() {
  const [users, set_users] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/users', { credentials: 'include' })
      .then(res => res.json())
      .then(data => set_users(data));
  }, []);

  const start_chat = async (recipient_id) => {
    const res = await fetch('/api/conversations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipient_id }),
      credentials: 'include'
    });
    if (res.ok) {
      const data = await res.json();
      navigate(`/chat/${data.conversation_id}`);
    }
  };

  return (
    <div className="container">
      <h2>Start a Conversation</h2>
      {users.map(u => (
        <div key={u.id} className="user-row">
          <div className="user-info">
            <img src={u.profile_picture} className="avatar-sm" alt="avatar" />
            <span>@{u.username}</span>
          </div>
          <button onClick={() => start_chat(u.id)} style={{ width: 'auto', padding: '5px 15px' }}>Message</button>
        </div>
      ))}
    </div>
  );
}