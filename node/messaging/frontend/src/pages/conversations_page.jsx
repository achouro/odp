import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function conversations_page() {
  const [conversations, set_conversations] = useState([]);

  useEffect(() => {
    fetch('/api/conversations', { credentials: 'include' })
      .then(res => res.json())
      .then(data => set_conversations(data));
  }, []);

  return (
    <div className="container">
      <h2>Your Conversations</h2>
      {conversations.map(c => (
        <div key={c.id} className="convo-row">
          <div className="user-info">
            <img src={c.recipient_picture} className="avatar-sm" alt="avatar" />
            <Link to={`/chat/${c.id}`}><strong>{c.recipient_username}</strong></Link>
          </div>
          <Link to={`/chat/${c.id}`}><button style={{ width: 'auto', padding: '5px 15px' }}>Open Chat</button></Link>
        </div>
      ))}
    </div>
  );
}