import React, { useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
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

const AppWithTheme = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Cursor />
      <Router>
        <AppContainer>
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
`;

const MainContent = styled.main`
  flex: 1;
  padding-top: 72px;
`;

const ThemeToggle = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: ${props => props.theme.card};
  border: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  box-shadow: 0 4px 20px ${props => props.theme.shadow};
  z-index: 1000;
  backdrop-filter: blur(12px);
  transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease, background 0.35s ease;

  &:hover {
    border-color: ${props => props.theme.primary};
    box-shadow: 0 4px 20px ${props => props.theme.glow};
    transform: scale(1.08);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export default App;
