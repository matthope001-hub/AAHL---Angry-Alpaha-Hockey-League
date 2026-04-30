// ══════════ PRIOR SEASON STATS (2025-26) ══════════
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

// ══════════ DIVISIONS ══════════
const DIVISIONS = {
  'Atlantic': {
    conf: 'Eastern',
    teams: ['Boston Bruins','Buffalo Sabres','Detroit Red Wings','Florida Panthers',
            'Montreal Canadiens','Ottawa Senators','Tampa Bay Lightning','Toronto Maple Leafs']
  },
  'Metropolitan': {
    conf: 'Eastern',
    teams: ['Carolina Hurricanes','Columbus Blue Jackets','New Jersey Devils','New York Islanders',
            'New York Rangers','Philadelphia Flyers','Pittsburgh Penguins','Washington Capitals']
  },
  'Central': {
    conf: 'Western',
    teams: ['Arizona Coyotes','Chicago Blackhawks','Colorado Avalanche','Dallas Stars',
            'Minnesota Wild','Nashville Predators','St. Louis Blues','Winnipeg Jets']
  },
  'Pacific': {
    conf: 'Western',
    teams: ['Anaheim Ducks','Calgary Flames','Edmonton Oilers','Los Angeles Kings',
            'San Jose Sharks','Seattle Kraken','Utah Hockey Club','Vancouver Canucks']
  },
};

let divisionPicks = {};

// ══════════ BOXES DATA ══════════
const BOXES = [
  {id:1,label:'Forwards 1',type:'F',players:[
    {name:'Leon Draisaitl',team:'EDM',pts:160},{name:'Nikita Kucherov',team:'TB',pts:144},
    {name:'Nathan MacKinnon',team:'COL',pts:140},{name:'Connor McDavid',team:'EDM',pts:132},
    {name:'Artemi Panarin',team:'NYR',pts:120}]},
  {id:2,label:'Forwards 2',type:'F',players:[
    {name:'Mitch Marner',team:'TOR',pts:107},{name:'Auston Matthews',team:'TOR',pts:107},
    {name:'Elias Pettersson',team:'VAN',pts:102},{name:'Mikko Rantanen',team:'COL',pts:104},
    {name:'Jason Robertson',team:'DAL',pts:109}]},
  {id:3,label:'Forwards 3',type:'F',players:[
    {name:'Jack Hughes',team:'NJ',pts:92},{name:'Kirill Kaprizov',team:'MIN',pts:96},
    {name:'J.T. Miller',team:'VAN',pts:100},{name:'William Nylander',team:'TOR',pts:92},
    {name:'Brayden Point',team:'TB',pts:82}]},
  {id:4,label:'Forwards 4',type:'F',players:[
    {name:'Sebastian Aho',team:'CAR',pts:90},{name:'Jesper Bratt',team:'NJ',pts:83},
    {name:'Sidney Crosby',team:'PIT',pts:94},{name:'Jake Guentzel',team:'CAR',pts:77},
    {name:'Clayton Keller',team:'ARI',pts:76}]},
  {id:5,label:'Forwards 5',type:'F',players:[
    {name:'Aleksander Barkov',team:'FLA',pts:86},{name:'Ryan Nugent-Hopkins',team:'EDM',pts:87},
    {name:'Kevin Fiala',team:'LA',pts:82},{name:'Dylan Larkin',team:'DET',pts:82},
    {name:'Steven Stamkos',team:'TB',pts:81}]},
  {id:6,label:'Forwards 6',type:'F',players:[
    {name:'Drake Batherson',team:'OTT',pts:82},{name:'Matt Boldy',team:'MIN',pts:75},
    {name:'Cole Caufield',team:'MTL',pts:82},{name:'Brandon Hagel',team:'TB',pts:74},
    {name:'Jordan Kyrou',team:'STL',pts:82}]},
  {id:7,label:'Forwards 7',type:'F',players:[
    {name:'Wyatt Johnston',team:'DAL',pts:82},{name:'Anze Kopitar',team:'LA',pts:81},
    {name:'Nikolaj Ehlers',team:'WPG',pts:73},{name:'John Tavares',team:'TOR',pts:82},
    {name:'Alex Tuch',team:'BUF',pts:75}]},
  {id:8,label:'Forwards 8',type:'F',players:[
    {name:'Bo Horvat',team:'NYI',pts:81},{name:'Chris Kreider',team:'NYR',pts:82},
    {name:'Elias Lindholm',team:'VAN',pts:75},{name:'Tomas Hertl',team:'VGK',pts:72},
    {name:'Brock Nelson',team:'NYI',pts:82}]},
  {id:9,label:'Forwards 9',type:'F',players:[
    {name:'Quinton Byfield',team:'LA',pts:80},{name:'Matt Duchene',team:'DAL',pts:80},
    {name:'Joel Eriksson Ek',team:'MIN',pts:77},{name:'Brad Marchand',team:'BOS',pts:82},
    {name:'Jonathan Marchessault',team:'VGK',pts:82}]},
  {id:10,label:'Forwards 10',type:'F',players:[
    {name:"Ryan O'Reilly",team:'NSH',pts:69},{name:'Charlie McAvoy',team:'BOS',pts:74},
    {name:'Morgan Rielly',team:'TOR',pts:72},{name:'Shea Theodore',team:'VGK',pts:82},
    {name:'Zach Werenski',team:'CBJ',pts:71}]},
  {id:11,label:'Forwards 11',type:'F',players:[
    {name:'Dylan Cozens',team:'BUF',pts:75},{name:'Claude Giroux',team:'OTT',pts:82},
    {name:'Andrei Kuzmenko',team:'CGY',pts:72},{name:'Evgeni Malkin',team:'PIT',pts:82},
    {name:'Alex Ovechkin',team:'WSH',pts:79}]},
  {id:12,label:'Forwards 12',type:'F',players:[
    {name:'Jake DeBrusk',team:'BOS',pts:75},{name:'Owen Tippett',team:'PHI',pts:82},
    {name:'Andrei Svechnikov',team:'CAR',pts:59},{name:'Tommy Novak',team:'NSH',pts:82},
    {name:'Mats Zuccarello',team:'MIN',pts:82}]},
  {id:13,label:'Defense 1',type:'D',players:[
    {name:'Noah Dobson',team:'NYI',pts:82},{name:'Dougie Hamilton',team:'NJ',pts:62},
    {name:'Victor Hedman',team:'TB',pts:78},{name:'Quinn Hughes',team:'VAN',pts:82},
    {name:'Josh Morrissey',team:'WPG',pts:82}]},
  {id:14,label:'Defense 2',type:'D',players:[
    {name:'MacKenzie Weegar',team:'CGY',pts:82},{name:'Erik Karlsson',team:'PIT',pts:67},
    {name:'Brady Skjei',team:'CAR',pts:80},{name:'Luke Hughes',team:'NJ',pts:82},
    {name:'Thomas Harley',team:'DAL',pts:79}]},
  {id:15,label:'Defense 3',type:'D',players:[
    {name:'Travis Sanheim',team:'PHI',pts:82},{name:'Brent Burns',team:'CAR',pts:82},
    {name:'Jakob Chychrun',team:'OTT',pts:82},{name:'Sean Durzi',team:'ARI',pts:82},
    {name:'Cam Fowler',team:'ANA',pts:82}]},
  {id:16,label:'Defense 4',type:'D',players:[
    {name:'Torey Krug',team:'STL',pts:77},{name:'Rasmus Dahlin',team:'BUF',pts:82},
    {name:'Alex Pietrangelo',team:'VGK',pts:64},{name:'Darren Raddysh',team:'TB',pts:82},
    {name:'Neal Pionk',team:'WPG',pts:79}]},
  {id:17,label:'Defense 5',type:'D',players:[
    {name:'Adam Fox',team:'NYR',pts:73},{name:'Rasmus Andersson',team:'CGY',pts:82},
    {name:'Roman Josi',team:'NSH',pts:82},{name:'Quinn Hughes',team:'VAN',pts:82},
    {name:'Cale Makar',team:'COL',pts:77}]},
  {id:18,label:'Defense 6',type:'D',players:[
    {name:'Rasmus Sandin',team:'WSH',pts:70},{name:'Jacob Trouba',team:'NYR',pts:82},
    {name:'Damon Severson',team:'CBJ',pts:82},{name:'Ivan Provorov',team:'CBJ',pts:73},
    {name:'Evan Bouchard',team:'EDM',pts:82}]},
  {id:19,label:'Goalie 1',type:'G',players:[
    {name:'Thatcher Demko',team:'VAN',pts:51},{name:'Connor Hellebuyck',team:'WPG',pts:60},
    {name:'Jake Oettinger',team:'DAL',pts:56},{name:'Juuse Saros',team:'NSH',pts:55},
    {name:'Stuart Skinner',team:'EDM',pts:56}]},
  {id:20,label:'Goalie 2',type:'G',players:[
    {name:'Sergei Bobrovsky',team:'FLA',pts:56},{name:'Alexander Georgiev',team:'COL',pts:63},
    {name:'Pyotr Kochetkov',team:'CAR',pts:46},{name:'Jordan Binnington',team:'STL',pts:54},
    {name:'Andrei Vasilevskiy',team:'TB',pts:52}]},
  {id:21,label:'Goalie 3',type:'G',players:[
    {name:'Cam Talbot',team:'CGY',pts:54},{name:'Jacob Markstrom',team:'CGY',pts:48},
    {name:'Ilya Sorokin',team:'NYI',pts:56},{name:'Filip Gustavsson',team:'MIN',pts:56},
    {name:'Linus Ullmark',team:'BOS',pts:41}]},
  {id:22,label:'Goalie 4',type:'G',players:[
    {name:'Laurent Brossoit',team:'VGK',pts:23},{name:'Kevin Lankinen',team:'NSH',pts:47},
    {name:'Philipp Grubauer',team:'SEA',pts:47},{name:'Lukas Dostal',team:'ANA',pts:44},
    {name:'Karel Vejmelka',team:'ARI',pts:47}]},
  {id:23,label:'Goalie 5',type:'G',players:[
    {name:'Joey Daccord',team:'SEA',pts:50},{name:'Semyon Varlamov',team:'NYI',pts:47},
    {name:'Joonas Korpisalo',team:'CBJ',pts:55},{name:'Ivan Fedotov',team:'PHI',pts:20},
    {name:'Thomas Greiss',team:'STL',pts:30}]},
  {id:24,label:'Goalie 6',type:'G',players:[
    {name:'Charlie Lindgren',team:'WSH',pts:40},{name:'Mackenzie Blackwood',team:'VAN',pts:35},
    {name:'Alex Lyon',team:'FLA',pts:44},{name:'Tristan Jarry',team:'PIT',pts:34},
    {name:'Jonathan Quick',team:'TOR',pts:27}]},
];

