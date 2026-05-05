# Angry Alpaca Hockey League (AAHL)

A fantasy hockey pool management system built with vanilla HTML, CSS, and JavaScript, backed by Google Apps Script.

## Features

### Pool Mechanics
- **Box-style draft**: 6 forwards, 4 defensemen, 2 goalies per entry
- **Division leader picks**: Select projected division winners for bonus points
- **Real-time scoring**: Points updated nightly via NHL API
- **Hat trick bonuses**: +3 bonus points when pool players score 3+ goals
- **Live standings**: Leaderboard with rank change tracking

### UI/UX Features
- **🔴 LIVE indicator**: Ticker shows "LIVE" status during game hours (7pm-11pm ET)
- **📊 Player ownership %**: Visual bars showing draft popularity
- **☀️/🌙 Dark/Light mode**: Toggle with system preference detection
- **📌 Sticky table headers**: Stats headers remain visible when scrolling
- **🔄 Auto-refresh**: Data refreshes every 5 minutes during game hours
- **🎩 Hat Trick Hall**: Celebrates pool player hat tricks with owner attribution
- **Sports ticker**: Animated display of previous night's scoring

### Backend Agents (Google Apps Script)
| Agent | Function |
|-------|----------|
| AGT-001 | Entry Reception — handles form submissions |
| AGT-002 | Stat Fetch — pulls nightly NHL stats via API |
| AGT-003 | Standings Calc — calculates scores and updates leaderboard |
| AGT-004 | Comms Agent — sends emails and webhook notifications |

### Notifications
- **Email**: Entry confirmations, weekly digests, hat trick alerts
- **Discord**: Rich embed notifications for entries, hat tricks, standings updates
- **Slack**: Block Kit notifications for same events

## Typography (Avalanche Style)
- **Headlines/Display**: Bebas Neue — bold, condensed, athletic
- **Body/UI**: Inter — clean, modern sans-serif
- **Stats/Numbers**: Teko — athletic, blocky numerals

## Quick Start

### Prerequisites
- Google Account
- GitHub account (for hosting)

### Setup Steps

1. **Create Google Sheet** with 7 tabs: `Entries`, `Players`, `ProcessedGames`, `IR`, `AgentStatus`, `Standings`, `HatTricks`

2. **Deploy Apps Script** (from `admin.html`):
   - Open Extensions → Apps Script
   - Copy the entire AGT-001 through AGT-004 code
   - Set `APPS_SCRIPT_URL` constant to your deployed script URL
   - Deploy as web app (execute as me, anyone access)

3. **Configure Webhooks (Optional)**:
   - Discord: Server Settings → Integrations → Webhooks
   - Slack: Apps → Incoming Webhooks
   - In Apps Script: File → Project Properties → Script Properties
   - Add `DISCORD_WEBHOOK_URL` and/or `SLACK_WEBHOOK_URL`

4. **Host Frontend**:
   - Option A: GitHub Pages — push to repo, enable Pages in Settings
   - Option B: Netlify Drop — drag folder to netlify.com/drop

5. **Update Config**:
   - Edit `main.js` — set `APPS_SCRIPT_URL` to your deployed script URL

## File Structure

```
├── index.html          # Home page with leaderboard and ticker
├── picks.html          # Entry form (24 picks + divisions)
├── standings.html      # Pool standings, skater stats, goalie stats
├── rules.html          # Scoring rules and FAQ
├── admin.html          # Setup guide and Apps Script code
├── styles.css          # All styling with CSS variables
├── main.js             # All JavaScript functionality
└── aahl-logo.png       # Brand asset
```

## API Integration

The system uses NHL API endpoints via Google Apps Script:
- Schedule data for game identification
- Box scores for player stats
- Team rosters for player metadata

All API calls are cached and rate-limited appropriately.

## Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
  --burgundy: #6F263D;    /* Primary brand */
  --accent: #236192;      /* Secondary */
  --gold: #A2AAAD;        /* Tertiary */
}
```

### Fonts
Google Fonts are loaded in each HTML file:
```html
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&family=Teko:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Scoring Rules
Edit the rules table in `rules.html` and the `calculateScore()` function in Apps Script.

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License
Private — for AAHL commissioner and participants.

---

**Version**: 2026-27 Season  
**Last Updated**: May 2026
