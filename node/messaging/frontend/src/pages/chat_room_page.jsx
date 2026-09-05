import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:5000', { withCredentials: true });

export default function chat_room_page({ current_user }) {
  const { id } = useParams();
  const [messages, set_messages] = useState([]);
  const [content, set_content] = useState('');
  const messages_end_ref = useRef(null);

  useEffect(() => {
    socket.emit('join_room', id);

    fetch(`/api/conversations/${id}/messages`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => set_messages(data));

    socket.on('receive_message', (msg) => {
      if (String(msg.conversation_id) === String(id)) {
        set_messages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.off('receive_message');
    };
  }, [id]);

  useEffect(() => {
    messages_end_ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send_message = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    socket.emit('send_message', {
      conversation_id: id,
      sender_id: current_user.id,
      content
    });
    set_content('');
  };

  return (
    <div className="container">
      <div className="chat-window">
        <div className="messages-list">
          {messages.map((m, idx) => {
            const is_me = m.sender_id === current_user.id;
            return (
              <div key={idx} className={`message-bubble ${is_me ? 'my-message' : 'other-message'}`}>
                <p style={{ margin: 0 }}>{m.content}</p>
              </div>
            );
          })}
          <div ref={messages_end_ref} />
        </div>
        <form onSubmit={send_message} style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Type a message..." 
            value={content} 
            onChange={e => set_content(e.target.value)} 
            required 
            style={{ margin: 0 }}
          />
          <button type="submit" style={{ width: '100px', margin: 0 }}>Send</button>
        </form>
      </div>
    </div>
  );
}