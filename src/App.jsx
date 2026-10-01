import React, { useEffect } from 'react';
import { LanguageProvider, useLanguage } from './content/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ResumePage from './pages/ResumePage';
import ContactPage from './pages/ContactPage';
import './App.css';

function Portfolio() {
  const { text } = useLanguage();
  useEffect(() => {
    // Keep older links to the standalone pages useful.
    const target = window.location.hash.slice(1) || ({ '/resume': 'resume', '/contact': 'contact' })[window.location.pathname];
    if (target) document.getElementById(target)?.scrollIntoView();
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">{text.nav.skip}</a>
      <Navbar />
      <main id="main" tabIndex={-1}><HomePage /><ResumePage /><ContactPage /></main>
      <Footer />
    </>
  );
}

export default function App() {
  return <LanguageProvider><Portfolio /></LanguageProvider>;
}
