#  Cheating Detector  
### Academic Integrity Monitoring System

A comprehensive web-based examination platform with **real-time behavioral monitoring** and **academic integrity violation detection**.

This system tracks suspicious activities during online assessments and dynamically generates a **risk analysis report**.

---

## Default Credentials (Testing Only)

**Teacher Email:** `teacher@university.com`  
**Password:** `adminsecure`

---

## Features

### Exam Interface

- **Dynamic Question Navigation**  
  Previous / Next buttons with progress tracking

- **Multiple Question Types**  
  Support for *Multiple Choice Questions (MCQ)* and text input answers

- **Countdown Timer**  
  10-minute timer with visual urgency indicators

- **Subject Labeling**  
  Questions categorized by **Mathematics** and **Science**

---

## Integrity Monitoring

- **Real-time Risk Score**  
  Dynamic scoring system (0–100) based on suspicious behavior

- **Live Risk Level Indicators**  
  `Safe → Warning → Suspicious → High Risk`

- **Event Logging**  
  Timestamped record of detected violations

- **Statistics Dashboard**
  - Tab switches  
  - Paste attempts  
  - Idle incidents  
  - Typing bursts  

---

## Violation Detection

- **Tab Switching Detection**  
  Monitors when the user leaves the exam window

- **Copy / Paste Prevention**  
  Detects and logs copy-paste attempts

- **Right-click Blocking**  
  Prevents context menu access

- **Developer Tools Detection**  
  Blocks:
  - `F12`
  - `Ctrl + Shift + I`
  - `Ctrl + U`

- **Idle Time Detection**  
  Flags extended inactivity (60+ seconds)

- **Typing Burst Analysis**  
  Detects rapid abnormal typing behavior

- **Fullscreen Exit Monitoring**  
  Alerts when fullscreen mode is exited

- **Screenshot Attempt Detection**  
  Detects `Print Screen` usage

---

## Security Features

- **Auto-Lockdown Mode**  
  Triggers after 3 tab switches

- **Teacher Unlock Mechanism**  
  Authentication required to resume the exam

- **Audio Alarm System**  
  Activated during lockdown mode

- **Fullscreen Enforcement**  
  Forces fullscreen during examination

