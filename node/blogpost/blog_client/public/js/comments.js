/*
async function handle_comment(e, post_id) {
  e.preventDefault();
  const content = document.getElementById('comment_content').value;
  const res = await api_request(`/posts/${postId}/comments`, 'POST', { content });
  if (res.id) {
    load_single_post(post_id);
  } else {
    alert(res.error || 'Failed to post comment');
  }
}
*/

// Correct implementation in comments.js using api_request
async function handle_comment(e) {
    e.preventDefault();
    const form = e.target;
    const postId = form.dataset.postId;
    const contentField = form.querySelector('textarea, input[name="content"]');
    const content = contentField ? contentField.value : '';

    if (!postId) {
        console.error('Missing data-post-id attribute on the comment form.');
        return;
    }

    try {
        await api_request(`/posts/${postId}/comments`, 'POST', { content });
        form.reset();
        
        // Refresh the single post view to show the new comment
        if (typeof load_single_post === 'function') {
            load_single_post(postId);
        }
    } catch (err) {
        console.error('Failed to post comment:', err.message);
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

// Bind event listener properly
document.addEventListener('submit', (e) => {
    if (e.target.classList.contains('comment-form')) {
        handle_comment(e);
    }
});
