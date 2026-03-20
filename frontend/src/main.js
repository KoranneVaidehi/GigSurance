import './style.css';

const app = document.querySelector('#app');

app.innerHTML = 
  '<header>' +
    '<div class="user-profile">' +
      '<div class="avatar">VS</div>' +
      '<div class="greeting">' +
        '<h1>Vikram Solanki</h1>' +
        '<p>Blinkit • Delhi NCR Zone 4</p>' +
        '<div class="store-status" id="store-status">' +
          '<div class="dot operational" id="store-dot"></div>' +
          '<span id="store-text">Dark Store: Operational</span>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="connection-status">' +
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transition: var(--transition)">' +
        '<path d="M5 12.55a11 11 0 0 1 14.08 0"></path>' +
        '<path d="M1.42 9a16 16 0 0 1 21.16 0"></path>' +
        '<path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>' +
        '<line x1="12" y1="20" x2="12.01" y2="20"></line>' +
      '</svg>' +
    '</div>' +
  '</header>' +

  '<div class="dashboard-3col">' +
    '<!-- LEFT COLUMN - HISTORY & PERFORMANCE -->' +
    '<aside class="col-left">' +
      '<div class="history-panel glass-card flex-grow">' +
        '<div class="sim-title">Weekly History & Stats</div>' +
        '<div class="stats-row">' +
          '<div class="s-col"><span>Trips</span><strong>42</strong></div>' +
          '<div class="s-col"><span>Hours</span><strong>18h</strong></div>' +
          '<div class="s-col"><span>Income</span><strong>₹2,140</strong></div>' +
        '</div>' +
        '<div class="mini-chart">' +
          '<div class="mc-bar hint" style="height:40%"><span>M</span></div>' +
          '<div class="mc-bar hint" style="height:60%"><span>T</span></div>' +
          '<div class="mc-bar hint" style="height:30%"><span>W</span></div>' +
          '<div class="mc-bar hint" style="height:80%"><span>T</span></div>' +
          '<div class="mc-bar active-bar" style="height:50%"><span>F</span></div>' +
        '</div>' +
      '</div>' +

      '<div class="glass-card stat-item align-center flex-grow">' +
        '<span class="stat-label">On-Time Delivery Rate</span>' +
        '<span class="stat-value highlight-value" style="font-size: 28px;">94.8%</span>' +
        '<p style="font-size:11px; color:var(--text-secondary); margin-top:8px;">Top 15% in Zone 4 Sector</p>' +
      '</div>' +

      '<div class="glass-card stat-item align-center flex-grow">' +
        '<span class="stat-label">GPS Diagnostics</span>' +
        '<span class="stat-value" style="font-size: 22px; color: var(--safe-green);">Stable & Secure</span>' +
        '<div class="signal-bars">' +
          '<div class="s-bar"></div><div class="s-bar"></div><div class="s-bar"></div><div class="s-bar"></div>' +
        '</div>' +
      '</div>' +
    '</aside>' +

    '<!-- CENTER COLUMN - HERO & TRIGGERS -->' +
    '<main class="col-center">' +
      '<div class="glass-card hero-card">' +
        '<div class="status-ring">' +
          '<div class="status-icon" id="hero-icon">🛡️</div>' +
        '</div>' +
        '<h2 class="status-title" id="hero-title">Protection Active</h2>' +
        '<p class="status-desc" id="hero-desc">Your Daily Income is Protected. You are fully covered for lost wages if weather disruptions occur today.</p>' +
      '</div>' +

      '<div class="stats-grid">' +
        '<div class="glass-card stat-item align-center" style="justify-content: center;">' +
          '<span class="stat-label">System Risk Level</span>' +
          '<span class="stat-value highlight-value" id="risk-val" style="font-size: 22px;">Low / 0.5x</span>' +
        '</div>' +
        '<div class="glass-card stat-item align-center" style="justify-content: center;">' +
          '<span class="stat-label" id="metric-label">Current Temperature</span>' +
          '<span class="stat-value" id="metric-val" style="font-size: 22px;">32°C</span>' +
        '</div>' +
      '</div>' +

      '<div class="recent-payout">' +
        '<div class="payout-icon">💸</div>' +
        '<div class="payout-text">' +
          '<h4>Latest Approved Payout</h4>' +
          '<p>₹150 credited instantly for previous Extreme Heat disruption on Tuesday.</p>' +
        '</div>' +
      '</div>' +
    '</main>' +

    '<!-- RIGHT COLUMN - DYNAMICS & SIMULATOR -->' +
    '<aside class="col-right">' +
      '<div class="glass-card wallet-card flex-grow">' +
        '<div style="display: flex; justify-content: space-between; align-items: flex-start;">' +
          '<div class="premium-info">' +
            '<h2>Weekly Premium Goal</h2>' +
            '<div class="premium-amount">₹<span id="premium-val">30</span></div>' +
          '</div>' +
          '<div>' +
            '<div class="premium-badge">PAY-AS-YOU-EARN</div>' +
          '</div>' +
        '</div>' +
        '<div class="progress-section" style="margin-top:auto;">' +
          '<div class="progress-container">' +
            '<div class="progress-fill" id="progress-bar-fill" style="width: 40%"></div>' +
          '</div>' +
          '<div class="progress-text">' +
            '<span>₹12 / ₹<span id="target-premium">30</span> Collected</span>' +
            '<span>(12 Trips)</span>' +
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

      '<div class="glass-card push-alert" id="push-alert" style="display: none;">' +
        '<h4>🔴 INSTANT EVENT DETECTED</h4>' +
        '<p id="alert-text"></p>' +
      '</div>' +
    '</aside>' +
  '</div>';

