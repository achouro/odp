import { useState, useEffect } from 'react';
import axios from 'axios';
import UseList from './components/use_list';
import ChatBox from './components/chat_box';
import '../App.css';

// Reusable avatar component with emoji fallback
function AvatarWithFallback({ src, alt, style }) {
  const [imgError, setImgError] = useState(false);

  if (!src || imgError) {
    return (
      <div 
        style={{ 
          ...style, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          backgroundColor: '#e4e6eb', 
          fontSize: `${(style.width ? parseInt(style.width) : 28) * 0.5}px` 
        }}
      >
        👤
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      onError={() => setImgError(true)} 
      style={style} 
    />
  );
}

export default function App() {
  const [conversations, setConversations] = useState([]);
  const [active_conversation_id, setActiveConversationId] = useState(null);
  const [show_new_chat, setShowNewChat] = useState(false);
  const [current_user, setCurrentUser] = useState(null);
  const [email_input, setEmailInput] = useState('alice@example.com');
  const [is_loading, setIsLoading] = useState(true);

  async function fetchConversations() {
    try {
      const conv_res = await axios.get('http://localhost:5000/api/conversations', { withCredentials: true });
      setConversations(conv_res.data);
    } catch (conv_err) {
      console.error('Failed to load conversations:', conv_err);
    }
  }

  useEffect(() => {
    async function initialize_session() {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/session', { withCredentials: true });
        if (res.data.authenticated) {
          setCurrentUser(res.data.user);
          await fetchConversations();
        }
      } catch (err) {
        // Not logged in
      } finally {
        setIsLoading(false);
      }
    }

    initialize_session();
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signin', 
        { email: email_input, password: 'password123' }, 
        { withCredentials: true }
      );
      setCurrentUser(res.data.user);
      await fetchConversations();
    } catch (err) {
      alert('Login failed. Check email or seed data.');
    }
  }

  async function handleLogout() {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
      setCurrentUser(null);
      setConversations([]);
      setActiveConversationId(null);
      setShowNewChat(false);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  }

  if (is_loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }

  if (!current_user) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
        <form onSubmit={handleLogin} style={{ background: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', width: '320px' }}>
          <h2>Sign In</h2>
          <p style={{ color: '#666', fontSize: '13px', marginBottom: '15px' }}>Use seeded accounts: alice@example.com, bob@example.com, or charlie@example.com</p>
          <input 
            type="email" 
            value={email_input} 
            onChange={(e) => setEmailInput(e.target.value)} 
            style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            required
          />
          <button type="submit" style={{ width: '100%', padding: '10px', background: '#0084ff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Sign In
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', padding: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
            <AvatarWithFallback 
              src={current_user.profilePicture} 
              alt="" 
              style={{ width: '28px', height: '28px', borderRadius: '50%' }} 
            />
            <span className="sidebar-username" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 'bold' }}>
              {current_user.username}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
            <button 
              onClick={() => setShowNewChat(!show_new_chat)} 
              className="btn-primary" 
              style={{ padding: '4px 8px', fontSize: '12px' }}
            >
              {show_new_chat ? 'Chats' : '+ New'}
            </button>
            <button 
              onClick={handleLogout} 
              style={{ padding: '4px 8px', fontSize: '12px', background: '#e4e6eb', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="sidebar-content" style={{ overflowY: 'auto', flex: 1 }}>
          {show_new_chat ? (
            <UseList onConversationStarted={async (id) => {
                await fetchConversations();
                setActiveConversationId(id);
                setShowNewChat(false);
                }} />
          ) : (
            <div>
              {conversations.length === 0 ? (
                <div className="empty-state-container" style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                  <p className="empty-state-text">No conversations yet.</p>
                  <p className="empty-state-subtext">Click <strong>+ New</strong> above to start messaging.</p>
                </div>
              ) : (
                conversations.map(conv => (
                  <div
                    key={conv.id}
                    onClick={() => setActiveConversationId(conv.id)}
                    className={`conv-item ${active_conversation_id === conv.id ? 'active' : ''}`}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', cursor: 'pointer', borderBottom: '1px solid #f0f2f5' }}
                  >
                    <AvatarWithFallback 
                      src={conv.recipient_picture} 
                      alt="" 
                      className="conv-avatar" 
                      style={{ width: '36px', height: '36px', borderRadius: '50%' }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p className="conv-name" style={{ margin: 0, fontWeight: '500', color: '#333' }}>{conv.recipient_username}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#fff', overflow: 'hidden' }}>
        <ChatBox conversation_id={active_conversation_id} />
      </div>
    </div>
  );
}