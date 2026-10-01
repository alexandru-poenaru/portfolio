import React from 'react';
import { useLanguage } from '../content/LanguageContext';
export default function Footer() {
  const { text } = useLanguage();
  return (
    <footer className="site-footer container">
      <span>© {new Date().getFullYear()} Alexandru Poenaru</span>
      <span className="footer-note">{text.footer.note}</span>
      <a href="#hero">{text.footer.top} <span aria-hidden="true">↑</span></a>
    </footer>
  );
}
