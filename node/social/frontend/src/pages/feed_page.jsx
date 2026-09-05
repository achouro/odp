import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function feed_page() {
  const [posts, set_posts] = useState([]);
  const [content, set_content] = useState('');
  const [comment_text, set_comment_text] = useState({});

  const fetch_feed = async () => {
    const res = await fetch('/api/posts', { credentials: 'include' });
    if (res.ok) set_posts(await res.json());
  };

  useEffect(() => { fetch_feed(); }, []);

  const create_post = async (e) => {
    e.preventDefault();
    await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
      credentials: 'include'
    });
    set_content('');
    fetch_feed();
  };

  const toggle_like = async (post_id) => {
    await fetch(`/api/posts/${post_id}/like`, { method: 'POST', credentials: 'include' });
    fetch_feed();
  };

  const add_comment = async (e, post_id) => {
    e.preventDefault();
    await fetch(`/api/posts/${post_id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: comment_text[post_id] }),
      credentials: 'include'
    });
    set_comment_text({ ...comment_text, [post_id]: '' });
    fetch_feed();
  };

  return (
    <div className="container">
      <h2>Create Post</h2>
      <form onSubmit={create_post}>
        <textarea placeholder="What's on your mind?" value={content} onChange={e => set_content(e.target.value)} required />
        <button type="submit">Publish Post</button>
      </form>
      <h2>Recent Posts</h2>
      {posts.map(post => (
        <div key={post.id} className="post-card">
          <div className="post-header">
            <img src={post.profile_picture} className="avatar-sm" alt="avatar" />
            <Link to={`/users/${post.author_id}`}>@{post.username}</Link>
            <span className="timestamp">{new Date(post.created_at).toLocaleString()}</span>
          </div>
          <p className="post-content">{post.content}</p>
          <button onClick={() => toggle_like(post.id)} className="btn-like">
            {post.user_liked ? '❤️ Unlike' : '🤍 Like'} ({post.like_count})
          </button>
          <div className="comments-section">
            <h4>Comments</h4>
            {post.comments.map(c => (
              <div key={c.id} className="comment">
                <img src={c.profile_picture} className="avatar-xs" alt="avatar" />
                <strong>@{c.username}:</strong> {c.content}
              </div>
            ))}
            <form onSubmit={(e) => add_comment(e, post.id)}>
              <input 
                type="text" 
                placeholder="Write a comment..." 
                value={comment_text[post.id] || ''} 
                onChange={e => set_comment_text({ ...comment_text, [post.id]: e.target.value })} 
                required 
              />
              <button type="submit">Post</button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}