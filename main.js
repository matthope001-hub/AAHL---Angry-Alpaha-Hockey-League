// ══════════════════════════════════════════════
// main.js — AAHL UI Layer
// Requires data.js to be loaded first
// ══════════════════════════════════════════════

// ══════════ TOAST ══════════
function toast(title, body) {
  const t = document.getElementById('toast'); if (!t) return;
  document.getElementById('toast-t').textContent = title;
  document.getElementById('toast-b').textContent = body;
  t.classList.add('show'); setTimeout(()=>t.classList.remove('show'), 4200);
}

// ══════════ PHONE FORMAT ══════════
function formatPhone(input) {
  const digits = input.value.replace(/\D/g,'').slice(0,10); let f='';
  if (digits.length===0) f='';
  else if (digits.length<=3) f='('+digits;
  else if (digits.length<=6) f='('+digits.slice(0,3)+') '+digits.slice(3);
  else f='('+digits.slice(0,3)+') '+digits.slice(3,6)+'-'+digits.slice(6);
  input.value=f;
}

// ══════════ TICKER ══════════
let _tickerRAF = null;

function tickerStatChips(p) {
  let chips = '';
  const isHT = p.pos !== 'G' && p.goals >= 3;
  if (isHT)         chips += `<span class="t-stat ts-ht">🎩 HAT TRICK</span>`;
  else if (p.goals) chips += `<span class="t-stat ts-g">${p.goals}G</span>`;
  if (p.assists)    chips += `<span class="t-stat ts-a">${p.assists}A</span>`;
  if (p.sog)        chips += `<span class="t-stat ts-sog">${p.sog}SOG</span>`;
  if (p.wins)       chips += `<span class="t-stat ts-w">${p.wins}W</span>`;
  if (p.losses)     chips += `<span class="t-stat ts-l">${p.losses}L</span>`;
  if (p.otl)        chips += `<span class="t-stat ts-otl">${p.otl}OTL</span>`;
  if (p.shutouts)   chips += `<span class="t-stat ts-so">SO</span>`;
  if (p.saves)      chips += `<span class="t-stat ts-sv">${p.saves}SV</span>`;
  if (p.pos==='D' && p.pim) chips += `<span class="t-stat ts-pim">${p.pim}PIM</span>`;
  return chips;
}

function buildTicker() {
  const viewport = document.querySelector('.ticker-viewport'); if (!viewport) return;
  if (_tickerRAF) { cancelAnimationFrame(_tickerRAF); _tickerRAF = null; }

  const scorers = NIGHTLY_STATS.filter(p => nightlyPts(p) > 0);
  const emptyMsg = !NIGHTLY_STATS.length
    ? 'No pool player stats yet for last night'
    : 'No scoring pool players last night';

  if (!scorers.length) {
    viewport.innerHTML = `<div class="ticker-track"><div class="t-item"><span class="t-game">${emptyMsg}</span></div></div>`;
    return;
  }

  const itemHTML = p =>
    `<div class="t-item">` +
    `<span class="t-game">${p.game}</span>` +
    `<span class="t-sep">·</span>` +
    `<span class="t-name">${p.name}</span>` +
    `<span class="t-team">${p.team}&nbsp;${p.pos}</span>` +
    `<span class="t-sep">|</span>` +
    `${tickerStatChips(p)}` +
    `<span class="t-pts">+${nightlyPts(p)}pts</span>` +
    `</div>`;

  const inner = scorers.map(itemHTML).join('');
  viewport.innerHTML = `<div class="ticker-track">${inner}${inner}</div>`;

  const track = viewport.querySelector('.ticker-track');
  const PX_PER_SEC = 60;
  let pos = 0, last = null;

  function tick(ts) {
    if (!last) last = ts;
    const dt = Math.min((ts - last) / 1000, 0.05);
    last = ts;
    pos += PX_PER_SEC * dt;
    const halfWidth = track.scrollWidth / 2;
    if (pos >= halfWidth) pos -= halfWidth;
    track.style.transform = `translateX(${-pos}px)`;
    _tickerRAF = requestAnimationFrame(tick);
  }
  _tickerRAF = requestAnimationFrame(tick);
}