const MOCK_BOARD = [
  {name:'Alex Thornton',team:'The Slapshot Specials',pts:1842,trend:'+3'},
  {name:'Sarah Kim',team:'Puck Norris',pts:1791,trend:'+1'},
  {name:'Marcus Webb',team:'Ice Ice Maybe',pts:1744,trend:'-1'},
  {name:'Priya Patel',team:'Alpaca My Bags',pts:1712,trend:'+2'},
  {name:'Jake Morrison',team:'The Mighty Dux',pts:1698,trend:'-2'},
  {name:'Amanda Chen',team:'Five Hole Club',pts:1655,trend:'='},
  {name:'Dave Okafor',team:'Gretzky 2.0',pts:1601,trend:'+1'},
  {name:'Chloe Russo',team:'Biscuit in the Basket',pts:1587,trend:'-1'},
];

const HAT_TRICKS = [
  {player:'Leon Draisaitl',  team:'EDM', pos:'F', count:2, owner:'Alex Thornton',  ownerTeam:'The Slapshot Specials', dates:['Oct 14','Apr 27']},
  {player:'Auston Matthews',  team:'TOR', pos:'F', count:2, owner:'Sarah Kim',       ownerTeam:'Puck Norris',           dates:['Nov 3','Jan 18']},
  {player:'Nathan MacKinnon', team:'COL', pos:'F', count:1, owner:'Marcus Webb',     ownerTeam:'Ice Ice Maybe',         dates:['Dec 9']},
  {player:'Kirill Kaprizov',  team:'MIN', pos:'F', count:1, owner:'Priya Patel',     ownerTeam:'Alpaca My Bags',        dates:['Feb 2']},
  {player:'Sidney Crosby',    team:'PIT', pos:'F', count:1, owner:'Dave Okafor',     ownerTeam:'Gretzky 2.0',           dates:['Mar 11']},
];

