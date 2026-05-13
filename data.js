// ══════════════════════════════════════════════
// data.js — AAHL Data Layer
// Static data, CSV URLs, fetch functions, scoring
// ══════════════════════════════════════════════

// ══════════ CONFIG ══════════
const WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbzqqijpX3BoRCDXMH5ZzWCkN2ZlALGJd_HBHMetPlXCir7_ue_WfEtqvo3NM0Z-xMhKUA/exec';

const SHEET_BASE = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQlbZGgMZjZhJIVIJoXKNASqTsn-sYJN5u9QmUGKGaJDdqXHbNSxbCeWR4qkS1PqCnP5AvVezXwOMzj/pub';
const _t = () => '&t=' + Date.now();

const PLAYERS_CSV      = SHEET_BASE + '?gid=1949508708&single=true&output=csv' + _t();
const STANDINGS_CSV    = SHEET_BASE + '?gid=1410587271&single=true&output=csv' + _t();
const BOXES_SHEET_CSV  = SHEET_BASE + '?gid=1556726328&single=true&output=csv' + _t();
const PREV_STATS_CSV   = SHEET_BASE + '?gid=1431377363&single=true&output=csv' + _t();
const NIGHTLY_STATS_CSV= SHEET_BASE + '?gid=615464608&single=true&output=csv'  + _t();
const ENTRIES_CSV      = SHEET_BASE + '?gid=0&single=true&output=csv'           + _t();
const BOXES_CSV        = SHEET_BASE + '?gid=1556726328&single=true&output=csv'  + _t();

// ══════════ RUNTIME STATE ══════════
let IR_STATUS        = {};
let PLAYER_ID_MAP    = {};
let PLAYER_TEAM_MAP  = {};
let PLAYER_HEADSHOT_MAP = {};
let LIVE_BOARD       = [];
let NIGHTLY_STATS    = [];
let PREV_SEASON_LABEL = '2025–26';

const SEASON = '20252026';

const TEAM_ABBREV = {
  'ANA':'ANA','BOS':'BOS','BUF':'BUF','CAR':'CAR','CBJ':'CBJ',
  'CGY':'CGY','CHI':'CHI','COL':'COL','DAL':'DAL','DET':'DET',
  'EDM':'EDM','FLA':'FLA','LA':'LAK', 'MIN':'MIN','MTL':'MTL',
  'NJ':'NJD', 'NSH':'NSH','NYI':'NYI','NYR':'NYR','OTT':'OTT',
  'PHI':'PHI','PIT':'PIT','SEA':'SEA','STL':'STL','TB':'TBL',
  'TOR':'TOR','UTA':'UTA','VAN':'VAN','VGK':'VGK','WSH':'WSH',
  'WPG':'WPG','ARI':'ARI',
};

// ══════════ SCORING ══════════
const SCORING = {
  F: { goal:1, assist:1, sog:0.11, hatTrickBonus:3 },
  D: { goal:1, assist:1, sog:0.11, hatTrickBonus:3, pim:0.25 },
  G: { win:3, loss:1, otl:1.5, shutout:2, save:0.02 }
};

function roundPts(n) { return Math.round(n * 100) / 100; }
function isHatTrick(p) { return p.pos !== 'G' && (p.goals || 0) >= 3; }

function calcPts(p) {
  const r = SCORING[p.pos] || SCORING.F;
  if (p.pos === 'G') return roundPts((p.wins||0)*r.win+(p.losses||0)*r.loss+(p.otl||0)*r.otl+(p.shutouts||0)*r.shutout+(p.saves||0)*r.save);
  return roundPts((p.goals||0)*r.goal+(p.assists||0)*r.assist+(p.sog||0)*r.sog+(isHatTrick(p)?r.hatTrickBonus:0)+(p.pos==='D'?(p.pim||0)*r.pim:0));
}

function calcPrevPts(s) {
  if (!s) return 0;
  if (s.pos === 'G') return roundPts(s.w*3+s.l*1+s.otl*1.5+s.so*2+s.sv*0.02);
  return roundPts((s.g||0)*1+(s.a||0)*1+(s.sog||0)*0.11+(s.pos==='D'?(s.pim||0)*0.25:0));
}

