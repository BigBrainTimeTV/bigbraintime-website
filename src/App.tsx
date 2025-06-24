import { useState, useEffect } from 'react';
import './App.css';

// Type declaration for Simple Analytics
declare global {
  interface Window {
    sa_event?: (eventName: string) => void;
  }
}

function Navigation() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <button onClick={scrollToTop} className="nav-logo">
          BigBrainTime
        </button>
        <a 
          href="https://twitch.tv/bigbraintime" 
          target="_blank"
          rel="noopener noreferrer"
          className="watch-live-button"
        >
          🔴 Watch Live
        </a>
      </div>
    </nav>
  );
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const launchDate = new Date('2025-08-01T00:00:00');
      const now = new Date();
      const difference = launchDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown">
      <div className="countdown-item">
        <div className="countdown-value">{timeLeft.days}</div>
        <div className="countdown-label">days</div>
      </div>
      <div className="countdown-item">
        <div className="countdown-value">{timeLeft.hours}</div>
        <div className="countdown-label">hours</div>
      </div>
      <div className="countdown-item">
        <div className="countdown-value">{timeLeft.minutes}</div>
        <div className="countdown-label">minutes</div>
      </div>
    </div>
  );
}

function HeroSection() {
  const [email, setEmail] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://formspree.io/f/mjkraqqa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          _subject: 'New BigBrainTime Signup'
        })
      });

      if (response.ok) {
        window.sa_event?.('email_signup');
        setEmail('');
        alert('Welcome aboard! Check your email to confirm.');
      } else {
        alert('Something went wrong. Try again?');
      }
    } catch (error) {
      alert('Something went wrong. Try again?');
    }
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
        
        <CountdownTimer />
      </div>
    </section>
  );
}

function WhyWatchSection() {
  const faqs = [
    {
      question: "I'm also doing the Scrimba path. Why should I watch?",
      answer: "You'll see someone else face the same challenges, get stuck, and push through. It's like having a study buddy who isn't afraid to show the messy parts. You might even pick up tips or motivation to keep going when things get tough."
    },
    {
      question: "Why watch someone else learn?",
      answer: "Because real learning is messy. You'll see the actual struggles, the moments of doubt, and the breakthroughs that happen when you're genuinely stuck. No edited highlights, just the raw journey."
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
        <h2>The Journey Ahead</h2>
        <div className="timeline">
          <div className="timeline-item active">
            <div className="timeline-date">August 2025</div>
            <div className="timeline-content">
              <h3>Scrimba Full Stack Career Path</h3>
              <p>Starting from complete beginner to job-ready full stack developer.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-date"></div>
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

function DiscordSection() {
  return (
    <section className="discord-section">
      <div className="container">
        <h2>Join the Community</h2>
        <p className="discord-description">
          Connect with other learners, share resources, and get help when you're stuck.
        </p>
        <a 
          href="https://discord.gg/bigbrain" 
          target="_blank" 
          rel="noopener noreferrer"
          className="discord-button"
          onClick={() => window.sa_event?.('joined_discord')}
        >
          <span>💬</span> Join Discord Server
        </a>
      </div>
    </section>
  );
}

function Footer() {
  const socials = [
    { name: 'Twitch', url: 'https://twitch.tv/bigbraintime', icon: '🎮' },
    { name: 'Discord', url: 'https://discord.gg/bigbrain', icon: '💬' },
    { name: 'Twitter', url: 'https://twitter.com/bigbraintime', icon: '🐦' },
    { name: 'YouTube', url: 'https://youtube.com/@bigbraintime', icon: '📺' },
    { name: 'GitHub', url: 'https://github.com/bigbraintimetv', icon: '💻' }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="social-links">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                onClick={() => window.sa_event?.(`clicked_${social.name.toLowerCase()}`)}
              >
                <span className="social-icon">{social.icon}</span>
                <span className="social-name">{social.name}</span>
              </a>
            ))}
          </div>
          <p className="footer-tagline">
            Learning in public. Failing forward. Growing together.
          </p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  useEffect(() => {
    // Simple Analytics
    const script = document.createElement('script');
    script.src = 'https://scripts.simpleanalyticscdn.com/latest.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="App">
      <Navigation />
      <HeroSection />
      <WhyWatchSection />
      <UpcomingSection />
      <DiscordSection />
      <Footer />
    </div>
  );
}

export default App;