// ══════════ STARS OF THE NIGHT ══════════
function buildStarsOfNight() {
  const bar  = document.getElementById('stars-bar');
  const list = document.getElementById('stars-list');
  const dateEl = document.getElementById('stars-date');
  if (!bar || !list) return;
  if (!NIGHTLY_STATS.length) { bar.style.display = 'none'; return; }

  const scored = NIGHTLY_STATS
    .map(p => ({ ...p, pts: nightlyPts(p) }))
    .filter(p => p.pts > 0)
    .sort((a, b) => b.pts - a.pts)
    .slice(0, 3);

  if (!scored.length) { bar.style.display = 'none'; return; }

  const starLabels = ['1st Star', '2nd Star', '3rd Star'];
  const starColors = ['#f5c842', '#a8b8c8', '#cd7f32'];

  list.innerHTML = scored.map((p, i) => {
    const ini = initials(p.name);
    let chips = '';
    if (p.goals >= 3)  chips += `<span class="sn-chip sn-ht">🎩 HAT TRICK</span>`;
    else if (p.goals)  chips += `<span class="sn-chip sn-g">${p.goals}G</span>`;
    if (p.assists)     chips += `<span class="sn-chip sn-a">${p.assists}A</span>`;
    if (p.sog)         chips += `<span class="sn-chip sn-sog">${p.sog}SOG</span>`;
    if (p.wins)        chips += `<span class="sn-chip sn-w">${p.wins}W</span>`;
    if (p.shutouts)    chips += `<span class="sn-chip sn-so">SO</span>`;
    if (p.saves)       chips += `<span class="sn-chip sn-sv">${p.saves}SV</span>`;
    if (p.pos==='D' && p.pim) chips += `<span class="sn-chip sn-pim">${p.pim}PIM</span>`;
    return `
      <div class="sn-card">
        <div class="sn-star-label" style="color:${starColors[i]}">${starLabels[i]}</div>
        <div class="sn-hs-wrap" id="star-hs-${i}"><span class="sn-ini">${ini}</span></div>
        <div class="sn-info">
          <div class="sn-name">${p.name}</div>
          <div class="sn-team">${p.team} · ${p.pos}</div>
          <div class="sn-chips">${chips}</div>
        </div>
        <div class="sn-pts">+${p.pts}<span class="sn-pts-lbl">pts</span></div>
      </div>`;
  }).join('');

  scored.forEach((p, i) => {
    const urls = getPlayerHeadshotUrls(p.name);
    if (!urls.length) return;
    const wrap = document.getElementById(`star-hs-${i}`);
    if (!wrap) return;
    function tryUrl(j) {
      if (j >= urls.length) return;
      const img = new Image();
      img.onload = () => { wrap.innerHTML = `<img src="${urls[j]}" alt="${p.name}" class="sn-hs">`; };
      img.onerror = () => tryUrl(j + 1);
      img.src = urls[j];
    }
    tryUrl(0);
  });

  if (dateEl && scored[0]?.game) {
    const yesterday = new Date(Date.now() - 86400000);
    dateEl.textContent = yesterday.toLocaleDateString('en-CA', {weekday:'long', month:'short', day:'numeric'});
  }
  bar.style.display = 'flex';
}

// ══════════ PICKS LOCK ══════════
const LOCK_DATE = new Date('2026-09-29T19:00:00-04:00');
function isPicksLocked() { return new Date() >= LOCK_DATE; }
function getTimeUntilLock() {
  const diff = LOCK_DATE - new Date();
  if (diff <= 0) return null;
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    total:   diff
  };
}