function nightlyPts(p) {
  if (p.pos==='G') return roundPts(p.wins*3+p.losses*1+p.otl*1.5+p.shutouts*2+p.saves*0.02);
  return roundPts(p.goals*1+p.assists*1+p.sog*0.11+(p.goals>=3?3:0)+(p.pos==='D'?p.pim*0.25:0));
}

// ══════════ HEADSHOTS ══════════
function getPlayerHeadshotUrls(playerName) {
  const directUrl = PLAYER_HEADSHOT_MAP[playerName];
  if (directUrl) return [directUrl];
  const playerId = PLAYER_ID_MAP[playerName];
  if (!playerId) return [];
  const shortTeam = PLAYER_TEAM_MAP[playerName] || '';
  const team = TEAM_ABBREV[shortTeam] || shortTeam;
  const urls = [];
  if (team) urls.push(`https://assets.nhle.com/mugs/nhl/${SEASON}/${team}/${playerId}.png`);
  urls.push(`https://assets.nhle.com/mugs/nhl/00/00/${playerId}.png`);
  return urls;
}

function irBadge(name) {
  return IR_STATUS[name] ? ' <span class="ir-badge">IR</span>' : '';
}

function initials(n) { return n.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2); }

// ══════════ CSV PARSER ══════════
function parseCSVLine(line) {
  const cols = []; let cur = '', inQ = false;
  for (const ch of line) {
    if (ch==='"') { inQ=!inQ; }
    else if (ch===','&&!inQ) { cols.push(cur.trim()); cur=''; }
    else { cur+=ch; }
  }
  cols.push(cur.trim());
  return cols;
}

// ══════════ FETCH: IR + PLAYER DATA ══════════
async function fetchIRStatuses() {
  try {
    const res = await fetch(PLAYERS_CSV);
    const text = await res.text();
    text.trim().split('\n').slice(1).forEach(line => {
      const cols = line.split(',');
      const name = (cols[0]||'').trim();
      if (!name) return;
      IR_STATUS[name]    = (cols[15]||'').trim().toUpperCase() === 'TRUE';
      const playerId     = (cols[16]||'').trim();
      const team         = (cols[1]||'').trim();
      const headshot     = (cols[17]||'').trim();
      if (playerId) PLAYER_ID_MAP[name]     = playerId;
      if (team)     PLAYER_TEAM_MAP[name]   = team;
      if (headshot) PLAYER_HEADSHOT_MAP[name] = headshot;
    });
    console.log('IR/Players loaded:', Object.keys(PLAYER_ID_MAP).length, 'player IDs');
  } catch(err) {
    console.warn('IR fetch failed:', err);
  }
}

// ══════════ FETCH: STANDINGS ══════════
function parseStandingsCSV(csv) {
  return csv.trim().split('\n').slice(1).map(line => {
    const cols = line.split(',');
    return {
      rank:  parseInt(cols[0])   || 0,
      entry: (cols[1]||'').trim(),
      name:  (cols[2]||'').trim(),
      owner: (cols[3]||'').trim(),
      pts:   parseFloat(cols[5]) || 0,
      trend: (cols[7]||'=').trim(),
    };
  }).filter(e => e.name);
}

async function fetchStandings() {
  try {
    const res = await fetch(STANDINGS_CSV);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    LIVE_BOARD = parseStandingsCSV(await res.text());
    console.log('Standings loaded:', LIVE_BOARD.length, 'entries');
  } catch(err) {
    console.warn('Standings fetch failed:', err);
    LIVE_BOARD = [];
  }
}

// ══════════ FETCH: BOXES FROM SHEET ══════════
async function fetchBoxesFromSheet() {
  try {
    const res = await fetch(BOXES_SHEET_CSV);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const lines = (await res.text()).trim().split('\n').slice(1);
    const boxMap = {};
    lines.forEach(line => {
      const cols = parseCSVLine(line);
      const boxId = parseInt(cols[0])||0;
      if (!boxId || !cols[3]) return;
      if (!boxMap[boxId]) boxMap[boxId] = { id:boxId, label:cols[1], type:cols[2], players:[] };
      boxMap[boxId].players.push({ name:cols[3], team:cols[4], pts:parseFloat(cols[6])||0 });
    });
    const boxes = Object.values(boxMap).sort((a,b) => a.id - b.id);
    if (boxes.length) {
      BOXES.length = 0;
      boxes.forEach(b => BOXES.push(b));
      console.log('Boxes loaded from sheet:', BOXES.length);
    }
  } catch(err) {
    console.warn('Boxes sheet not available — using defaults:', err.message);
  }
}

