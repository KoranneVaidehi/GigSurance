import './style.css';

// ─── Backend URL ──────────────────────────────────────────────────────────────
// Change this to your Azure VM / Render URL when deploying
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// ─── Render Page ──────────────────────────────────────────────────────────────
const app = document.querySelector('#app');

app.innerHTML =
  '<header>' +
    '<div class="user-profile">' +
      '<div class="avatar" style="font-size:22px">🛡️</div>' +
      '<div class="greeting">' +
        '<h1>GigSurance</h1>' +
        '<p>Gig Worker Protection Platform</p>' +
      '</div>' +
    '</div>' +
    '<div class="header-right">' +
      '<a href="/" class="admin-link">← Login</a>' +
    '</div>' +
  '</header>' +

  '<div class="register-wrapper">' +
    '<div class="glass-card register-card">' +
      '<div class="register-hero">' +
        '<div class="register-icon">📋</div>' +
        '<h2>Rider Registration</h2>' +
        '<p>Apna account banao aur har hazard se apni income protect karo</p>' +
      '</div>' +

      '<form id="register-form" novalidate>' +

        '<div class="form-row">' +
          '<div class="form-group">' +
            '<label for="reg-name">Full Name</label>' +
            '<input type="text" id="reg-name" name="name" placeholder="e.g. Vikram Solanki" required />' +
          '</div>' +
          '<div class="form-group">' +
            '<label for="reg-pan">PAN ID</label>' +
            '<input type="text" id="reg-pan" name="panId" placeholder="e.g. ABCDE1234F" maxlength="10"' +
              ' style="text-transform:uppercase;letter-spacing:1.5px" required />' +
            '<p class="field-hint">Used for unique identity verification</p>' +
          '</div>' +
        '</div>' +

        '<div class="form-row">' +
          '<div class="form-group">' +
            '<label for="reg-phone">Phone Number</label>' +
            '<input type="tel" id="reg-phone" name="phone" placeholder="10-digit mobile number" maxlength="10" required />' +
          '</div>' +
          '<div class="form-group">' +
            '<label for="reg-upi">UPI ID</label>' +
            '<input type="text" id="reg-upi" name="upi" placeholder="yourname@upi" required />' +
          '</div>' +
        '</div>' +

        '<div class="form-row">' +
          '<div class="form-group">' +
            '<label for="reg-city">City</label>' +
            '<input type="text" id="reg-city" name="city" placeholder="e.g. Delhi, Mumbai" required />' +
          '</div>' +
          '<div class="form-group">' +
            '<label for="reg-vehicle">Vehicle</label>' +
            '<select id="reg-vehicle" name="vehicle" required>' +
              '<option value="" disabled selected>Select vehicle</option>' +
              '<option value="Bike">Bike</option>' +
              '<option value="Scooter">Scooter</option>' +
              '<option value="Cycle">Cycle</option>' +
              '<option value="Other">Other</option>' +
            '</select>' +
          '</div>' +
        '</div>' +

        '<div class="form-group">' +
          '<label>Platform</label>' +
          '<div class="platform-grid">' +
            '<label class="platform-chip"><input type="radio" name="platform" value="Blinkit" /><span>Blinkit</span></label>' +
            '<label class="platform-chip"><input type="radio" name="platform" value="Swiggy" /><span>Swiggy</span></label>' +
            '<label class="platform-chip"><input type="radio" name="platform" value="Zomato" /><span>Zomato</span></label>' +
            '<label class="platform-chip"><input type="radio" name="platform" value="Zepto" /><span>Zepto</span></label>' +
            '<label class="platform-chip"><input type="radio" name="platform" value="Other" /><span>Other</span></label>' +
          '</div>' +
        '</div>' +

        '<div class="form-row">' +
          '<div class="form-group">' +
            '<label for="reg-password">Password</label>' +
            '<input type="password" id="reg-password" name="password" placeholder="Min. 6 characters" autocomplete="new-password" required />' +
          '</div>' +
          '<div class="form-group">' +
            '<label for="reg-confirm-password">Confirm Password</label>' +
            '<input type="password" id="reg-confirm-password" name="confirmPassword" placeholder="Re-enter password" autocomplete="new-password" required />' +
          '</div>' +
        '</div>' +

        '<button type="submit" class="submit-btn" id="submit-btn">' +
          '<span id="btn-text">Register Now</span>' +
          '<span id="btn-loader" class="btn-loader" style="display:none">⏳ Registering...</span>' +
        '</button>' +

        '<div id="form-message" class="form-message" style="display:none"></div>' +
      '</form>' +
    '</div>' +
  '</div>';

// ─── Form Submit Logic ────────────────────────────────────────────────────────
const form = document.getElementById('register-form');
const submitBtn = document.getElementById('submit-btn');
const btnText = document.getElementById('btn-text');
const btnLoader = document.getElementById('btn-loader');
const formMessage = document.getElementById('form-message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Gather values
  const name = document.getElementById('reg-name').value.trim();
  const panId = document.getElementById('reg-pan').value.trim().toUpperCase();
  const phone = document.getElementById('reg-phone').value.trim();
  const upi = document.getElementById('reg-upi').value.trim();
  const city = document.getElementById('reg-city').value.trim();
  const vehicle = document.getElementById('reg-vehicle').value;
  const platformInput = document.querySelector('input[name="platform"]:checked');
  const password = document.getElementById('reg-password').value;
  const confirmPassword = document.getElementById('reg-confirm-password').value;

  // Client-side validation
  if (!name || !panId || !phone || !upi || !city || !vehicle || !platformInput) {
    showMessage('every filed is required!', 'error');
    return;
  }
  if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panId)) {
    showMessage('Invalid PAN ID format. Example: ABCDE1234F', 'error');
    return;
  }
  if (!/^\d{10}$/.test(phone)) {
    showMessage('number should be 10 digits.', 'error');
    return;
  }
  if (password.length < 6) {
    showMessage('password must be 6 characters long.', 'error');
    return;
  }
  if (password !== confirmPassword) {
    showMessage('password does not match.', 'error');
    return;
  }

  const platform = platformInput.value;

  // Loading state
  setLoading(true);
  hideMessage();

  try {
    const res = await fetch(`${API_BASE}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, panId, phone, city, platform, vehicle, upi, password }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      showMessage('✅ ' + data.message + ' you can login now.', 'success');
      form.reset();
      // Redirect to login page after 3 seconds
      setTimeout(() => { window.location.href = '/login.html'; }, 3000);
    } else {
      showMessage('❌ ' + (data.message || 'something went wrong try again'), 'error');
    }
  } catch (err) {
    showMessage('❌ error while connecting server', 'error');
    console.error(err);
  } finally {
    setLoading(false);
  }
});

function setLoading(loading) {
  submitBtn.disabled = loading;
  btnText.style.display = loading ? 'none' : 'inline';
  btnLoader.style.display = loading ? 'inline' : 'none';
}

function showMessage(msg, type) {
  formMessage.textContent = msg;
  formMessage.className = 'form-message ' + type;
  formMessage.style.display = 'block';
}

function hideMessage() {
  formMessage.style.display = 'none';
}