function buildPicksLockBanner() {
  const locked = isPicksLocked();
  const banner = document.getElementById('picks-lock-banner');
  if (!banner) return;

  if (locked) {
    banner.innerHTML = `
      <div style="background:linear-gradient(135deg,rgba(125,42,66,0.2),rgba(8,4,6,0.95));border:1px solid rgba(125,42,66,0.4);border-radius:var(--r2);padding:32px 24px;text-align:center;margin-bottom:24px">
        <div style="font-size:40px;margin-bottom:12px">🔒</div>
        <div style="font-family:Teko,sans-serif;font-size:28px;font-weight:700;letter-spacing:1px;margin-bottom:6px">PICKS ARE LOCKED</div>
        <div style="font-size:14px;color:var(--muted);max-width:400px;margin:0 auto;line-height:1.6">
          The 2026–27 AAHL season is underway. Pick submissions are now closed.<br>
          Check the <a href="index.html" style="color:var(--burgundy3)">standings</a> to see how your team is doing.
        </div>
      </div>`;
    document.querySelectorAll('input, select, button:not(.nav-btn)').forEach(el => { el.disabled = true; });
    banner.style.display = 'block';
    return;
  }

  function updateCountdown() {
    const t = getTimeUntilLock();
    if (!t) { buildPicksLockBanner(); return; }
    const urgency = t.days === 0 && t.hours < 24;
    const color = t.days === 0 ? 'var(--burgundy3)' : 'var(--gold)';
    banner.innerHTML = `
      <div style="background:var(--surface2);border:1px solid ${urgency?'rgba(125,42,66,0.4)':'var(--border2)'};border-radius:var(--r2);padding:14px 20px;margin-bottom:20px;display:flex;align-items:center;gap:16px;flex-wrap:wrap">
        <div style="font-family:Teko,sans-serif;font-size:10px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--muted);white-space:nowrap">⏱ Picks lock in</div>
        <div style="display:flex;gap:10px;align-items:baseline">
          ${t.days > 0 ? `<div style="text-align:center"><div style="font-family:Teko,sans-serif;font-size:32px;font-weight:700;color:${color};line-height:1">${t.days}</div><div style="font-family:Teko,sans-serif;font-size:9px;color:var(--muted);letter-spacing:1px;text-transform:uppercase">days</div></div>` : ''}
          <div style="text-align:center"><div style="font-family:Teko,sans-serif;font-size:32px;font-weight:700;color:${color};line-height:1">${String(t.hours).padStart(2,'0')}</div><div style="font-family:Teko,sans-serif;font-size:9px;color:var(--muted);letter-spacing:1px;text-transform:uppercase">hrs</div></div>
          <div style="text-align:center"><div style="font-family:Teko,sans-serif;font-size:32px;font-weight:700;color:${color};line-height:1">${String(t.minutes).padStart(2,'0')}</div><div style="font-family:Teko,sans-serif;font-size:9px;color:var(--muted);letter-spacing:1px;text-transform:uppercase">min</div></div>
          ${t.days === 0 ? `<div style="text-align:center"><div style="font-family:Teko,sans-serif;font-size:32px;font-weight:700;color:${color};line-height:1">${String(t.seconds).padStart(2,'0')}</div><div style="font-family:Teko,sans-serif;font-size:9px;color:var(--muted);letter-spacing:1px;text-transform:uppercase">sec</div></div>` : ''}
        </div>
        <div style="margin-left:auto;font-size:13px;color:var(--muted)">Sep 29, 2026 · Opening Night</div>
      </div>`;
    banner.style.display = 'block';
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ══════════ LEADERBOARD ══════════
function lbRowHTML(e, i) {
  const cls = i===0?'p1':i===1?'p2':i===2?'p3':'';
  const tv = parseInt(e.trend) || 0;
  const tCls = tv>0?'trend-up':tv<0?'trend-dn':'trend-eq';
  const tLbl = tv>0?'▲'+tv:tv<0?'▼'+Math.abs(tv):'—';
  return `<div class="lb-row ${cls}"><div class="lb-pos">${i+1}</div><div class="lb-av">${initials(e.name)}</div><div class="lb-info"><div class="lb-name">${e.name}</div></div><span class="lb-trend ${tCls}">${tLbl}</span><div class="lb-pts">${e.pts.toLocaleString()}</div></div>`;
}

function buildBoards() {
  const fl = document.getElementById('full-lb');
  if (!fl) return;
  if (!LIVE_BOARD.length) {
    fl.innerHTML = '<div style="padding:32px;text-align:center;color:var(--muted);font-family:\'Teko\',sans-serif;font-size:13px">Season starts September 29 — standings will appear here.</div>';
    const bc = document.getElementById('bd-count'); if (bc) bc.textContent = '—';
    return;
  }
  fl.innerHTML = LIVE_BOARD.map((e,i) => lbRowHTML(e,i)).join('');
  const bc = document.getElementById('bd-count'); if (bc) bc.textContent = LIVE_BOARD.length + ' entries';
}

// ══════════ PAYOUTS ══════════
let totalEntries = 1;
function updatePayouts() {
  const prize = totalEntries * 10 * 0.5;
  const he = document.getElementById('h-entries'), hp = document.getElementById('h-pot');
  if (he) he.textContent = totalEntries;
  if (hp) hp.textContent = '$' + Math.round(prize);
}
function buildPayoutTable() {
  const tbody = document.getElementById('payout-tbody'); if (!tbody) return;
  tbody.innerHTML = [10,20,30,40,50,75,100].map((n,i) => {
    const prize = n*10*0.5, bg = i%2===0?'':'style="background:var(--surface2)"';
    return `<tr ${bg}><td style="font-family:'DM Mono',monospace;font-weight:600">${n}</td><td style="text-align:right;font-family:'DM Mono',monospace;font-weight:700;color:var(--gold)">$${Math.round(prize*0.5)}</td><td style="text-align:right;font-family:'DM Mono',monospace;font-weight:700;color:#9ca3af">$${Math.round(prize*0.3)}</td><td style="text-align:right;font-family:'DM Mono',monospace;font-weight:700;color:#cd7f32">$${Math.round(prize*0.2)}</td></tr>`;
  }).join('');
}

// ══════════ DIVISION PICKS ══════════
let divisionPicks = {};

function buildDivisionPicks() {
  const grid = document.getElementById('div-grid'); if (!grid) return;
  grid.innerHTML = Object.entries(DIVISIONS).map(([divName, div]) => {
    const options = div.teams.map(t => `<option value="${t}">${t}</option>`).join('');
    return `<div class="div-section"><div class="div-conf-label">${div.conf}ern Conference</div><div class="div-name">${divName} Division</div><select class="div-team-select" id="div-${divName}" onchange="pickDivision('${divName}', this)"><option value="">— Pick division winner —</option>${options}</select><div class="div-pts-note">+10 pts if your team wins the division</div></div>`;
  }).join('');
}
function pickDivision(divName, sel) {
  divisionPicks[divName] = sel.value || null;
  sel.classList.toggle('picked', !!sel.value);
  updateDivisionCount();
}
function updateDivisionCount() {
  const filled = Object.values(divisionPicks).filter(Boolean).length;
  const dc = document.getElementById('div-pick-count'), db = document.getElementById('div-bonus-total');
  if (dc) dc.textContent = filled;
  if (db) db.textContent = filled * 10;
}

// ══════════ TEAM PANEL ══════════
function openTeamPanel(entryName) {
  const entry = LIVE_BOARD.find(e => e.name === entryName);
  if (!entry) return;
  document.getElementById('tp-av').textContent = initials(entryName);
  document.getElementById('tp-tname').textContent = entry.name;
  document.getElementById('tp-owner').textContent = entry.owner || '';
  document.getElementById('tp-meta').innerHTML =
    `<div class="tp-stat-pill"><div class="spv burg">${entry.pts.toLocaleString()}</div><div class="spl">Pool Pts</div></div>` +
    `<div class="tp-stat-pill"><div class="spv">${entry.rank || '—'}</div><div class="spl">Rank</div></div>`;
  document.getElementById('tp-tbody').innerHTML =
    `<tr><td colspan="15" style="text-align:center;padding:40px;color:var(--muted);font-family:Teko,sans-serif;font-size:13px">Individual pick breakdown coming soon.</td></tr>`;
  document.getElementById('tp-tfoot').innerHTML = '';
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeTeamPanel() {
  const el = document.getElementById('modal-overlay');
  if (el) el.classList.remove('open');
  document.body.style.overflow = '';
}
function overlayClick(e) { if (e.target === document.getElementById('modal-overlay')) closeTeamPanel(); }
function filterRoster(pos, tab) {
  currentFilter = pos;
  document.querySelectorAll('.tp-tab').forEach(t=>t.classList.remove('active'));
  tab.classList.add('active');
}

// ══════════ PLAYER INFO MODAL ══════════
let playerModalContext = null;

function openPlayerModal(playerName, team, pos, boxId, radioEl) {
  const s = PREV_STATS[playerName];
  playerModalContext = { boxId, playerName, radio: radioEl };

  const seasonLabel = document.querySelector('.pm-season-label');
  if (seasonLabel) seasonLabel.textContent = `${PREV_SEASON_LABEL} Season Stats (Prior Year)`;
  const totalNote = document.querySelector('.pm-total-note');
  if (totalNote) totalNote.textContent = `Based on ${PREV_SEASON_LABEL} stats`;

  document.getElementById('pm-name').textContent = playerName;
  document.getElementById('pm-nhl').textContent = team + ' · ' + (s?.pos || pos);
  const badge = document.getElementById('pm-pos-badge');
  badge.textContent = pos; badge.className = `pm-pos-badge pm-pos-${pos}`;

  const urls = getPlayerHeadshotUrls(playerName);
  const existingImg = document.getElementById('pm-headshot');
  if (existingImg) {
    existingImg.style.display = 'none';
    if (urls.length) {
      function tryUrl(i) {
        if (i >= urls.length) return;
        const img = new Image();
        img.onload = () => { existingImg.src = urls[i]; existingImg.style.display = 'block'; };
        img.onerror = () => tryUrl(i + 1);
        img.src = urls[i];
      }
      tryUrl(0);
    }
  }

  const statsGrid = document.getElementById('pm-stats-grid');
  if (!s) {
    statsGrid.innerHTML = `<div style="grid-column:1/-1;text-align:center;color:var(--muted);font-size:13px;padding:8px 0">No prior season data available</div>`;
    document.getElementById('pm-pts-breakdown').innerHTML = '';
    document.getElementById('pm-total-pts').textContent = '—';
  } else if (pos === 'G') {
    statsGrid.innerHTML = `<div class="pm-stat"><div class="pm-stat-val">${s.w}</div><div class="pm-stat-lbl">Wins</div></div><div class="pm-stat"><div class="pm-stat-val">${s.l}</div><div class="pm-stat-lbl">Losses</div></div><div class="pm-stat"><div class="pm-stat-val">${s.otl}</div><div class="pm-stat-lbl">OT Loss</div></div><div class="pm-stat"><div class="pm-stat-val">${s.so}</div><div class="pm-stat-lbl">Shutouts</div></div><div class="pm-stat" style="grid-column:1/3"><div class="pm-stat-val">${s.sv.toLocaleString()}</div><div class="pm-stat-lbl">Saves</div></div><div class="pm-stat" style="grid-column:3/5"><div class="pm-stat-val" style="color:var(--accent)">${roundPts(s.sv*0.02)}</div><div class="pm-stat-lbl">Save pts</div></div>`;
    document.getElementById('pm-pts-breakdown').innerHTML = `<div class="pm-pts-item"><div class="pv">${s.w*3}</div><div class="pl">${s.w}W × 3</div></div><div class="pm-pts-item"><div class="pv">${s.l}</div><div class="pl">${s.l}L × 1</div></div><div class="pm-pts-item"><div class="pv">${roundPts(s.otl*1.5)}</div><div class="pl">${s.otl}OTL × 1.5</div></div><div class="pm-pts-item"><div class="pv">${s.so*2}</div><div class="pl">${s.so}SO × 2</div></div><div class="pm-pts-item"><div class="pv">${roundPts(s.sv*0.02)}</div><div class="pl">${s.sv.toLocaleString()}SV × 0.02</div></div>`;
  } else {
    statsGrid.innerHTML = `<div class="pm-stat"><div class="pm-stat-val">${s.g}</div><div class="pm-stat-lbl">Goals</div></div><div class="pm-stat"><div class="pm-stat-val">${s.a}</div><div class="pm-stat-lbl">Assists</div></div><div class="pm-stat"><div class="pm-stat-val">${s.sog}</div><div class="pm-stat-lbl">SOG</div></div><div class="pm-stat"><div class="pm-stat-val">${pos==='D'?s.pim:'—'}</div><div class="pm-stat-lbl">PIM</div></div>`;
    let bd = `<div class="pm-pts-item"><div class="pv">${s.g}</div><div class="pl">${s.g}G × 1</div></div><div class="pm-pts-item"><div class="pv">${s.a}</div><div class="pl">${s.a}A × 1</div></div><div class="pm-pts-item"><div class="pv">${roundPts(s.sog*0.11)}</div><div class="pl">${s.sog}SOG × 0.11</div></div>`;
    if (pos==='D') bd += `<div class="pm-pts-item"><div class="pv">${roundPts(s.pim*0.25)}</div><div class="pl">${s.pim}PIM × 0.25</div></div>`;
    document.getElementById('pm-pts-breakdown').innerHTML = bd;
  }
  document.getElementById('pm-total-pts').textContent = calcPrevPts(s);
  const btn = document.getElementById('pm-pick-btn');
  if (btn) {
    const ap = typeof picks !== 'undefined' && picks[boxId] === playerName;
    btn.textContent = ap ? `✓ ${playerName} already selected` : `Pick ${playerName}`;
    btn.disabled = ap;
  }
  document.getElementById('player-modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePlayerModal(e) {
  if (e && e.target !== document.getElementById('player-modal-overlay')) return;
  document.getElementById('player-modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
  playerModalContext = null;
}

function confirmModalPick() {
  if (!playerModalContext) return;
  const { boxId, playerName, radio } = playerModalContext;
  radio.checked = true;
  pick(boxId, playerName, radio);
  document.getElementById('pm-pick-btn').textContent = `✓ ${playerName} selected`;
  document.getElementById('pm-pick-btn').disabled = true;
  setTimeout(() => {
    document.getElementById('player-modal-overlay').classList.remove('open');
    document.body.style.overflow = '';
    playerModalContext = null;
  }, 600);
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closePlayerModal(); closeTeamPanel(); }
});

// ══════════ DRAFT ══════════
let picks = {};

function buildDraft() {
  const draft = document.getElementById('draft'); if (!draft) return;
  draft.innerHTML = BOXES.map(box => {
    const typeLabel = box.type==='G'?'Goalie':box.type==='D'?'Defense':'Forward';
    const players = [...box.players]
      .sort((a,b) => (b.pts||calcPrevPts(PREV_STATS[b.name])||0) - (a.pts||calcPrevPts(PREV_STATS[a.name])||0))
      .map(p => {
        const rid = `radio-${box.id}-${p.name.replace(/\W/g,'')}`;
        const displayPts = p.pts || calcPrevPts(PREV_STATS[p.name]) || 0;
        const irTag = IR_STATUS[p.name] ? ' <span class="ir-badge" style="font-size:9px;padding:1px 5px;border-radius:3px;background:#c0392b;color:#fff;margin-left:4px">IR</span>' : '';
        return `<div style="display:flex;align-items:center;gap:4px;margin-bottom:3px">
          <label class="popt" id="opt-${box.id}-${p.name.replace(/\W/g,'')}" style="flex:1;margin-bottom:0${IR_STATUS[p.name]?';opacity:0.55':''}">
            <input type="radio" name="b${box.id}" value="${p.name}" id="${rid}" onchange="pick(${box.id},'${p.name}',this)">
            <div style="flex:1"><div class="popt-name">${p.name}${irTag}</div><div class="popt-team">${p.team}</div></div>
            <div style="text-align:right"><div class="popt-pts">${displayPts}</div><div class="popt-pts-label">prev pts</div></div>
          </label>
          <button class="player-info-btn" title="View ${p.name} stats" onclick="event.stopPropagation();openPlayerModal('${p.name.replace(/'/g,"\\'")}','${p.team}','${box.type}',${box.id},document.getElementById('${rid}'))">ℹ</button>
        </div>`;
      }).join('');
    return `<div class="box-wrap" id="bx-${box.id}"><div class="box-hd"><div><div class="box-type">${typeLabel}</div><div class="box-name">${box.label}</div></div><div class="box-check" id="chk-${box.id}">✓</div></div><div class="player-opts">${players}</div></div>`;
  }).join('');
  renderChips();
}

function pick(boxId, name, radio) {
  picks[boxId] = name;
  document.querySelectorAll(`[name=b${boxId}]`).forEach(r => r.closest('.popt').classList.remove('sel'));
  radio.closest('.popt').classList.add('sel');
  const box = document.getElementById('bx-'+boxId);
  box.classList.add('done'); box.classList.remove('error');
  const chk = document.getElementById('chk-'+boxId);
  chk.style.background='var(--burgundy)'; chk.style.borderColor='var(--burgundy)'; chk.style.color='#fff';
  renderChips();
  const n = Object.keys(picks).length;
  document.getElementById('pc').textContent = n;
  document.getElementById('pbar').style.width = Math.round(n/24*100)+'%';
}

function renderChips() {
  const el = document.getElementById('chips'); if (!el) return;
  el.innerHTML = BOXES.map(b => {
    const p = picks[b.id];
    return p ? `<span class="chip">${p.split(' ').pop()}</span>` : `<span class="chip empty">${b.label}</span>`;
  }).join('');
}

function updateProgress() {
  const n = Object.keys(picks).length;
  const pc = document.getElementById('pc'), pb = document.getElementById('pbar');
  if (pc) pc.textContent = n;
  if (pb) pb.style.width = Math.round(n/24*100)+'%';
}

// ══════════ SUBMIT ENTRY ══════════
async function submitEntry() {
  const f    = document.getElementById('ff').value.trim();
  const l    = document.getElementById('fl').value.trim();
  const e    = document.getElementById('fe').value.trim();
  const ph   = document.getElementById('fp').value.trim();
  const team = document.getElementById('ft').value.trim() || `${f}'s Team`;

  // ── AGT-007: email prefs ──
  const emailDaily  = document.getElementById('email-daily')?.checked  || false;
  const emailWeekly = document.getElementById('email-weekly')?.checked || false;

  if (!f||!l) { toast('Missing name','Enter your first and last name.'); return; }
  if (!e)     { toast('Missing email','Enter your email address.'); return; }

  document.querySelectorAll('.box-wrap').forEach(el => el.classList.remove('error'));
  const missingBoxes = BOXES.filter(b => !picks[b.id]);
  if (missingBoxes.length > 0) {
    missingBoxes.forEach(b => { const el=document.getElementById('bx-'+b.id); if(el)el.classList.add('error'); });
    const first = document.getElementById('bx-'+missingBoxes[0].id);
    if (first) first.scrollIntoView({behavior:'smooth',block:'center'});
    toast('Picks incomplete','Missing: '+missingBoxes.map(b=>b.label).join(', '));
    return;
  }

  if (Object.values(divisionPicks).filter(Boolean).length < 4) {
    toast('Division picks missing','Please pick a winner for all 4 divisions.');
    return;
  }

  const picksArray = Array.from({length:24}, (_,i) => picks[i+1]||'');
  const btn = document.querySelector('.btn-gold'), originalText = btn.innerHTML;
  btn.innerHTML = '⏳ Submitting…'; btn.disabled = true; btn.style.opacity = '0.7';

  try {
    const response = await fetch(WEBAPP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        firstName: f, lastName: l, email: e, phone: ph, teamName: team,
        picks: picksArray,
        emailDaily,
        emailWeekly,
        divisions: {
          atlantic:     divisionPicks['Atlantic']     || '',
          metropolitan: divisionPicks['Metropolitan'] || '',
          central:      divisionPicks['Central']      || '',
          pacific:      divisionPicks['Pacific']      || '',
        }
      })
    });
    const result = await response.json();
    if (result.success) {
      totalEntries++;
      updatePayouts();
      const confirmData = {
        entryId: result.entryId,
        firstName: f, lastName: l, email: e, teamName: team,
        picks: picksArray,
        divisions: { atlantic:divisionPicks['Atlantic']||'', metropolitan:divisionPicks['Metropolitan']||'', central:divisionPicks['Central']||'', pacific:divisionPicks['Pacific']||'' }
      };
      sessionStorage.setItem('aahl_confirm', JSON.stringify(confirmData));
      setTimeout(() => window.location.href = 'confirmation.html', 400);
    } else {
      toast('Submission failed', result.message||result.error||'Something went wrong.');
    }
  } catch(err) {
    toast('Connection error','Could not reach the server.');
  } finally {
    btn.innerHTML = originalText; btn.disabled = false; btn.style.opacity = '1';
  }
}

