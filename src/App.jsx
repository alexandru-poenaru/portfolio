import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { ThemeContext, ThemeProvider as CustomThemeProvider } from './styles/ThemeContext';
import { lightTheme, darkTheme } from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Pages
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import ResumePage from './pages/ResumePage';

// Theme toggle component
const ThemeToggle = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.theme.primary};
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 2px 10px ${props => props.theme.shadow};
  z-index: 1000;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    background-color: ${props => props.theme.primaryDark};
  }
`;

const AppWithTheme = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const theme = darkMode ? darkTheme : lightTheme;
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <ScrollToTop />
        <AppContainer>
          <Navbar />
          <MainContent>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/resume" element={<ResumePage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </MainContent>
          <Footer />
          <ThemeToggle onClick={toggleDarkMode}>
            {darkMode ? '☀️' : '🌙'}
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
  padding-top: 80px; /* Space for fixed navbar */
`;

export default App;
