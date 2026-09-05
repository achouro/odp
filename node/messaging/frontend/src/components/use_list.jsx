import { useState, useEffect } from 'react';
import axios from 'axios';

export default function UseList({ onConversationStarted }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get('http://localhost:5000/api/users', { 
          withCredentials: true 
        });
        setUsers(res.data);
      } catch (err) {
        console.error('Failed to load users:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  async function startChat(recipient_id) {
    try {
      console.log('Attempting to start chat with recipient:', recipient_id);
      const res = await axios.post('http://localhost:5000/api/conversations', 
        { recipient_id: Number(recipient_id) }, 
        { withCredentials: true }
      );
      
      console.log('Conversation response:', res.data);
      const conversation_id = res.data.id || res.data.conversation_id;
      
      if (conversation_id) {
        onConversationStarted(conversation_id);
      } else {
        alert('Server returned an invalid conversation ID.');
      }
    } catch (err) {
      console.error('Error starting conversation:', err);
      alert('Failed to start chat. Check browser console for details.');
    }
  }

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Loading users...</div>;
  }

  return (
    <div style={{ padding: '10px' }}>
      <h3 style={{ fontSize: '14px', color: '#666', marginBottom: '10px', paddingLeft: '8px' }}>Start a new chat</h3>
      {users.length === 0 ? (
        <p style={{ padding: '8px', color: '#666', fontSize: '13px' }}>No other users found.</p>
      ) : (
        users.map(user => (
          <div
            key={user.id}
            onClick={() => startChat(user.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 12px',
              cursor: 'pointer',
              borderRadius: '6px',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#f0f2f5'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <img 
              src={user.profilePicture || user.profile_picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} 
              alt={user.username} 
              style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#f0f2f5' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://api.dicebear.com/7.x/identicon/svg?seed=${user.username}`;
              }}
/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontWeight: '500', color: '#333', fontSize: '14px' }}>{user.username}</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}