const TEAM_ROSTERS = {
  'Alex Thornton': {
    team:'The Slapshot Specials',
    picks:[
      {box:'Forwards 1', pos:'F', name:'Leon Draisaitl',    nhl:'EDM', g:52, a:89, sog:246, pim:0,  w:0,l:0,otl:0,so:0,sv:0},
      {box:'Forwards 2', pos:'F', name:'Auston Matthews',   nhl:'TOR', g:69, a:40, sog:311, pim:0,  w:0,l:0,otl:0,so:0,sv:0},
      {box:'Forwards 3', pos:'F', name:'Jack Hughes',       nhl:'NJ',  g:37, a:55, sog:192, pim:0,  w:0,l:0,otl:0,so:0,sv:0},
      {box:'Forwards 4', pos:'F', name:'Sidney Crosby',     nhl:'PIT', g:42, a:52, sog:209, pim:0,  w:0,l:0,otl:0,so:0,sv:0},
      {box:'Forwards 5', pos:'F', name:'Aleksander Barkov', nhl:'FLA', g:31, a:55, sog:221, pim:0,  w:0,l:0,otl:0,so:0,sv:0},
      {box:'Forwards 6', pos:'F', name:'Cole Caufield',     nhl:'MTL', g:28, a:37, sog:198, pim:0,  w:0,l:0,otl:0,so:0,sv:0},
      {box:'Forwards 7', pos:'F', name:'Wyatt Johnston',    nhl:'DAL', g:29, a:37, sog:167, pim:0,  w:0,l:0,otl:0,so:0,sv:0},
      {box:'Forwards 8', pos:'F', name:'Chris Kreider',     nhl:'NYR', g:39, a:27, sog:189, pim:0,  w:0,l:0,otl:0,so:0,sv:0},
      {box:'Forwards 9', pos:'F', name:'Brad Marchand',     nhl:'BOS', g:28, a:48, sog:172, pim:0,  w:0,l:0,otl:0,so:0,sv:0},
      {box:'Forwards 10',pos:'F', name:'Charlie McAvoy',    nhl:'BOS', g:11, a:48, sog:178, pim:0,  w:0,l:0,otl:0,so:0,sv:0},
      {box:'Forwards 11',pos:'F', name:'Alex Ovechkin',     nhl:'WSH', g:36, a:28, sog:295, pim:0,  w:0,l:0,otl:0,so:0,sv:0},
      {box:'Forwards 12',pos:'F', name:'Owen Tippett',      nhl:'PHI', g:27, a:30, sog:182, pim:0,  w:0,l:0,otl:0,so:0,sv:0},
      {box:'Defense 1',  pos:'D', name:'Quinn Hughes',      nhl:'VAN', g:16, a:66, sog:189, pim:22, w:0,l:0,otl:0,so:0,sv:0},
      {box:'Defense 2',  pos:'D', name:'Luke Hughes',       nhl:'NJ',  g:16, a:51, sog:147, pim:30, w:0,l:0,otl:0,so:0,sv:0},
      {box:'Defense 3',  pos:'D', name:'Brent Burns',       nhl:'CAR', g:14, a:41, sog:198, pim:44, w:0,l:0,otl:0,so:0,sv:0},
      {box:'Defense 4',  pos:'D', name:'Rasmus Dahlin',     nhl:'BUF', g:17, a:49, sog:211, pim:28, w:0,l:0,otl:0,so:0,sv:0},
      {box:'Defense 5',  pos:'D', name:'Cale Makar',        nhl:'COL', g:24, a:53, sog:234, pim:18, w:0,l:0,otl:0,so:0,sv:0},
      {box:'Defense 6',  pos:'D', name:'Evan Bouchard',     nhl:'EDM', g:19, a:56, sog:254, pim:38, w:0,l:0,otl:0,so:0,sv:0},
      {box:'Goalie 1',   pos:'G', name:'Stuart Skinner',    nhl:'EDM', g:0,  a:0,  sog:0,   pim:0,  w:31,l:14,otl:4,so:3,sv:886},
      {box:'Goalie 2',   pos:'G', name:'Sergei Bobrovsky',  nhl:'FLA', g:0,  a:0,  sog:0,   pim:0,  w:36,l:14,otl:4,so:6,sv:1421},
      {box:'Goalie 3',   pos:'G', name:'Ilya Sorokin',      nhl:'NYI', g:0,  a:0,  sog:0,   pim:0,  w:24,l:24,otl:5,so:4,sv:1148},
      {box:'Goalie 4',   pos:'G', name:'Kevin Lankinen',    nhl:'NSH', g:0,  a:0,  sog:0,   pim:0,  w:22,l:18,otl:3,so:2,sv:874},
      {box:'Goalie 5',   pos:'G', name:'Joonas Korpisalo',  nhl:'CBJ', g:0,  a:0,  sog:0,   pim:0,  w:18,l:26,otl:4,so:2,sv:967},
      {box:'Goalie 6',   pos:'G', name:'Alex Lyon',         nhl:'FLA', g:0,  a:0,  sog:0,   pim:0,  w:20,l:12,otl:3,so:1,sv:688},
    ]
  },
  'Sarah Kim': {
    team:'Puck Norris',
    picks:[
      {box:'Forwards 1', pos:'F', name:'Nikita Kucherov',   nhl:'TB',  g:44, a:100,sog:231, pim:0,  w:0,l:0,otl:0,so:0,sv:0},
      {box:'Forwards 2', pos:'F', name:'Mitch Marner',      nhl:'TOR', g:26, a:81, sog:198, pim:0,  w:0,l:0,otl:0,so:0,sv:0},
      {box:'Forwards 3', pos:'F', name:'Kirill Kaprizov',   nhl:'MIN', g:36, a:51, sog:212, pim:0,  w:0,l:0,otl:0,so:0,sv:0},
      {box:'Forwards 4', pos:'F', name:'Jesper Bratt',      nhl:'NJ',  g:28, a:55, sog:176, pim:0,  w:0,l:0,otl:0,so:0,sv:0},
      {box:'Forwards 5', pos:'F', name:'Ryan Nugent-Hopkins',nhl:'EDM',g:27, a:56, sog:168, pim:0,  w:0,l:0,otl:0,so:0,sv:0},
      {box:'Forwards 6', pos:'F', name:'Matt Boldy',         nhl:'MIN',g:28, a:35, sog:179, pim:0,  w:0,l:0,otl:0,so:0,sv:0},
      {box:'Forwards 7', pos:'F', name:'Anze Kopitar',       nhl:'LA', g:22, a:47, sog:141, pim:0,  w:0,l:0,otl:0,so:0,sv:0},
      {box:'Forwards 8', pos:'F', name:'Bo Horvat',          nhl:'NYI',g:31, a:31, sog:192, pim:0,  w:0,l:0,otl:0,so:0,sv:0},
      {box:'Forwards 9', pos:'F', name:'Matt Duchene',       nhl:'DAL',g:34, a:38, sog:177, pim:0,  w:0,l:0,otl:0,so:0,sv:0},
      {box:'Forwards 10',pos:'F', name:'Morgan Rielly',      nhl:'TOR',g:12, a:45, sog:156, pim:0,  w:0,l:0,otl:0,so:0,sv:0},
      {box:'Forwards 11',pos:'F', name:'Claude Giroux',      nhl:'OTT',g:27, a:42, sog:164, pim:0,  w:0,l:0,otl:0,so:0,sv:0},
      {box:'Forwards 12',pos:'F', name:'Andrei Svechnikov',  nhl:'CAR',g:22, a:33, sog:148, pim:0,  w:0,l:0,otl:0,so:0,sv:0},
      {box:'Defense 1',  pos:'D', name:'Noah Dobson',        nhl:'NYI',g:15, a:45, sog:178, pim:24, w:0,l:0,otl:0,so:0,sv:0},
      {box:'Defense 2',  pos:'D', name:'MacKenzie Weegar',   nhl:'CGY',g:11, a:41, sog:165, pim:32, w:0,l:0,otl:0,so:0,sv:0},
      {box:'Defense 3',  pos:'D', name:'Travis Sanheim',     nhl:'PHI',g:12, a:37, sog:143, pim:38, w:0,l:0,otl:0,so:0,sv:0},
      {box:'Defense 4',  pos:'D', name:'Torey Krug',         nhl:'STL',g:13, a:44, sog:152, pim:30, w:0,l:0,otl:0,so:0,sv:0},
      {box:'Defense 5',  pos:'D', name:'Adam Fox',           nhl:'NYR',g:14, a:52, sog:187, pim:20, w:0,l:0,otl:0,so:0,sv:0},
      {box:'Defense 6',  pos:'D', name:'Jacob Trouba',       nhl:'NYR',g:8,  a:33, sog:144, pim:66, w:0,l:0,otl:0,so:0,sv:0},
      {box:'Goalie 1',   pos:'G', name:'Connor Hellebuyck',  nhl:'WPG',g:0,  a:0,  sog:0,   pim:0,  w:37,l:18,otl:4,so:6,sv:1502},
      {box:'Goalie 2',   pos:'G', name:'Alexander Georgiev', nhl:'COL',g:0,  a:0,  sog:0,   pim:0,  w:31,l:15,otl:3,so:4,sv:1188},
      {box:'Goalie 3',   pos:'G', name:'Cam Talbot',         nhl:'CGY',g:0,  a:0,  sog:0,   pim:0,  w:24,l:18,otl:5,so:3,sv:966},
      {box:'Goalie 4',   pos:'G', name:'Philipp Grubauer',   nhl:'SEA',g:0,  a:0,  sog:0,   pim:0,  w:20,l:16,otl:4,so:2,sv:822},
      {box:'Goalie 5',   pos:'G', name:'Semyon Varlamov',    nhl:'NYI',g:0,  a:0,  sog:0,   pim:0,  w:16,l:19,otl:4,so:1,sv:788},
      {box:'Goalie 6',   pos:'G', name:'Charlie Lindgren',   nhl:'WSH',g:0,  a:0,  sog:0,   pim:0,  w:18,l:14,otl:3,so:2,sv:712},
    ]
  },
};

