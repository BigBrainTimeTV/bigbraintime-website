# BigBrainTime Website

A modern, responsive landing page for BigBrainTime's Twitch streaming journey. Built with React, TypeScript, and CSS, featuring dark/light mode themes and interactive elements.

## About

BigBrainTime is a live streaming project focused on learning in public. The website serves as a landing page for viewers to learn about the journey, sign up for notifications, and join the community.

### Key Features
- **Live Learning Streams:** Follow the Scrimba Full Stack Path and CompTIA certifications
- **Community Focus:** Join Discord for support and collaboration
- **Transparent Process:** See the real struggles and breakthroughs of learning to code
- **Interactive Elements:** Email signup, countdown timer, and social links

## Features

### Core Functionality
- **Responsive Design:** Works perfectly on desktop, tablet, and mobile
- **Dark/Light Mode:** Toggle between themes with persistent preferences
- **Email Signup:** Formspree integration for newsletter subscriptions
- **Countdown Timer:** Real-time countdown to first stream (August 1, 2025)
- **Scroll Progress:** Visual indicator showing page scroll progress
- **Social Integration:** Links to Twitch, Discord, Bluesky, YouTube, and GitHub

### Technical Features
- **TypeScript:** Full type safety and better development experience
- **CSS Variables:** Theme-aware styling with smooth transitions
- **Performance Optimized:** Efficient event handling and animations
- **Accessibility:** ARIA labels, keyboard navigation, and proper contrast
- **Analytics:** Simple Analytics integration for tracking user interactions

## Tech Stack

- **Frontend:** React 19.1.0
- **Language:** TypeScript 4.9.5
- **Styling:** CSS3 with CSS Variables
- **Build Tool:** Create React App
- **Form Handling:** Formspree
- **Analytics:** Simple Analytics
- **Deployment:** Ready for Vercel, Netlify, or any static hosting

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/bigbraintime-website.git
   cd bigbraintime-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Development

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

### Project Structure

```
bigbraintime-website/
├── public/                 # Static assets
│   ├── index.html         # Main HTML file
│   ├── favicon.ico        # Site favicon
│   └── manifest.json      # PWA manifest
├── src/                   # Source code
│   ├── App.tsx           # Main application component
│   ├── App.css           # Global styles and themes
│   ├── index.tsx         # Application entry point
│   └── index.css         # Base styles
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

### Theme System

The website uses a comprehensive CSS variable system for theming:

```css
:root {
  /* Dark theme variables */
  --primary: #818CF8;
  --background: #0a0a0a;
  --surface: #1a1a1a;
  /* ... more variables */
}

body.light-mode {
  /* Light theme overrides */
  --primary: #6366F1;
  --background: #ffffff;
  --surface: #f8fafc;
  /* ... more variables */
}
```

## Customization

### Colors
Update the CSS variables in `src/App.css` to match your brand colors:

```css
:root {
  --primary: #your-primary-color;
  --accent: #your-accent-color;
  /* ... other colors */
}
```

### Content
- **Hero Section:** Update the title, subtitle, and launch date in `App.tsx`
- **FAQ Section:** Modify the questions and answers in the `WhyWatchSection`
- **Timeline:** Update the journey timeline in `UpcomingSection`
- **Social Links:** Update URLs in the `Footer` component

### Form Integration
The email signup uses Formspree. Update the endpoint in `HeroSection`:

```typescript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  // ... form configuration
});
```

## Responsive Design

The website is fully responsive with breakpoints:
- **Mobile:** < 640px
- **Tablet:** 640px - 1024px  
- **Desktop:** > 1024px

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect it's a React app
3. Deploy with default settings

### Netlify
1. Build the project: `npm run build`
2. Upload the `build` folder to Netlify
3. Configure build settings if needed

### Other Platforms
The built app can be deployed to any static hosting service:
- GitHub Pages
- AWS S3
- Firebase Hosting
- Any web server

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Links

- **Live Site:** [bigbraintime.com](https://bigbraintime.com)
- **Twitch:** [twitch.tv/bigbraintimetv](https://www.twitch.tv/bigbraintimetv)
- **Discord:** [discord.gg/bigbrain](https://discord.gg/bigbrain)
- **Bluesky:** [@bigbraintimetv](https://bsky.app/profile/bigbraintimetv.bsky.social)
- **YouTube:** [@bigbraintimetv](https://www.youtube.com/@bigbraintimetv)
- **GitHub:** [BigBrainTimeTV](https://github.com/orgs/BigBrainTimeTV/repositories)

## Acknowledgments

- Built with [Create React App](https://create-react-app.dev/)
- Icons from [Emoji](https://emojipedia.org/)
- Form handling by [Formspree](https://formspree.io/)
- Analytics by [Simple Analytics](https://www.simpleanalytics.com/)

---

**Learning in public. Failing forward. Growing together.** 