const themes = {
  safe: {
    icon: '🛡️',
    title: 'Protection Active',
    desc: 'Your Daily Income is Protected. You are fully covered for lost wages if weather disruptions occur today.',
    risk: 'Low / 0.5x',
    metricLabel: 'Temperature',
    metricVal: '32°C',
    premium: '30',
    storeState: 'Operational',
    storeClass: 'operational',
    alertMessage: ''
  },
  heat: {
    icon: '🔥',
    title: 'Heat Wave Alert',
    desc: '47.2°C detected. If you log off for safety, your full ₹520 income loss payout will be credited instantly.',
    risk: 'Critical / 2.5x',
    metricLabel: 'Temperature',
    metricVal: '47.2°C',
    premium: '70',
    storeState: 'At Risk / Slowdown',
    storeClass: 'paused',
    alertMessage: 'Zone temperature breached 45°C. GigSurance algorithm has pre-calculated ₹520 payout for all affected delivery partners.'
  },
  flood: {
    icon: '🌊',
    title: 'Flash Flood Warning',
    desc: 'Waterlogging verified in Zone 4. Operations halted. ₹480 lost-wage payout is on standby.',
    risk: 'High / 2.0x',
    metricLabel: 'Local Rainfall',
    metricVal: '14 mm/hr',
    premium: '50',
    storeState: 'Waterlogged Pause',
    storeClass: 'paused',
    alertMessage: 'OpenWeather reports 14mm/hr rainfall triggering flash flood protocols. ₹480 compensation approved.'
  },
  smog: {
    icon: '🌫️',
    title: 'Hazardous Air Quality',
    desc: 'AQI > 500 (Severe+). Exertion is highly dangerous. Logging off will trigger a ₹410 payout to your UPI.',
    risk: 'High / 1.8x',
    metricLabel: 'AQI Level',
    metricVal: '512',
    premium: '45',
    storeState: 'Paused Operations',
    storeClass: 'paused',
    alertMessage: 'Air Quality has crossed Hazardous levels. ₹410 baseline compensation unlocked.'
  },
  curfew: {
    icon: '🚧',
    title: 'Civil Disruption',
    desc: 'Zone curfew declared by local authorities. Road access blocked. Automatic payout of ₹600 initiated.',
    risk: 'Absolute / 3.0x',
    metricLabel: 'Civic Status',
    metricVal: 'Restricted',
    premium: '30',
    storeState: 'Locked Down',
    storeClass: 'paused',
    alertMessage: 'Google News / Civic APIs confirmed local curfew in Zone 4. Maximum ₹600 payout initiated successfully.'
  }
};

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

dom.simButtons.forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    dom.simButtons.forEach(function(b) { b.classList.remove('active'); });
    e.target.classList.add('active');

    const themeName = e.target.getAttribute('data-theme');
    setTheme(themeName);
  });
});

function setTheme(themeName) {
  dom.body.className = 'theme-' + themeName;
  
  const contentEl = [
    dom.heroIcon, dom.heroTitle, dom.heroDesc, 
    dom.riskVal, dom.metricVal, dom.metricLabel,
    dom.storeText, dom.storeDot
  ];
  
  contentEl.forEach(function(el) {
    el.style.opacity = 0;
    el.style.transform = 'translateY(10px)';
  });

  setTimeout(function() {
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
    
    // Show centered toast for every non-safe trigger
    if (themeName !== 'safe') {
      showToast('🔴 INSTANT EVENT DETECTED', t.alertMessage, 4500);
    }
    
    // Calculate new progress bar width logically
    const collected = 12;
    const newTarget = parseInt(t.premium);
    const newPercentage = Math.min(100, Math.floor((collected / newTarget) * 100));
    dom.progressBarFill.style.width = newPercentage + '%';
    
    animateValue(dom.premiumVal, parseInt(dom.premiumVal.innerText), newTarget, 500);

    contentEl.forEach(function(el) {
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    });
  }, 250);
}

function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = function(timestamp) {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

let activeToast = null;
let toastTimer = null;

function showToast(title, message, duration) {
  // Remove any existing toast instantly
  if (activeToast) {
    activeToast.remove();
    activeToast = null;
    clearTimeout(toastTimer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-overlay';
  toast.innerHTML =
    '<div class="toast-header">' +
      '<div class="toast-pulse"></div>' +
      '<h4>' + title + '</h4>' +
    '</div>' +
    '<p>' + message + '</p>' +
    '<div class="toast-progress">' +
      '<div class="toast-progress-fill" style="animation-duration: ' + duration + 'ms"></div>' +
    '</div>';

  document.body.appendChild(toast);
  activeToast = toast;

  // Trigger enter animation on next frame
  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      toast.classList.add('toast-enter');
    });
  });

  // Auto-dismiss
  toastTimer = setTimeout(function() {
    toast.classList.remove('toast-enter');
    toast.classList.add('toast-exit');
    setTimeout(function() {
      if (toast.parentNode) toast.remove();
      activeToast = null;
    }, 500);
  }, duration);
}