// ══════════ FETCH: PREV STATS ══════════
async function fetchPrevStats() {
  try {
    const res = await fetch(PREV_STATS_CSV);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const lines = (await res.text()).trim().split('\n').slice(1);
    if (lines.length) {
      const firstCols = lines[0].split(',');
      const seasonId = (firstCols[14]||'').trim();
      if (seasonId.length === 8) {
        PREV_SEASON_LABEL = `${seasonId.slice(0,4)}–${seasonId.slice(6,8)}`;
      }
    }
    lines.forEach(line => {
      const cols = parseCSVLine(line);
      const name = cols[0]; if (!name) return;
      const pos  = (cols[2]||'').trim();
      PREV_STATS[name] = pos === 'G'
        ? { pos:'G', w:parseInt(cols[8])||0, l:parseInt(cols[9])||0, otl:parseInt(cols[10])||0, so:parseInt(cols[11])||0, sv:parseInt(cols[12])||0 }
        : { pos, g:parseInt(cols[4])||0, a:parseInt(cols[5])||0, sog:parseInt(cols[6])||0, pim:parseInt(cols[7])||0 };
    });
    console.log('PrevStats loaded:', Object.keys(PREV_STATS).length, 'players');
  } catch(err) {
    console.warn('PrevStats fetch failed — using hardcoded fallback:', err.message);
  }
}

// ══════════ FETCH: NIGHTLY STATS ══════════
function parseNightlyCSV(csv) {
  return csv.trim().split('\n').slice(1).map(line => {
    const cols = line.split(',');
    return {
      name:     (cols[0]||'').trim(),
      team:     (cols[1]||'').trim(),
      pos:      (cols[2]||'').trim(),
      game:     (cols[3]||'').trim(),
      goals:    parseInt(cols[4])||0,
      assists:  parseInt(cols[5])||0,
      sog:      parseInt(cols[6])||0,
      pim:      parseInt(cols[7])||0,
      wins:     parseInt(cols[8])||0,
      losses:   parseInt(cols[9])||0,
      otl:      parseInt(cols[10])||0,
      shutouts: parseInt(cols[11])||0,
      saves:    parseInt(cols[12])||0,
    };
  }).filter(p => p.name);
}

async function fetchNightlyStats() {
  try {
    const res = await fetch(NIGHTLY_STATS_CSV);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    NIGHTLY_STATS = parseNightlyCSV(await res.text());
    console.log('Nightly stats loaded:', NIGHTLY_STATS.length, 'players');
  } catch(err) {
    console.error('NightlyStats fetch failed:', err);
    NIGHTLY_STATS = [];
  }
}

// ══════════ DIVISIONS ══════════
const DIVISIONS = {
  'Atlantic':     { conf:'Eastern', teams:['Boston Bruins','Buffalo Sabres','Detroit Red Wings','Florida Panthers','Montreal Canadiens','Ottawa Senators','Tampa Bay Lightning','Toronto Maple Leafs'] },
  'Metropolitan': { conf:'Eastern', teams:['Carolina Hurricanes','Columbus Blue Jackets','New Jersey Devils','New York Islanders','New York Rangers','Philadelphia Flyers','Pittsburgh Penguins','Washington Capitals'] },
  'Central':      { conf:'Western', teams:['Arizona Coyotes','Chicago Blackhawks','Colorado Avalanche','Dallas Stars','Minnesota Wild','Nashville Predators','St. Louis Blues','Winnipeg Jets'] },
  'Pacific':      { conf:'Western', teams:['Anaheim Ducks','Calgary Flames','Edmonton Oilers','Los Angeles Kings','San Jose Sharks','Seattle Kraken','Utah Hockey Club','Vancouver Canucks'] },
};

