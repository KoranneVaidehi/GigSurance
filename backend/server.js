require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Rider = require('./models/Rider');
const ActivePlan = require('./models/ActivePlan');
const WeeklyStats = require('./models/WeeklyStats');

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'gigsurance_secret_2026';
const SALT_ROUNDS = 10;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(express.json());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['http://localhost:5173', 'http://localhost:4173'],
  methods: ['GET', 'POST', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ─── MongoDB Connection ───────────────────────────────────────────────────────
const MONGO_URI = process.env.MONGODB_URI;
if (!MONGO_URI) {
  console.error('❌  MONGODB_URI is not defined in .env');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI, { dbName: 'user_data' })
  .then(() => console.log('✅  MongoDB Atlas connected → user_data'))
  .catch((err) => {
    console.error('❌  MongoDB connection error:', err.message);
    process.exit(1);
  });

// ─── Auth Middleware ──────────────────────────────────────────────────────────
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authentication required. Please log in.' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.rider = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Session expired. Please log in again.' });
  }
}

// ─── Routes ──────────────────────────────────────────────────────────────────

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// POST /api/register — Save new rider with hashed password
app.post('/api/register', async (req, res) => {
  try {
    const { name, phone, panId, city, platform, vehicle, upi, password } = req.body;

    if (!name || !phone || !panId || !city || !platform || !vehicle || !upi || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required, including PAN ID and password.',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.',
      });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const rider = new Rider({ name, phone, panId, city, platform, vehicle, upi, password: hashedPassword });
    await rider.save();

    res.status(201).json({
      success: true,
      message: 'Registration successful! The GigSurance team will contact you shortly.',
    });
  } catch (err) {
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern || {})[0];
      const msg = field === 'panId'
        ? 'This PAN ID is already registered.'
        : 'This phone number is already registered.';
      return res.status(409).json({ success: false, message: msg });
    }
    if (err.name === 'ValidationError') {
      const msg = Object.values(err.errors).map(e => e.message).join(' ');
      return res.status(400).json({ success: false, message: msg });
    }
    console.error('Registration error:', err.message);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});

// POST /api/login — Login via PAN ID + Password
app.post('/api/login', async (req, res) => {
  try {
    const { panId, password } = req.body;

    if (!panId || !password) {
      return res.status(400).json({ success: false, message: 'PAN ID and password are required.' });
    }

    const rider = await Rider.findOne({ panId: panId.toUpperCase().trim() });
    if (!rider) {
      return res.status(404).json({
        success: false,
        message: 'No account found with this PAN ID. Please register first.',
      });
    }

    // Verify password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, rider.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect password. Please try again.',
      });
    }

    // Generate JWT token (7 days valid)
    const token = jwt.sign(
      { id: rider._id, panId: rider.panId, name: rider.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: `Welcome back, ${rider.name}!`,
      token,
      rider: {
        name: rider.name,
        phone: rider.phone,
        panId: rider.panId,
        city: rider.city,
        platform: rider.platform,
        vehicle: rider.vehicle,
      },
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});

