import { useState, useEffect } from 'react';
import './App.css';

// Type declaration for Simple Analytics
declare global {
  interface Window {
    sa_event?: (eventName: string) => void;
  }
}

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return isVisible ? (
    <button 
      onClick={scrollToTop}
      className="back-to-top"
      aria-label="Back to top"
    >
      ↑
    </button>
  ) : null;
}

function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="scroll-progress">
      <div className="progress-bar" style={{ width: `${scrollProgress}%` }} />
    </div>
  );
}

function Navigation() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
      document.body.classList.toggle('light-mode', savedTheme === 'light');
    } else {
      setIsDark(prefersDark);
      document.body.classList.toggle('light-mode', !prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.body.classList.toggle('light-mode', !newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <button onClick={scrollToTop} className="nav-logo">
          BigBrainTime
        </button>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
            {isDark ? '☀️' : '🌙'}
          </button>
          <a 
            href="https://www.twitch.tv/bigbraintimetv" 
            target="_blank"
            rel="noopener noreferrer"
            className="watch-live-button"
          >
            🔴 Watch Live
          </a>
        </div>
      </div>
    </nav>
  );
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const launchDate = new Date('2025-08-01T00:00:00');
      const now = new Date();
      const difference = launchDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000); // Update every second

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
      <div className="countdown-item">
        <div className="countdown-value">{timeLeft.seconds}</div>
        <div className="countdown-label">seconds</div>
      </div>
    </div>
  );
}

function ShareButtons() {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'BigBrainTime - Learning in Public',
          text: 'Watch me tackle the Scrimba Full Stack Path from complete beginner to job-ready developer. Live on Twitch.',
          url: window.location.href
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="share-buttons">
      <button onClick={handleShare} className="share-button">
        📤 Share
      </button>
    </div>
  );
}

function HeroSection() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Failing Our Way to Success
        </h1>
        <p className="hero-subtitle">
          Join me as I tackle the Scrimba Full Stack Path, CompTIA certifications, 
          and whatever the community throws at me next. 
          Every failure and breakthrough streamed live on Twitch.
        </p>
        
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Get notified when we go live"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="email-input"
            disabled={isSubmitting}
          />
          <button type="submit" className="cta-button primary" disabled={isSubmitting}>
            {isSubmitting ? (
              <span>Joining... <span className="loading-dots">...</span></span>
            ) : (
              'Join the Journey'
            )}
          </button>
        </form>
        
        <div className="launch-date">
          <span className="launch-label">First Stream:</span>
          <span className="launch-value">August 1, 2025</span>
        </div>
        
        <CountdownTimer />
        <ShareButtons />
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
            <div className="timeline-date">Next:</div>
            <div className="timeline-content">
              <h3>CompTIA A+ Certification</h3>
              <p>From zero IT knowledge to certified. Because why not?</p>
            </div>
          </div>
          <div className="timeline-item timeline-item-center">
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
          href="https://discord.gg/PZcZjd7e" 
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
    { name: 'Twitch', url: 'https://www.twitch.tv/bigbraintimetv', icon: '🎮' },
    { name: 'Discord', url: 'https://discord.gg/PZcZjd7e', icon: '💬' },
    { name: 'Bluesky', url: 'https://bsky.app/profile/bigbraintimetv.bsky.social', icon: '☁️' },
    { name: 'YouTube', url: 'https://www.youtube.com/@bigbraintimetv', icon: '📺' },
    { name: 'GitHub', url: 'https://github.com/orgs/BigBrainTimeTV/repositories', icon: '💻' }
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
      <ScrollProgress />
      <HeroSection />
      <WhyWatchSection />
      <UpcomingSection />
      <DiscordSection />
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;