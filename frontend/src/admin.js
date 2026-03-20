import './admin.css';

document.querySelector('#admin-app').innerHTML = 
'<div class="dashboard-container">' +
  '<header class="header panel">' +
    '<div class="brand">' +
      '<span class="logo-icon">🌐</span>' +
      '<h1>GigSurance <span class="badge">NOC</span></h1>' +
    '</div>' +
    '<div class="global-stats">' +
      '<div class="statbox group-blue">' +
        '<label>Active Riders</label>' +
        '<div class="value" id="active-riders-count">8,405</div>' +
      '</div>' +
      '<div class="statbox group-green">' +
        '<label>Active Policies</label>' +
        '<div class="value">14,230</div>' +
      '</div>' +
      '<div class="statbox group-blue">' +
        '<label>Premium Pool</label>' +
        '<div class="value">₹8.4M</div>' +
      '</div>' +
      '<div class="statbox group-red">' +
        '<label>Risk Zones</label>' +
        '<div class="value">1 Active</div>' +
      '</div>' +
    '</div>' +
  '</header>' +

  '<aside class="sidebar-left panel scrollable">' +
    '<h2>Live Trigger Feed</h2>' +
    '<div class="feed-list" id="trigger-feed"></div>' +
  '</aside>' +

  '<main class="main-content">' +
    '<div class="map-container panel">' +
      '<div class="map-overlay">' +
        '<h3>Delhi NCR - Risk Hub</h3>' +
        '<div class="live-indicator">LIVE</div>' +
      '</div>' +
      '<div id="map" style="width: 100%; height: 100%; border-radius: 8px; z-index: 1;"></div>' +
    '</div>' +
    
    '<div class="bottom-metrics panel">' +
      '<div class="metric-chart">' +
        '<h4>Payout Volume (Last 24h)</h4>' +
        '<div class="bar-chart">' +
          '<div class="bar" style="height: 20%"></div>' +
          '<div class="bar" style="height: 35%"></div>' +
          '<div class="bar" style="height: 10%"></div>' +
          '<div class="bar" style="height: 80%; background: var(--alert-red)"></div>' +
          '<div class="bar" style="height: 100%; background: var(--warn-yellow)"></div>' +
        '</div>' +
      '</div>' +
      '<div class="model-health">' +
        '<h4>XGBoost Engine Health</h4>' +
        '<div class="health-score">98.4% <span>Confidence</span></div>' +
        '<p class="health-sub">Model Drift detected: 0.02</p>' +
      '</div>' +
    '</div>' +
  '</main>' +

  '<aside class="sidebar-right panel scrollable">' +
    '<h2>Anomaly Queue <span class="badge red" id="anomaly-badge">2</span></h2>' +
    '<div class="anomaly-list" id="anomaly-queue">' +
      '<div class="anomaly-card active-card">' +
        '<div class="a-header">' +
          '<span class="a-type warn">Velocity Mismatch</span>' +
          '<span class="a-time">2m ago</span>' +
        '</div>' +
        '<p>Rider moved 18km in 4 mins. Possible GPS spoof.</p>' +
        '<div class="a-actions">' +
          '<button class="btn-reject act-btn">REJECT INCIDENT</button>' +
        '</div>' +
      '</div>' +

      '<div class="anomaly-card active-card">' +
        '<div class="a-header">' +
          '<span class="a-type alert">Isolation Forest</span>' +
          '<span class="a-time">14m ago</span>' +
        '</div>' +
        '<p>Payout claims pattern deviates from 99% of historical models.</p>' +
        '<div class="a-actions">' +
          '<button class="btn-review act-btn">MANUAL REVIEW</button>' +
        '</div>' +
      '</div>' +

      '<div class="anomaly-card cleared">' +
        '<div class="a-header">' +
          '<span class="a-type safe">Zone Disconnect</span>' +
          '<span class="a-time">1h ago</span>' +
        '</div>' +
        '<p>Rider pinged outside zone. AI cleared: Tower shift 3G drop.</p>' +
        '<div class="a-actions">' +
          '<button class="btn-disabled" disabled>CLEARED BY AI</button>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</aside>' +
'</div>';