// GET /api/me — Get current logged-in rider data + active plan + weekly stats
app.get('/api/me', authMiddleware, async (req, res) => {
  try {
    const rider = await Rider.findById(req.rider.id).select('-__v -password');
    if (!rider) {
      return res.status(404).json({ success: false, message: 'Rider account not found.' });
    }

    // Check for active plan (not expired)
    const activePlan = await ActivePlan.findOne({
      riderId: rider._id,
      isActive: true,
      expiresAt: { $gt: new Date() },
    });

    // Fetch weekly stats if they exist
    const weeklyStats = await WeeklyStats.findOne({ riderId: rider._id });

    res.json({
      success: true,
      rider: {
        name: rider.name,
        phone: rider.phone,
        panId: rider.panId,
        city: rider.city,
        platform: rider.platform,
        vehicle: rider.vehicle,
        upi: rider.upi,
        registeredAt: rider.registeredAt,
      },
      activePlan: activePlan || null,
      weeklyStats: weeklyStats || null,
    });
  } catch (err) {
    console.error('/api/me error:', err.message);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// GET /api/plans — Available plan types with dynamic pricing
app.get('/api/plans', async (req, res) => {
  try {
    // Prices updated dynamically by risk model in future
    const plans = [
      {
        id: 'safe',
        name: 'Safe',
        label: 'Premium Available (Safe)',
        premiumAmount: 30,
        description: 'Basic income protection for low-risk days',
        coverageAmount: 300,
      },
      {
        id: 'protected',
        name: 'Protected',
        label: 'Premium Available (Protected)',
        premiumAmount: 50,
        description: 'Enhanced protection during moderate hazard conditions',
        coverageAmount: 480,
      },
      {
        id: 'shield',
        name: 'Shield',
        label: 'Premium Available (Shield)',
        premiumAmount: 70,
        description: 'Maximum coverage for extreme weather & civic disruptions',
        coverageAmount: 650,
      },
    ];
    res.json({ success: true, plans });
  } catch (err) {
    console.error('/api/plans error:', err.message);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Helper: deterministic-but-realistic stats seeded from rider ID chars
function seedStatsForRider(riderId, planType) {
  // Use last 4 chars of ID as a numeric seed for variety across riders
  const seed = parseInt(riderId.toString().slice(-4), 16) % 100;
  const tripBase = { safe: 38, protected: 45, shield: 52 }[planType] || 40;
  const trips = tripBase + (seed % 15);            // 38–67 range
  const hours = parseFloat((trips * 0.42 + (seed % 4)).toFixed(1)); // ~16–28h
  const avgEarning = { safe: 52, protected: 58, shield: 65 }[planType] || 55;
  const income = trips * avgEarning + (seed * 10); // varies per rider
  const onTimeRate = parseFloat((88 + (seed % 10) + (seed % 3) * 0.5).toFixed(1)); // 88–99%
  const tripsTowardsPremium = Math.floor(trips * 0.28); // ~28% into today's goal
  // Daily breakdown [Mon, Tue, Wed, Thu, Fri] as % heights
  const daily = [
    Math.floor(30 + (seed % 40)),
    Math.floor(40 + (seed % 35)),
    Math.floor(25 + (seed % 45)),
    Math.floor(55 + (seed % 30)),
    Math.floor(35 + (seed % 40)),
  ];
  const payoutAmounts = { safe: 150, protected: 220, shield: 310 };
  return {
    trips,
    hours,
    income,
    onTimeRate,
    tripsTowardsPremium,
    dailyTrips: daily,
    lastPayoutAmount: payoutAmounts[planType] || 150,
    lastPayoutReason: 'Extreme Heat disruption on Tuesday',
    weekStartDate: new Date(),
    updatedAt: new Date(),
  };
}

// POST /api/subscribe — Subscribe rider to a plan
app.post('/api/subscribe', authMiddleware, async (req, res) => {
  try {
    const { planType, premiumAmount } = req.body;

    if (!planType || !['safe', 'protected', 'shield'].includes(planType)) {
      return res.status(400).json({ success: false, message: 'Please select a valid plan type.' });
    }

    // Deactivate any existing active plan
    await ActivePlan.updateMany(
      { riderId: req.rider.id, isActive: true },
      { isActive: false }
    );

    // Create new active plan (7 days validity)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const newPlan = new ActivePlan({
      riderId: req.rider.id,
      planType,
      premiumAmount: premiumAmount || 0,
      startDate: new Date(),
      expiresAt,
      isActive: true,
    });

    await newPlan.save();

    // Seed / refresh weekly stats for this rider
    const statsData = seedStatsForRider(req.rider.id, planType);
    await WeeklyStats.findOneAndUpdate(
      { riderId: req.rider.id },
      { ...statsData, riderId: req.rider.id },
      { upsert: true, new: true }
    );

    const planNames = { safe: 'Safe', protected: 'Protected', shield: 'Shield' };
    res.status(201).json({
      success: true,
      message: `${planNames[planType]} plan activated successfully! You are now protected.`,
      plan: newPlan,
    });
  } catch (err) {
    console.error('/api/subscribe error:', err.message);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀  GigSurance backend running on port ${PORT}`);
  console.log(`    Health check → http://localhost:${PORT}/health`);
});