function getDefaultRoster(entryName) {
  const idx = MOCK_BOARD.findIndex(e=>e.name===entryName);
  return BOXES.map(box => {
    const p = box.players[idx % box.players.length];
    const isG = box.type==='G', isD = box.type==='D';
    return {
      box: box.label, pos: box.type, name: p.name, nhl: p.team,
      g:  isG?0:Math.floor(p.pts*0.35), a: isG?0:Math.floor(p.pts*0.55),
      sog:isG?0:Math.floor(p.pts*1.8),  pim:isD?Math.floor(Math.random()*40+10):0,
      w:  isG?Math.floor(p.pts*0.52):0, l:isG?Math.floor(p.pts*0.28):0,
      otl:isG?Math.floor(p.pts*0.08):0, so:isG?Math.floor(p.pts*0.06):0,
      sv: isG?Math.floor(p.pts*18):0,
    };
  });
}

// ══════════ NIGHTLY STATS — live from NightlyStats sheet ══════════
const NIGHTLY_STATS_CSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQlbZGgMZjZhJIVIJoXKNASqTsn-sYJN5u9QmUGKGaJDdqXHbNSxbCeWR4qkS1PqCnP5AvVezXwOMzj/pub?gid=615464608&single=true&output=csv';

let NIGHTLY_STATS = [];

function parseNightlyCSV(csv) {
  const lines = csv.trim().split('\n');
  return lines.slice(1).map(line => {
    const cols = line.split(',');
    return {
      name:     (cols[0] || '').trim(),
      team:     (cols[1] || '').trim(),
      pos:      (cols[2] || '').trim(),
      game:     (cols[3] || '').trim(),
      goals:    parseInt(cols[4])  || 0,
      assists:  parseInt(cols[5])  || 0,
      sog:      parseInt(cols[6])  || 0,
      pim:      parseInt(cols[7])  || 0,
      wins:     parseInt(cols[8])  || 0,
      losses:   parseInt(cols[9])  || 0,
      otl:      parseInt(cols[10]) || 0,
      shutouts: parseInt(cols[11]) || 0,
      saves:    parseInt(cols[12]) || 0,
    };
  }).filter(p => p.name);
}

async function fetchNightlyStats() {
  try {
    const res = await fetch(NIGHTLY_STATS_CSV);
    const csv = await res.text();
    NIGHTLY_STATS = parseNightlyCSV(csv);
  } catch(err) {
    console.warn('NightlyStats fetch failed:', err);
    NIGHTLY_STATS = [];
  }
}

// ══════════ SCORING ══════════
function roundPts(n) { return Math.round(n * 100) / 100; }
function isHatTrick(p) { return p.pos !== 'G' && (p.goals || 0) >= 3; }

const SCORING = {
  F: { goal:1, assist:1, sog:0.11, hatTrickBonus:3 },
  D: { goal:1, assist:1, sog:0.11, hatTrickBonus:3, pim:0.25 },
  G: { win:3, loss:1, otl:1.5, shutout:2, save:0.02 }
};

function calcPts(p) {
  const r = SCORING[p.pos] || SCORING.F;
  if (p.pos === 'G') return roundPts((p.wins||0)*r.win+(p.losses||0)*r.loss+(p.otl||0)*r.otl+(p.shutouts||0)*r.shutout+(p.saves||0)*r.save);
  const htBonus = isHatTrick(p) ? r.hatTrickBonus : 0;
  const pimPts  = p.pos === 'D' ? (p.pim || 0) * r.pim : 0;
  return roundPts((p.goals||0)*r.goal+(p.assists||0)*r.assist+(p.sog||0)*r.sog+htBonus+pimPts);
}

