import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(18px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeInSimple {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes typing {
    from { width: 0; }
    to { width: 100%; }
  }
  @keyframes blink {
    50% { border-color: transparent; }
  }
  @keyframes dataFlow {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  @keyframes serverPulse {
    0% { box-shadow: 0 0 0 0 ${props => props.theme.glowStrong}; }
    70% { box-shadow: 0 0 0 12px transparent; }
    100% { box-shadow: 0 0 0 0 transparent; }
  }
  @keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 10px ${props => props.theme.glow}; }
    50% { box-shadow: 0 0 28px ${props => props.theme.glowStrong}, 0 0 50px ${props => props.theme.glow}; }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(36px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.94); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes progressFill {
    from { width: 0; }
  }
  @keyframes lineExpand {
    from { width: 0; }
    to { width: 48px; }
  }
  @keyframes orbDrift1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33%       { transform: translate(60px, -40px) scale(1.06); }
    66%       { transform: translate(-40px, 30px) scale(0.96); }
  }
  @keyframes orbDrift2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33%       { transform: translate(-50px, 60px) scale(1.04); }
    66%       { transform: translate(40px, -30px) scale(0.97); }
  }
  @keyframes orbDrift3 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50%       { transform: translate(30px, 50px) scale(1.05); }
  }
  @keyframes glassShimmer {
    0%   { opacity: 0; transform: translateX(-100%) skewX(-15deg); }
    50%  { opacity: 1; }
    100% { opacity: 0; transform: translateX(200%) skewX(-15deg); }
  }

  html {
    scroll-behavior: smooth;
  }

  [id] {
    scroll-margin-top: 88px;
  }

  * {
    box-sizing: border-box;
  }

  a, button, input, textarea, select {
    transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease, opacity 0.25s ease;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${props => props.theme.body};
    color: ${props => props.theme.text};
    transition: background-color 0.4s ease, color 0.4s ease;
  }

  ::selection {
    background: ${props => props.theme.primary};
    color: #fff;
  }

  p {
    color: ${props => props.theme.textSecondary};
    line-height: 1.75;
    font-size: 1.0rem;
    font-weight: 450;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${props => props.theme.text};
    letter-spacing: -0.03em;
    font-weight: 700;
  }

  a {
    color: ${props => props.theme.primary};
  }

  code {
    font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
  }

  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: ${props => props.theme.body};
  }
  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.primary};
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.primaryDark};
  }
`;

export default GlobalStyles;