// ══════════ BOXES ══════════
const BOXES = [
  {id:1, label:'Forwards 1', type:'F', players:[{name:'Leon Draisaitl',team:'EDM',pts:160},{name:'Nikita Kucherov',team:'TB',pts:144},{name:'Nathan MacKinnon',team:'COL',pts:140},{name:'Connor McDavid',team:'EDM',pts:132},{name:'Artemi Panarin',team:'NYR',pts:120}]},
  {id:2, label:'Forwards 2', type:'F', players:[{name:'Mitch Marner',team:'TOR',pts:107},{name:'Auston Matthews',team:'TOR',pts:107},{name:'Elias Pettersson',team:'VAN',pts:102},{name:'Mikko Rantanen',team:'COL',pts:104},{name:'Jason Robertson',team:'DAL',pts:109}]},
  {id:3, label:'Forwards 3', type:'F', players:[{name:'Jack Hughes',team:'NJ',pts:92},{name:'Kirill Kaprizov',team:'MIN',pts:96},{name:'J.T. Miller',team:'VAN',pts:100},{name:'William Nylander',team:'TOR',pts:92},{name:'Brayden Point',team:'TB',pts:82}]},
  {id:4, label:'Forwards 4', type:'F', players:[{name:'Sebastian Aho',team:'CAR',pts:90},{name:'Jesper Bratt',team:'NJ',pts:83},{name:'Sidney Crosby',team:'PIT',pts:94},{name:'Jake Guentzel',team:'CAR',pts:77},{name:'Clayton Keller',team:'ARI',pts:76}]},
  {id:5, label:'Forwards 5', type:'F', players:[{name:'Aleksander Barkov',team:'FLA',pts:86},{name:'Ryan Nugent-Hopkins',team:'EDM',pts:87},{name:'Kevin Fiala',team:'LA',pts:82},{name:'Dylan Larkin',team:'DET',pts:82},{name:'Steven Stamkos',team:'TB',pts:81}]},
  {id:6, label:'Forwards 6', type:'F', players:[{name:'Drake Batherson',team:'OTT',pts:82},{name:'Matt Boldy',team:'MIN',pts:75},{name:'Cole Caufield',team:'MTL',pts:82},{name:'Brandon Hagel',team:'TB',pts:74},{name:'Jordan Kyrou',team:'STL',pts:82}]},
  {id:7, label:'Forwards 7', type:'F', players:[{name:'Wyatt Johnston',team:'DAL',pts:82},{name:'Mats Zuccarello',team:'MIN',pts:82},{name:'Nikolaj Ehlers',team:'WPG',pts:73},{name:'John Tavares',team:'TOR',pts:82},{name:'Alex Tuch',team:'BUF',pts:75}]},
  {id:8, label:'Forwards 8', type:'F', players:[{name:'Bo Horvat',team:'NYI',pts:81},{name:'Chris Kreider',team:'NYR',pts:82},{name:'Elias Lindholm',team:'VAN',pts:75},{name:'Tomas Hertl',team:'VGK',pts:72},{name:'Brock Nelson',team:'NYI',pts:82}]},
  {id:9, label:'Forwards 9', type:'F', players:[{name:'Quinton Byfield',team:'LA',pts:80},{name:'Matt Duchene',team:'DAL',pts:80},{name:'Joel Eriksson Ek',team:'MIN',pts:77},{name:'Brad Marchand',team:'BOS',pts:82},{name:'Jonathan Marchessault',team:'VGK',pts:82}]},
  {id:10,label:'Forwards 10',type:'F', players:[{name:"Ryan O'Reilly",team:'NSH',pts:69},{name:'Charlie McAvoy',team:'BOS',pts:74},{name:'Morgan Rielly',team:'TOR',pts:72},{name:'Shea Theodore',team:'VGK',pts:82},{name:'Zach Werenski',team:'CBJ',pts:71}]},
  {id:11,label:'Forwards 11',type:'F', players:[{name:'Dylan Cozens',team:'BUF',pts:75},{name:'Claude Giroux',team:'OTT',pts:82},{name:'Andrei Kuzmenko',team:'CGY',pts:72},{name:'Evgeni Malkin',team:'PIT',pts:82},{name:'Alex Ovechkin',team:'WSH',pts:79}]},
  {id:12,label:'Forwards 12',type:'F', players:[{name:'Jake DeBrusk',team:'BOS',pts:75},{name:'Owen Tippett',team:'PHI',pts:82},{name:'Andrei Svechnikov',team:'CAR',pts:59},{name:'Tommy Novak',team:'NSH',pts:82},{name:'Mats Zuccarello',team:'MIN',pts:82}]},
  {id:13,label:'Defense 1',  type:'D', players:[{name:'Noah Dobson',team:'NYI',pts:82},{name:'Dougie Hamilton',team:'NJ',pts:62},{name:'Victor Hedman',team:'TB',pts:78},{name:'Quinn Hughes',team:'VAN',pts:82},{name:'Josh Morrissey',team:'WPG',pts:82}]},
  {id:14,label:'Defense 2',  type:'D', players:[{name:'MacKenzie Weegar',team:'CGY',pts:82},{name:'Erik Karlsson',team:'PIT',pts:67},{name:'Brady Skjei',team:'CAR',pts:80},{name:'Luke Hughes',team:'NJ',pts:82},{name:'Thomas Harley',team:'DAL',pts:79}]},
  {id:15,label:'Defense 3',  type:'D', players:[{name:'Travis Sanheim',team:'PHI',pts:82},{name:'Brent Burns',team:'CAR',pts:82},{name:'Jakob Chychrun',team:'OTT',pts:82},{name:'Sean Durzi',team:'ARI',pts:82},{name:'Cam Fowler',team:'ANA',pts:82}]},
  {id:16,label:'Defense 4',  type:'D', players:[{name:'Torey Krug',team:'STL',pts:77},{name:'Rasmus Dahlin',team:'BUF',pts:82},{name:'Alex Pietrangelo',team:'VGK',pts:64},{name:'Darren Raddysh',team:'TB',pts:82},{name:'Neal Pionk',team:'WPG',pts:79}]},
  {id:17,label:'Defense 5',  type:'D', players:[{name:'Adam Fox',team:'NYR',pts:73},{name:'Rasmus Andersson',team:'CGY',pts:82},{name:'Roman Josi',team:'NSH',pts:82},{name:'Quinn Hughes',team:'VAN',pts:82},{name:'Cale Makar',team:'COL',pts:77}]},
  {id:18,label:'Defense 6',  type:'D', players:[{name:'Rasmus Sandin',team:'WSH',pts:70},{name:'Jacob Trouba',team:'NYR',pts:82},{name:'Damon Severson',team:'CBJ',pts:82},{name:'Ivan Provorov',team:'CBJ',pts:73},{name:'Evan Bouchard',team:'EDM',pts:82}]},
  {id:19,label:'Goalie 1',   type:'G', players:[{name:'Thatcher Demko',team:'VAN',pts:51},{name:'Connor Hellebuyck',team:'WPG',pts:60},{name:'Jake Oettinger',team:'DAL',pts:56},{name:'Juuse Saros',team:'NSH',pts:55},{name:'Stuart Skinner',team:'EDM',pts:56}]},
  {id:20,label:'Goalie 2',   type:'G', players:[{name:'Sergei Bobrovsky',team:'FLA',pts:56},{name:'Pyotr Kochetkov',team:'CAR',pts:46},{name:'Jordan Binnington',team:'STL',pts:54},{name:'Andrei Vasilevskiy',team:'TB',pts:52},{name:'Filip Gustavsson',team:'MIN',pts:56}]},
  {id:21,label:'Goalie 3',   type:'G', players:[{name:'Cam Talbot',team:'CGY',pts:54},{name:'Jacob Markstrom',team:'CGY',pts:48},{name:'Ilya Sorokin',team:'NYI',pts:56},{name:'Filip Gustavsson',team:'MIN',pts:56},{name:'Linus Ullmark',team:'BOS',pts:41}]},
  {id:22,label:'Goalie 4',   type:'G', players:[{name:'Laurent Brossoit',team:'VGK',pts:23},{name:'Kevin Lankinen',team:'NSH',pts:47},{name:'Philipp Grubauer',team:'SEA',pts:47},{name:'Lukas Dostal',team:'ANA',pts:44},{name:'Karel Vejmelka',team:'ARI',pts:47}]},
  {id:23,label:'Goalie 5',   type:'G', players:[{name:'Joey Daccord',team:'SEA',pts:50},{name:'Semyon Varlamov',team:'NYI',pts:47},{name:'Joonas Korpisalo',team:'CBJ',pts:55},{name:'Ivan Fedotov',team:'PHI',pts:20},{name:'Thomas Greiss',team:'STL',pts:30}]},
  {id:24,label:'Goalie 6',   type:'G', players:[{name:'Charlie Lindgren',team:'WSH',pts:40},{name:'Mackenzie Blackwood',team:'VAN',pts:35},{name:'Alex Lyon',team:'FLA',pts:44},{name:'Tristan Jarry',team:'PIT',pts:34},{name:'Lukas Dostal',team:'ANA',pts:44}]},
];

