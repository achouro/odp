import { useState, useEffect } from 'react';
import axios from 'axios';

export default function chat_box({ conversation_id }) {
    
  const conversationId = conversation_id; 
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!conversationId) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/messages/${conversationId}`, { withCredentials: true });
        setMessages(res.data);
      } catch (err) {
        setError('Failed to load messages');
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [conversationId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const res = await axios.post('http://localhost:5000/api/messages', {
        conversation_id: conversationId,
        content: newMessage,
      }, { withCredentials: true });

      setMessages(prev => [...prev, res.data]);
      setNewMessage('');
    } catch (err) {
      console.error('Failed to send message', err);
    }
  };

  if (!conversationId) {
    return (
      <div className="chat-container" style={{ justifyContent: 'center', alignItems: 'center', color: '#9ca3af' }}>
        Select a conversation or start a new chat
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        Conversation #{conversationId}
      </div>

      <div className="chat-messages">
        {error && <p style={{ color: '#ef4444', fontSize: '12px' }}>{error}</p>}
        {messages.map(msg => (
          <div key={msg.id} className="message-bubble">
            <span className="message-sender">{msg.username}</span>
            <div className="message-text">
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="chat-input-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="chat-input"
        />
        <button type="submit" className="btn-primary">
          Send
        </button>
      </form>
    </div>
  );
}