const feedData = [
  { time: '11:05 AM', type: 'PAYOUT', event: '₹480 transferred to 380 riders.', color: 'green' },
  { time: '11:04 AM', type: 'SYSTEM', event: 'Identifying 400 active policies in Zone 4.', color: 'blue' },
  { time: '11:03 AM', type: 'ALERT', event: 'IMD API crossover: 47.2°C logged in West Delhi.', color: 'red' },
  { time: '10:45 AM', type: 'ALERT', event: 'IMD Red Alert Issued for Next 48Hrs.', color: 'red' },
  { time: '09:15 AM', type: 'UPDATE', event: 'Hourly weather sync completed across 12 nodes.', color: 'muted' },
  { time: '08:00 AM', type: 'INFO', event: 'Premium cycle locked for 14,230 riders.', color: 'blue' },
  { time: '07:30 AM', type: 'UPDATE', event: 'Scikit-learn isolation limits recalibrated.', color: 'muted' }
];

const feedContainer = document.getElementById('trigger-feed');
feedContainer.innerHTML = feedData.map(function(f) {
  return '<div class="feed-item">' +
    '<div class="f-time">' + f.time + '</div>' +
    '<div class="f-content">' +
      '<span class="f-badge ' + f.color + '">[' + f.type + ']</span>' +
      '<span class="f-text">' + f.event + '</span>' +
    '</div>' +
  '</div>';
}).join('');

// Initialize Leaflet Map
setTimeout(function() {
  const map = L.map('map', {
    zoomControl: false,
    attributionControl: false
  }).setView([28.6139, 77.2090], 11);

  // Deep dark map tiles specifically for NOC interfaces
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    maxZoom: 20
  }).addTo(map);

  // Add Zone 4 Red Polygon (Simulated Crisis Zone)
  const zone4Coords = [
    [28.6500, 77.1000],
    [28.6800, 77.1500],
    [28.6200, 77.2000],
    [28.5800, 77.1200]
  ];
  
  const zone4 = L.polygon(zone4Coords, {
    color: '#ef4444',
    fillColor: '#ef4444',
    fillOpacity: 0.25,
    weight: 2
  }).addTo(map);
  
  zone4.bindPopup('<b style="color: #ef4444">ZONE 4 ALERT</b><br>Temperature crossed 47.2°C threshold.').openPopup();

  // Add Safe Zone Polygon
  const zone2Coords = [
    [28.7000, 77.2200],
    [28.7500, 77.2800],
    [28.6800, 77.3000],
    [28.6500, 77.2500]
  ];
  L.polygon(zone2Coords, {
    color: '#10b981',
    fillColor: '#10b981',
    fillOpacity: 0.1,
    weight: 1
  }).addTo(map);
  
  // Add pulsing marker dots connecting active riders
  const riders = [
    [28.6300, 77.1400],
    [28.6400, 77.1700],
    [28.6000, 77.1500],
    [28.6900, 77.2600],
    [28.7100, 77.2800],
    [28.6200, 77.2200],
    [28.6600, 77.1800],
    [28.6100, 77.1100]
  ];
  
  riders.forEach(function(pos) {
    L.circleMarker(pos, {
      radius: 4,
      fillColor: '#38bdf8',
      color: '#38bdf8',
      weight: 1,
      opacity: 0.8,
      fillOpacity: 0.8
    }).addTo(map);
  });
}, 150);

// Interactive Logic (Riders Count & Anomaly Queue)
setTimeout(function() {
  // 1. Live Rider Count Fluctuation
  const riderCounter = document.getElementById('active-riders-count');
  if (riderCounter) {
    setInterval(function() {
      let currentString = riderCounter.innerText.replace(/,/g, '');
      let current = parseInt(currentString);
      let shift = Math.floor(Math.random() * 15) - 6; // Random jitter between -6 and +8
      riderCounter.innerText = (current + shift).toLocaleString();
    }, 2500);
  }

  // 2. Anomaly Queue Button Logic
  let anomalyCount = 2;
  const badge = document.getElementById('anomaly-badge');
  const activeCards = document.querySelectorAll('.anomaly-card.active-card');
  
  activeCards.forEach(function(card) {
    const btn = card.querySelector('.act-btn');
    if (btn) {
      btn.addEventListener('click', function(e) {
        // Show processing state
        const originalText = btn.innerText;
        btn.innerText = 'PROCESSING...';
        btn.style.opacity = '0.7';
        btn.disabled = true;

        // Simulate network request delay
        setTimeout(function() {
          // Grey out the card
          card.classList.remove('active-card');
          card.classList.add('cleared');
          
          // Change button to disabled cleared state
          btn.className = 'btn-disabled';
          btn.innerText = originalText.includes('REJECT') ? 'REJECTED' : 'IN REVIEW';
          
          // Update the counter
          anomalyCount--;
          if (anomalyCount === 0) {
            badge.style.display = 'none';
          } else {
            badge.innerText = anomalyCount;
          }
        }, 800);
      });
    }
  });

}, 500);
