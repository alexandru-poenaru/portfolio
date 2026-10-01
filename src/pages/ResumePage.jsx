import React, { useRef, useState } from 'react';
import { useLanguage } from '../content/LanguageContext';
import useSwapMotion from '../components/useSwapMotion';
import SkillPanel from '../components/SkillPanel';
import { skills } from '../content/skills';
import resumePdf from '../assets/pdf/CV Alexandru Poenaru.pdf';

export default function ResumePage() {
  const { text, language } = useLanguage();
  const copy = text.resume;
  const [category, setCategory] = useState('languages');
  const listRef = useRef(null);
  useSwapMotion(listRef, category + language);
  const navigateTabs = event => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const categories = Object.keys(skills);
    const current = categories.indexOf(category);
    const next = { ArrowRight: (current + 1) % categories.length, ArrowLeft: (current + categories.length - 1) % categories.length, Home: 0, End: categories.length - 1 }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setCategory(categories[next]);
    document.getElementById('skills-tab-' + categories[next]).focus();
  };
  return (
    <section id="resume" className="section resume-section container" aria-labelledby="resume-title" tabIndex={-1}>
      <div className="section-heading"><div><span className="eyebrow">{copy.eyebrow}</span><h2 id="resume-title">{copy.title}<span className="accent">.</span></h2></div><a className="text-link" href={resumePdf} download="CV_Alexandru_Poenaru.pdf">{copy.cv} <span aria-hidden="true">↓</span></a></div>
      <div className="resume-grid">
        <div className="resume-label"><h3>{copy.experience}</h3><span className="meta">{copy.practice}</span></div>
        <div className="experience-list">
          {copy.jobs.map((item, index) => (
            <details className="experience-item" key={index} open={index === 0 ? true : undefined}>
              <summary><span className="experience-date meta">{item.date}</span><span className="experience-title"><strong>{item.title}</strong><span>{item.place}</span></span><span className="details-marker" aria-hidden="true" /></summary>
              <div className="experience-description"><p>{item.description}</p>{index === 0 && <span className="meta accent">Python / FastAPI / LLMs / DuckDB</span>}</div>
            </details>
          ))}
        </div>
        <div className="resume-label"><h3>{copy.education}</h3><span className="meta">{copy.learning}</span></div>
        <div className="education-list">
          <article className="education-item"><span className="experience-date meta accent">{copy.current}</span><div><h4>{copy.course}</h4><p>{copy.degree}</p><span className="current-label">{copy.progress} <span aria-hidden="true">↗</span></span></div></article>
          <article className="education-item"><span className="experience-date meta">2023 - 2026</span><div><h4>{copy.bachelor}</h4><p>{copy.specialization}</p></div></article>
          <article className="education-item"><span className="experience-date meta">2017 - 2023</span><div><h4>{copy.secondary}</h4><p>Regina Pacis · Tielt</p></div></article>
        </div>
        <div className="resume-label"><h3>{copy.toolkit}</h3><span className="meta">{copy.toolsLabel}</span></div>
        <div className="toolkit">
          <div className="skill-categories" role="tablist" aria-label={copy.categories} onKeyDown={navigateTabs}>
            {Object.keys(skills).map(id => <button key={id} id={'skills-tab-' + id} role="tab" aria-selected={category === id} tabIndex={category === id ? 0 : -1} aria-controls={'skills-panel-' + id} onClick={() => setCategory(id)}>{copy.skills[id]}<span className="meta" aria-hidden="true">{String(skills[id].length).padStart(2, '0')}</span></button>)}
          </div>
          {Object.entries(skills).map(([id, items]) => <SkillPanel key={id} category={id} items={items} active={category === id} listRef={category === id ? listRef : undefined} />)}
        </div>
      </div>
    </section>
  );
}
