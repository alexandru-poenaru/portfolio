import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../content/LanguageContext';
import useSwapMotion from './useSwapMotion';

const sections = ['hero', 'projects', 'about', 'resume', 'contact'];

export default function Navbar() {
  const { language, text, toggleLanguage } = useLanguage();
  const [active, setActive] = useState('hero');
  const [open, setOpen] = useState(false);
  const actions = useRef(null);
  const menuButton = useRef(null);
  const dropdown = useRef(null);
  useSwapMotion(dropdown, open);
  const links = sections.slice(1).map(id => [id, text.nav[id]]);
  useEffect(() => {
    const visible = new Set();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) visible.add(entry.target.id);
        else visible.delete(entry.target.id);
      });
      const current = sections.filter(id => visible.has(id)).pop();
      if (current) setActive(current);
    }, { rootMargin: '-90px 0px -50% 0px' });
    sections.forEach(id => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOutside = event => {
      if (!actions.current?.contains(event.target)) setOpen(false);
    };
    const closeWithEscape = event => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', closeWithEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('keydown', closeWithEscape);
    };
  }, [open]);
  return (
    <header className="site-header">
      <div className="header-inner container">
        <a className="wordmark" href="#hero" aria-label={text.nav.top}>
          <span className="monogram" aria-hidden="true">ap<span>.</span></span><span className="wordmark-name">Alexandru Poenaru</span>
        </a>
        <div className="header-actions" ref={actions} onBlur={event => {
          if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
        }}>
        <nav id="navigation" className="navigation" aria-label={text.nav.label}>
          {links.map(([id, label]) => (
            <a key={id} href={'#' + id} aria-current={active === id ? 'location' : undefined}>{label}<span className="nav-dot" aria-hidden="true" /></a>
          ))}
        </nav>
        <button className="language-switch" data-language={language} onClick={toggleLanguage} aria-label={text.nav.switch} title={text.nav.switch}>
          <span lang="en" aria-hidden="true">EN</span><span lang="nl" aria-hidden="true">NL</span>
        </button>
        <button ref={menuButton} className="menu-icon" aria-label={text.nav.dropdown} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(current => !current)}>
          <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
        </button>
        <nav ref={dropdown} id="mobile-navigation" className="mobile-navigation" aria-label={text.nav.label} hidden={!open}>
          {[[sections[0], text.nav.home], ...links].map(([id, label], index) => (
            <a key={id} href={'#' + id} aria-current={active === id ? 'location' : undefined} onClick={() => { setActive(id); setOpen(false); }}>
              <span className="meta" aria-hidden="true">0{index + 1}</span>{label}<span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
        </div>
      </div>
    </header>
  );
}