function calcPrevPts(s) {
  if (!s) return 0;
  if (s.pos === 'G') return roundPts(s.w*3 + s.l*1 + s.otl*1.5 + s.so*2 + s.sv*0.02);
  const pimPts = s.pos === 'D' ? (s.pim||0)*0.25 : 0;
  return roundPts((s.g||0)*1 + (s.a||0)*1 + (s.sog||0)*0.11 + pimPts);
}

function rosterPts(p) {
  if (p.pos==='G') return roundPts(p.w*3 + p.l*1 + p.otl*1.5 + p.so*2 + p.sv*0.02);
  const ht = p.g>=3 ? 3 : 0;
  const pimPts = p.pos==='D' ? p.pim*0.25 : 0;
  return roundPts(p.g*1 + p.a*1 + p.sog*0.11 + ht + pimPts);
}

function nightlyPts(p) {
  if (p.pos === 'G') return roundPts(p.wins*3 + p.losses*1 + p.otl*1.5 + p.shutouts*2 + p.saves*0.02);
  const ht = (p.goals >= 3) ? 3 : 0;
  const pimPts = (p.pos === 'D') ? p.pim * 0.25 : 0;
  return roundPts(p.goals*1 + p.assists*1 + p.sog*0.11 + ht + pimPts);
}

function initials(n) { return n.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2); }

// ══════════ TOAST ══════════
function toast(title, body) {
  const t = document.getElementById('toast');
  if (!t) return;
  document.getElementById('toast-t').textContent = title;
  document.getElementById('toast-b').textContent = body;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),4200);
}

// ══════════ TICKER ══════════
function tickerStatChips(p) {
  let chips = '';
  const isHT = p.pos !== 'G' && p.goals >= 3;
  if (isHT) chips += `<span class="t-stat ts-ht">🎩 HAT TRICK</span>`;
  else if (p.goals)   chips += `<span class="t-stat ts-g">${p.goals}G</span>`;
  if (p.assists)      chips += `<span class="t-stat ts-a">${p.assists}A</span>`;
  if (p.sog)          chips += `<span class="t-stat ts-sog">${p.sog}SOG</span>`;
  if (p.wins)         chips += `<span class="t-stat ts-w">${p.wins}W</span>`;
  if (p.losses)       chips += `<span class="t-stat ts-l">${p.losses}L</span>`;
  if (p.otl)          chips += `<span class="t-stat ts-otl">${p.otl}OTL</span>`;
  if (p.shutouts)     chips += `<span class="t-stat ts-so">SO</span>`;
  if (p.saves)        chips += `<span class="t-stat ts-sv">${p.saves}SV</span>`;
  if (p.pos==='D' && p.pim) chips += `<span class="t-stat ts-pim">${p.pim}PIM</span>`;
  return chips;
}

function buildTicker() {
  const reel = document.getElementById('ticker-reel');
  if (!reel) return;

  if (!NIGHTLY_STATS.length) {
    reel.innerHTML = `<div class="t-row t-row1"><div class="t-item"><span class="t-game">No pool player stats yet for last night</span></div></div>`;
    return;
  }

  const scorers = NIGHTLY_STATS.filter(p => nightlyPts(p) > 0);
  if (!scorers.length) {
    reel.innerHTML = `<div class="t-row t-row1"><div class="t-item"><span class="t-game">No scoring pool players last night</span></div></div>`;
    return;
  }

  const itemHTML = p => `<div class="t-item">
    <span class="t-game">${p.game}</span><span class="t-sep">·</span>
    <span class="t-name">${p.name}</span><span class="t-team">${p.team}&nbsp;${p.pos}</span>
    <span class="t-sep">|</span>${tickerStatChips(p)}
    <span class="t-pts">+${nightlyPts(p)}pts</span>
  </div>`;
  const mid = Math.ceil(scorers.length / 2);
  const makeRow = (items, cls) => { const inner = items.map(itemHTML).join(''); return `<div class="t-row ${cls}">${inner}${inner}</div>`; };
  reel.innerHTML = makeRow(scorers.slice(0,mid),'t-row1') + makeRow(scorers.slice(mid),'t-row2');
}

// ══════════ HOME STANDINGS ══════════
function buildHomeStandings() {
  const el = document.getElementById('home-standings');
  if (!el) return;
  const last = MOCK_BOARD.length - 1;
  el.innerHTML = MOCK_BOARD.map((e, i) => {
    const rowCls = i===0?'r1':i===1?'r2':i===2?'r3':i===last?'rl':'';
    const pos = i===last ? `<span style="font-size:9px;letter-spacing:0px">LAST</span>` : (i+1);
    const t = e.trend;
    const mvCls = t.startsWith('+')?'up':t.startsWith('-')?'dn':'eq';
    const mvLbl = t.startsWith('+')?'▲'+t.slice(1):t.startsWith('-')?'▼'+t.slice(1):'—';
    const htCount = HAT_TRICKS.filter(h=>h.owner===e.name).reduce((s,h)=>s+h.count,0);
    const htCell = htCount > 0 ? '🎩'.repeat(Math.min(htCount,3)) : '';
    const ini = initials(e.name);
    return `<div class="sc-row ${rowCls}" onclick="openTeamPanel('${e.name}')" style="cursor:pointer">
      <div class="sc-pos">${pos}</div>
      <div class="sc-av">${ini}</div>
      <div class="sc-info"><div class="sc-name">${e.team}</div><div class="sc-team">${e.name}</div></div>
      <div class="sc-ht">${htCell}</div>
      <div class="sc-mv ${mvCls}">${mvLbl}</div>
      <div class="sc-pts">${e.pts.toLocaleString()}</div>
    </div>`;
  }).join('');
}

// ══════════ LEADERBOARD ══════════
function lbRowHTML(e, i) {
  const cls = i===0?'p1':i===1?'p2':i===2?'p3':'';
  const t = e.trend;
  const tCls = t.startsWith('+')?'trend-up':t.startsWith('-')?'trend-dn':'trend-eq';
  const tLbl = t.startsWith('+')?'▲'+t.slice(1):t.startsWith('-')?'▼'+t.slice(1):'—';
  const htCount = HAT_TRICKS.filter(h => h.owner === e.name).reduce((s,h) => s + h.count, 0);
  const htBadge = htCount > 0 ? `<span style="font-size:13px;margin-right:4px">${'🎩'.repeat(Math.min(htCount,3))}</span>` : '';
  return `<div class="lb-row ${cls}">
    <div class="lb-pos">${i+1}</div>
    <div class="lb-av">${initials(e.name)}</div>
    <div class="lb-info"><div class="lb-name">${e.name}</div><div class="lb-team">${e.team}</div></div>
    ${htBadge}<span class="lb-trend ${tCls}">${tLbl}</span>
    <div class="lb-pts">${e.pts.toLocaleString()}</div>
  </div>`;
}

