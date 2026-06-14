export const theme = {
  body: '#472d30',
  surface: '#723d46',
  text: '#ffe1a8',
  textSecondary: '#c9cba3',
  primary: '#e26d5c',
  primaryDark: '#472d30',
  primaryLight: '#f08070',
  glow: 'rgba(226, 109, 92, 0.22)',
  glowStrong: 'rgba(226, 109, 92, 0.45)',
  card: '#723d46',
  cardBackground: '#3a2428',
  border: 'rgba(201, 203, 163, 0.22)',
  borderStrong: 'rgba(255, 225, 168, 0.45)',
  shadow: 'rgba(0, 0, 0, 0.55)',
  shadowHover: 'rgba(226, 109, 92, 0.28)',
  timeline: 'rgba(226, 109, 92, 0.22)',
  navbar: 'rgba(71, 45, 48, 0.92)',
  footer: '#723d46',
  footerText: '#c9cba3',
  // Surface tokens (replaces glass/liquid tokens)
  glass: '#723d46',
  glassBorder: '#c9cba3',
  glassHighlight: 'rgba(255, 225, 168, 0.05)',
  glassBackdrop: 'none',
  glassShadow: '0 4px 24px rgba(0, 0, 0, 0.45)',
  glassTinted: 'rgba(226, 109, 92, 0.14)',
  glassTintedBorder: '#e26d5c',
  glassTintedHighlight: 'rgba(255, 225, 168, 0.05)',
};

export const lightTheme = theme;
export const darkTheme = theme;

export const animations = {
  keyframes: {
    float: `@keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }`,
    pulse: `@keyframes pulse { 0%,100% { transform:scale(1); } 50% { transform:scale(1.05); } }`,
    fadeIn: `@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }`,
    typing: `@keyframes typing { from { width:0; } to { width:100%; } }`,
    blink: `@keyframes blink { 50% { border-color:transparent; } }`,
    dataFlow: `@keyframes dataFlow { 0%,100% { background-position:0% 50%; } 50% { background-position:100% 50%; } }`,
    serverPulse: `@keyframes serverPulse { 0% { box-shadow:0 0 0 0 rgba(193,18,31,0.6); } 70% { box-shadow:0 0 0 12px rgba(193,18,31,0); } 100% { box-shadow:0 0 0 0 rgba(193,18,31,0); } }`,
  }
};
