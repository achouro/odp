function show_create_post_form() {
    const container = document.getElementById('app_content');
    if (!container) return;

    container.innerHTML = `
        <button onclick="load_posts()" style="margin-bottom: 15px;">← Back to Posts</button>
        <h2>Create New Post</h2>
        <form id="create-post-form" style="display: flex; flex-direction: column; gap: 10px; max-width: 600px;">
            <input type="text" id="post-title" name="title" placeholder="Post Title" required style="padding: 8px;" />
            <textarea id="post-content" name="content" placeholder="Write your post content here..." rows="8" required style="padding: 8px;"></textarea>
            <label style="display: flex; align-items: center; gap: 5px;">
                <input type="checkbox" id="post-published" name="is_published" /> Publish immediately
            </label>
            <button type="submit" style="padding: 10px; background-color: #007bff; color: white; border: none; cursor: pointer;">Save Post</button>
        </form>
    `;

    document.getElementById('create-post-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-content').value;
        const is_published = document.getElementById('post-published').checked;

        try {
            await api_request('/posts', 'POST', { title, content, is_published });
            load_posts();
        } catch (err) {
            console.error('Failed to create post:', err.message);
        }
    });
}


async function load_posts() {
  const posts = await api_request('/posts');
  const container = document.getElementById('app_content');
  if (!Array.isArray(posts)) {
    container.innerHTML = '<p>Error loading posts.</p>';
    return;
  }

  const token = localStorage.getItem('token');
  const createButtonHtml = token 
    ? `<button onclick="show_create_post_form()" style="margin-bottom: 15px; padding: 8px 12px; background-color: #28a745; color: white; border: none; cursor: pointer;">+ Add New Post</button>` 
    : '';

  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
      <h2>Published Posts</h2>
      ${createButtonHtml}
    </div>
  ` + posts.map(p => `
    <div class="post" style="margin-bottom: 20px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
      <h3>${p.title}</h3>
      <small>By ${p.author?.username || 'Anonymous'} on ${new Date(p.created_at).toLocaleDateString()}</small>
      <p style="margin: 10px 0;">${p.content.substring(0, 150)}...</p>
      <button onclick="load_single_post(${p.id})">Read More & Comments</button>
    </div>
  `).join('');
}


async function load_single_post(postId) {
    try {
        const post = await api_request(`/posts/${postId}`);
        const container = document.getElementById('app_content');
        
        if (!container) {
            console.error('Container #app_content not found.');
            return;
        }
        
        container.innerHTML = `
            <button onclick="load_posts()" style="margin-bottom: 15px;">← Back to Posts</button>
            <div class="post">
                <h2>${post.title}</h2>
                <small>By ${post.author?.username || 'Anonymous'} | Published: ${post.is_published ? 'Yes' : 'No'}</small>
                <p style="margin-top: 10px; white-space: pre-wrap;">${post.content}</p>
            </div>
            
            <hr style="margin: 20px 0;">
            <h3>Comments</h3>
            
            <form class="comment-form" data-post-id="${post.id}" style="margin-bottom: 20px;">
                <textarea name="content" placeholder="Leave a comment..." required style="width: 100%; height: 60px; margin-bottom: 5px;"></textarea>
                <button type="submit">Post Comment</button>
            </form>

            <div id="comments_list">
                ${post.comments && post.comments.length > 0 ? post.comments.map(c => `
                    <div style="border-left: 2px solid #ccc; padding-left: 10px; margin-bottom: 10px;">
                        <small><b>${c.author?.username || 'Anonymous'}</b> on ${new Date(c.created_at).toLocaleString()}</small>
                        <p style="margin: 5px 0 0 0;">${c.content}</p>
                    </div>
                `).join('') : '<p>No comments yet. Be the first!</p>'}
            </div>
        `;
    } catch (err) {
        console.error('Failed to load post details:', err);
    }
}