
const Tracker = (function() {
  let riskCallback = null;
  let locked = false;
  let tabSwitchCount = 0;
  let idleTimer = null;
  let typingTimer = null;
  let keyPresses = 0;
  const IDLE_THRESHOLD = 60; // seconds
  const TYPING_BURST_KEYS = 15;
  const TYPING_BURST_MS = 3000;

  function init(callback) {
    riskCallback = callback;
    attachListeners();
    startIdleDetector();
  }

  function attachListeners() {

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('blur', handleWindowBlur);
    
    document.addEventListener('copy', (e) => handleEvent('copy'));
    document.addEventListener('paste', (e) => handleEvent('paste'));
    document.addEventListener('contextmenu', (e) => { e.preventDefault(); handleEvent('contextmenu'); });
    
   
    document.addEventListener('keydown', handleKeyDown);
    
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.key === 'u')) {
        e.preventDefault();
        handleEvent('devtools');
      }
    });


    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    ['mousemove', 'keydown', 'click', 'scroll'].forEach(ev => {
      document.addEventListener(ev, resetIdle, { passive: true });
    });
  }

  function handleVisibility() {
    if (document.hidden) {
      handleEvent('tab');
    }
  }

  function handleWindowBlur() {
    
    handleEvent('tab');
  }

  function handleKeyDown(e) {
    keyPresses++;
    if (!typingTimer) {
      typingTimer = setTimeout(() => {
        if (keyPresses >= TYPING_BURST_KEYS) {
          handleEvent('typingBurst');
        }
        keyPresses = 0;
        typingTimer = null;
      }, TYPING_BURST_MS);
    }
  }

  let fullscreenExited = false;
  function handleFullscreenChange() {
    if (!document.fullscreenElement && !locked) {
      handleEvent('fullscreenExit');
    }
  }

  function handleEvent(type) {
    if (locked) return;
    const result = RiskAnalyzer.addEvent(type);
    if (riskCallback) riskCallback(type, result);
    
    // lockdown if tab switch >= 3 (using counter)
    const counters = RiskAnalyzer.getCounters();
    if (counters.tab >= 3) {
      document.dispatchEvent(new CustomEvent('lockdownTrigger'));
    }
  }

  function startIdleDetector() {
    resetIdle();
  }

  function resetIdle() {
    if (locked) return;
    if (idleTimer) clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      handleEvent('idle');
    }, IDLE_THRESHOLD * 1000);
  }

  function lock() {
    locked = true;
    if (idleTimer) clearTimeout(idleTimer);
    if (typingTimer) clearTimeout(typingTimer);
  }

  function unlock() {
    locked = false;
    resetIdle();
  }

  return {
    init,
    lock,
    unlock
  };
})();