// Theme configuration for light and dark mode
export const lightTheme = {  body: '#f9f9f9',
  text: '#333',
  textSecondary: '#666',
  primary: '#5be584',
  primaryDark: '#3bc468',
  background: '#ffffff',
  card: '#ffffff',
  cardBackground: '#f9f9f9',
  border: '#eee',
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowHover: 'rgba(0, 0, 0, 0.15)',
  timeline: '#eee',
  navbar: 'rgba(255, 255, 255, 0.95)',
  footer: '#1e1e1e',
  footerText: '#aaa',
};

export const darkTheme = {  body: '#121212',
  text: '#e4e4e4',
  textSecondary: '#b0b0b0',
  primary: '#5be584',
  primaryDark: '#3bc468',
  background: '#1e1e1e',
  card: '#2a2a2a',
  cardBackground: '#252525',
  border: '#333',
  shadow: 'rgba(0, 0, 0, 0.3)',
  shadowHover: 'rgba(0, 0, 0, 0.4)',
  timeline: '#444',
  navbar: 'rgba(25, 25, 25, 0.95)',
  footer: '#121212',
  footerText: '#999',
};

// Global animations
export const animations = {
  keyframes: {
    float: `
      @keyframes float {
        0% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-10px);
        }
        100% {
          transform: translateY(0px);
        }
      }
    `,
    pulse: `
      @keyframes pulse {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.05);
        }
        100% {
          transform: scale(1);
        }
      }
    `,
    fadeIn: `
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `,
    typing: `
      @keyframes typing {
        from {
          width: 0
        }
        to {
          width: 100%
        }
      }
    `,
    blink: `
      @keyframes blink {
        50% {
          border-color: transparent
        }
      }
    `,
    dataFlow: `
      @keyframes dataFlow {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
    `,
    serverPulse: `
      @keyframes serverPulse {
        0% {
          box-shadow: 0 0 0 0 rgba(0, 149, 255, 0.7);
        }
        70% {
          box-shadow: 0 0 0 10px rgba(0, 149, 255, 0);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(0, 149, 255, 0);
        }
      }
    `,
  }
};