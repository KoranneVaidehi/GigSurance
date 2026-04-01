import './style.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// ─── If already logged in, go to dashboard ────────────────────────────────────
const existingToken = localStorage.getItem('gs_token');
if (existingToken) {
  window.location.href = '/';
}

// ─── Render Login Page ────────────────────────────────────────────────────────
const app = document.querySelector('#app');

app.innerHTML =
  '<div id="bg-gradient"></div>' +

  '<div class="login-page">' +
    '<div class="login-brand">' +
      '<div class="login-logo">🛡️</div>' +
      '<h1>GigSurance</h1>' +
      '<p>Gig Worker Income Protection Platform</p>' +
    '</div>' +

    '<div class="glass-card login-card">' +
      '<div class="login-header">' +
        '<div class="login-icon-ring">' +
          '<span class="login-icon-inner">🔐</span>' +
        '</div>' +
        '<h2>Welcome Back</h2>' +
        '<p>Please enter your PAN ID and password </p>' +
      '</div>' +

      '<form id="login-form" novalidate>' +

        '<div class="form-group">' +
          '<label for="login-pan">PAN ID</label>' +
          '<div class="pan-input-wrap">' +
            '<input type="text" id="login-pan" name="panId"' +
              ' placeholder="e.g. ABCDE1234F"' +
              ' maxlength="10" autocomplete="off"' +
              ' style="text-transform:uppercase; letter-spacing: 2px;" required />' +
            '<span class="pan-badge">🪪</span>' +
          '</div>' +
          '<p class="field-hint">Format: 5 letters + 4 digits + 1 letter (e.g. ABCDE1234F)</p>' +
        '</div>' +

        '<div class="form-group">' +
          '<label for="login-password">Password</label>' +
          '<div class="pan-input-wrap">' +
            '<input type="password" id="login-password" name="password"' +
              ' placeholder="Enter your password"' +
              ' autocomplete="current-password" required />' +
            '<span class="pan-badge">🔑</span>' +
          '</div>' +
        '</div>' +

        '<button type="submit" class="submit-btn" id="login-btn">' +
          '<span id="login-btn-text">Login to Portal</span>' +
          '<span id="login-btn-loader" class="btn-loader" style="display:none">⏳ Verifying...</span>' +
        '</button>' +

        '<div id="login-message" class="form-message" style="display:none"></div>' +
      '</form>' +

      '<div class="login-footer">' +
        '<p>New Account? <a href="/register.html" class="text-link">Register here →</a></p>' +
      '</div>' +
    '</div>' +
  '</div>';

// ─── PAN Format auto-uppercase ────────────────────────────────────────────────
const panInput = document.getElementById('login-pan');
panInput.addEventListener('input', function () {
  this.value = this.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
});

// ─── Form Logic ───────────────────────────────────────────────────────────────
const form = document.getElementById('login-form');
const loginBtn = document.getElementById('login-btn');
const btnText = document.getElementById('login-btn-text');
const btnLoader = document.getElementById('login-btn-loader');
const msgBox = document.getElementById('login-message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const panId = panInput.value.trim().toUpperCase();
  const password = document.getElementById('login-password').value;
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  if (!panId) {
    showMsg('⚠️ PAN ID required.', 'error');
    return;
  }
  if (!panRegex.test(panId)) {
    showMsg('⚠️ Invalid PAN format. Example: ABCDE1234F', 'error');
    return;
  }
  if (!password) {
    showMsg('⚠️ Password required.', 'error');
    return;
  }

  setLoading(true);
  hideMsg();

  try {
    const res = await fetch(`${API_BASE}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ panId, password }),
    });
    const data = await res.json();

    if (res.ok && data.success) {
      // Save token and rider info
      localStorage.setItem('gs_token', data.token);
      localStorage.setItem('gs_rider', JSON.stringify(data.rider));

      showMsg('✅ ' + data.message + ' Redirecting...', 'success');
      setTimeout(() => { window.location.href = '/'; }, 1200);
    } else {
      showMsg('❌ ' + (data.message || 'Login failed. Try again.'), 'error');
    }
  } catch (err) {
    showMsg('❌ Error while connecting to server. ', 'error');
    console.error(err);
  } finally {
    setLoading(false);
  }
});

function setLoading(on) {
  loginBtn.disabled = on;
  btnText.style.display = on ? 'none' : 'inline';
  btnLoader.style.display = on ? 'inline' : 'none';
}

function showMsg(msg, type) {
  msgBox.textContent = msg;
  msgBox.className = 'form-message ' + type;
  msgBox.style.display = 'block';
}

function hideMsg() {
  msgBox.style.display = 'none';
}
