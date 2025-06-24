import { useState, useEffect } from 'react';
import './App.css';

// Type declaration for Simple Analytics
declare global {
  interface Window {
    sa_event?: (eventName: string) => void;
  }
}

function HeroSection() {
  const [email, setEmail] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // We'll track this event for analytics
    if (window.sa_event) {
      window.sa_event('email_signup');
    }
    console.log('Email submitted:', email);
    // TODO: Actually save this email somewhere
    setEmail('');
    alert('You\'re in! Check your email for updates.');
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Failing Our Way to Success
        </h1>
        <p className="hero-subtitle">
          Watch me tackle the Scrimba Full Stack Career Path from complete beginner 
          to job-ready developer. Every failure and breakthrough streamed live on Twitch.
        </p>
        
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Get notified when we go live"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="email-input"
          />
          <button type="submit" className="cta-button primary">
            Join the Journey
          </button>
        </form>
        
        <div className="launch-date">
          <span className="launch-label">First Stream:</span>
          <span className="launch-value">August 1, 2025</span>
        </div>
      </div>
    </section>
  );
}

function WhyWatchSection() {
  const reasons = [
    {
      title: "Real Struggles",
      description: "No edited highlights. Watch me get stuck, frustrated, and eventually breakthrough.",
      emoji: "😤"
    },
    {
      title: "Learn Together",
      description: "Chat helps when I'm stuck. We're figuring this out as a community.",
      emoji: "🤝"
    },
    {
      title: "Full Stack Journey",
      description: "From frontend to backend, database to deployment - the complete developer path.",
      emoji: "🎯"
    }
  ];

  return (
    <section className="why-watch">
      <div className="container">
        <h2>Why Watch Someone Else Learn?</h2>
        <div className="reasons-grid">
          {reasons.map((reason, index) => (
            <div key={index} className="reason-card">
              <div className="reason-emoji">{reason.emoji}</div>
              <h3>{reason.title}</h3>
              <p>{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UpcomingSection() {
  return (
    <section className="upcoming">
      <div className="container">
        <h2>The Learning Path</h2>
        <div className="timeline">
          <div className="timeline-item active">
            <div className="timeline-date">August 2025</div>
            <div className="timeline-content">
              <h3>Scrimba Full Stack Career Path</h3>
              <p>Starting from complete beginner to job-ready full stack developer.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-date">Future</div>
            <div className="timeline-content">
              <h3>What's Next?</h3>
              <p>Community will decide what comes after the full stack journey.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  useEffect(() => {
    // Initialize Simple Analytics
    const script = document.createElement('script');
    script.src = 'https://scripts.simpleanalyticscdn.com/latest.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="App">
      <HeroSection />
      <WhyWatchSection />
      <UpcomingSection />
    </div>
  );
}

export default App;