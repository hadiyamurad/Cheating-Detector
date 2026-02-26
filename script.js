(function() {

  const examDB = {
    subjects: ['Mathematics', 'Science'],
    questions: [
      { 
        subject: 0, 
        text: 'What is 5 + 7 ?', 
        type: 'mcq',
        options: ['10', '11', '12', '13'], 
        correct: 2 
      },
      { 
        subject: 0, 
        text: 'Square root of 81?', 
        type: 'mcq',
        options: ['7', '8', '9', '10'], 
        correct: 2 
      },
      { 
        subject: 0, 
        text: 'Derivative of x²?', 
        type: 'mcq',
        options: ['x', '2x', '2', 'x²'], 
        correct: 1 
      },
      { 
        subject: 0, 
        text: 'Explain what is the value of π and why it\'s important in mathematics?', 
        type: 'text',
        correct: '3.14' 
      },
      { 
        subject: 0, 
        text: 'sin(0) = ?', 
        type: 'mcq',
        options: ['0', '1', '-1', 'undefined'], 
        correct: 0 
      },
      { 
        subject: 1, 
        text: 'H₂O is?', 
        type: 'mcq',
        options: ['Salt', 'Oxygen', 'Water', 'Acid'], 
        correct: 2 
      },
      { 
        subject: 1, 
        text: 'Planet nearest sun?', 
        type: 'mcq',
        options: ['Venus', 'Mercury', 'Earth', 'Mars'], 
        correct: 1 
      },
      { 
        subject: 1, 
        text: 'Describe the process of photosynthesis in simple terms:', 
        type: 'text',
        correct: 'O2' 
      },
      { 
        subject: 1, 
        text: 'Atomic number of Oxygen?', 
        type: 'mcq',
        options: ['6', '7', '8', '9'], 
        correct: 2 
      },
      { 
        subject: 1, 
        text: 'What is the normal pH range of human blood?', 
        type: 'text',
        correct: '7.4' 
      }
    ],
    answers: {}, 
    currentIndex: 0
  };

  
  const timerEl = document.getElementById('timerDisplay');
  const subjectLabel = document.getElementById('subjectLabel');
  const questionCounter = document.getElementById('questionCounter');
  const questionText = document.getElementById('questionText');
  const optionsDiv = document.getElementById('optionsContainer');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const submitArea = document.getElementById('submitBtnContainer');
  const submitBtn = document.getElementById('submitExamBtn');

  const headerRiskBadge = document.getElementById('headerRiskBadge');
  const headerRiskScore = document.getElementById('headerRiskScore');
  const liveRiskScore = document.getElementById('liveRiskScore');
  const riskProgress = document.getElementById('riskProgress');
  const liveRiskLevel = document.getElementById('liveRiskLevel');
  const eventLogList = document.getElementById('eventLogList');
  const statTab = document.getElementById('statTab');
  const statPaste = document.getElementById('statPaste');
  const statIdle = document.getElementById('statIdle');
  const statBurst = document.getElementById('statBurst');

  
  const lockdownDiv = document.getElementById('lockdownOverlay');
  const unlockForm = document.getElementById('unlockForm');
  const unlockEmail = document.getElementById('unlockEmail');
  const unlockPassword = document.getElementById('unlockPassword');
  const formError = document.getElementById('formError');
  const reportOverlay = document.getElementById('reportOverlay');
  const closeReportBtn = document.getElementById('closeReportBtn');

  const alarmAudio = document.getElementById('alarmAudio');

  
  let timerInterval = null;
  let timeLeft = 600; // 10 min
  let examActive = true;
  let lockdownActive = false;

 
//   function renderQuestion() {
//     if (!examActive) return;
    
//     const q = examDB.questions[examDB.currentIndex];
//     subjectLabel.textContent = examDB.subjects[q.subject];
//     questionCounter.textContent = `${examDB.currentIndex+1} / ${examDB.questions.length}`;
//     questionText.textContent = q.text;
    
//     let html = '';
    
   
//     html += `<div class="question-type-selector">
//       <label class="type-option">
//         <input type="radio" name="questionType" value="mcq" ${q.type === 'mcq' ? 'checked' : ''}> Multiple Choice
//       </label>
//       <label class="type-option">
//         <input type="radio" name="questionType" value="text" ${q.type === 'text' ? 'checked' : ''}> Text Input
//       </label>
//     </div>`;
    
//     if (q.type === 'mcq') {
     
//       q.options.forEach((opt, idx) => {
//         const savedAnswer = examDB.answers[examDB.currentIndex];
//         const checked = (savedAnswer && savedAnswer.type === 'mcq' && savedAnswer.value === idx) ? 'checked' : '';
//         html += `<label class="option-item"><input type="radio" name="mcq" value="${idx}" ${checked}> ${opt}</label>`;
//       });
//     } else {
     
//       const savedAnswer = examDB.answers[examDB.currentIndex];
//       const textValue = (savedAnswer && savedAnswer.type === 'text') ? savedAnswer.value : '';
//       html += `<input type="text" class="text-input-field" id="textInput" placeholder="Type your answer here..." value="${textValue}">`;
//     }
    
//     optionsDiv.innerHTML = html;
    
  
//     if (q.type === 'mcq') {
//       document.querySelectorAll('input[name="mcq"]').forEach(r => r.addEventListener('change', (e) => {
//         examDB.answers[examDB.currentIndex] = {
//           type: 'mcq',
//           value: parseInt(e.target.value)
//         };
//       }));
//     } else {
//       const textInput = document.getElementById('textInput');
//       if (textInput) {
//         textInput.addEventListener('input', (e) => {
//           examDB.answers[examDB.currentIndex] = {
//             type: 'text',
//             value: e.target.value
//           };
//         });
//       }
//     }
    
//     document.querySelectorAll('input[name="questionType"]').forEach(radio => {
//       radio.addEventListener('change', (e) => {
//         const newType = e.target.value;
//         q.type = newType;
        
       
//         delete examDB.answers[examDB.currentIndex];
     
//         renderQuestion();
//       });
//     });

//     prevBtn.disabled = examDB.currentIndex === 0;
    
//     if (examDB.currentIndex === examDB.questions.length - 1) {
//       submitArea.style.display = 'block';
//       nextBtn.style.visibility = 'hidden';
//     } else {
//       submitArea.style.display = 'none';
//       nextBtn.style.visibility = 'visible';
//     }
//   }
function renderQuestion() {
  if (!examActive) return;
  
  const q = examDB.questions[examDB.currentIndex];
  subjectLabel.textContent = examDB.subjects[q.subject];
  questionCounter.textContent = `${examDB.currentIndex+1} / ${examDB.questions.length}`;
  questionText.textContent = q.text;
  
  let html = '';
  
  // Remove the type selector - we don't want users to change the question type
  
  if (q.type === 'mcq') {
    // Multiple Choice rendering
    q.options.forEach((opt, idx) => {
      const savedAnswer = examDB.answers[examDB.currentIndex];
      const checked = (savedAnswer && savedAnswer.type === 'mcq' && savedAnswer.value === idx) ? 'checked' : '';
      html += `<label class="option-item"><input type="radio" name="mcq" value="${idx}" ${checked}> ${opt}</label>`;
    });
  } else {
    // Text Input rendering
    const savedAnswer = examDB.answers[examDB.currentIndex];
    const textValue = (savedAnswer && savedAnswer.type === 'text') ? savedAnswer.value : '';
    html += `<input type="text" class="text-input-field" id="textInput" placeholder="Type your answer here..." value="${textValue}">`;
  }
  
  optionsDiv.innerHTML = html;
  
  // Add event listeners for the current input type
  if (q.type === 'mcq') {
    document.querySelectorAll('input[name="mcq"]').forEach(r => r.addEventListener('change', (e) => {
      examDB.answers[examDB.currentIndex] = {
        type: 'mcq',
        value: parseInt(e.target.value)
      };
    }));
  } else {
    const textInput = document.getElementById('textInput');
    if (textInput) {
      textInput.addEventListener('input', (e) => {
        examDB.answers[examDB.currentIndex] = {
          type: 'text',
          value: e.target.value
        };
      });
    }
  }
  
  prevBtn.disabled = examDB.currentIndex === 0;
  
  if (examDB.currentIndex === examDB.questions.length - 1) {
    submitArea.style.display = 'block';
    nextBtn.style.visibility = 'hidden';
  } else {
    submitArea.style.display = 'none';
    nextBtn.style.visibility = 'visible';
  }
}

  function nextQuestion() {
    if (examDB.currentIndex < examDB.questions.length - 1) {
      examDB.currentIndex++;
      renderQuestion();
    }
  }
  
  function prevQuestion() {
    if (examDB.currentIndex > 0) {
      examDB.currentIndex--;
      renderQuestion();
    }
  }

 
  function updateTimerDisplay() {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    timerEl.textContent = `${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
    if (timeLeft < 60) timerEl.classList.add('urgent');
    else timerEl.classList.remove('urgent');
  }
  
  function startTimer() {
   
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    
    timerInterval = setInterval(() => {
      if (!examActive || lockdownActive) return;
      
      timeLeft--;
      updateTimerDisplay();
      
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        submitExam();
      }
    }, 1000);
    
    console.log('Timer started'); 
  }

  function submitExam() {
    if (!examActive) return;
    
    console.log('Submitting exam...'); 
    
    examActive = false;
    
    if (typeof Tracker !== 'undefined' && Tracker.lock) {
      Tracker.lock();
    }
    
    if (typeof RiskAnalyzer !== 'undefined' && RiskAnalyzer.stopDecay) {
      RiskAnalyzer.stopDecay();
    }
    
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    
    showReport();
  }

  function showReport() {
    const counters = typeof RiskAnalyzer !== 'undefined' ? RiskAnalyzer.getCounters() : { tab:0, paste:0, idle:0, typingBurst:0 };
    const score = typeof RiskAnalyzer !== 'undefined' ? RiskAnalyzer.getScore() : 0;
    const level = typeof RiskAnalyzer !== 'undefined' ? RiskAnalyzer.getLevel() : 'Safe';
    
    let likelihood = 'Very Low';
    if (score > 20) likelihood = 'Low';
    if (score > 40) likelihood = 'Moderate';
    if (score > 70) likelihood = 'High';

    document.getElementById('reportScore').textContent = score;
    document.getElementById('reportLevel').textContent = level;
    document.getElementById('reportLikelihood').textContent = likelihood;
    document.getElementById('reportTab').textContent = counters.tab;
    document.getElementById('reportPaste').textContent = counters.paste;
    document.getElementById('reportIdle').textContent = counters.idle;
    document.getElementById('reportBurst').textContent = counters.typingBurst;
    document.getElementById('reportSummary').textContent = `Based on behavioral monitoring, the candidate showed ${likelihood} risk indicators during the assessment.`;
    
    reportOverlay.classList.remove('hidden');
  }

  function updateRiskUI(eventType, result) {
    if (!result) return;
    
    headerRiskBadge.textContent = result.level;
    headerRiskScore.textContent = result.score;
    liveRiskScore.textContent = result.score;
    riskProgress.style.width = result.score + '%';
    liveRiskLevel.textContent = result.level;

    const colors = { 'Safe':'#22c55e', 'Warning':'#eab308', 'Suspicious':'#f97316', 'High Risk':'#ef4444' };
    liveRiskLevel.style.backgroundColor = colors[result.level] || '#22c55e';
    headerRiskBadge.style.backgroundColor = colors[result.level] || '#22c55e';

    const history = typeof RiskAnalyzer !== 'undefined' ? RiskAnalyzer.getHistory() : [];
    eventLogList.innerHTML = history.map(e => `<li>${e.timestamp} · ${e.type}</li>`).join('') || '<li>— monitoring active —</li>';

    const cnt = typeof RiskAnalyzer !== 'undefined' ? RiskAnalyzer.getCounters() : { tab:0, paste:0, idle:0, typingBurst:0 };
    statTab.textContent = cnt.tab;
    statPaste.textContent = cnt.paste;
    statIdle.textContent = cnt.idle;
    statBurst.textContent = cnt.typingBurst;
  }


  function triggerLockdown() {
    if (lockdownActive || !examActive) return;
    
    console.log('Lockdown triggered'); 
    
    lockdownActive = true;
    examActive = false;
    
    if (typeof Tracker !== 'undefined' && Tracker.lock) {
      Tracker.lock();
    }
    
    if (typeof RiskAnalyzer !== 'undefined' && RiskAnalyzer.stopDecay) {
      RiskAnalyzer.stopDecay();
    }
    
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    
    lockdownDiv.classList.remove('hidden');
    
    if (alarmAudio) {
      alarmAudio.play().catch(e => console.log('Audio play failed:', e));
    }
  }

  function releaseLockdown() {
    lockdownDiv.classList.add('hidden');
    
    if (alarmAudio) {
      alarmAudio.pause();
      alarmAudio.currentTime = 0;
    }
    
    lockdownActive = false;
    examActive = true;
    
    if (typeof Tracker !== 'undefined' && Tracker.unlock) {
      Tracker.unlock();
    }
    
    if (typeof RiskAnalyzer !== 'undefined' && RiskAnalyzer.startDecay) {
      RiskAnalyzer.startDecay();
    }
    
    startTimer();
  }

  
  prevBtn.addEventListener('click', prevQuestion);
  nextBtn.addEventListener('click', nextQuestion);
  submitBtn.addEventListener('click', submitExam);
  closeReportBtn.addEventListener('click', () => reportOverlay.classList.add('hidden'));

  document.addEventListener('lockdownTrigger', triggerLockdown);

  unlockForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = unlockEmail.value.trim();
    const pwd = unlockPassword.value.trim();
    
    if (email === 'teacher@university.com' && pwd === 'adminsecure') {
      releaseLockdown();
    } else {
      formError.textContent = 'Invalid credentials +10 risk';
      formError.classList.add('shake');
      setTimeout(() => formError.classList.remove('shake'), 500);
      
      if (typeof RiskAnalyzer !== 'undefined') {
        RiskAnalyzer.addEvent('devtools');
        updateRiskUI('penalty', { 
          score: RiskAnalyzer.getScore(), 
          level: RiskAnalyzer.getLevel(), 
          counters: RiskAnalyzer.getCounters() 
        });
      }
    }
  });


  document.addEventListener('contextmenu', (e) => e.preventDefault());
  document.addEventListener('keydown', (e) => {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.key === 'u')) {
      e.preventDefault();
    }
  });

 
  document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...'); 
    

    if (typeof Tracker !== 'undefined' && Tracker.init) {
      Tracker.init(updateRiskUI);
      console.log('Tracker initialized');
    } else {
      console.error('Tracker not found');
    }
    
    renderQuestion();
    startTimer();
    
    
    document.addEventListener('click', function requestFullScreen() {
      if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(e => {
          console.log('Fullscreen request failed:', e);
        });
      }
      document.removeEventListener('click', requestFullScreen);
    }, { once: true });
  });

  
  window.addEventListener('keyup', (e) => {
    if (e.key === 'PrintScreen') {
      if (typeof RiskAnalyzer !== 'undefined') {
        RiskAnalyzer.addEvent('copy');
        updateRiskUI('printscreen', { 
          score: RiskAnalyzer.getScore(), 
          level: RiskAnalyzer.getLevel(), 
          counters: RiskAnalyzer.getCounters() 
        });
      }
    }
  });

})();