function buildHatTrickHall() {
  const el = document.getElementById('ht-hall-rows');
  if (!el) return;
  const sorted = [...HAT_TRICKS].sort((a,b) => b.count - a.count || a.player.localeCompare(b.player));
  const total = sorted.reduce((s,h) => s + h.count, 0);
  const badge = document.getElementById('ht-total-badge');
  if (badge) badge.textContent = total + ' this season';
  if (!sorted.length) { el.innerHTML = `<div style="padding:20px;text-align:center;color:var(--muted);font-size:13px">No hat tricks yet.</div>`; return; }
  el.innerHTML = sorted.map((h, i) => `<div class="ht-row">
    <div class="ht-num">${i+1}</div>
    <div class="ht-av">${h.player.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()}</div>
    <div class="ht-info">
      <div class="ht-player">${h.player}</div>
      <div class="ht-meta">${h.team} · ${h.pos} · Drafted by ${h.owner}</div>
      <div class="ht-entry-owner">${h.ownerTeam}</div>
      <div style="font-size:10px;color:var(--muted2);font-family:'DM Mono',monospace;margin-top:3px">${h.dates.join(' · ')}</div>
    </div>
    <div class="ht-hats">${'🎩'.repeat(h.count)}</div>
    <div class="ht-goals-col">${h.count}×</div>
  </div>`).join('');
}

function buildBoards() {
  const fl = document.getElementById('full-lb');
  if (fl) fl.innerHTML = MOCK_BOARD.map((e,i)=>lbRowHTML(e,i)).join('');
  const bc = document.getElementById('bd-count');
  if (bc) bc.textContent = MOCK_BOARD.length + ' entries';
}

// ══════════ PAYOUTS ══════════
let totalEntries = 1;

function updatePayouts() {
  const prize = totalEntries * 10 * 0.5;
  const he = document.getElementById('h-entries');
  const hp = document.getElementById('h-pot');
  if (he) he.textContent = totalEntries;
  if (hp) hp.textContent = '$' + Math.round(prize);
}

function buildPayoutTable() {
  const tbody = document.getElementById('payout-tbody');
  if (!tbody) return;
  const entries = [10, 20, 30, 40, 50, 75, 100];
  tbody.innerHTML = entries.map((n, i) => {
    const prize = n * 10 * 0.5;
    const bg = i % 2 === 0 ? '' : 'style="background:var(--surface2)"';
    return `<tr ${bg}>
      <td style="font-family:'DM Mono',monospace;font-weight:600">${n}</td>
      <td style="text-align:right;font-family:'DM Mono',monospace;font-weight:700;color:var(--gold)">$${Math.round(prize * 0.5)}</td>
      <td style="text-align:right;font-family:'DM Mono',monospace;font-weight:700;color:#9ca3af">$${Math.round(prize * 0.3)}</td>
      <td style="text-align:right;font-family:'DM Mono',monospace;font-weight:700;color:#cd7f32">$${Math.round(prize * 0.2)}</td>
    </tr>`;
  }).join('');
}

// ══════════ DIVISION PICKS ══════════
function buildDivisionPicks() {
  const grid = document.getElementById('div-grid');
  if (!grid) return;
  grid.innerHTML = Object.entries(DIVISIONS).map(([divName, div]) => {
    const options = div.teams.map(t => `<option value="${t}">${t}</option>`).join('');
    return `<div class="div-section">
      <div class="div-conf-label">${div.conf}ern Conference</div>
      <div class="div-name">${divName} Division</div>
      <select class="div-team-select" id="div-${divName}" onchange="pickDivision('${divName}', this)">
        <option value="">— Pick division winner —</option>${options}
      </select>
      <div class="div-pts-note">+10 pts while your team leads their division</div>
    </div>`;
  }).join('');
}

function pickDivision(divName, sel) {
  divisionPicks[divName] = sel.value || null;
  sel.classList.toggle('picked', !!sel.value);
  updateDivisionCount();
}

function updateDivisionCount() {
  const filled = Object.values(divisionPicks).filter(Boolean).length;
  const dc = document.getElementById('div-pick-count');
  const db = document.getElementById('div-bonus-total');
  if (dc) dc.textContent = filled;
  if (db) db.textContent = filled * 10;
}

// ══════════ TEAM PANEL ══════════
let currentFilter = 'ALL';
let currentRoster = [];

