async function load_posts() {
  const posts = await api_request('/posts');
  const container = document.getElementById('app_content');
  if (!Array.isArray(posts)) {
    container.innerHTML = '<p>Error loading posts.</p>';
    return;
  }
  container.innerHTML = '<h2>Published Posts</h2>' + posts.map(p => `
    <div class="post">
      <h3>${p.title}</h3>
      <small>By ${p.author.username} on ${new Date(p.created_at).toLocaleDateString()}</small>
      <p>${p.content.substring(0, 150)}...</p>
      <button onclick="load_single_post(${p.id})">Read More & Comments</button>
    </div>
  `).join('');
}

async function load_single_post(id) {
  const post = await api_request(`/posts/${id}`);
  const container = document.getElementById('app_content');
  if (post.error) {
    container.innerHTML = `<p>${post.error}</p>`;
    return;
  }
  container.innerHTML = `
    <button onclick="load_posts()">← Back to Posts</button>
    <div class="post" style="margin-top: 15px;">
      <h2>${post.title}</h2>
      <small>By ${post.author.username} | Published: ${post.is_published ? 'Yes' : 'No'}</small>
      <p>${post.content}</p>
    </div>
    <h3>Comments</h3>
    <form onsubmit="handle_comment(event, ${post.id})">
      <textarea id="comment_content" placeholder="Leave a comment..." required></textarea>
      <button type="submit">Post Comment</button>
    </form>
    <div id="comments_list">
      ${post.comments.map(c => `
        <div style="border-left: 2px solid #ccc; padding-left: 10px; margin-bottom: 10px;">
          <small><b>${c.author ? c.author.username : 'Anonymous'}</b> on ${new Date(c.created_at).toLocaleString()}</small>
          <p>${c.content}</p>
          ${(current_user && (current_user.is_author || (c.author && c.author.username === current_user.username))) ? `<button onclick="delete_comment(${post.id}, ${c.id})">Delete</button>` : ''}
        </div>
      `).join('')}
    </div>
  `;
}