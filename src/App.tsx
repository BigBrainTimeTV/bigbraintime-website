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
  const faqs = [
    {
      question: "Why watch someone else learn?",
      answer: "Because real learning is messy. You'll see the actual struggles, the moments of doubt, and the breakthroughs that happen when you're genuinely stuck."
    },
    {
      question: "What if I'm not a developer?",
      answer: "Perfect. This isn't about teaching you to code, it's about showing you how to learn anything. The process of going from zero to competent is universal."
    },
    {
      question: "How is this different from tutorials?",
      answer: "Tutorials show you the right way. I'm showing you what happens when you don't know the right way. You'll see the mistakes, the debugging, the 'why isn't this working' moments that tutorials skip."
    }
  ];

  return (
    <section className="why-watch">
      <div className="container">
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <h3 className="faq-question">{faq.question}</h3>
              <p className="faq-answer">{faq.answer}</p>
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