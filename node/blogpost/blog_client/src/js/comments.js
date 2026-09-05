async function handle_comment(e, post_id) {
  e.preventDefault();
  const content = document.getElementById('comment_content').value;
  const res = await api_request(`/posts/${post_id}/comments`, 'POST', { content }, false);
  if (res.id) {
    load_single_post(post_id);
  } else {
    alert(res.error || 'Failed to post comment');
  }
}

async function delete_comment(post_id, comment_id) {
  if (!confirm('Delete this comment?')) return;
  const res = await api_request(`/posts/${post_id}/comments/${comment_id}`, 'DELETE', null, true);
  if (res.message) {
    load_single_post(post_id);
  } else {
    alert(res.error || 'Failed to delete');
  }
}