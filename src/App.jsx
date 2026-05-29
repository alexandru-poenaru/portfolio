import React, { useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled, { ThemeProvider, keyframes } from 'styled-components';
import { ThemeContext, ThemeProvider as CustomThemeProvider } from './styles/ThemeContext';
import { lightTheme, darkTheme } from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import { FaSun, FaMoon } from 'react-icons/fa';
import './App.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cursor from './components/Cursor';

import HomePage from './pages/HomePage';
import ResumePage from './pages/ResumePage';
import ContactPage from './pages/ContactPage';

const orbDrift1 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%       { transform: translate(60px, -40px) scale(1.06); }
  66%       { transform: translate(-40px, 30px) scale(0.96); }
`;
const orbDrift2 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%       { transform: translate(-50px, 60px) scale(1.04); }
  66%       { transform: translate(40px, -30px) scale(0.97); }
`;
const orbDrift3 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  50%       { transform: translate(30px, 50px) scale(1.05); }
`;

const BackgroundOrbs = ({ darkMode }) => (
  <OrbsContainer>
    <Orb
      $top="−5%"
      $left="−8%"
      $size="700px"
      $color={darkMode ? 'rgba(79,70,229,0.32)' : 'rgba(124,99,255,0.20)'}
      $anim={orbDrift1}
      $duration="18s"
    />
    <Orb
      $top="10%"
      $right="−10%"
      $size="560px"
      $color={darkMode ? 'rgba(139,92,246,0.22)' : 'rgba(167,106,255,0.16)'}
      $anim={orbDrift2}
      $duration="22s"
    />
    <Orb
      $top="45%"
      $left="30%"
      $size="480px"
      $color={darkMode ? 'rgba(168,85,247,0.16)' : 'rgba(99,118,255,0.13)'}
      $anim={orbDrift3}
      $duration="26s"
    />
    <Orb
      $bottom="10%"
      $right="5%"
      $size="520px"
      $color={darkMode ? 'rgba(59,130,246,0.14)' : 'rgba(79,148,255,0.14)'}
      $anim={orbDrift1}
      $duration="20s"
      $delay="4s"
    />
    <Orb
      $bottom="0%"
      $left="10%"
      $size="420px"
      $color={darkMode ? 'rgba(129,140,248,0.18)' : 'rgba(192,132,252,0.15)'}
      $anim={orbDrift2}
      $duration="24s"
      $delay="8s"
    />
  </OrbsContainer>
);

const AppWithTheme = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Cursor />
      <Router>
        <AppContainer>
          <BackgroundOrbs darkMode={darkMode} />
          <Navbar />
          <MainContent>
            <HomePage />
            <ResumePage />
            <ContactPage />
          </MainContent>
          <Footer />
          <ThemeToggle onClick={toggleDarkMode} aria-label="Toggle theme">
            {darkMode ? <FaSun /> : <FaMoon />}
          </ThemeToggle>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
};

function App() {
  return (
    <CustomThemeProvider>
      <AppWithTheme />
    </CustomThemeProvider>
  );
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${props => props.theme.body};
  transition: background-color 0.4s ease;
  position: relative;
  isolation: isolate;
`;

const MainContent = styled.main`
  flex: 1;
  padding-top: 72px;
  position: relative;
  z-index: 1;
`;

const OrbsContainer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
`;

const Orb = styled.div`
  position: absolute;
  top: ${p => p.$top};
  left: ${p => p.$left};
  right: ${p => p.$right};
  bottom: ${p => p.$bottom};
  width: ${p => p.$size};
  height: ${p => p.$size};
  border-radius: 50%;
  background: ${p => p.$color};
  filter: blur(90px);
  animation: ${p => p.$anim} ${p => p.$duration || '20s'} ease-in-out ${p => p.$delay || '0s'} infinite;
  will-change: transform;
`;

const ThemeToggle = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: ${props => props.theme.glass};
  backdrop-filter: ${props => props.theme.glassBackdrop};
  -webkit-backdrop-filter: ${props => props.theme.glassBackdrop};
  border: 0.5px solid ${props => props.theme.glassBorder};
  box-shadow:
    inset 0 1.5px 0 ${props => props.theme.glassHighlight},
    ${props => props.theme.glassShadow};
  color: ${props => props.theme.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  z-index: 1000;
  transition: transform 0.2s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow:
      inset 0 1.5px 0 ${props => props.theme.glassHighlight},
      0 8px 28px ${props => props.theme.glow},
      0 4px 12px rgba(0,0,0,0.12);
  }

  &:active {
    transform: scale(0.94);
  }
`;

export default App;
