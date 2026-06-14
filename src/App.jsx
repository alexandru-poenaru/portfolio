import React, { memo } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled, { ThemeProvider, keyframes } from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import './App.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

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

const BackgroundOrbs = memo(() => (
  <OrbsContainer>
    <Orb
      $top="-5%"
      $left="-8%"
      $size="600px"
      $color="rgba(226,109,92,0.12)"
      $anim={orbDrift1}
      $duration="55s"
    />
    <Orb
      $top="10%"
      $right="-10%"
      $size="500px"
      $color="rgba(114,61,70,0.4)"
      $anim={orbDrift2}
      $duration="62s"
    />
    <Orb
      $bottom="5%"
      $left="15%"
      $size="440px"
      $color="rgba(201,203,163,0.07)"
      $anim={orbDrift3}
      $duration="66s"
      $delay="6s"
    />
  </OrbsContainer>
));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <AppContainer>
          <BackgroundOrbs />
          <Navbar />
          <MainContent>
            <HomePage />
            <ResumePage />
            <ContactPage />
          </MainContent>
          <Footer />
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${props => props.theme.body};
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
  filter: blur(50px);
  animation: ${p => p.$anim} ${p => p.$duration || '20s'} ease-in-out ${p => p.$delay || '0s'} infinite;
  will-change: transform;
`;

export default App;
