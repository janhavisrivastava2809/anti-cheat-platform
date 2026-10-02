# Anti-Cheat Assessment Platform

A robust, full-stack assessment platform engineered to deliver secure, fair, and automated technical evaluations. Designed for educational institutions, bootcamps, and hiring teams, the platform actively detects and deters academic dishonesty using real-time proctoring, code plagiarism analysis, and browser restriction mechanisms.

---

## 🛡️ Key Features

### Anti-Cheat & Integrity Controls
* **Browser Lockdown & Telemetry:** Monitors window focus, tab switching, dual-monitor setups, and disables copy-paste/right-click actions during active tests.
* **Plagiarism & Similarity Engine:** Analyzes code and essay submissions against fellow candidate submissions and public codebases to flag copied content and structure.
* **Webcam & Audio Proctoring:** Optional real-time webcam logging and voice detection to flag multi-person presence, missing candidates, or unauthorized devices.
* **Keystroke Dynamics & Timing Analytics:** Tracks typing speed anomalies, sudden bulk text pastes, and suspicious submission intervals.

### Assessment Management
* **Flexible Test Builder:** Supports multiple choice, open-ended prose, and live coding challenges with automated test-case runner support.
* **Automated Scoring:** Instant evaluation for multiple-choice questions and automated test suite execution for code assessments.
* **Detailed Audit Reports:** Generates comprehensive candidate risk scores and timestamped event logs (e.g., tab switches, focus loss) for easy reviewer auditing.
