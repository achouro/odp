async function load_dashboard() {
  const posts = await api_request('/posts?all=true', 'GET', null, true);
  const container = document.getElementById('app_content');
  container.innerHTML = `
    <h2>Author Dashboard</h2>
    <button onclick="show_new_post_form()">+ Create New Post</button>
    <hr>
    <h3>All Posts Management</h3>
    ${Array.isArray(posts) ? posts.map(p => `
      <div class="post">
        <h4>${p.title} (${p.is_published ? 'Published' : 'Unpublished'})</h4>
        <button onclick="toggle_publish(${p.id}, ${!p.is_published})">${p.is_published ? 'Unpublish' : 'Publish'}</button>
        <button onclick="delete_post(${p.id})">Delete</button>
      </div>
    `).join('') : '<p>Failed to load dashboard.</p>'}
  `;
}

function show_new_post_form() {
  const container = document.getElementById('app_content');
  container.innerHTML = `
    <h2>New Post</h2>
    <form onsubmit="handle_create_post(event)">
      <label>Title</label>
      <input type="text" id="post_title" required>
      <label>Content</label>
      <textarea id="post_content" rows="6" required></textarea>
      <label><input type="checkbox" id="post_is_published"> Publish immediately</label><br><br>
      <button type="submit">Save Post</button>
      <button type="button" onclick="load_dashboard()">Cancel</button>
    </form>
  `;
}

async function handle_create_post(e) {
  e.preventDefault();
  const title = document.getElementById('post_title').value;
  const content = document.getElementById('post_content').value;
  const is_published = document.getElementById('post_is_published').checked;
  const res = await api_request('/posts', 'POST', { title, content, is_published }, true);
  if (res.id) {
    load_dashboard();
  } else {
    alert(res.error || 'Failed to create post');
  }
}

async function toggle_publish(id, target_status) {
  const res = await api_request(`/posts/${id}`, 'PUT', { is_published: target_status }, true);
  if (res.id) {
    load_dashboard();
  } else {
    alert(res.error || 'Failed to update status');
  }
}

async function delete_post(id) {
  if (!confirm('Are you sure you want to delete this post?')) return;
  const res = await api_request(`/posts/${id}`, 'DELETE', null, true);
  if (res.message) {
    load_dashboard();
  } else {
    alert(res.error || 'Failed to delete post');
  }
}