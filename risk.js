
const RiskAnalyzer = (function() {
  const state = {
    score: 0,
    level: 'Safe',
    events: [],
    counters: {
      tab: 0,
      paste: 0,
      idle: 0,
      typingBurst: 0
    }
  };

  const eventWeight = {
    tab: 5,      
    paste: 25,
    copy: 20,
    idle: 10,
    typingBurst: 15,
    contextmenu: 10,
    devtools: 30,
    fullscreenExit: 15
  };

  let decayInterval = null;

  function computeLevel(score) {
    if (score <= 20) return 'Safe';
    if (score <= 40) return 'Warning';
    if (score <= 70) return 'Suspicious';
    return 'High Risk';
  }

  function updateLevel() {
    state.level = computeLevel(state.score);
  }

  function addEvent(type, detail) {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    let increment = 0;


    if (type === 'tab') {
      state.counters.tab += 1;
      const tabCount = state.counters.tab;
      if (tabCount === 1) increment = 5;
      else if (tabCount === 2) increment = 10;
      else increment = 20;
    } else {
   
      increment = eventWeight[type] || 0;
      if (state.counters.hasOwnProperty(type) && type !== 'tab') {
        state.counters[type] += 1;
      }
    }

    state.score = Math.min(100, state.score + increment);
    updateLevel();

    state.events.unshift({ type, detail: detail || '', timestamp });
    if (state.events.length > 10) state.events.pop();

    return { score: state.score, level: state.level, counters: { ...state.counters } };
  }

 
  function startDecay(intervalMs = 30000) {
    if (decayInterval) clearInterval(decayInterval);
    decayInterval = setInterval(() => {
      state.score = Math.max(0, state.score - 2);
      updateLevel();
    }, intervalMs);
  }

  function stopDecay() {
    if (decayInterval) {
      clearInterval(decayInterval);
      decayInterval = null;
    }
  }

  function getScore() {
    return state.score;
  }

  function getLevel() {
    return state.level;
  }

  function getHistory() {
    return [...state.events];
  }

  function getCounters() {
    return { ...state.counters };
  }

  function reset() {
    state.score = 0;
    state.level = 'Safe';
    state.events = [];
    state.counters = { tab:0, paste:0, idle:0, typingBurst:0 };
  }

  
  startDecay();

  return {
    addEvent,
    getScore,
    getLevel,
    getHistory,
    getCounters,
    stopDecay,
    reset
  };
})();