// ══════════ PREV STATS (hardcoded fallback) ══════════
const PREV_STATS = {
  'Leon Draisaitl':        {g:52,a:89,sog:246,pim:30, pos:'F'},
  'Nikita Kucherov':       {g:44,a:100,sog:231,pim:24,pos:'F'},
  'Nathan MacKinnon':      {g:51,a:89,sog:278,pim:44, pos:'F'},
  'Connor McDavid':        {g:42,a:100,sog:259,pim:54,pos:'F'},
  'Artemi Panarin':        {g:34,a:86,sog:198,pim:20, pos:'F'},
  'Mitch Marner':          {g:26,a:81,sog:198,pim:16, pos:'F'},
  'Auston Matthews':       {g:69,a:40,sog:311,pim:20, pos:'F'},
  'Elias Pettersson':      {g:36,a:66,sog:212,pim:28, pos:'F'},
  'Mikko Rantanen':        {g:55,a:49,sog:244,pim:40, pos:'F'},
  'Jason Robertson':       {g:37,a:72,sog:229,pim:16, pos:'F'},
  'Jack Hughes':           {g:37,a:55,sog:192,pim:24, pos:'F'},
  'Kirill Kaprizov':       {g:36,a:51,sog:212,pim:18, pos:'F'},
  'J.T. Miller':           {g:29,a:71,sog:178,pim:34, pos:'F'},
  'William Nylander':      {g:40,a:52,sog:224,pim:22, pos:'F'},
  'Brayden Point':         {g:33,a:49,sog:196,pim:26, pos:'F'},
  'Sebastian Aho':         {g:38,a:52,sog:219,pim:30, pos:'F'},
  'Jesper Bratt':          {g:28,a:55,sog:176,pim:18, pos:'F'},
  'Sidney Crosby':         {g:42,a:52,sog:209,pim:28, pos:'F'},
  'Jake Guentzel':         {g:35,a:42,sog:188,pim:24, pos:'F'},
  'Clayton Keller':        {g:29,a:47,sog:193,pim:22, pos:'F'},
  'Aleksander Barkov':     {g:31,a:55,sog:221,pim:20, pos:'F'},
  'Ryan Nugent-Hopkins':   {g:27,a:56,sog:168,pim:22, pos:'F'},
  'Kevin Fiala':           {g:28,a:54,sog:187,pim:24, pos:'F'},
  'Dylan Larkin':          {g:34,a:48,sog:211,pim:40, pos:'F'},
  'Steven Stamkos':        {g:28,a:53,sog:178,pim:20, pos:'F'},
  'Drake Batherson':       {g:27,a:55,sog:174,pim:20, pos:'F'},
  'Matt Boldy':            {g:28,a:35,sog:179,pim:14, pos:'F'},
  'Cole Caufield':         {g:32,a:50,sog:198,pim:18, pos:'F'},
  'Brandon Hagel':         {g:26,a:48,sog:184,pim:36, pos:'F'},
  'Jordan Kyrou':          {g:28,a:54,sog:192,pim:16, pos:'F'},
  'Wyatt Johnston':        {g:29,a:37,sog:167,pim:22, pos:'F'},
  'Anze Kopitar':          {g:22,a:47,sog:141,pim:12, pos:'F'},
  'Nikolaj Ehlers':        {g:28,a:45,sog:162,pim:16, pos:'F'},
  'John Tavares':          {g:27,a:55,sog:171,pim:14, pos:'F'},
  'Alex Tuch':             {g:22,a:53,sog:158,pim:26, pos:'F'},
  'Bo Horvat':             {g:31,a:31,sog:192,pim:22, pos:'F'},
  'Chris Kreider':         {g:39,a:27,sog:189,pim:38, pos:'F'},
  'Elias Lindholm':        {g:25,a:50,sog:177,pim:18, pos:'F'},
  'Tomas Hertl':           {g:27,a:45,sog:168,pim:20, pos:'F'},
  'Brock Nelson':          {g:28,a:37,sog:164,pim:16, pos:'F'},
  'Quinton Byfield':       {g:28,a:52,sog:178,pim:28, pos:'F'},
  'Matt Duchene':          {g:34,a:38,sog:177,pim:14, pos:'F'},
  'Joel Eriksson Ek':      {g:22,a:55,sog:159,pim:28, pos:'F'},
  'Brad Marchand':         {g:28,a:48,sog:172,pim:56, pos:'F'},
  'Jonathan Marchessault': {g:31,a:51,sog:182,pim:28, pos:'F'},
  "Ryan O'Reilly":         {g:18,a:51,sog:142,pim:20, pos:'F'},
  'Charlie McAvoy':        {g:11,a:48,sog:178,pim:32, pos:'D'},
  'Morgan Rielly':         {g:12,a:45,sog:156,pim:22, pos:'D'},
  'Shea Theodore':         {g:16,a:66,sog:196,pim:20, pos:'D'},
  'Zach Werenski':         {g:14,a:57,sog:188,pim:18, pos:'D'},
  'Dylan Cozens':          {g:29,a:46,sog:188,pim:30, pos:'F'},
  'Claude Giroux':         {g:27,a:42,sog:164,pim:28, pos:'F'},
  'Andrei Kuzmenko':       {g:24,a:48,sog:171,pim:22, pos:'F'},
  'Evgeni Malkin':         {g:28,a:54,sog:177,pim:48, pos:'F'},
  'Alex Ovechkin':         {g:36,a:28,sog:295,pim:26, pos:'F'},
  'Jake DeBrusk':          {g:27,a:30,sog:182,pim:34, pos:'F'},
  'Owen Tippett':          {g:27,a:30,sog:182,pim:16, pos:'F'},
  'Andrei Svechnikov':     {g:22,a:33,sog:148,pim:36, pos:'F'},
  'Tommy Novak':           {g:20,a:62,sog:144,pim:10, pos:'F'},
  'Mats Zuccarello':       {g:15,a:67,sog:118,pim:14, pos:'F'},
  'Noah Dobson':           {g:15,a:45,sog:178,pim:30, pos:'D'},
  'Dougie Hamilton':       {g:12,a:50,sog:162,pim:44, pos:'D'},
  'Victor Hedman':         {g:10,a:68,sog:171,pim:28, pos:'D'},
  'Quinn Hughes':          {g:16,a:66,sog:189,pim:22, pos:'D'},
  'Josh Morrissey':        {g:18,a:64,sog:196,pim:38, pos:'D'},
  'MacKenzie Weegar':      {g:11,a:41,sog:165,pim:32, pos:'D'},
  'Erik Karlsson':         {g:8, a:59,sog:158,pim:28, pos:'D'},
  'Brady Skjei':           {g:10,a:42,sog:148,pim:56, pos:'D'},
  'Luke Hughes':           {g:16,a:51,sog:147,pim:30, pos:'D'},
  'Thomas Harley':         {g:14,a:52,sog:166,pim:24, pos:'D'},
  'Travis Sanheim':        {g:12,a:37,sog:143,pim:38, pos:'D'},
  'Brent Burns':           {g:14,a:41,sog:198,pim:44, pos:'D'},
  'Jakob Chychrun':        {g:11,a:39,sog:152,pim:36, pos:'D'},
  'Sean Durzi':            {g:9, a:33,sog:128,pim:22, pos:'D'},
  'Cam Fowler':            {g:10,a:48,sog:144,pim:28, pos:'D'},
  'Torey Krug':            {g:13,a:44,sog:152,pim:30, pos:'D'},
  'Rasmus Dahlin':         {g:17,a:49,sog:211,pim:28, pos:'D'},
  'Alex Pietrangelo':      {g:8, a:56,sog:144,pim:34, pos:'D'},
  'Darren Raddysh':        {g:10,a:46,sog:152,pim:42, pos:'D'},
  'Neal Pionk':            {g:9, a:43,sog:138,pim:50, pos:'D'},
  'Adam Fox':              {g:14,a:52,sog:187,pim:20, pos:'D'},
  'Rasmus Andersson':      {g:11,a:43,sog:162,pim:38, pos:'D'},
  'Roman Josi':            {g:17,a:65,sog:218,pim:32, pos:'D'},
  'Cale Makar':            {g:24,a:53,sog:234,pim:18, pos:'D'},
  'Evan Bouchard':         {g:19,a:56,sog:254,pim:38, pos:'D'},
  'Rasmus Sandin':         {g:8, a:39,sog:132,pim:28, pos:'D'},
  'Jacob Trouba':          {g:8, a:33,sog:144,pim:66, pos:'D'},
  'Damon Severson':        {g:10,a:44,sog:148,pim:52, pos:'D'},
  'Ivan Provorov':         {g:7, a:36,sog:128,pim:44, pos:'D'},
  'Thatcher Demko':        {w:31,l:18,otl:5,so:5,sv:1488, pos:'G'},
  'Connor Hellebuyck':     {w:37,l:18,otl:4,so:6,sv:1502, pos:'G'},
  'Jake Oettinger':        {w:34,l:20,otl:5,so:4,sv:1401, pos:'G'},
  'Juuse Saros':           {w:29,l:22,otl:6,so:4,sv:1388, pos:'G'},
  'Stuart Skinner':        {w:31,l:14,otl:4,so:3,sv:886,  pos:'G'},
  'Sergei Bobrovsky':      {w:36,l:14,otl:4,so:6,sv:1421, pos:'G'},
  'Alexander Georgiev':    {w:31,l:15,otl:3,so:4,sv:1188, pos:'G'},
  'Pyotr Kochetkov':       {w:28,l:16,otl:4,so:3,sv:1122, pos:'G'},
  'Jordan Binnington':     {w:26,l:22,otl:5,so:3,sv:1188, pos:'G'},
  'Andrei Vasilevskiy':    {w:33,l:16,otl:4,so:5,sv:1298, pos:'G'},
  'Cam Talbot':            {w:24,l:18,otl:5,so:3,sv:966,  pos:'G'},
  'Jacob Markstrom':       {w:26,l:20,otl:4,so:4,sv:1144, pos:'G'},
  'Ilya Sorokin':          {w:24,l:24,otl:5,so:4,sv:1148, pos:'G'},
  'Filip Gustavsson':      {w:29,l:16,otl:4,so:5,sv:1198, pos:'G'},
  'Linus Ullmark':         {w:24,l:14,otl:4,so:4,sv:988,  pos:'G'},
  'Laurent Brossoit':      {w:12,l:8, otl:3,so:2,sv:488,  pos:'G'},
  'Kevin Lankinen':        {w:22,l:18,otl:3,so:2,sv:874,  pos:'G'},
  'Philipp Grubauer':      {w:20,l:16,otl:4,so:2,sv:822,  pos:'G'},
  'Lukas Dostal':          {w:22,l:18,otl:4,so:3,sv:911,  pos:'G'},
  'Karel Vejmelka':        {w:18,l:22,otl:5,so:2,sv:944,  pos:'G'},
  'Joey Daccord':          {w:26,l:16,otl:4,so:3,sv:1088, pos:'G'},
  'Semyon Varlamov':       {w:16,l:19,otl:4,so:1,sv:788,  pos:'G'},
  'Joonas Korpisalo':      {w:18,l:26,otl:4,so:2,sv:967,  pos:'G'},
  'Ivan Fedotov':          {w:8, l:12,otl:2,so:1,sv:488,  pos:'G'},
  'Thomas Greiss':         {w:10,l:14,otl:3,so:1,sv:544,  pos:'G'},
  'Charlie Lindgren':      {w:18,l:14,otl:3,so:2,sv:712,  pos:'G'},
  'Mackenzie Blackwood':   {w:22,l:14,otl:4,so:3,sv:866,  pos:'G'},
  'Alex Lyon':             {w:20,l:12,otl:3,so:1,sv:688,  pos:'G'},
  'Tristan Jarry':         {w:16,l:16,otl:3,so:2,sv:722,  pos:'G'},
  'Jonathan Quick':        {w:14,l:10,otl:2,so:1,sv:544,  pos:'G'},
};
