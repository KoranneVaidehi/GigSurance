# GigSurance

### AI-Powered Parametric Insurance for Gig Workers

[![Platform](https://img.shields.io/badge/Platform-Progressive%20Web%20App-blue?style=flat-square)](https://github.com)
[![Backend](https://img.shields.io/badge/Backend-Python%20%7C%20FastAPI-green?style=flat-square)](https://github.com)
[![AI](https://img.shields.io/badge/AI-XGBoost%20%7C%20Scikit--learn-orange?style=flat-square)](https://github.com)
[![Status](https://img.shields.io/badge/Phase%201-Complete-brightgreen?style=flat-square)](https://github.com)

---

> Vikram logged onto Blinkit at 8 AM ready for a full day's work in Delhi.
> By 11 AM, the temperature crossed 47°C. He shut the app and went back inside.
> He lost Rs. 560 that day — with no way to recover it.
>
> **GigSurance changes that.**

---

[Quick Overview](#-what-is-gigsurance) · [Persona](#persona) · [Problem](#the-problem) · [Solution](#the-solution) · [Workflow](#application-workflow) · [Scenario](#persona-based-scenario) · [Triggers](#parametric-trigger-system) · [Premium Model](#weekly-premium-model) · [Micro-Deduction](#micro-deduction-collection-model) · [Exclusions](#coverage-exclusions) · [AI and ML](#ai-and-ml-integration) · [Architecture](#system-architecture) · [Tech Stack](#tech-stack) · [Roadmap](#roadmap) · [Future Scope](#future-scope) · [Actuarial Model](#actuarial-model)

---

##  What is GigSurance?

GigSurance is an **AI-powered parametric insurance platform** that protects gig workers from income loss due to real-world disruptions — extreme heat, heavy rain, and civil events.

-  **Instant payouts** — under 5 minutes, no claim needed
-  **AI-personalised premiums** — recalculated every week per worker and zone
-  **Location-based trigger detection** — IMD and OpenWeather APIs, around the clock
-  **Weekly subscription from ₹30** — per-delivery micro-deduction, no upfront burden.

**Built for:** Blinkit · Zepto · Swiggy Instamart delivery partners

> No forms. No calls. No waiting. Condition met — payout fires.

---

## Persona

> **Chosen Segment: Grocery and Quick Commerce — Blinkit**

Meet **Vikram Solanki** — 26, Delhi, full-time Blinkit delivery partner.

| Attribute | Detail |
|---|---|
| Platform | Blinkit (primary) |
| Work Model | Per-delivery earnings — no salary, no guaranteed hours |
| Work Schedule | 7 days a week, 9 to 11 hours per day |
| Average Weekly Earnings | Rs. 3,200 to Rs. 4,200 |
| Device | Budget Android — Redmi Note / Realme C-series |
| Connectivity | 4G central Delhi, drops to 2G–3G in outer zones |
| Insurance Status | None — never held any income protection product |
| Primary Risk | Delhi summer heat — 45°C+ for up to 30 consecutive days, April–June |

**Why Q-commerce riders in Delhi are uniquely exposed:**
Food delivery riders can slow down in dangerous heat and earn less. Vikram cannot — Blinkit's 10-minute SLA means any disruption causes a complete logoff. Income does not reduce. It hits **zero**. Delhi consistently records some of India's highest temperatures — during peak summer, he loses 5 to 7 working days per month, borrows from family, and starts over.

**GigSurance is built specifically for Vikram.**

---

## The Problem

India's Q-commerce sector — Blinkit, Zepto, Swiggy Instamart — runs entirely on independent contractors with zero employment protections.

| Disruption | Real Examples | Impact on Vikram |
|---|---|---|
| Extreme Heat | Delhi 45°C–49°C+, April–June | Sustained outdoor exertion becomes medically dangerous. Logs off. Zero income. |
| Heat Waves | IMD red alerts — multi-day sustained heat events | Zones go dark for days at a stretch. No deliveries, no earnings. |
| Monsoon Rain | Flash flooding, waterlogged roads, July–Sep | Roads impassable. Blinkit zones collapse. |
| Civil Disruptions | Bandhs, curfews — periodic in Gujarat | Delivery zones blocked entirely |

One disrupted day costs Vikram Rs. 380 to Rs. 620. During peak summer — Rs. 3,000 to Rs. 5,500 lost in a single month, year after year. Traditional insurance covers none of this.

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

Weekly premiums start at **Rs. 30** — rising to Rs. 70 during Vikram's peak summer season. Seasonally adjusted, not annually fixed.

---

## Application Workflow

```
  [ 1 ] ONBOARDING
        Signs up in under 3 minutes.
        Inputs: zone, platform (Blinkit), daily hours.
                         |
                         v
  [ 2 ] AI RISK PROFILING
        Scored on zone temperature history, heat wave frequency, season, and platform SLA.
        Delhi zones flagged with elevated heat coefficient April–June.
        Output: risk tier (Low / Medium / High) + weekly premium.
                         |
                         v
  [ 3 ] WEEKLY SUBSCRIPTION
        Rs. 30 / Rs. 50 / Rs. 70 per week — auto-deducted via UPI.
        Premium recalculates every week with fresh risk data.
                         |
                         v
  [ 4 ] CONTINUOUS MONITORING
        IMD, OpenWeather, and News APIs polled every 15 minutes
        across all active Q-commerce zones — around the clock.
                         |
                         v
  [ 5 ] TRIGGER DETECTION
        Threshold crossed → affected policy holders identified instantly.
        Multi-day heat waves = independent payout for each qualifying day.
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

## Persona-Based Scenario

**Wednesday, 10:45 AM. Satellite Road, Delhi. May. The heat is relentless.**

Vikram completed three deliveries before the temperature became life-threatening. He logged off Blinkit and went inside. Here is what GigSurance did — without him doing anything:

```
  10:30 AM — IMD/OpenWeather API: 47.2°C reported in Delhi West zone
  10:31 AM — Trigger engine flags breach. Vikram's active policy identified.
  10:32 AM — GPS confirms: Vikram was present in zone from 8:00–10:30 AM
  10:33 AM — AI estimates loss: Rs. 520 (Rs. 62/hr × 8.5 remaining hours)
  10:34 AM — Fraud check passes: GPS clean, velocity normal, no anomalies
  10:35 AM — Razorpay transfer initiated to Vikram's UPI account
  10:44 AM — SMS: "GigSurance credited Rs. 520 for extreme heat disruption. Stay safe."
```

He made a sensible decision about his health.
**GigSurance made sure it did not cost him his income.**

---

## Parametric Trigger System

> No human in the loop. Verified by independent third-party APIs. Condition met — payout fires.

| Trigger | Threshold | Data Source | Justification |
|---|---|---|---|
| Extreme Heat | > 45°C | IMD / OpenWeather | IMD red alert — sustained outdoor exertion at 45°C+ is medically dangerous. Primary trigger for Delhi. |
| Heat Wave (Multi-day) | > 45°C for 2+ consecutive days | IMD | IMD declared heat wave — Delhi zones experience sustained delivery collapse |
| Rainfall | > 12 mm/hr sustained | OpenWeather | IMD heavy rain — Delhi roads flood, Q-commerce zones collapse |
| Civil Disruption | Bandh / curfew declared | Google News | Zones legally or physically inaccessible |

**Multi-day heat waves:** Temperature checked every 6 hours. Each qualifying day fires an independent payout. Vikram takes no action between days.

---

## Weekly Premium Model

Vikram's premium rises during peak summer and falls in cooler months — recalculated every week, not annually.

### Premium Formula

```
  Weekly Premium Cap (WC)  =  (B × R)  +  (E × P)

    B  =  Base cost                  Rs. 20 fixed floor
    R  =  Risk score                 0.5 to 2.5 — zone, season, hours, platform SLA
    E  =  Expected loss              Avg income lost per historical disruption event
    P  =  Probability                Likelihood of a qualifying trigger this week

  Per Delivery Deduction (PDD)  =  WC / Projected_Weekly_Deliveries

    Projected_Weekly_Deliveries  =  Rolling average of last 4 weeks
```

**Risk Score inputs for a Delhi Q-commerce rider:**
- Historical temperature breach frequency for the zone (24 months, IMD data)
- Month and season — April–June carries an elevated Delhi heat coefficient
- Rainfall and flood frequency for the zone (monsoon overlay)
- Worker's daily hours — 9 to 11 hours means maximum heat exposure
- Platform SLA — Blinkit's 10-minute window causes full logoff on any disruption

### Vikram's Seasonal Premium Across the Year

| Months | Risk Context | Weekly Cap | Approx. Per-Delivery Cut |
|---|---|---|---|
| January – February | Cool season, low disruption | Rs. 30 | Rs. 0.33 |
| March | Pre-summer warming | Rs. 40 | Rs. 0.44 |
| April – June | Peak Delhi heat season | Rs. 70 | Rs. 0.78 |
| July – September | Monsoon season | Rs. 50 | Rs. 0.56 |
| October – December | Post-monsoon, low disruption | Rs. 30 | Rs. 0.33 |

*Per-delivery cut based on projected 90 deliveries/week. Recalculates weekly with actual delivery history.*

---

## Micro-Deduction Collection Model

Rather than charging the full weekly premium as a single advance deduction, GigSurance uses a **per-delivery micro-deduction model** — aligning the cost of insurance with the act of earning.

**How it works:**

```
  Every completed delivery  →  Rs. 0.50 to Rs. 1.00 automatically deducted
  Deductions continue       →  until the Weekly Cap (WC) is reached
  Once cap is reached       →  all further deliveries that week are deduction-free
  End of week shortfall     →  remaining balance auto-debited via UPI
```

**Example — Vikram in May (Weekly Cap = Rs. 70, ~90 deliveries expected):**

```
  Per delivery cut   =  Rs. 70 / 90  =  Rs. 0.78  →  rounded to Rs. 1.00
  After delivery 70  →  Rs. 70 collected. Cap reached.
  Deliveries 71–90   →  Zero deduction. Vikram keeps full earnings.
```

| Concern | How Micro-Deduction Addresses It |
|---|---|
| Upfront payment pressure | No single large deduction — cost spread across deliveries |
| Low-earning weeks | Partial collection via deliveries + small end-of-week top-up |
| High-earning weeks | Cap reached early — remaining deliveries are deduction-free |
| Psychological friction | Rs. 1 per delivery is imperceptible — less than 1% of a single delivery payout |

> Vikram is informed of this at onboarding — no surprises.

---

## Coverage Exclusions

> Mandatory exclusions align GigSurance with IRDAI microinsurance regulations. All exclusions are disclosed at onboarding and accessible at any time from the policy screen.

| Exclusion | Rationale |
|---|---|
| **War, Armed Conflict, Terrorism** | Uninsurable systemic risk — standard IRDAI exclusion. Triggers cannot be reliably isolated from conflict conditions. |
| **Pandemic and Epidemic Events** | Simultaneous correlated loss across the entire pool — uninsurable at these premium levels. |
| **Government-Mandated Lockdowns** | Extended lockdowns (> 72 hrs) treated as emergency events, outside parametric scope. |
| **Nuclear, Radiological, Chemical Events** | Catastrophic systemic risk — excluded by all reinsurance agreements. |
| **Self-Induced Disruption** | Account suspension, platform ban, or voluntary deactivation — external triggers only. |
| **Platform Technical Outages** | Blinkit infrastructure downtime requires no environmental trigger — outside scope. |
| **Scheduled Public Holidays** | Foreseeable income reduction — not an insured disruption. |
| **Disruptions Outside Registered Zone** | Coverage is zone-specific. Unregistered zones do not trigger payouts. |

> *"GigSurance covers income lost due to extreme heat, heavy rain, and local disruptions — not city-wide shutdowns, pandemics, or platform technical issues."*

---

## AI and ML Integration

AI is embedded at three critical points — not bolted on as an afterthought.

### 1. Premium Calculation — XGBoost (Gradient Boosted Trees)

| Input | Detail |
|---|---|
| Zone temperature history | 24 months of IMD data per ward |
| Seasonal coefficient | April–June elevated for all Delhi zones |
| Rainfall frequency | Historical flood events per zone |
| Daily hours declared | More hours = greater daily heat exposure |
| Platform SLA type | 10-min SLA causes full logoff vs. partial slowdown |

**Output:** Risk score 0.5–2.5 → feeds weekly premium formula. Model retrains monthly.

### 2. Income Loss Estimation — Linear Regression with Seasonal Adjustment

| Input | Detail |
|---|---|
| Average hourly earnings | Captured at onboarding, updated over time |
| Time of day trigger fires | 8 AM breach = full day lost; 2 PM = partial |
| Disruption duration | Estimated from API polling continuity |
| Zone productivity history | Drop rates from similar past heat events |

**Output:** Rupee payout amount — proportional to impact, not a flat sum.

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
  |  Dashboard | Subscription | Payout History | Temp Feed | Coverage |
  +---------------------------------+---------------------------------+
                                    | REST API
  +---------------------------------v---------------------------------+
  |                    BACKEND — FastAPI (Python)                     |
  +---------------------+---------------------+---------------------+
  |     AI ENGINE       |   TRIGGER ENGINE    |    FRAUD GUARD      |
  |  Risk Scoring       |  Heat — primary     |  GPS Zone Check     |
  |  Loss Estimation    |  Weather / Rain     |  Velocity Analysis  |
  |  Premium Calc       |  Civil Events       |  Isolation Forest   |
  |  Seasonal Adjust    |  Multi-day Tracker  |  Manual Review Q    |
  +----------+----------+----------+----------+---------------------+
             |                     |
  +----------v----------+ +--------v------------------------------+
  |      ML MODELS      | |        EXTERNAL API LAYER            |
  |  XGBoost            | |  IMD Temp   IQAir   OpenWeather      |
  |  Scikit-learn       | |  Google News   Google Maps           |
  |  Isolation Forest   | |  Razorpay                            |
  +----------+----------+ +--------------------------------------+
             |
  +----------v--------------------------------------------------+
  |                   DATA LAYER — MongoDB                      |
  |  Collection 1 : Worker records · Policies · Payout history  |
  |  Collection 2 : Trigger logs · Temp events · API responses  |
  +----------+--------------------------------------------------+
             |
  +----------v-----------------------------+
  |   PAYMENT GATEWAY — Razorpay UPI       |
  +----------------------------------------+
```

## Data Flow Diagram (Level 1)

![alt text](diagram-export-19-3-2026-12_59_08-am.png)

---

## Platform Choice — Why PWA

> Decision is driven by Vikram's device reality, not technical convenience.

> 🚧 **Development Note:** For development purposes, we are currently using a **Progressive Web App (PWA) platform** to deliver cross-device compatibility quickly and efficiently. In the future, we plan to transition to **fully native mobile applications** to leverage deeper integration with device features and provide an optimized user experience.

| Factor | Native App | PWA — GigSurance's Choice |
|---|---|---|
| Installation | Play Store download required | Opens directly in browser |
| Storage footprint | 40–80 MB | Near zero |
| Works on budget Redmi | Inconsistent | Yes — browser-based, OS-agnostic |
| Works on 2G / 3G | Slow load times | Lightweight, loads fast |
| Background GPS | Reliable | Limited — handled server-side at trigger time |
| Time to first user | Weeks (store review) | Immediate |

**GPS limitation handled architecturally** — Vikram's last known GPS ping at trigger time is cross-checked against the disrupted zone. Zone-level accuracy is sufficient without background tracking.

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Backend | Python, FastAPI | Async performance, clean REST design, native ML support |
| Risk Model | XGBoost, Scikit-learn | Best-in-class for tabular seasonal risk data |
| Fraud Detection | Isolation Forest | Unsupervised — no labelled fraud data required to start |
| Phase 3 ML | TensorFlow / PyTorch | Future predictive temperature forecasting models |
| Data Processing | Pandas, NumPy | Feature engineering and batch inference |
| Database | MongoDB | Flexible schema for variable event structures and seasonal chains |
| External Data | IMD, IQAir, OpenWeather, Google News, Maps | Independent authoritative sources — trigger integrity depends on this |
| Payments | Razorpay | Full UPI support, instant transfer, dominant in India |
| Deployment | Docker, AWS / Render / Railway | Containerised, cloud-scalable |
| Frontend | PWA (HTML, CSS, JS) | Zero friction, works on budget Android on 3G |

---

## Development Roadmap

| Phase | What Gets Built | Status |
|---|---|---|
| Phase 1 | Persona, README, architecture, DFD, premium formula, trigger design | Complete |
| Phase 2 | FastAPI backend, heat trigger engine, multi-day tracker, Razorpay integration, onboarding flow | In Progress |
| Phase 3 | XGBoost premium model, Isolation Forest fraud detection, analytics dashboard | Planned |

---

## Future Scope

**Direct Platform Integration** — Connect to Blinkit APIs for verified real-time earnings. Eliminates estimated payouts entirely.

**Multi-City Calibration** — Delhi heat, Delhi smog, Mumbai monsoon each need locally calibrated risk coefficients and seasonal calendars.

**Predictive Alerts** — 48-hour temperature forecasts warn Vikram the night before a heat disruption day — reactive becomes proactive.

**Native Android App** — Background temperature monitoring, push alerts, richer offline support. PWA proves the concept; native scales it.

**Insurer Dashboard** — Risk pool health, payout frequency, fraud rates, and premium adequacy — the commercial layer that makes GigSurance viable at scale.

---

## Actuarial Model

> Advanced section — financial viability analysis for the GigSurance risk pool.

GigSurance's financial viability depends on pricing premiums that are adequate to cover expected claims, fund operating costs, and maintain statutory reserves — while remaining affordable for workers earning Rs. 3,200–4,200 per week.

### Core Actuarial Metrics

#### 1. Loss Ratio (LR)

```
  Loss Ratio  =  Total Claims Paid  /  Total Premiums Collected

  Target LR   =  55% – 65%

  Example (Delhi heat season, 1,000 active riders, April–June):

    Weekly premium pool  =  1,000 × Rs. 70       =  Rs. 70,000 / week
    Expected trigger days per week (IMD 24mo avg) =  2.3 days
    Riders in affected zone per event             =  ~320 (32% zone overlap)
    Average payout per rider per day              =  Rs. 490

    Weekly expected claims  =  2.3 × 320 × Rs. 490  =  Rs. 360,640 / week  ← unsustainable at 1,000 riders

  Implication: Viable pool requires minimum 3,000–4,000 active riders across Delhi zones
  to diversify zone-specific trigger exposure.
```

#### 2. Combined Ratio (CR)

```
  Combined Ratio  =  Loss Ratio  +  Expense Ratio

    Expense Ratio  =  Operating costs / Total premiums
                   =  API costs + payment gateway fees + infrastructure + ops
                   =  Estimated 18%–22% at early scale

  Target CR  <  95%   →  Underwriting profit
  CR = 100%           →  Break-even on underwriting (investment income covers margin)
  CR > 105%           →  Underwriting loss — premium inadequacy signal
```

#### 3. Expected Loss per Policy per Week

```
  E[L]  =  Σ (Payout_i × P(trigger_i))

  For Vikram in May (Delhi West zone):

    Heat trigger (> 45°C):
      P(trigger)        =  0.31   (IMD historical: 9.3 trigger days in 30-day May period)
      Expected payout   =  Rs. 490
      E[L] heat         =  0.31 × Rs. 490  =  Rs. 151.90 / week

    Rainfall trigger (> 12 mm/hr):
      P(trigger)        =  0.04   (low in May — monsoon onset late June)
      Expected payout   =  Rs. 410
      E[L] rain         =  0.04 × Rs. 410  =  Rs. 16.40 / week

    Civil disruption:
      P(trigger)        =  0.02
      Expected payout   =  Rs. 380
      E[L] civil        =  0.02 × Rs. 380  =  Rs. 7.60 / week

  Total E[L] per policy (May)  =  Rs. 151.90 + Rs. 16.40 + Rs. 7.60  =  Rs. 175.90 / week
```

> **Note:** Weekly Cap for May = Rs. 70. E[L] = Rs. 175.90 signals that the May premium is **inadequate at single-rider level** — GigSurance's viability depends on (a) zone diversification across the pool, (b) not all triggers being simultaneous, and (c) reinsurance for correlated heat wave events.

#### 4. Premium Adequacy Check

```
  Required Premium  =  E[L] × (1 + Loading Factor)

    Loading Factor  =  Expense ratio + profit margin + reserve contribution
                    =  0.20  +  0.05  +  0.10  =  0.35

  Required Premium (May)  =  Rs. 175.90 × 1.35  =  Rs. 237.47 / week (single rider, unhedged)

  Actual Weekly Cap (May)  =  Rs. 70

  Gap covered by:
    1. Zone diversification — not all 1,000 riders are in the trigger zone simultaneously
    2. Reinsurance — catastrophe excess-of-loss treaty for correlated heat events
    3. Cross-season surplus — January–February low-loss months subsidise April–June
```

#### 5. Reserve Requirements

Consistent with IRDAI microinsurance guidelines, GigSurance maintains:

```
  Unearned Premium Reserve (UPR)
    =  Premiums collected for coverage days not yet elapsed
    =  Weekly: ~50% of weekly pool held in reserve mid-week

  Incurred But Not Reported Reserve (IBNR)
    =  Buffer for trigger events detected but payouts not yet processed
    =  Target: 10%–15% of monthly premium volume

  Catastrophe Reserve
    =  Funded from cross-season surpluses (Jan–Feb, Oct–Dec low-loss months)
    =  Target: 3× average weekly claims payout
    =  Protects solvency during multi-day heat wave cascades
```

#### 6. Seasonal Loss Ratio Forecast

| Months | Weekly Premium (per rider) | Weekly E[L] (per rider) | Projected LR | Season Role |
|---|---|---|---|---|
| January – February | Rs. 30 | Rs. 8 | ~27% | Surplus generation — funds catastrophe reserve |
| March | Rs. 40 | Rs. 28 | ~70% | Transition — rising exposure |
| April – June | Rs. 70 | Rs. 176* | ~95%** | Peak loss season — reinsurance active |
| July – September | Rs. 50 | Rs. 62 | ~62% | Moderate — monsoon is localised |
| October – December | Rs. 30 | Rs. 9 | ~30% | Surplus generation |

*Pool-level E[L] is lower than single-rider E[L] due to zone diversification.
**LR at pool level targets 60–65% with reinsurance hedge and cross-season surplus.

### Reinsurance Strategy

GigSurance's parametric triggers — particularly multi-day heat waves — create **correlated loss events** where hundreds of riders in the same zone trigger simultaneously. This is the primary actuarial risk.

```
  Structure:    Excess-of-Loss (XL) Catastrophe Reinsurance

  Retention:    GigSurance retains first Rs. 2,00,000 per event
  Reinsurer covers: losses above Rs. 2,00,000 per qualifying event

  Qualifying event:  Any trigger day where pool-wide payouts exceed Rs. 2,00,000
                     (approx. 408 simultaneous qualifying riders at Rs. 490 avg payout)

  Annual Aggregate Deductible:  Rs. 8,00,000  — GigSurance retains small events
  Annual Reinsurance Limit:     Rs. 50,00,000 — covers catastrophic heat wave seasons
```

This structure ensures that an extreme Delhi heat season does not threaten GigSurance's solvency while keeping premiums affordable for Vikram.

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

Vikram knows Delhi's May heat is coming. He has lived through it every year.
What he has never had is any financial protection for the days it takes from him.

GigSurance does not pretend the heat will not come.
It simply makes sure that when it does, Vikram does not have to choose between his health and his income.

---
