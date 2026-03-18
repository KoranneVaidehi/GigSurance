# GigSurance

### AI-Powered Parametric Insurance for Gig Workers

**Guidewire DEVTrails 2026 — Phase 1 Submission**

[![Platform](https://img.shields.io/badge/Platform-Progressive%20Web%20App-blue?style=flat-square)](https://github.com)
[![Backend](https://img.shields.io/badge/Backend-Python%20%7C%20FastAPI-green?style=flat-square)](https://github.com)
[![AI](https://img.shields.io/badge/AI-XGBoost%20%7C%20Scikit--learn-orange?style=flat-square)](https://github.com)
[![Status](https://img.shields.io/badge/Phase%201-Complete-brightgreen?style=flat-square)](https://github.com)

---

> Vikram logged onto Blinkit at 9 AM ready for a full day's work in Delhi.
> By 10 AM, the AQI crossed 430. He shut the app and went back inside.
> He lost Rs. 580 that day — with no way to recover it.
>
> **GigSurance changes that.**

---

[Persona](#persona) · [Problem](#the-problem) · [Solution](#the-solution) · [Scenario](#persona-based-scenario) · [Workflow](#application-workflow) · [Premium Model](#weekly-premium-model) · [Triggers](#parametric-trigger-system) · [Platform Choice](#platform-choice) · [AI and ML](#ai-and-ml-integration) · [Architecture](#system-architecture) · [Tech Stack](#tech-stack) · [Roadmap](#roadmap)

---

## Persona

> **Chosen Segment: Grocery and Quick Commerce — Zepto / Blinkit**

Meet **Vikram Chauhan** — 24, Delhi NCR, full-time Blinkit delivery partner.

| Attribute | Detail |
|---|---|
| Platform | Blinkit (primary), Zepto (secondary) |
| Work Model | Per-delivery earnings — no salary, no guaranteed hours |
| Work Schedule | 7 days a week, 9 to 11 hours per day |
| Average Weekly Earnings | Rs. 3,500 to Rs. 4,500 |
| Device | Budget Android — Redmi Note / Realme C-series |
| Connectivity | 4G central Delhi, drops to 2G–3G in outer zones |
| Insurance Status | None — never held any income protection product |
| Primary Risk | Delhi winter smog — AQI 400+ for up to 20 consecutive days, Nov–Feb |

**Why Q-commerce riders are uniquely exposed:**
Food delivery riders slow down in bad conditions and earn less. Vikram cannot — Blinkit's 10-minute SLA means any disruption causes a complete logoff. Income does not reduce. It hits **zero**. During peak smog season, he loses 4 to 6 working days per month, borrows from family, and starts over.

**GigSurance is built specifically for Vikram.**

---

## The Problem

India's Q-commerce sector — Blinkit, Zepto, Swiggy Instamart — runs entirely on independent contractors with zero employment protections.

| Disruption | Real Examples | Impact on Vikram |
|---|---|---|
| Severe Air Quality | Delhi AQI 400–500+, Nov–Feb smog season | Cannot ride safely. Logs off. Zero income. |
| Monsoon Rain | Flash flooding, waterlogged roads, July–Sep | Roads impassable. Blinkit zones go dark. |
| Extreme Heat | 45°C+ in May–June | Sustained outdoor exertion becomes dangerous |
| Civil Disruptions | Bandhs, curfews — frequent in Delhi NCR | Delivery zones blocked entirely |

One disrupted day costs Vikram Rs. 400 to Rs. 650. During smog season — Rs. 3,000 to Rs. 5,000 lost in a single month, year after year. Traditional insurance covers none of this.

**This is a predictable, recurring, solvable problem. GigSurance solves it.**

---

## The Solution

GigSurance is a **parametric insurance platform** — monitors real-world conditions continuously and pays out automatically when a verified disruption crosses a defined threshold.

**No forms. No calls. No waiting.**

| Traditional Insurance | GigSurance |
|---|---|
| Manual claim after loss | Auto-detection — no action needed |
| Processing takes days or weeks | Payout in under 5 minutes |
| Flat premiums, no personal context | AI-calculated weekly premium per worker |
| Not built for income loss | Built exclusively for income protection |
| Single claim per event | Independent payout every qualifying day |

Weekly premiums start at **Rs. 30** — rising to Rs. 70 during Vikram's smog season. Seasonally adjusted, not annually fixed.

---

## Persona-Based Scenario

**Thursday, 9:45 AM. Lajpat Nagar, Delhi. November. The smog is back.**

Vikram completed two deliveries before the air became unworkable. He logged off Blinkit and went inside. Here is what GigSurance did — without him doing anything:

```
  09:30 AM — CPCB AQI API: 441 AQI reported in Lajpat Nagar, Delhi
  09:31 AM — Trigger engine flags breach. Vikram's active policy identified.
  09:32 AM — GPS confirms: Vikram was present in zone from 8:00–9:30 AM
  09:33 AM — AI estimates loss: Rs. 540 (Rs. 60/hr × 9 remaining hours)
  09:34 AM — Fraud check passes: GPS clean, velocity normal, no anomalies
  09:35 AM — Razorpay transfer initiated to Vikram's UPI account
  09:44 AM — SMS: "GigSurance credited Rs. 540 for AQI disruption. Stay safe."
```

He made a sensible decision about his health.
**GigSurance made sure it did not cost him his income.**

---

## Application Workflow

```
  [ 1 ] ONBOARDING
        Signs up in under 3 minutes.
        Inputs: zone, platform (Blinkit / Zepto), daily hours.
                         |
                         v
  [ 2 ] AI RISK PROFILING
        Scored on zone AQI history, rainfall, season, and platform SLA.
        Delhi NCR zones flagged with elevated smog coefficient Nov–Feb.
        Output: risk tier (Low / Medium / High) + weekly premium.
                         |
                         v
  [ 3 ] WEEKLY SUBSCRIPTION
        Rs. 30 / Rs. 50 / Rs. 70 per week — auto-deducted via UPI.
        Premium recalculates every week with fresh risk data.
                         |
                         v
  [ 4 ] CONTINUOUS MONITORING
        CPCB AQI, OpenWeather, and News APIs polled every 15 minutes
        across all active Q-commerce zones — around the clock.
                         |
                         v
  [ 5 ] TRIGGER DETECTION
        Threshold crossed → affected policy holders identified instantly.
        Multi-day smog = independent payout for each qualifying day.
                         |
                         v
  [ 6 ] LOSS ESTIMATION + FRAUD CHECK
        AI estimates income lost. GPS, velocity, and anomaly checks
        run in parallel. Flagged cases go to manual review.
                         |
                         v
  [ 7 ] INSTANT PAYOUT + DASHBOARD UPDATE
        UPI transfer in under 5 minutes.
        App shows event log, payout, and updated coverage status.
```

---

## Weekly Premium Model

Vikram's premium rises during smog season and falls in cleaner months — recalculated every week, not annually.

**Formula:**

```
  Weekly Premium (WP)  =  (B × R)  +  (E × P)

    B  =  Base cost         Rs. 20 fixed floor
    R  =  Risk score        0.5 to 2.5 — zone, season, hours, platform SLA
    E  =  Expected loss     Avg income lost per historical disruption event
    P  =  Probability       Likelihood of a qualifying trigger this week
```

**Risk Score inputs for a Delhi Q-commerce rider:**
- Historical AQI breach frequency for the zone (24 months, CPCB data)
- Month and season — Nov–Feb carries an elevated Delhi smog coefficient
- Rainfall and flood frequency for the zone
- Worker's daily hours — 9 to 11 hours means maximum exposure
- Platform SLA — Blinkit / Zepto 10-minute window causes full logoff on any disruption

**Vikram's seasonal premium across the year:**

| Months | Risk Context | Weekly Premium |
|---|---|---|
| March – May | Pre-summer, low disruption | Rs. 30 |
| June – September | Monsoon season | Rs. 50 |
| October | Post-monsoon transition | Rs. 30 |
| November – February | Peak Delhi smog season | Rs. 70 |

---

## Parametric Trigger System

> No human in the loop. Verified by independent third-party APIs. Condition met — payout fires.

| Trigger | Threshold | Data Source | Justification |
|---|---|---|---|
| Air Quality | AQI > 400 | CPCB / IQAir | India "Severe" band — CPCB advises against all outdoor physical activity. Primary trigger for Delhi NCR. |
| Rainfall | > 12 mm/hr sustained | OpenWeather | IMD heavy rain — Delhi roads flood, Q-commerce zones collapse |
| Extreme Heat | > 45°C | OpenWeather | IMD red alert — outdoor exertion 9+ hours is medically dangerous |
| Civil Disruption | Bandh / curfew declared | Google News | Zones legally or physically inaccessible — frequent in Delhi |

**Multi-day smog:** AQI checked every 6 hours. Each qualifying day fires an independent payout. Vikram takes no action between days.

---

## Platform Choice — Why PWA

> Decision is driven by Vikram's device reality, not technical convenience.

| Factor | Native App | PWA — GigSurance's Choice |
|---|---|---|
| Installation | Play Store download required | Opens directly in browser |
| Storage footprint | 40–80 MB | Near zero |
| Works on budget Redmi | Inconsistent | Yes — browser-based, OS-agnostic |
| Works on 2G / 3G | Slow load times | Lightweight, loads fast |
| Background GPS | Reliable | Limited — handled server-side at trigger time |
| Time to first user | Weeks (store review) | Immediate |

**GPS limitation handled architecturally** — Vikram's last known GPS ping at trigger time is cross-checked against the disrupted zone. Zone-level accuracy is sufficient without background tracking.

**Future:** Native Android app for push AQI alerts, background tracking, and deeper offline support once the product is validated.

---

## AI and ML Integration

AI is embedded at three critical points — not bolted on as an afterthought.

### 1. Premium Calculation — XGBoost (Gradient Boosted Trees)

| Input | Detail |
|---|---|
| Zone AQI history | 24 months of CPCB data per ward |
| Seasonal coefficient | Nov–Feb elevated for all Delhi NCR zones |
| Rainfall frequency | Historical flood events per zone |
| Daily hours declared | More hours = greater daily exposure |
| Platform SLA type | 10-min SLA causes full logoff vs. partial slowdown |

**Output:** Risk score 0.5–2.5 → feeds weekly premium formula. Model retrains monthly.

---

### 2. Income Loss Estimation — Linear Regression with Seasonal Adjustment

| Input | Detail |
|---|---|
| Average hourly earnings | Captured at onboarding, updated over time |
| Time of day trigger fires | 7 AM breach = full day lost; 3 PM = partial |
| Disruption duration | Estimated from API polling continuity |
| Zone productivity history | Drop rates from similar past events |

**Output:** Rupee payout amount — proportional to impact, not a flat sum.

---

### 3. Fraud Detection — Isolation Forest + GPS Rule Engine

| Layer | Method | What It Catches |
|---|---|---|
| GPS Zone Check | Last ping vs. disrupted zone boundary | Worker not present in affected area |
| Velocity Analysis | Speed between pings vs. physical plausibility | Spoofed or fabricated GPS data |
| Behavioural Anomaly | Isolation Forest on claim patterns | Statistically unusual claim behaviour over time |

Failed checks go to **manual review — never auto-rejected.** Workers with patchy GPS due to connectivity are not penalised without human oversight.

---

## System Architecture

```
  +-------------------------------------------------------------------+
  |                       FRONTEND — PWA                              |
  |  Dashboard | Subscription | Payout History | AQI Feed | Coverage  |
  +---------------------------------+---------------------------------+
                                    | REST API
  +---------------------------------v---------------------------------+
  |                    BACKEND — FastAPI (Python)                     |
  +---------------------+---------------------+---------------------+
  |     AI ENGINE       |   TRIGGER ENGINE    |    FRAUD GUARD      |
  |  Risk Scoring       |  AQI — primary      |  GPS Zone Check     |
  |  Loss Estimation    |  Weather / Rain     |  Velocity Analysis  |
  |  Premium Calc       |  Civil Events       |  Isolation Forest   |
  |  Seasonal Adjust    |  Multi-day Tracker  |  Manual Review Q    |
  +----------+----------+----------+----------+---------------------+
             |                     |
  +----------v----------+ +--------v------------------------------+
  |      ML MODELS      | |        EXTERNAL API LAYER            |
  |  XGBoost            | |  CPCB AQI   IQAir   OpenWeather      |
  |  Scikit-learn       | |  Google News   Google Maps           |
  |  Isolation Forest   | |  Razorpay                            |
  +----------+----------+ +--------------------------------------+
             |
  +----------v--------------------------------------------------+
  |                   DATA LAYER — MongoDB                      |
  |  Collection 1 : Worker records · Policies · Payout history  |
  |  Collection 2 : Trigger logs · AQI events · API responses   |
  +----------+--------------------------------------------------+
             |
  +----------v-----------------------------+
  |   PAYMENT GATEWAY — Razorpay UPI       |
  +----------------------------------------+
```

---

## Data Flow Diagram (Level 1)

```
  [WORKER] ──signup──► (P1: Onboarding & Profiling) ──risk score──► (P2: Monitor & Trigger)
                                  │                                          │
                             store profile                            ◄──AQI/Weather/News──
                                  │                                   [EXTERNAL APIs]
                                  ▼                                          │
                           [DS: MongoDB]                              trigger event
                                  │                                          │
                          worker history                                     ▼
                                  └─────────────────────────► (P3: AI Loss Estimation)
                                                                             │
                                                                       loss estimate
                                                                             │
                                                                             ▼
                                                                  (P4: Fraud Verification)
                                                                             │
                                                              ┌──pass────────┴────fail──┐
                                                              ▼                         ▼
                                                       [RAZORPAY]               [Manual Review]
                                                       UPI Payout
                                                              │
                                                         UPI + SMS
                                                              │
                                                              ▼
                                                          [WORKER]
```

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Backend | Python, FastAPI | Async performance, clean REST design, native ML support |
| Risk Model | XGBoost, Scikit-learn | Best-in-class for tabular seasonal risk data |
| Fraud Detection | Isolation Forest | Unsupervised — no labelled fraud data required to start |
| Phase 3 ML | TensorFlow / PyTorch | Future predictive AQI forecasting models |
| Data Processing | Pandas, NumPy | Feature engineering and batch inference |
| Database | MongoDB | Flexible schema for variable event structures and seasonal chains |
| External Data | CPCB, IQAir, OpenWeather, Google News, Maps | Independent authoritative sources — trigger integrity depends on this |
| Payments | Razorpay | Full UPI support, instant transfer, dominant in India |
| Deployment | Docker, AWS / Render / Railway | Containerised, cloud-scalable |
| Frontend | PWA (HTML, CSS, JS) | Zero friction, works on budget Android on 3G |

---

## Development Roadmap

| Phase | What Gets Built | Status |
|---|---|---|
| Phase 1 | Persona, README, architecture, DFD, premium formula, trigger design | Complete |
| Phase 2 | FastAPI backend, AQI trigger engine, multi-day tracker, Razorpay integration, onboarding flow | In Progress |
| Phase 3 | XGBoost premium model, Isolation Forest fraud detection, analytics dashboard | Planned |

---

## Future Scope

**Direct Platform Integration** — Connect to Blinkit / Zepto APIs for verified real-time earnings. Eliminates estimated payouts entirely.

**Multi-City Calibration** — Delhi smog, Mumbai monsoon, Bangalore rain each need locally calibrated risk coefficients and seasonal calendars.

**Predictive Alerts** — 48-hour AQI forecasts warn Vikram the night before a disruption day — reactive becomes proactive.

**Native Android App** — Background AQI monitoring, push alerts, richer offline support. PWA proves the concept; native scales it.

**Insurer Dashboard** — Risk pool health, payout frequency, fraud rates, and premium adequacy — the commercial layer that makes GigSurance viable at scale.

---

## Constraint Compliance

| Requirement | How It Is Met |
|---|---|
| Income loss only — no health or vehicle cover | Triggers and payouts scoped exclusively to income disruption events |
| Parametric, automated trigger model | All payouts from independent third-party thresholds — no manual step |
| Weekly subscription pricing | Subscribes weekly; premium recalculates every cycle |
| AI-driven personalised premiums | XGBoost computes individual, seasonally adjusted risk score every week |

---

## Closing Note

Vikram knows Delhi's November smog is coming. He has lived through it every year.
What he has never had is any financial protection for the days it takes from him.

GigSurance does not pretend the smog will not come.
It simply makes sure that when it does, Vikram does not have to choose between his health and his income.

---

*Guidewire DEVTrails 2026 — Phase 1 Submission*