function openTeamPanel(entryName) {
  const entry = MOCK_BOARD.find(e=>e.name===entryName);
  if (!entry) return;
  const rosterData = TEAM_ROSTERS[entryName];
  const picks = rosterData ? rosterData.picks : getDefaultRoster(entryName);
  currentRoster = picks;
  const ini = initials(entryName);
  document.getElementById('tp-av').textContent = ini;
  document.getElementById('tp-tname').textContent = entry.team;
  document.getElementById('tp-owner').textContent = entryName;
  const totalPts = picks.reduce((s,p)=>s+rosterPts(p),0);
  const totalG   = picks.reduce((s,p)=>s+(p.g||0),0);
  const totalA   = picks.reduce((s,p)=>s+(p.a||0),0);
  document.getElementById('tp-meta').innerHTML = `
    <div class="tp-stat-pill"><div class="spv burg">${roundPts(totalPts)}</div><div class="spl">Total Pts</div></div>
    <div class="tp-stat-pill"><div class="spv">${totalG}</div><div class="spl">Goals</div></div>
    <div class="tp-stat-pill"><div class="spv">${totalA}</div><div class="spl">Assists</div></div>
    <div class="tp-stat-pill"><div class="spv blue">${entry.pts.toLocaleString()}</div><div class="spl">Season Rank Pts</div></div>`;
  document.querySelectorAll('.tp-tab').forEach(t=>t.classList.remove('active'));
  document.querySelector('.tp-tab').classList.add('active');
  currentFilter = 'ALL';
  renderRoster(picks, 'ALL');
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeTeamPanel() {
  const el = document.getElementById('modal-overlay');
  if (el) el.classList.remove('open');
  document.body.style.overflow = '';
}

function overlayClick(e) {
  if (e.target === document.getElementById('modal-overlay')) closeTeamPanel();
}

function filterRoster(pos, tab) {
  currentFilter = pos;
  document.querySelectorAll('.tp-tab').forEach(t=>t.classList.remove('active'));
  tab.classList.add('active');
  renderRoster(currentRoster, pos);
}

function renderRoster(picks, filter) {
  const rows = filter==='ALL' ? picks : picks.filter(p=>p.pos===filter);
  const ownerName = document.getElementById('tp-owner').textContent;
  const htMap = {};
  HAT_TRICKS.forEach(h=>{ if(h.owner===ownerName) htMap[h.player]=(htMap[h.player]||0)+h.count; });
  const rowsHTML = rows.map(p => {
    const pts = rosterPts(p);
    const isHT = p.pos!=='G' && p.g>=3;
    const htCell = htMap[p.name] ? '🎩'.repeat(Math.min(htMap[p.name],3)) : '';
    const skaterCells = p.pos==='G'
      ? `<td class="tp-stat-num">—</td><td class="tp-stat-num">—</td><td class="tp-stat-num">—</td><td class="tp-stat-num">—</td><td class="tp-stat-num">${p.w}</td><td class="tp-stat-num">${p.l}</td><td class="tp-stat-num">${p.otl}</td><td class="tp-stat-num">${p.so}</td><td class="tp-stat-num">${p.sv.toLocaleString()}</td>`
      : `<td class="tp-stat-num">${p.g}</td><td class="tp-stat-num">${p.a}</td><td class="tp-stat-num">${p.sog}</td><td class="tp-stat-num">${p.pos==='D'?p.pim:'—'}</td><td class="tp-stat-num">—</td><td class="tp-stat-num">—</td><td class="tp-stat-num">—</td><td class="tp-stat-num">—</td><td class="tp-stat-num">—</td>`;
    return `<tr style="${isHT?'background:rgba(111,38,61,0.06)':''}">
      <td><span class="tp-pos-badge pos-${p.pos}">${p.pos}</span></td>
      <td><div class="tp-pname">${p.name}${isHT?' 🎩':''}</div><div class="tp-box">${p.box}</div></td>
      <td><div class="tp-nhl">${p.nhl}</div></td>
      <td class="tp-box">${p.box.replace(/Forwards |Defense |Goalie /,'').padStart(2,'0')}</td>
      ${skaterCells}<td class="tp-ht-flag">${htCell}</td><td class="tp-pts-num">${pts}</td>
    </tr>`;
  }).join('');
  const totalPts = roundPts(rows.reduce((s,p)=>s+rosterPts(p),0));
  const totalG = rows.reduce((s,p)=>s+(p.g||0),0);
  const totalA = rows.reduce((s,p)=>s+(p.a||0),0);
  const totalSOG = rows.reduce((s,p)=>s+(p.sog||0),0);
  const totalPIM = rows.reduce((s,p)=>s+(p.pim||0),0);
  const totalSV  = rows.reduce((s,p)=>s+(p.sv||0),0);
  const totalW   = rows.reduce((s,p)=>s+(p.w||0),0);
  document.getElementById('tp-tbody').innerHTML = rowsHTML;
  document.getElementById('tp-tfoot').innerHTML = `<tr class="tp-footer">
    <td></td><td style="font-size:13px;color:var(--muted)">${rows.length} players</td>
    <td></td><td></td>
    <td class="tp-stat-num">${totalG}</td><td class="tp-stat-num">${totalA}</td>
    <td class="tp-stat-num">${totalSOG}</td><td class="tp-stat-num">${totalPIM}</td>
    <td class="tp-stat-num">${totalW}W</td><td></td><td></td><td></td>
    <td class="tp-stat-num">${totalSV.toLocaleString()}</td><td></td>
    <td class="tp-pts-num">${totalPts}</td>
  </tr>`;
}

// ══════════ PLAYER INFO MODAL ══════════
let playerModalContext = null;

function openPlayerModal(playerName, team, pos, boxId, radioEl) {
  const s = PREV_STATS[playerName];
  playerModalContext = { boxId, playerName, radio: radioEl };
  document.getElementById('pm-name').textContent = playerName;
  document.getElementById('pm-nhl').textContent = team + ' · ' + (s?.pos || pos);
  const badge = document.getElementById('pm-pos-badge');
  badge.textContent = pos; badge.className = `pm-pos-badge pm-pos-${pos}`;
  const statsGrid = document.getElementById('pm-stats-grid');
  if (!s) {
    statsGrid.innerHTML = `<div style="grid-column:1/-1;text-align:center;color:var(--muted);font-size:13px;padding:8px 0">No prior season data available</div>`;
    document.getElementById('pm-pts-breakdown').innerHTML = '';
    document.getElementById('pm-total-pts').textContent = '—';
  } else if (pos === 'G') {
    statsGrid.innerHTML = `
      <div class="pm-stat"><div class="pm-stat-val">${s.w}</div><div class="pm-stat-lbl">Wins</div></div>
      <div class="pm-stat"><div class="pm-stat-val">${s.l}</div><div class="pm-stat-lbl">Losses</div></div>
      <div class="pm-stat"><div class="pm-stat-val">${s.otl}</div><div class="pm-stat-lbl">OT Loss</div></div>
      <div class="pm-stat"><div class="pm-stat-val">${s.so}</div><div class="pm-stat-lbl">Shutouts</div></div>
      <div class="pm-stat" style="grid-column:1/3"><div class="pm-stat-val">${s.sv.toLocaleString()}</div><div class="pm-stat-lbl">Saves</div></div>
      <div class="pm-stat" style="grid-column:3/5"><div class="pm-stat-val" style="color:var(--accent)">${roundPts(s.sv*0.02)}</div><div class="pm-stat-lbl">Save pts</div></div>`;
    document.getElementById('pm-pts-breakdown').innerHTML = `
      <div class="pm-pts-item"><div class="pv">${s.w*3}</div><div class="pl">${s.w}W × 3</div></div>
      <div class="pm-pts-item"><div class="pv">${s.l}</div><div class="pl">${s.l}L × 1</div></div>
      <div class="pm-pts-item"><div class="pv">${roundPts(s.otl*1.5)}</div><div class="pl">${s.otl}OTL × 1.5</div></div>
      <div class="pm-pts-item"><div class="pv">${s.so*2}</div><div class="pl">${s.so}SO × 2</div></div>
      <div class="pm-pts-item"><div class="pv">${roundPts(s.sv*0.02)}</div><div class="pl">${s.sv.toLocaleString()}SV × 0.02</div></div>`;
  } else {
    statsGrid.innerHTML = `
      <div class="pm-stat"><div class="pm-stat-val">${s.g}</div><div class="pm-stat-lbl">Goals</div></div>
      <div class="pm-stat"><div class="pm-stat-val">${s.a}</div><div class="pm-stat-lbl">Assists</div></div>
      <div class="pm-stat"><div class="pm-stat-val">${s.sog}</div><div class="pm-stat-lbl">SOG</div></div>
      <div class="pm-stat"><div class="pm-stat-val">${pos==='D'?s.pim:'—'}</div><div class="pm-stat-lbl">PIM</div></div>`;
    let bd = `<div class="pm-pts-item"><div class="pv">${s.g}</div><div class="pl">${s.g}G × 1</div></div>
      <div class="pm-pts-item"><div class="pv">${s.a}</div><div class="pl">${s.a}A × 1</div></div>
      <div class="pm-pts-item"><div class="pv">${roundPts(s.sog*0.11)}</div><div class="pl">${s.sog}SOG × 0.11</div></div>`;
    if (pos === 'D') bd += `<div class="pm-pts-item"><div class="pv">${roundPts(s.pim*0.25)}</div><div class="pl">${s.pim}PIM × 0.25</div></div>`;
    document.getElementById('pm-pts-breakdown').innerHTML = bd;
  }
  document.getElementById('pm-total-pts').textContent = calcPrevPts(s);
  const btn = document.getElementById('pm-pick-btn');
  if (btn) {
    const alreadyPicked = typeof picks !== 'undefined' && picks[boxId] === playerName;
    btn.textContent = alreadyPicked ? `✓ ${playerName} already selected` : `Pick ${playerName}`;
    btn.disabled = alreadyPicked;
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

function pickFromModal() {
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

// ══════════ DRAFT (picks page) ══════════
let picks = {};

function buildDraft() {
  const draft = document.getElementById('draft');
  if (!draft) return;
  draft.innerHTML = BOXES.map(box => {
    const typeLabel = box.type==='G'?'Goalie':box.type==='D'?'Defense':'Forward';
    const players = box.players.map(p => {
      const rid = `radio-${box.id}-${p.name.replace(/\W/g,'')}`;
      const displayPts = calcPrevPts(PREV_STATS[p.name]) || p.pts;
      return `<div style="display:flex;align-items:center;gap:4px;margin-bottom:3px">
        <label class="popt" id="opt-${box.id}-${p.name.replace(/\W/g,'')}" style="flex:1;margin-bottom:0">
          <input type="radio" name="b${box.id}" value="${p.name}" id="${rid}" onchange="pick(${box.id},'${p.name}',this)">
          <div style="flex:1"><div class="popt-name">${p.name}</div><div class="popt-team">${p.team}</div></div>
          <div style="text-align:right"><div class="popt-pts">${displayPts}</div><div class="popt-pts-label">prev pts</div></div>
        </label>
        <button class="player-info-btn" title="View ${p.name} stats"
          onclick="event.stopPropagation();openPlayerModal('${p.name.replace(/'/g,"\\'")}','${p.team}','${box.type}',${box.id},document.getElementById('${rid}'))">ℹ</button>
      </div>`;
    }).join('');
    return `<div class="box-wrap" id="bx-${box.id}">
      <div class="box-hd"><div><div class="box-type">${typeLabel}</div><div class="box-name">${box.label}</div></div>
      <div class="box-check" id="chk-${box.id}">✓</div></div>
      <div class="player-opts">${players}</div>
    </div>`;
  }).join('');
  renderChips();
}

function pick(boxId, name, radio) {
  picks[boxId] = name;
  document.querySelectorAll(`[name=b${boxId}]`).forEach(r => r.closest('.popt').classList.remove('sel'));
  radio.closest('.popt').classList.add('sel');
  document.getElementById('bx-'+boxId).classList.add('done');
  const chk = document.getElementById('chk-'+boxId);
  chk.style.background = 'var(--burgundy)'; chk.style.borderColor = 'var(--burgundy)'; chk.style.color = '#fff';
  renderChips();
  const n = Object.keys(picks).length;
  document.getElementById('pc').textContent = n;
  document.getElementById('pbar').style.width = Math.round(n/24*100)+'%';
}

function renderChips() {
  const el = document.getElementById('chips');
  if (!el) return;
  el.innerHTML = BOXES.map(b => {
    const p = picks[b.id];
    return p ? `<span class="chip">${p.split(' ').pop()}</span>` : `<span class="chip empty">${b.label}</span>`;
  }).join('');
}

function updateProgress() {
  const n = Object.keys(picks).length;
  const pc = document.getElementById('pc');
  const pb = document.getElementById('pbar');
  if (pc) pc.textContent = n;
  if (pb) pb.style.width = Math.round(n/24*100)+'%';
}

// ══════════ SUBMIT ══════════
const WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbzqqijpX3BoRCDXMH5ZzWCkN2ZlALGJd_HBHMetPlXCir7_ue_WfEtqvo3NM0Z-xMhKUA/exec';

async function submitEntry() {
  const f    = document.getElementById('ff').value.trim();
  const l    = document.getElementById('fl').value.trim();
  const e    = document.getElementById('fe').value.trim();
  const ph   = document.getElementById('fp').value.trim();
  const team = document.getElementById('ft').value.trim() || `${f}'s Team`;
  const n    = Object.keys(picks).length;
  if (!f || !l) { toast('Missing name', 'Enter your first and last name.'); return; }
  if (!e)       { toast('Missing email', 'Enter your email address.'); return; }
  if (n < 24)   { toast('Incomplete picks', `${n}/24 boxes filled — select all players.`); return; }

  const divsFilled = Object.values(divisionPicks).filter(Boolean).length;
  if (divsFilled < 4) { toast('Division picks missing', 'Please pick a winner for all 4 divisions.'); return; }

  const picksArray = Array.from({length: 24}, (_, i) => picks[i + 1] || '');
  const btn = document.querySelector('.btn-gold');
  const originalText = btn.innerHTML;
  btn.innerHTML = '⏳ Submitting…'; btn.disabled = true; btn.style.opacity = '0.7';

  try {
    const response = await fetch(WEBAPP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        firstName: f, lastName: l, email: e, phone: ph, teamName: team,
        picks: picksArray,
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
      toast('🏒 Entry received!', `Welcome ${f}! Check your email. Send $10 to matt.hope@rocketmail.com.`);
      setTimeout(() => window.location.href = 'index.html', 2000);
    } else {
      toast('Submission failed', result.message || result.error || 'Something went wrong.');
    }
  } catch (err) {
    toast('Connection error', 'Could not reach the server.');
  } finally {
    btn.innerHTML = originalText; btn.disabled = false; btn.style.opacity = '1';
  }
}

// ══════════ ADMIN ══════════
function adminAdd() {
  const p = document.getElementById('ap').value.trim();
  const pts = parseInt(document.getElementById('apts').value)||0;
  if (!p||!pts) return;
  const log = document.getElementById('alog');
  const now = new Date().toLocaleTimeString('en-CA',{hour:'2-digit',minute:'2-digit'});
  log.innerHTML = `${now} — +${pts} pts → ${p}\n` + log.innerHTML;
  document.getElementById('ap').value='';
  document.getElementById('apts').value='';
  toast('Points added',`+${pts} pts added to ${p}`);
}