// ══════════ ADMIN ══════════
function adminAdd() {
  const p = document.getElementById('ap').value.trim(), pts = parseInt(document.getElementById('apts').value)||0;
  if (!p||!pts) return;
  const log = document.getElementById('alog'), now = new Date().toLocaleTimeString('en-CA',{hour:'2-digit',minute:'2-digit'});
  log.innerHTML = `${now} — +${pts} pts → ${p}\n` + log.innerHTML;
  document.getElementById('ap').value = ''; document.getElementById('apts').value = '';
  toast('Points added', `+${pts} pts added to ${p}`);
}

// ══════════ PIXEL ALPACA RUNNER ══════════
(function() {
  function initAlpaca() {
    var el = document.querySelector('.alpaca-runner');
    if (!el) return;
    var x = 170, dir = 1, paused = false, bobT = 0, last = null;
    var MIN_X = 170, MAX_X = 320, SPEED = 60;
    el.style.left = x + 'px';
    el.style.transform = 'translateY(-50%) scaleX(1)';
    function frame(ts) {
      if (!last) last = ts;
      var dt = Math.min((ts - last) / 1000, 0.05); last = ts;
      if (!paused) {
        x += dir * SPEED * dt; bobT += dt;
        el.style.top = 'calc(50% + ' + (Math.sin(bobT * Math.PI * 2 / 0.3) * 3) + 'px)';
        el.style.left = Math.round(x) + 'px';
        if (dir === 1 && x >= MAX_X) { x = MAX_X; paused = true; setTimeout(function() { dir = -1; el.style.transform = 'translateY(-50%) scaleX(-1)'; paused = false; }, 1000); }
        if (dir === -1 && x <= MIN_X) { x = MIN_X; paused = true; setTimeout(function() { dir = 1; el.style.transform = 'translateY(-50%) scaleX(1)'; paused = false; }, 1000); }
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', initAlpaca); } else { initAlpaca(); }
})();

// ══════════ LIVE GAME INDICATOR ══════════
(function(){
  function isGameTime() {
    const now = new Date(), hour = now.getHours(), day = now.getDay();
    return (day === 0 || day >= 2) && hour >= 19 && hour <= 23;
  }
  function updateLiveIndicator() {
    const tag = document.querySelector('.ticker-tag'); if (!tag) return;
    if (isGameTime()) { tag.classList.add('live'); tag.innerHTML = '<span class="live-dot">● LIVE</span>'; }
    else { tag.classList.remove('live'); tag.textContent = 'Last Night'; }
  }
  updateLiveIndicator();
  setInterval(updateLiveIndicator, 60000);
})();

// ══════════ THEME TOGGLE ══════════
(function(){
  function initTheme() {
    const saved = localStorage.getItem('aahl-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    return theme;
  }
  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('aahl-theme', next);
    return next;
  }
  function addThemeToggle() {
    const nav = document.querySelector('nav');
    if (!nav || document.getElementById('theme-toggle')) return;
    const btn = document.createElement('button');
    btn.id = 'theme-toggle'; btn.className = 'theme-toggle';
    btn.innerHTML = '🌓'; btn.title = 'Toggle theme';
    btn.onclick = () => { const theme = toggleTheme(); btn.innerHTML = theme === 'dark' ? '☀️' : '🌙'; };
    nav.appendChild(btn);
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    btn.innerHTML = current === 'dark' ? '☀️' : '🌙';
  }
  initTheme();
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', addThemeToggle); } else { addThemeToggle(); }
})();

// ══════════ AUTO-REFRESH DURING GAMES ══════════
(function(){
  let refreshInterval;
  function shouldAutoRefresh() { const h = new Date().getHours(); return h >= 19 && h <= 23; }
  function startAutoRefresh() {
    if (refreshInterval) return;
    refreshInterval = setInterval(() => {
      if (typeof loadData === 'function') loadData();
      buildTicker();
    }, 300000);
  }
  function stopAutoRefresh() { if (refreshInterval) { clearInterval(refreshInterval); refreshInterval = null; } }
  function checkAndUpdate() { if (shouldAutoRefresh()) startAutoRefresh(); else stopAutoRefresh(); }
  checkAndUpdate();
  setInterval(checkAndUpdate, 60000);
})();

// Each HTML page manages its own init via inline script block
