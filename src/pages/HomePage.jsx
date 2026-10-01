import React, { useEffect, useRef, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { useLanguage } from '../content/LanguageContext';
import useSwapMotion from '../components/useSwapMotion';
import helpdesk from '../assets/images/helpdesk.webp';
import kingdomino from '../assets/images/kingdomino.webp';
import kottask from '../assets/images/kottask.webp';
import dashboard from '../assets/images/dashboard.webp';
import alex from '../assets/images/alex_new.webp';

const symbols = ['↗', '{ }', '≡'];
const projectMedia = [
  { image: kottask, tech: ['React', 'Node.js', 'TypeScript'] },
  { image: dashboard, tech: ['React', 'Node.js', 'TypeScript', 'Java'] },
  { image: kingdomino, tech: ['Java'] },
  { image: helpdesk, tech: ['C#'] },
];

function SystemSketch() {
  const { text, language } = useLanguage();
  const copy = text.sketch;
  const [selected, setSelected] = useState(1);
  const layer = copy.layers[selected];
  const description = useRef(null);
  useSwapMotion(description, selected + language);
  return (
    <div className="system-sketch" role="group" aria-label={copy.aria}>
      <div className="sketch-heading meta"><span>{copy.heading}</span><span>{copy.instruction} ↙</span></div>
      <div className="system-map">
        <span className="map-coordinate meta" aria-hidden="true">{copy.figure}</span>
        <svg className="system-lines" viewBox="0 0 440 270" preserveAspectRatio="none" aria-hidden="true">
          <path d="M110 76 H265 Q295 76 295 106 V140" /><path d="M295 140 V198 Q295 220 265 220 H145" />
          <circle cx="195" cy="76" r="4" /><circle cx="208" cy="220" r="4" />
        </svg>
        {copy.layers.map((item, index) => (
          <button key={index} className={'system-node node-' + index} aria-pressed={selected === index} aria-controls="layer-description" onClick={() => setSelected(index)}>
            <span className="node-symbol" aria-hidden="true">{symbols[index]}</span><span>{item.name}</span><span className="node-number" aria-hidden="true">0{index + 1}</span>
          </button>
        ))}
        <span className="map-caption meta" aria-hidden="true">{copy.caption}</span>
      </div>
      <div ref={description} id="layer-description" className="layer-description" aria-live="polite" aria-atomic="true">
        <span className="meta accent">{layer.label}</span><h2>{layer.title}</h2><p>{layer.description}</p>
      </div>
    </div>
  );
}

function ProjectIndex() {
  const { text, language } = useLanguage();
  const copy = text.work;
  const [selected, setSelected] = useState(0);
  const project = copy.projects[selected];
  const media = projectMedia[selected];
  const indexRef = useRef(null);
  const previewRef = useRef(null);
  useSwapMotion(previewRef, selected + language);
  useEffect(() => {
    // Warm small previews as the visitor approaches the index, not at startup.
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      projectMedia.forEach(item => {
        const image = new Image();
        image.decoding = 'async';
        image.src = item.image;
      });
      observer.disconnect();
    }, { rootMargin: '300px' });
    if (indexRef.current) observer.observe(indexRef.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section id="projects" className="section container" aria-labelledby="work-title" tabIndex={-1}>
      <div className="section-heading">
        <div><span className="eyebrow">{copy.eyebrow}</span><h2 id="work-title">{copy.title}<span className="accent">.</span></h2></div>
        <span className="meta section-aside">{copy.aside}</span>
      </div>
      <div ref={indexRef} className="project-index">
        <div className="project-list" role="group" aria-label={copy.select}>
          {copy.projects.map((item, index) => (
            <button key={index} className="project-row" aria-pressed={selected === index} aria-controls="project-preview" onClick={() => setSelected(index)}>
              <span className="project-number meta">0{index + 1}</span><span className="project-name"><strong>{item.name}</strong><span>{item.category}</span></span><span className="project-arrow" aria-hidden="true">{selected === index ? '↗' : '+'}</span>
            </button>
          ))}
        </div>
        <article ref={previewRef} id="project-preview" className="project-preview" aria-label={project.name}>
          <div className="preview-image"><img src={media.image} alt={project.alt} loading="lazy" decoding="async" width="1280" height="720" /></div>
          <div className="preview-details" aria-live="polite" aria-atomic="true">
            <div className="preview-meta"><span className="meta">0{selected + 1} / {project.name}</span><span className="meta">{project.category}</span></div>
            <p>{project.description}</p>
            <div className="project-bottom"><ul className="tech-list" aria-label={copy.technologies}>{media.tech.map(tech => <li key={tech}>{tech}</li>)}</ul>
              <span className="repository-unavailable" role="group" aria-label={copy.repository}><FaGithub aria-hidden="true" />{copy.unavailable}</span>
            </div>
            {selected === 1 && <span className="project-status meta">{copy.inProgress}</span>}
          </div>
        </article>
      </div>
    </section>
  );
}

export default function HomePage() {
  const { text } = useLanguage();
  const hero = text.hero;
  const about = text.about;
  return (
    <>
      <section id="hero" className="hero container" aria-labelledby="hero-title" tabIndex={-1}>
        <div className="hero-topline meta"><span>{hero.role}</span><span className="location"><span className="small-cross" aria-hidden="true">+</span> {hero.location}</span></div>
        <div className="hero-grid">
          <div className="hero-intro">
            <h1 id="hero-title">Alexandru<br />Poenaru<span className="accent">.</span></h1>
            <p className="hero-statement">{hero.statement[0]}<br />{hero.statement[1]}</p>
            <p className="hero-description">{hero.description}</p>
            <a className="primary-link" href="#projects">{hero.explore} <span aria-hidden="true">↓</span></a>
          </div>
          <SystemSketch />
        </div>
        <div className="hero-bottom"><span className="meta">{hero.currently}</span><p>{hero.course}<br /><strong>{hero.degree}</strong></p><a className="text-link" href="#about">{hero.about} <span aria-hidden="true">↘</span></a></div>
      </section>
      <ProjectIndex />
      <section id="about" className="section about-section container" aria-labelledby="about-title" tabIndex={-1}>
        <div className="section-heading"><div><span className="eyebrow">{about.eyebrow}</span><h2 id="about-title">{about.title}<span className="accent">.</span></h2></div><span className="meta section-aside">{about.aside}</span></div>
        <div className="about-grid">
          <figure className="portrait"><img src={alex} alt={about.portrait} width="800" height="800" loading="lazy" decoding="async" /><figcaption className="meta">{about.caption}</figcaption></figure>
          <div className="about-copy">
            <p className="about-lead">{about.lead[0]}<br />{about.lead[1]}</p>
            {about.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            <div className="about-links"><a className="text-link" href="https://github.com/alexandru-poenaru" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a className="text-link" href="https://www.linkedin.com/in/alexandru-poenaru/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div>
          </div>
        </div>
      </section>
    </>
  );
}
