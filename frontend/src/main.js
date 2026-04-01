import './style.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// ─── Auth Guard ───────────────────────────────────────────────────────────────
const token = localStorage.getItem('gs_token');
if (!token) {
  window.location.href = '/login.html';
}

// ─── Helper: Authenticated fetch ─────────────────────────────────────────────
async function authFetch(url) {
  const res = await fetch(url, {
    headers: { 'Authorization': 'Bearer ' + token },
  });
  if (res.status === 401) {
    localStorage.removeItem('gs_token');
    localStorage.removeItem('gs_rider');
    window.location.href = '/login.html';
  }
  return res.json();
}

// ─── Get initials from name ───────────────────────────────────────────────────
function getInitials(name) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

// ─── Subscribe to a plan ─────────────────────────────────────────────────────
async function subscribePlan(planId, premiumAmount, btnEl) {
  btnEl.disabled = true;
  btnEl.textContent = '⏳ Activating...';

  try {
    const res = await fetch(`${API_BASE}/api/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify({ planType: planId, premiumAmount }),
    });
    const data = await res.json();

    if (res.ok && data.success) {
      showToast('✅ Plan Activated!', data.message, 2500);
      setTimeout(() => window.location.reload(), 2000);
    } else {
      btnEl.disabled = false;
      btnEl.textContent = 'Subscribe';
      showToast('❌ Error', data.message || 'Try again.', 3000);
    }
  } catch {
    btnEl.disabled = false;
    btnEl.textContent = 'Subscribe';
    showToast('❌ Error', 'error while connecting server.', 3000);
  }
}

// ─── Logout ───────────────────────────────────────────────────────────────────
function logout() {
  localStorage.removeItem('gs_token');
  localStorage.removeItem('gs_rider');
  window.location.href = '/login.html';
}

// ─── Render Header (common) ───────────────────────────────────────────────────
function renderHeader(rider) {
  const initials = getInitials(rider.name);
  const location = rider.city + ' • ' + rider.platform;
  return (
    '<header>' +
    '<div class="user-profile">' +
    '<div class="avatar">' + initials + '</div>' +
    '<div class="greeting">' +
    '<h1>' + rider.name + '</h1>' +
    '<p>' + location + '</p>' +
    '<div class="store-status" id="store-status">' +
    '<div class="dot operational" id="store-dot"></div>' +
    '<span id="store-text">Dark Store: Operational</span>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="header-right">' +
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M5 12.55a11 11 0 0 1 14.08 0"></path>' +
    '<path d="M1.42 9a16 16 0 0 1 21.16 0"></path>' +
    '<path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>' +
    '<line x1="12" y1="20" x2="12.01" y2="20"></line>' +
    '</svg>' +
    // '<a href="/register.html" class="admin-link" style="margin-right:0px">📋 Register</a>' +
    // '<a href="/admin.html" class="admin-link">🌐 Admin</a>' +
    '<button class="logout-btn" id="logout-btn">🚪 Logout</button>' +
    '</div>' +
    '</header>'
  );
}

// ─── Render: NO ACTIVE PLAN → Choose Plan UI ─────────────────────────────────
function renderNoPlanUI(rider, plans) {
  const app = document.querySelector('#app');


  // const currentmonth = new Date.getMonth();
  // let seasonClass = '';

  // if (month === 11 || month <= 1) {
  //   seasonClass = 'theme-smog';
  // } else if (month >= 2 && month <= 4) {
  //   seasonClass = 'theme-heat';
  // } else if (month >= 5 && month <= 8) {
  //   seasonClass = 'theme-flood';
  // } else {
  //   seasonClass = 'theme-safe';
  // }

  // document.body.classList.remove("theme-safe");
  // document.body.classList.add(seasonClass)


  app.innerHTML =
    '<div id="background-gradient"></div>' +
    renderHeader(rider) +

    '<div class="dashboard-3col">' +
    // LEFT: Weekly Stats (still show, real-ish structure)
    '<aside class="col-left">' +
    '<div class="history-panel glass-card flex-grow">' +
    '<div class="sim-title">Weekly History & Stats</div>' +
    '<div class="stats-row">' +
    '<div class="s-col"><span>Trips</span><strong>—</strong></div>' +
    '<div class="s-col"><span>Hours</span><strong>—</strong></div>' +
    '<div class="s-col"><span>Income</span><strong>—</strong></div>' +
    '</div>' +
    '<div class="mini-chart">' +
    '<div class="mc-bar hint" style="height:25%"><span>M</span></div>' +
    '<div class="mc-bar hint" style="height:25%"><span>T</span></div>' +
    '<div class="mc-bar hint" style="height:25%"><span>W</span></div>' +
    '<div class="mc-bar hint" style="height:25%"><span>T</span></div>' +
    '<div class="mc-bar hint" style="height:25%"><span>F</span></div>' +
    '</div>' +
    '</div>' +

    '<div class="glass-card stat-item align-center flex-grow">' +
    '<span class="stat-label">On-Time Delivery Rate</span>' +
    '<span class="stat-value highlight-value" style="font-size:28px">—</span>' +
    '<p style="font-size:11px;color:var(--text-secondary);margin-top:8px">Subscribe to unlock stats</p>' +
    '</div>' +

    '<div class="glass-card stat-item align-center flex-grow">' +
    '<span class="stat-label">GPS Diagnostics</span>' +
    '<span class="stat-value" style="font-size:22px;color:var(--text-secondary)">Not Active</span>' +
    '<div class="signal-bars" style="opacity:0.3">' +
    '<div class="s-bar"></div><div class="s-bar"></div><div class="s-bar"></div><div class="s-bar"></div>' +
    '</div>' +
    '</div>' +
    '</aside>' +

    // CENTER: Choose Plan hero
    '<main class="col-center">' +
    '<div class="glass-card no-plan-hero">' +
    '<div class="no-plan-ring">' +
    '<div class="no-plan-icon">🛡️</div>' +
    '</div>' +
    '<h2 class="no-plan-title">Choose Plan</h2>' +
    '<p class="no-plan-desc">Your Daily Income is Not Protected.</p>' +
    '</div>' +

    '<div class="stats-grid">' +
    '<div class="glass-card stat-item align-center" style="justify-content:center">' +
    '<span class="stat-label">System Risk Level</span>' +
    '<span class="stat-value highlight-value" style="font-size:22px">Low / 0.5x</span>' +
    '</div>' +
    '<div class="glass-card stat-item align-center" style="justify-content:center">' +
    '<span class="stat-label">Temperature</span>' +
    '<span class="stat-value" style="font-size:22px">—°C</span>' +
    '</div>' +
    '</div>' +

    '<div class="get-started-bar">' +
    '<div class="get-started-icon">💸</div>' +
    '<div class="get-started-text">' +
    '<h4>GET started to get compensations</h4>' +
    '<p>₹0 credited. Subscribe a plan to unlock payouts.</p>' +
    '</div>' +
    '</div>' +
    '</main>' +

    // RIGHT: Plan cards
    '<aside class="col-right plan-cards-col">' +
    plans.map(function (p) {
      return (
        '<div class="plan-card" id="plan-' + p.id + '">' +
        '<div class="plan-card-label">' + p.label + '</div>' +
        '<div class="plan-card-price">₹' + p.premiumAmount + '</div>' +
        '<button class="plan-subscribe-btn" id="sub-btn-' + p.id + '"' +
        ' data-plan="' + p.id + '" data-amount="' + p.premiumAmount + '">Subscribe</button>' +
        '</div>'
      );
    }).join('') +
    '</aside>' +
    '</div>';

  // Attach subscribe handlers
  document.querySelectorAll('.plan-subscribe-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      subscribePlan(this.dataset.plan, parseInt(this.dataset.amount), this);
    });
  });

  // Logout
  document.getElementById('logout-btn').addEventListener('click', logout);
}

// ─── Render: ACTIVE PLAN → Full Dashboard ─────────────────────────────────────
function renderFullDashboard(rider, activePlan, stats) {
  const app = document.querySelector('#app');

  // ── Derive display values from real data ──────────────────────────────────
  const premium = activePlan ? activePlan.premiumAmount : 30;
  const planLabel = activePlan ? activePlan.planType.charAt(0).toUpperCase() + activePlan.planType.slice(1) : 'Safe';
  const trips = stats ? stats.trips : 0;
  const hoursRaw = stats ? stats.hours : 0;
  const hoursDisplay = hoursRaw % 1 === 0 ? hoursRaw + 'h' : Math.floor(hoursRaw) + 'h ' + Math.round((hoursRaw % 1) * 60) + 'm';
  const income = stats ? stats.income : 0;
  const onTimeRate = stats ? stats.onTimeRate : 0;
  const todayTrips = stats ? stats.tripsTowardsPremium : 0;
  const todayEarned = Math.floor((todayTrips / Math.max(trips, 1)) * (income / 7)); // rough daily slice
  const progressPct = Math.min(100, Math.floor((todayEarned / premium) * 100));
  const dailyTrips = stats && stats.dailyTrips ? stats.dailyTrips : [30, 50, 25, 70, 40];
  const maxDaily = Math.max(...dailyTrips, 1);
  const payoutAmt = stats ? stats.lastPayoutAmount : 0;
  const payoutReason = stats ? stats.lastPayoutReason : '';

  // Days remaining on plan
  let daysLeft = 7;
  if (activePlan && activePlan.expiresAt) {
    const diff = new Date(activePlan.expiresAt) - new Date();
    daysLeft = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }

  const dayLabels = ['M', 'T', 'W', 'T', 'F'];

  app.innerHTML =
    '<div id="background-gradient"></div>' +
    renderHeader(rider) +

    '<div class="dashboard-3col">' +
    // LEFT
    '<aside class="col-left">' +
    '<div class="history-panel glass-card flex-grow">' +
    '<div class="sim-title">Weekly History & Stats</div>' +
    '<div class="stats-row">' +
    '<div class="s-col"><span>Trips</span><strong>' + trips + '</strong></div>' +
    '<div class="s-col"><span>Hours</span><strong>' + hoursDisplay + '</strong></div>' +
    '<div class="s-col"><span>Income</span><strong>₹' + income.toLocaleString('en-IN') + '</strong></div>' +
    '</div>' +
    '<div class="mini-chart">' +
    dailyTrips.map(function (v, i) {
      var pct = Math.round((v / maxDaily) * 85) + '%';
      var cls = i === 4 ? 'mc-bar active-bar' : 'mc-bar hint';
      return '<div class="' + cls + '" style="height:' + pct + '"><span>' + dayLabels[i] + '</span></div>';
    }).join('') +
    '</div>' +
    '</div>' +

    '<div class="glass-card stat-item align-center flex-grow">' +
    '<span class="stat-label">On-Time Delivery Rate</span>' +
    '<span class="stat-value highlight-value" style="font-size:28px">' + onTimeRate + '%</span>' +
    '<p style="font-size:11px;color:var(--text-secondary);margin-top:8px">Top performer in ' + rider.city + '</p>' +
    '</div>' +

    '<div class="glass-card stat-item align-center flex-grow">' +
    '<span class="stat-label">GPS Diagnostics</span>' +
    '<span class="stat-value" style="font-size:22px;color:var(--safe-green)">Stable & Secure</span>' +
    '<div class="signal-bars">' +
    '<div class="s-bar"></div><div class="s-bar"></div><div class="s-bar"></div><div class="s-bar"></div>' +
    '</div>' +
    '</div>' +
    '</aside>' +

    // CENTER
    '<main class="col-center">' +
    '<div class="glass-card hero-card">' +
    '<div class="status-ring">' +
    '<div class="status-icon" id="hero-icon">🛡️</div>' +
    '</div>' +
    '<h2 class="status-title" id="hero-title">Protection Active</h2>' +
    '<p class="status-desc" id="hero-desc">Your Daily Income is Protected. You are fully covered for lost wages if weather disruptions occur today.</p>' +
    '</div>' +

    '<div class="stats-grid">' +
    '<div class="glass-card stat-item align-center" style="justify-content:center">' +
    '<span class="stat-label">System Risk Level</span>' +
    '<span class="stat-value highlight-value" id="risk-val" style="font-size:22px">Low / 0.5x</span>' +
    '</div>' +
    '<div class="glass-card stat-item align-center" style="justify-content:center">' +
    '<span class="stat-label" id="metric-label">Current Temperature</span>' +
    '<span class="stat-value" id="metric-val" style="font-size:22px">32°C</span>' +
    '</div>' +
    '</div>' +

    '<div class="recent-payout">' +
    '<div class="payout-icon">💸</div>' +
    '<div class="payout-text">' +
    '<h4>Latest Approved Payout</h4>' +
    (payoutAmt > 0
      ? '<p>₹' + payoutAmt + ' credited instantly for ' + payoutReason + '.</p>'
      : '<p>No payouts yet. Subscribe &amp; stay active to earn your first payout.</p>') +
    '</div>' +
    '</div>' +
    '</main>' +

    // RIGHT
    '<aside class="col-right">' +
    '<div class="glass-card wallet-card flex-grow">' +
    '<div style="display:flex;justify-content:space-between;align-items:flex-start">' +
    '<div class="premium-info">' +
    '<h2>' + planLabel + ' Plan — Weekly Premium</h2>' +
    '<div class="premium-amount">₹<span id="premium-val">' + premium + '</span></div>' +
    '</div>' +
    '<div><div class="premium-badge">' + daysLeft + 'D LEFT</div></div>' +
    '</div>' +
    '<div class="progress-section" style="margin-top:auto">' +
    '<div class="progress-container">' +
    '<div class="progress-fill" id="progress-bar-fill" style="width:' + progressPct + '%"></div>' +
    '</div>' +
    '<div class="progress-text">' +
    '<span>₹' + todayEarned + ' / ₹<span id="target-premium">' + premium + '</span> Today</span>' +
    '<span>(' + todayTrips + ' Trips)</span>' +
    '</div>' +
    '</div>' +
    '</div>' +

    '<div class="simulator glass-card flex-grow">' +
    '<div class="sim-title">Phase 1: Hazard Engine</div>' +
    '<div class="sim-buttons">' +
    '<button class="sim-btn active" data-theme="safe">Safe</button>' +
    '<button class="sim-btn" data-theme="heat">Extreme Heat</button>' +
    '<button class="sim-btn" data-theme="flood">Flash Flood</button>' +
    '<button class="sim-btn" data-theme="smog">Sever Smog</button>' +
    '<button class="sim-btn" data-theme="curfew">Zone Curfew</button>' +
    '</div>' +
    '</div>' +

    '<div class="glass-card push-alert" id="push-alert" style="display:none">' +
    '<h4>🔴 INSTANT EVENT DETECTED</h4>' +
    '<p id="alert-text"></p>' +
    '</div>' +
    '</aside>' +
    '</div>';

  // Attach hazard simulator logic
  initSimulator();

  // Logout
  document.getElementById('logout-btn').addEventListener('click', logout);
}

// ─── Simulator Logic (only runs when plan is active) ─────────────────────────
const themes = {
  safe: { icon: '🛡️', title: 'Protection Active', desc: 'Your Daily Income is Protected. You are fully covered for lost wages if weather disruptions occur today.', risk: 'Low / 0.5x', metricLabel: 'Temperature', metricVal: '32°C', premium: '30', storeState: 'Operational', storeClass: 'operational', alertMessage: '' },
  heat: { icon: '🔥', title: 'Heat Wave Alert', desc: '47.2°C detected. If you log off for safety, your full ₹520 income loss payout will be credited instantly.', risk: 'Critical / 2.5x', metricLabel: 'Temperature', metricVal: '47.2°C', premium: '70', storeState: 'At Risk / Slowdown', storeClass: 'paused', alertMessage: 'Zone temperature breached 45°C. GigSurance algorithm has pre-calculated ₹520 payout for all affected delivery partners.' },
  flood: { icon: '🌊', title: 'Flash Flood Warning', desc: 'Waterlogging verified in Zone 4. Operations halted. ₹480 lost-wage payout is on standby.', risk: 'High / 2.0x', metricLabel: 'Local Rainfall', metricVal: '14 mm/hr', premium: '50', storeState: 'Waterlogged Pause', storeClass: 'paused', alertMessage: 'OpenWeather reports 14mm/hr rainfall triggering flash flood protocols. ₹480 compensation approved.' },
  smog: { icon: '🌫️', title: 'Hazardous Air Quality', desc: 'AQI > 500 (Severe+). Exertion is highly dangerous. Logging off will trigger a ₹410 payout to your UPI.', risk: 'High / 1.8x', metricLabel: 'AQI Level', metricVal: '512', premium: '45', storeState: 'Paused Operations', storeClass: 'paused', alertMessage: 'Air Quality has crossed Hazardous levels. ₹410 baseline compensation unlocked.' },
  curfew: { icon: '🚧', title: 'Civil Disruption', desc: 'Zone curfew declared by local authorities. Road access blocked. Automatic payout of ₹600 initiated.', risk: 'Absolute / 3.0x', metricLabel: 'Civic Status', metricVal: 'Restricted', premium: '30', storeState: 'Locked Down', storeClass: 'paused', alertMessage: 'Google News / Civic APIs confirmed local curfew in Zone 4. Maximum ₹600 payout initiated successfully.' }
};

function initSimulator() {
  const dom = {
    body: document.body,
    heroIcon: document.getElementById('hero-icon'),
    heroTitle: document.getElementById('hero-title'),
    heroDesc: document.getElementById('hero-desc'),
    riskVal: document.getElementById('risk-val'),
    metricLabel: document.getElementById('metric-label'),
    metricVal: document.getElementById('metric-val'),
    premiumVal: document.getElementById('premium-val'),
    targetPremium: document.getElementById('target-premium'),
    storeText: document.getElementById('store-text'),
    storeDot: document.getElementById('store-dot'),
    progressBarFill: document.getElementById('progress-bar-fill'),
    simButtons: document.querySelectorAll('.sim-btn')
  };

  dom.simButtons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      dom.simButtons.forEach(function (b) { b.classList.remove('active'); });
      e.target.classList.add('active');
      setTheme(e.target.getAttribute('data-theme'), dom);
    });
  });
}

function setTheme(themeName, dom) {
  dom.body.className = 'theme-' + themeName;
  const contentEl = [dom.heroIcon, dom.heroTitle, dom.heroDesc, dom.riskVal, dom.metricVal, dom.metricLabel, dom.storeText, dom.storeDot];
  contentEl.forEach(function (el) { el.style.opacity = 0; el.style.transform = 'translateY(10px)'; });

  setTimeout(function () {
    const t = themes[themeName];
    dom.heroIcon.innerText = t.icon;
    dom.heroTitle.innerText = t.title;
    dom.heroDesc.innerText = t.desc;
    dom.riskVal.innerText = t.risk;
    dom.metricLabel.innerText = t.metricLabel;
    dom.metricVal.innerText = t.metricVal;
    dom.storeText.innerText = 'Dark Store: ' + t.storeState;
    dom.storeDot.className = 'dot ' + t.storeClass;
    dom.targetPremium.innerText = t.premium;
    if (themeName !== 'safe') showToast('🔴 INSTANT EVENT DETECTED', t.alertMessage, 4500);
    const newTarget = parseInt(t.premium);
    dom.progressBarFill.style.width = Math.min(100, Math.floor((12 / newTarget) * 100)) + '%';
    animateValue(dom.premiumVal, parseInt(dom.premiumVal.innerText), newTarget, 500);
    contentEl.forEach(function (el) { el.style.opacity = 1; el.style.transform = 'translateY(0)'; });
  }, 250);
}

function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = function (timestamp) {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) window.requestAnimationFrame(step);
  };
  window.requestAnimationFrame(step);
}

// ─── Toast Notification ───────────────────────────────────────────────────────
let activeToast = null;
let toastTimer = null;

function showToast(title, message, duration) {
  if (activeToast) { activeToast.remove(); activeToast = null; clearTimeout(toastTimer); }
  const toast = document.createElement('div');
  toast.className = 'toast-overlay';
  toast.innerHTML =
    '<div class="toast-header">' +
    '<div class="toast-pulse"></div>' +
    '<h4>' + title + '</h4>' +
    '</div>' +
    '<p>' + message + '</p>' +
    '<div class="toast-progress">' +
    '<div class="toast-progress-fill" style="animation-duration:' + duration + 'ms"></div>' +
    '</div>';
  document.body.appendChild(toast);
  activeToast = toast;
  requestAnimationFrame(function () { requestAnimationFrame(function () { toast.classList.add('toast-enter'); }); });
  toastTimer = setTimeout(function () {
    toast.classList.remove('toast-enter');
    toast.classList.add('toast-exit');
    setTimeout(function () { if (toast.parentNode) toast.remove(); activeToast = null; }, 500);
  }, duration);
}

// ─── MAIN: Fetch user data and decide which UI to show ───────────────────────
async function init() {
  try {
    // Try cached rider data for faster initial render
    const cachedRider = localStorage.getItem('gs_rider');
    if (cachedRider) {
      const r = JSON.parse(cachedRider);
      // Quick skeleton using cached name while we fetch
      document.querySelector('#app').innerHTML =
        '<div id="background-gradient"></div>' +
        '<div style="display:flex;align-items:center;justify-content:center;height:100vh;flex-direction:column;gap:16px">' +
        '<div style="font-size:48px;animation:pulse-op 1.2s infinite">🛡️</div>' +
        '<p style="color:var(--text-secondary);font-size:14px">Loading your portal, ' + r.name.split(' ')[0] + '...</p>' +
        '</div>';
    }

    // Fetch fresh data from API
    const data = await authFetch(`${API_BASE}/api/me`);
    if (!data.success) throw new Error('Could not load user data');

    const rider = data.rider;
    const activePlan = data.activePlan;

    // Also fetch plan list (for choose plan UI)
    const plansData = await authFetch(`${API_BASE}/api/plans`);
    const plans = plansData.plans || [];

    const stats = data.weeklyStats || null;

    if (activePlan) {
      // User HAS an active plan → show full dashboard with real data
      renderFullDashboard(rider, activePlan, stats);
    } else {
      // User has NO active plan → show Choose Plan UI
      renderNoPlanUI(rider, plans);
    }
  } catch (err) {
    console.error('Init error:', err);
    // Token might be invalid — clear and redirect
    localStorage.removeItem('gs_token');
    localStorage.removeItem('gs_rider');
    window.location.href = '/login.html';
  }
}

init();
