import React, { useRef, useState } from 'react';
import { useLanguage } from '../content/LanguageContext';
import useSwapMotion from './useSwapMotion';

export default function SkillPanel({ category, items, active, listRef }) {
  const { text, language } = useLanguage();
  const copy = text.resume;
  const [selected, setSelected] = useState(null);
  const detailRef = useRef(null);
  useSwapMotion(detailRef, selected?.name + language);
  const inspectorId = 'skill-inspector-' + category;
  return (
    <div id={'skills-panel-' + category} role="tabpanel" aria-labelledby={'skills-tab-' + category} hidden={!active}>
      <ul ref={listRef} className="skill-list" aria-label={copy.skills[category]}>
        {items.map((item, index) => (
          <li key={item.name}>
            <button className="skill-button" aria-pressed={selected?.name === item.name} aria-controls={inspectorId} aria-describedby={'skill-rating-' + category + '-' + index} onMouseEnter={() => setSelected(item)} onFocus={() => setSelected(item)} onClick={() => setSelected(item)}>
              {item.name}<span aria-hidden="true">{selected?.name === item.name ? '↗' : '+'}</span>
            </button>
            <span className="sr-only" id={'skill-rating-' + category + '-' + index}>{copy.proficiency}: {item.level} {copy.outOf}</span>
          </li>
        ))}
      </ul>
      <div id={inspectorId} className="skill-inspector" data-active={Boolean(selected)} role="group" aria-label={copy.proficiency}>
        {selected ? (
          <div ref={detailRef} className="skill-inspector-content">
            <div><span className="meta">{copy.proficiency}</span><strong>{selected.name}</strong></div>
            <div className="skill-score">
              <span className="skill-score-value">{selected.level}<span> / 5</span></span>
              <div className="skill-scale" aria-hidden="true">{[1, 2, 3, 4, 5].map(step => <span key={step} data-filled={step <= selected.level} />)}</div>
            </div>
          </div>
        ) : <p className="skill-hint">{copy.skillHint}<span aria-hidden="true">↖</span></p>}
      </div>
    </div>
  );
}
