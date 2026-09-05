function update_nav() {
  const auth_nav = document.getElementById('auth_nav');
  const dashboard_btn = document.getElementById('dashboard_btn');

  if (token && current_user) {
    auth_nav.innerHTML = `<span>Logged in as <b>${current_user.username}</b></span> <button onclick="logout()">Logout</button>`;
    if (current_user.is_author) {
      dashboard_btn.classList.remove('hidden');
    } else {
      dashboard_btn.classList.add('hidden');
    }
  } else {
    auth_nav.innerHTML = `<button onclick="show_view('login')">Login</button><button onclick="show_view('signup')">Signup</button>`;
    dashboard_btn.classList.add('hidden');
  }
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  token = null;
  current_user = null;
  init();
  alert('Logged out successfully');
}

function show_view(view_name) {
  const container = document.getElementById('app_content');
  if (view_name === 'login') {
    container.innerHTML = `
      <h2>Login</h2>
      <form onsubmit="handle_login(event)">
        <label>Username</label>
        <input type="text" id="login_username" required>
        <label>Password</label>
        <input type="password" id="login_password" required>
        <button type="submit">Login</button>
      </form>
    `;
  } else if (view_name === 'signup') {
    container.innerHTML = `
      <h2>Signup</h2>
      <form onsubmit="handle_signup(event)">
        <label>Username</label>
        <input type="text" id="signup_username" required>
        <label>Password</label>
        <input type="password" id="signup_password" required>
        <label><input type="checkbox" id="signup_is_author"> Register as Author</label><br><br>
        <button type="submit">Signup</button>
      </form>
    `;
  }
}

async function handle_login(e) {
  e.preventDefault();
  const username = document.getElementById('login_username').value;
  const password = document.getElementById('login_password').value;
  const res = await api_request('/auth/login', 'POST', { username, password });
  if (res.token) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(res.user));
    token = res.token;
    current_user = res.user;
    init();
    load_posts();
  } else {
    alert(res.error || 'Login failed');
  }
}

async function handle_signup(e) {
  e.preventDefault();
  const username = document.getElementById('signup_username').value;
  const password = document.getElementById('signup_password').value;
  const is_author = document.getElementById('signup_is_author').checked;
  const res = await api_request('/auth/signup', 'POST', { username, password, is_author });
  if (res.user_id) {
    alert('Signup successful! Please log in.');
    show_view('login');
  } else {
    alert(res.error || 'Signup failed');
  }
}