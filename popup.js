(function () {
  'use strict';

  // ── Data pools ──

  const EMOJIS = [
    '🔥','⚡','🎯','🏆','💥','🚀','💪','🎮','👑','🔴',
    '⭐','💎','🎲','🐐','🫡','✨','😤','🤯','💀','🥶',
    '🔱','⚔️','🎪','🧠','🕹️','📈','🪖','🎬','🏅','🛡️'
  ];

  const STYLE = {
    competitive: [
      'Sweaty Lobbies','Tryhard Mode','Going All In','No Mercy','Full Send',
      'Playing to Win','Locked In','Zero Chill','Peak Performance','Tournament Prep',
      'Ranked Warrior','Comp Mode On','Win or Learn','All Gas No Brake'
    ],
    chill: [
      'Vibes Only','Relaxed Session','Cozy Stream','Good Times','Laid Back',
      'No Stress Zone','Easy Mode','Chill Night','Sunday Vibes','Feel Good Gaming',
      'Calm and Collected','Kicking Back','Wind Down','Quiet Grind'
    ],
    funny: [
      'Chaos Incoming','Expect Fails','Pure Comedy','Send Clips','Laughs Guaranteed',
      'Clown Hours','Maximum Shenanigans','Certified Goofy','Big Brain Plays (Not Really)',
      'Disaster Speedrun','Content Machine','Main Character Energy','Clip It','Unhinged'
    ],
    ranked: [
      'Ranked Climb','Rating on the Line','Elo Grind','MMR Push','LP Gains',
      'Climbing the Ladder','Ranked Only','Serious Queue','Diamond Push','Rating Matters',
      'SR Grind','Ranked Arc','Points Chase','Comp Queue'
    ],
    casual: [
      'Just Playing','No Pressure','Whatever Happens','Casual Fun','Playing for Fun',
      'Hanging Out','Just Vibing','No Tryhard','Pickup Games','Off-Meta Fun',
      'Casual Queue','For the Laughs','Gaming and Chatting','Low Stakes'
    ],
    educational: [
      'Tips and Tricks','Learning Together','Getting Better','Study Session','Breakdown Stream',
      'How to Improve','Guide Mode','Coach POV','Replay Review','Skill Check',
      'Pro Tips','Deep Dive','Mechanics Lab','Analysis Stream'
    ],
    challenge: [
      'Challenge Accepted','Can I Do It?','Impossible Run','Hard Mode','Self-Imposed Rules',
      'No Hit Run','Deathless Attempt','The Gauntlet','Ultimate Test','Nuzlocke Run',
      'Iron Man Mode','Hardcore Only','One Life Left','Limit Testing'
    ],
    community: [
      'Playing with Chat','Viewer Games','Community Night','Come Join','Squad Up',
      'Chat Decides','You Pick','Lobby Open','Community Vibes','Everyone Welcome',
      'Join the Party','Open Lobby','Chat Runs This','Sub Games'
    ],
    speedrun: [
      'Going Fast','Speed Strats','PB Attempt','World Record Pace','Optimized Route',
      'Frames Matter','RNG Please','Split Grind','Any% Attempt','Skip Hunting',
      'Reset City','Timer Running','Frame Perfect','Gotta Go Fast'
    ],
    first_playthrough: [
      'Blind Playthrough','First Time Ever','No Spoilers','Discovering Everything',
      'Fresh Eyes','Day One','Experiencing It','Going In Blind','Unspoiled Run',
      'Brand New','Zero Knowledge','First Impressions','Seeing It All','Maiden Voyage'
    ]
  };

  const GOALS = {
    rank_up:          ['Climbing Tonight','Rank Up Session','Next Rank or Bust','Pushing Ranks','Rating Goes Up'],
    grinding:         ['The Grind Continues','Grind Never Stops','Long Session','Non-Stop Grind','Hour After Hour'],
    road_to_rank:     ['Road to the Top','Climb Starts Here','Aiming High','Journey to Rank','The Long Road'],
    first_playthrough:['Blind Run','First Time','Fresh Start','Day One Experience','Going In Clean'],
    learning:         ['Getting Better','Improving Every Game','Study Mode','Level Up Skills','One Step at a Time'],
    challenge_run:    ['Challenge Mode','Hard Mode Activated','Testing My Limits','No Easy Way','Ruleset Active'],
    viewer_games:     ['Playing with You','Lobby Open','Jump In','Chat Games','Your Turn'],
    high_score:       ['Chasing the Record','New PB Tonight','Score Attack','Beat My Best','Record Breaker'],
    speedrun:         ['PB Grind','Faster Every Run','Shaving Seconds','Optimizing','Time Trial'],
    just_having_fun:  ['Fun Times','Good Vibes','No Goals','Just Enjoying It','Here for a Good Time']
  };

  const OPENINGS = [
    'Late Night','Early Morning','Weekend','Midnight','Marathon','Quick',
    'Epic','Solo','Duo','After Dark','Afternoon','Prime Time','All Day'
  ];

  const ENDINGS = [
    'Let\'s Go','Come Hang','Join Up','Watch This','Don\'t Miss It',
    'It\'s Time','We\'re Live','Pull Up','Tune In','Get In Here'
  ];

  const SEPS = [' | ',' — ',' // ',' • ',': '];

  // ── Helpers ──

  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function pickN(arr, n) {
    const copy = arr.slice();
    const out = [];
    while (out.length < n && copy.length) {
      const i = Math.floor(Math.random() * copy.length);
      out.push(copy.splice(i, 1)[0]);
    }
    return out;
  }

  function clean(s) {
    return s
      .replace(/\{[^}]*\}/g, '')       // remove unresolved placeholders
      .replace(/[ ]{2,}/g, ' ')         // collapse double spaces
      .replace(/([|—•:\/])\s*\1/g, '$1')// collapse repeated separators
      .replace(/^\s*[|—•:\/]\s*/, '')   // leading separator
      .replace(/\s*[|—•:\/]\s*$/, '')   // trailing separator
      .trim();
  }

  // ── Template engine ──

  function buildTitle(game, styleKey, goalKey, useEmoji) {
    const sp = pick(STYLE[styleKey]);
    const gp = pick(GOALS[goalKey]);
    const em = useEmoji ? pick(EMOJIS) + ' ' : '';
    const op = pick(OPENINGS);
    const en = pick(ENDINGS);
    const sep = pick(SEPS);

    const templates = [
      // Simple combos
      `${em}${sp}${sep}${game}`,
      `${em}${game}${sep}${sp}`,
      `${em}${game}${sep}${gp}`,
      `${em}${gp}${sep}${game}`,
      `${em}${op} ${game}${sep}${sp}`,
      `${em}${op} ${game}${sep}${gp}`,
      `${em}${game}: ${sp}`,
      `${em}${game}: ${gp}`,
      // With endings
      `${em}${game}${sep}${sp}${sep}${en}`,
      `${em}${sp}${sep}${game}${sep}${en}`,
      `${em}${game}${sep}${gp}${sep}${en}`,
      // Opening + goal
      `${em}${op} ${game} ${sp}`,
      `${em}${op} ${sp}${sep}${game}`,
      `${em}${op} ${gp}${sep}${game}`,
      // Goal-forward
      `${em}${gp} in ${game}`,
      `${em}${gp}${sep}${game} ${sp}`,
      `${em}${game} ${gp}`,
      // Style-forward
      `${em}${sp} ${game} Stream`,
      `${em}${sp}${sep}${game} Session`,
      `${em}${game} Session${sep}${sp}`,
      // Compact
      `${em}${game}${sep}${gp}`,
      `${em}${game} ${sp}${sep}${en}`,
      // Double feature
      `${em}${sp} + ${gp}${sep}${game}`,
      `${em}${game}${sep}${sp} + ${gp}`,
      // Opening bookends
      `${em}${op} ${game}${sep}${sp}${sep}${en}`,
      `${em}${op} ${gp} in ${game}`,
      `${em}${op} ${game} Stream${sep}${sp}`,
      // Minimal
      `${em}${game} ${gp} Stream`,
      `${em}${sp} ${game}${sep}${en}`,
      `${em}${game}${sep}${op} ${sp}`,
      // Extra variation
      `${em}${en}${sep}${game} ${sp}`,
      `${em}${game} Night${sep}${gp}`,
      `${em}${sp} Mode${sep}${game}`,
      `${em}${game}${sep}${sp} Tonight`,
      `${em}Live ${game}${sep}${gp}`,
    ];

    return clean(pick(templates));
  }

  function generate(game, styleKey, goalKey, useEmoji, count) {
    const titles = new Set();
    let attempts = 0;
    const maxAttempts = count * 40;
    while (titles.size < count && attempts < maxAttempts) {
      const t = buildTitle(game, styleKey, goalKey, useEmoji);
      if (t.length > 5) titles.add(t);
      attempts++;
    }
    return [...titles];
  }

  // ── UI ──

  const $ = (s) => document.querySelector(s);
  const gameEl    = $('#game');
  const styleEl   = $('#style');
  const goalEl    = $('#goal');
  const emojiEl   = $('#emoji');
  const countEl   = $('#count');
  const errorEl   = $('#error');
  const resultsEl = $('#results');
  const cardsEl   = $('#cards');
  const genBtn    = $('#generate');
  const againBtn  = $('#again');
  const copyAllBtn= $('#copyAll');
  const clearBtn  = $('#clear');

  function sanitize(s) {
    return s.replace(/[<>"'&]/g, '').trim().substring(0, 80);
  }

  function showError(show) {
    errorEl.hidden = !show;
  }

  function renderResults(titles) {
    while (cardsEl.firstChild) cardsEl.removeChild(cardsEl.firstChild);
    titles.forEach(t => {
      const card = document.createElement('div');
      card.className = 'card';

      const body = document.createElement('div');
      body.className = 'card-body';

      const titleEl = document.createElement('div');
      titleEl.className = 'card-title';
      titleEl.textContent = t;

      const charsEl = document.createElement('div');
      charsEl.className = 'card-chars';
      charsEl.textContent = t.length + ' characters';

      body.appendChild(titleEl);
      body.appendChild(charsEl);

      const btn = document.createElement('button');
      btn.className = 'btn-copy';
      btn.textContent = 'Copy';
      btn.dataset.title = t;

      card.appendChild(body);
      card.appendChild(btn);
      cardsEl.appendChild(card);
    });
    resultsEl.hidden = false;
  }

  function doGenerate() {
    const game = sanitize(gameEl.value);
    if (!game) { showError(true); gameEl.focus(); return; }
    showError(false);
    const titles = generate(game, styleEl.value, goalEl.value, emojiEl.checked, +countEl.value);
    renderResults(titles);
  }

  async function copyText(text, btn) {
    try {
      await navigator.clipboard.writeText(text);
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1500);
    } catch (_) {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select(); document.execCommand('copy');
      document.body.removeChild(ta);
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1500);
    }
  }

  // Events
  genBtn.addEventListener('click', doGenerate);
  againBtn.addEventListener('click', doGenerate);
  gameEl.addEventListener('input', () => showError(false));
  gameEl.addEventListener('keydown', e => { if (e.key === 'Enter') doGenerate(); });

  cardsEl.addEventListener('click', e => {
    const btn = e.target.closest('.btn-copy');
    if (btn) copyText(btn.dataset.title, btn);
  });

  copyAllBtn.addEventListener('click', () => {
    const titles = [...cardsEl.querySelectorAll('.card-title')].map(el => el.textContent);
    copyText(titles.join('\n'), copyAllBtn);
  });

  clearBtn.addEventListener('click', () => {
    while (cardsEl.firstChild) cardsEl.removeChild(cardsEl.firstChild);
    resultsEl.hidden = true;
  });

  // Expose for testing
  if (typeof window !== 'undefined') {
    window.__ttg = { generate, clean };
  }
})();
