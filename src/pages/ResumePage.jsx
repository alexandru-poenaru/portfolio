import React, { useEffect, useContext, useState } from 'react';

import styled, { keyframes, css } from 'styled-components';
import { FaDownload, FaGraduationCap, FaBriefcase, FaCode, FaChevronDown } from 'react-icons/fa';
import { FaJsSquare, FaJava, FaHtml5, FaCss3Alt, FaGitAlt, FaDocker, FaPython, FaReact, FaDatabase } from 'react-icons/fa';
import { SiTypescript, SiNodedotjs, SiMysql, SiYarn, SiSpringboot, SiDotnet, SiFastapi, SiSqlite, SiPostgresql, SiMongodb } from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import { DiMsqlServer } from 'react-icons/di';
import { RiTailwindCssFill } from 'react-icons/ri';
import { PiFileJsxDuotone } from 'react-icons/pi';
import resumePdf from '../assets/pdf/CV Alexandru Poenaru.pdf';
import { ThemeContext } from '../styles/ThemeContext';

/* ─── Skill Data ─────────────────────────────────────────────────────────────── */

const SKILLS = {
  Languages: {
    accent: '#6366F1',
    items: [
      { name: 'JavaScript', icon: <FaJsSquare />, level: 4 },
      { name: 'TypeScript', icon: <SiTypescript />, level: 4 },
      { name: 'Python', icon: <FaPython />, level: 4 },
      { name: 'Java', icon: <FaJava />, level: 4 },
      { name: 'C#', icon: <TbBrandCSharp />, level: 3 },
      { name: 'HTML', icon: <FaHtml5 />, level: 4 },
      { name: 'CSS', icon: <FaCss3Alt />, level: 3 },
    ],
  },
  'Frameworks & Libraries': {
    accent: '#06B6D4',
    items: [
      { name: 'Node.js', icon: <SiNodedotjs />, level: 4 },
      { name: 'Spring Boot', icon: <SiSpringboot />, level: 2 },
      { name: 'React', icon: <FaReact />, level: 3 },
      { name: 'JSX', icon: <PiFileJsxDuotone />, level: 3 },
      { name: 'Tailwind CSS', icon: <RiTailwindCssFill />, level: 4 },
      { name: '.NET Framework', icon: <SiDotnet />, level: 3 },
      { name: 'Entity Framework', icon: <FaCode />, level: 3 },
      { name: 'FastAPI', icon: <SiFastapi />, level: 4 },
      { name: 'React Native', icon: <FaReact />, level: 2 },
      { name: 'Llama-cpp', icon: <FaCode />, level: 2 },
    ],
  },
  Databases: {
    accent: '#F97316',
    items: [
      { name: 'MySQL', icon: <SiMysql />, level: 4 },
      { name: 'MS SQL Server', icon: <DiMsqlServer />, level: 3 },
      { name: 'MongoDB', icon: <SiMongodb />, level: 2 },
      { name: 'DuckDB', icon: <FaDatabase />, level: 2 },
      { name: 'SQLite', icon: <SiSqlite />, level: 2 },
      { name: 'PostgreSQL', icon: <SiPostgresql />, level: 3 },
    ],
  },
  'DevOps & Tools': {
    accent: '#10B981',
    items: [
      { name: 'Git', icon: <FaGitAlt />, level: 5 },
      { name: 'Docker', icon: <FaDocker />, level: 3 },
      { name: 'Yarn', icon: <SiYarn />, level: 3 },
    ],
  },
};

const ProficiencyDots = ({ level }) => (
  <DotsRow>
    {[1, 2, 3, 4, 5].map(n => (
      <Dot key={n} $filled={n <= level} />
    ))}
  </DotsRow>
);

/* ─── ResumePage ─────────────────────────────────────────────────────────────── */

const ResumePage = () => {
  const { darkMode } = useContext(ThemeContext);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [openSkills, setOpenSkills] = useState({});

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const toggleSkill = (cat) => {
    if (!isMobile) return;
    setOpenSkills(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  // On mobile: open only if explicitly toggled. On desktop: always open.
  const isSkillOpen = (cat) => !isMobile || !!openSkills[cat];

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('animate'); }),
      { threshold: 0.15 }
    );
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));
    return () => elements.forEach(el => observer.unobserve(el));
  }, []);

  useEffect(() => {
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('animate');
    });
  }, [darkMode]);

  return (
    <ResumeContainer id="resume">
      <PageTitle>My Resume</PageTitle>

      <DownloadButtonContainer>
        <DownloadButton href={resumePdf} target="_blank" download="CV_Alexandru_Poenaru.pdf">
          <FaDownload /> Download CV (Dutch)
        </DownloadButton>
      </DownloadButtonContainer>

      <ResumeContent>
        <ResumeSection>
          <SectionHeader>
            <SectionIcon><FaBriefcase /></SectionIcon>
            <SectionTitle>Work Experience</SectionTitle>
          </SectionHeader>

          <Timeline>
            <TimelineItem className="animate-on-scroll">
              <TimelineDot />
              <TimelineDate>March 2026 - May 2026</TimelineDate>
              <TimelineCard>
                <h3>International Internship - Italy</h3>
                <h4>Turtle Srl</h4>
                <ul>
                  <li><b>AI Privacy Engine:</b> Built a Python-based NLP and OCR module to automatically detect and redact Personally Identifiable Information (PII) from various documents.</li>
                  <li><b>Chat-to-Chart Platform:</b> Engineered the backend and database for an AI analytics tool, using LLMs and DuckDB to generate dynamic charts from natural language queries.</li>
                  <li><b>Enterprise Scalability:</b> Integrated these applications into a large-scale enterprise platform, optimizing backend performance and concurrency using asyncio, thread pools, and webhooks.</li>
                </ul>
              </TimelineCard>
            </TimelineItem>

            <TimelineItem className="animate-on-scroll">
              <TimelineDot />
              <TimelineDate>July 2024, July 2025</TimelineDate>
              <TimelineCard>
                <h3>Student Worker</h3>
                <h4>INJEXTRU Tielt</h4>
                <ul>
                  <li>Responsible for production and packaging of products from multiple machines</li>
                  <li>Handled large plastic parts (swimming pool shutters)</li>
                </ul>
              </TimelineCard>
            </TimelineItem>

            <TimelineItem className="animate-on-scroll">
              <TimelineDot />
              <TimelineDate>August 2024, August 2025</TimelineDate>
              <TimelineCard>
                <h3>Student Worker</h3>
                <h4>SOVAPLASTICS Tielt</h4>
                <ul>
                  <li>Responsible for production and packaging of products from multiple machines</li>
                  <li>Handled small plastic parts (caps, baskets, etc.)</li>
                </ul>
              </TimelineCard>
            </TimelineItem>

            <TimelineItem className="animate-on-scroll">
              <TimelineDot />
              <TimelineDate>July 2023 – August 2023</TimelineDate>
              <TimelineCard>
                <h3>IT Helpdesk Intern</h3>
                <h4>Sint-Andriesziekenhuis Tielt</h4>
                <ul>
                  <li>Assisted doctors with technical computer-related issues</li>
                  <li>Installed computers in the workplace</li>
                </ul>
              </TimelineCard>
            </TimelineItem>

            <TimelineItem className="animate-on-scroll">
              <TimelineDot />
              <TimelineDate>September 2019 – 2025 (weekends)</TimelineDate>
              <TimelineCard>
                <h3>Student Worker</h3>
                <h4>Groot Ambachtelijke Bakkerij Ranson-Cannière Tielt</h4>
                <ul>
                  <li>Preparing and packaging fruit cakes</li>
                  <li>Preparing bread, cakes, and pastries for orders</li>
                </ul>
              </TimelineCard>
            </TimelineItem>
          </Timeline>
        </ResumeSection>

        <ResumeSection>
          <SectionHeader>
            <SectionIcon><FaGraduationCap /></SectionIcon>
            <SectionTitle>Education</SectionTitle>
          </SectionHeader>

          <Timeline>
            <TimelineItem className="animate-on-scroll">
              <TimelineDot />
              <TimelineDate>2023 – 2026</TimelineDate>
              <TimelineCard>
                <h3>Bachelor of Applied Information Technology</h3>
                <h4>HOGENT University of Applied Sciences and Arts, Ghent</h4>
                <p>Specialization in Full Stack Development</p>
              </TimelineCard>
            </TimelineItem>

            <TimelineItem className="animate-on-scroll">
              <TimelineDot />
              <TimelineDate>2017 – 2023</TimelineDate>
              <TimelineCard>
                <h3>Secondary School Degree</h3>
                <h4>Regina Pacis, Tielt</h4>
                <p>Diploma in IT Management (Informaticabeheer)</p>
              </TimelineCard>
            </TimelineItem>
          </Timeline>
        </ResumeSection>

        <ResumeSection>
          <SectionHeader>
            <SectionIcon><FaCode /></SectionIcon>
            <SectionTitle>Technical Skills</SectionTitle>
          </SectionHeader>

          <SkillsGrid>
            {Object.entries(SKILLS).map(([category, { accent, items }], catIdx) => {
              const open = isSkillOpen(category);
              return (
                <SkillCategory key={category} className="animate-on-scroll" $accent={accent} style={{ animationDelay: `${catIdx * 0.1}s` }}>
                  <SkillCategoryHeader $accent={accent} onClick={() => toggleSkill(category)} $isOpen={open}>
                    <SkillAccentBar $accent={accent} />
                    <h3>{category}</h3>
                    <SkillChevron $accent={accent} $open={open}><FaChevronDown /></SkillChevron>
                  </SkillCategoryHeader>
                  <SkillPillGrid $isOpen={open}>
                    {items.map(({ name, icon, level }, itemIdx) => (
                      <SkillPill key={name} $accent={accent} $idx={itemIdx} $isOpen={open}>
                        <SkillIcon $accent={accent}>{icon}</SkillIcon>
                        <SkillPillName>{name}</SkillPillName>
                        <ProficiencyDots level={level} />
                      </SkillPill>
                    ))}
                  </SkillPillGrid>
                </SkillCategory>
              );
            })}
          </SkillsGrid>
        </ResumeSection>
      </ResumeContent>
    </ResumeContainer>
  );
};

/* ─── Keyframes ──────────────────────────────────────────────────────────────── */

const pillReveal = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px) scale(0.97);
    filter: blur(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
`;

/* ─── Layout ─────────────────────────────────────────────────────────────────── */

const ResumeContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 80px 24px 100px;
`;

const PageTitle = styled.h1`
  font-size: clamp(2.2rem, 4vw, 3rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  text-align: center;
  margin-bottom: 24px;
  color: ${props => props.theme.text};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 40px;
    height: 3px;
    background: ${props => props.theme.primary};
    bottom: -16px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 1px;
  }
`;

const DownloadButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 48px 0;
`;

const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 13px 28px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 0.95rem;
  text-decoration: none;
  cursor: pointer;
  color: ${props => props.theme.primary};
  background: ${props => props.theme.glassTinted};
  backdrop-filter: ${props => props.theme.glassBackdrop};
  -webkit-backdrop-filter: ${props => props.theme.glassBackdrop};
  border: 0.5px solid ${props => props.theme.glassTintedBorder};
  box-shadow:
    inset 0 1.5px 0 ${props => props.theme.glassTintedHighlight},
    0 6px 24px ${props => props.theme.glow},
    ${props => props.theme.glassShadow};
  position: relative;
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow:
      inset 0 1.5px 0 ${props => props.theme.glassTintedHighlight},
      0 14px 36px ${props => props.theme.glowStrong},
      0 4px 12px rgba(0,0,0,0.1);
  }
`;

const ResumeContent = styled.div`
  background: ${props => props.theme.glass};
  backdrop-filter: ${props => props.theme.glassBackdrop};
  -webkit-backdrop-filter: ${props => props.theme.glassBackdrop};
  border: 0.5px solid ${props => props.theme.glassBorder};
  border-radius: 24px;
  box-shadow:
    inset 0 1.5px 0 ${props => props.theme.glassHighlight},
    ${props => props.theme.glassShadow};
  padding: 40px 32px;

  @media (max-width: 600px) { padding: 24px 16px; }
`;

const ResumeSection = styled.section`
  margin-bottom: 64px;

  &:last-child { margin-bottom: 0; }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 36px;
  padding-bottom: 16px;
  border-bottom: 0.5px solid ${props => props.theme.glassBorder};
`;

const SectionIcon = styled.div`
  width: 38px;
  height: 38px;
  background: ${props => props.theme.glassTinted};
  backdrop-filter: ${props => props.theme.glassBackdrop};
  -webkit-backdrop-filter: ${props => props.theme.glassBackdrop};
  border: 0.5px solid ${props => props.theme.glassTintedBorder};
  box-shadow: inset 0 1px 0 ${props => props.theme.glassTintedHighlight}, 0 4px 14px ${props => props.theme.glow};
  color: ${props => props.theme.primary};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  flex-shrink: 0;
`;

const SectionTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${props => props.theme.text};
  margin: 0;
`;

/* ─── Timeline ───────────────────────────────────────────────────────────────── */

const Timeline = styled.div`
  position: relative;
  padding-left: 32px;

  &::before {
    content: '';
    position: absolute;
    left: 7px;
    top: 6px;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, ${props => props.theme.primary}, ${props => props.theme.timeline});
    border-radius: 2px;
  }
`;

const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 32px;
  opacity: 0;
  transform: translateX(-16px);
  transition: opacity 0.5s ease, transform 0.5s ease;

  &.animate {
    opacity: 1;
    transform: translateX(0);
  }

  &:last-child { margin-bottom: 0; }
`;

const TimelineDot = styled.div`
  position: absolute;
  left: -29px;
  top: 6px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: ${props => props.theme.glassTinted};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 0.5px solid ${props => props.theme.glassTintedBorder};
  box-shadow:
    inset 0 1px 0 ${props => props.theme.glassTintedHighlight},
    0 0 14px ${props => props.theme.glow};
  z-index: 2;
`;

const TimelineDate = styled.div`
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${props => props.theme.primary};
  margin-bottom: 8px;
`;

const TimelineCard = styled.div`
  background: ${props => props.theme.glass};
  backdrop-filter: ${props => props.theme.glassBackdrop};
  -webkit-backdrop-filter: ${props => props.theme.glassBackdrop};
  border: 0.5px solid ${props => props.theme.glassBorder};
  border-radius: 16px;
  padding: 18px 20px;
  box-shadow:
    inset 0 1.5px 0 ${props => props.theme.glassHighlight},
    ${props => props.theme.glassShadow};
  transition: box-shadow 0.3s ease, border-color 0.3s ease, transform 0.25s ease;

  &:hover {
    box-shadow:
      inset 0 1.5px 0 ${props => props.theme.glassHighlight},
      0 12px 32px ${props => props.theme.shadowHover},
      0 4px 12px rgba(0,0,0,0.08);
    border-color: ${props => props.theme.glassTintedBorder};
    transform: translateX(4px);
  }

  h3 {
    margin: 0 0 4px;
    font-size: 1rem;
    font-weight: 700;
    color: ${props => props.theme.text};
  }

  h4 {
    margin: 0 0 12px;
    font-size: 0.88rem;
    font-weight: 500;
    color: ${props => props.theme.textSecondary};
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: ${props => props.theme.textSecondary};
  }

  ul {
    margin: 8px 0 0;
    padding-left: 18px;

    li {
      margin-bottom: 6px;
      font-size: 0.9rem;
      color: ${props => props.theme.textSecondary};
      line-height: 1.5;
    }
  }
`;

/* ─── Skills ─────────────────────────────────────────────────────────────────── */

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
`;

const SkillCategory = styled.div`
  background: ${props => props.theme.glass};
  backdrop-filter: ${props => props.theme.glassBackdrop};
  -webkit-backdrop-filter: ${props => props.theme.glassBackdrop};
  border: 0.5px solid ${props => props.theme.glassBorder};
  border-top: 2px solid ${props => props.$accent};
  padding: 22px;
  border-radius: 18px;
  box-shadow:
    inset 0 1.5px 0 ${props => props.theme.glassHighlight},
    ${props => props.theme.glassShadow};
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease, border-color 0.3s ease;

  &.animate {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    box-shadow:
      inset 0 1.5px 0 ${props => props.theme.glassHighlight},
      0 14px 36px ${props => props.$accent}30,
      0 4px 12px rgba(0,0,0,0.08);
    border-color: ${props => props.$accent}80;
    transform: translateY(-5px);
  }
`;

const SkillCategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
  cursor: default;

  h3 {
    margin: 0;
    flex: 1;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${props => props.$accent};
  }

  @media (max-width: 768px) {
    cursor: pointer;
    margin-bottom: ${props => props.$isOpen ? '18px' : '0'};
    transition: margin-bottom 0.25s ease;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
`;

const SkillChevron = styled.span`
  display: none;
  color: ${props => props.$accent};
  font-size: 0.75rem;
  transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
  transform: ${props => props.$open ? 'rotate(0deg)' : 'rotate(-90deg)'};

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

const SkillAccentBar = styled.div`
  width: 3px;
  height: 16px;
  border-radius: 2px;
  background: ${props => props.$accent};
  flex-shrink: 0;
`;

const SkillPillGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 768px) {
    overflow: hidden;

    /* Closed: collapse smoothly */
    max-height: ${props => props.$isOpen ? '1000px' : '0'};
    opacity: ${props => props.$isOpen ? 1 : 0};
    transition:
      max-height ${props => props.$isOpen ? '0.45s' : '0.3s'} cubic-bezier(0.16, 1, 0.3, 1),
      opacity    ${props => props.$isOpen ? '0.3s' : '0.2s'} ease;

    /* When opening, re-trigger pill animations */
    ${props => props.$isOpen && `
      > * {
        animation: none;
      }
    `}
  }
`;

const SkillPill = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 50px;
  background: ${props => props.theme.glass};
  backdrop-filter: ${props => props.theme.glassBackdrop};
  -webkit-backdrop-filter: ${props => props.theme.glassBackdrop};
  border: 0.5px solid ${props => props.theme.glassBorder};
  box-shadow: inset 0 1px 0 ${props => props.theme.glassHighlight};
  transition: border-color 0.2s ease, box-shadow 0.25s ease, transform 0.2s ease;

  &:hover {
    border-color: ${props => props.$accent}70;
    box-shadow:
      inset 0 1px 0 ${props => props.theme.glassHighlight},
      0 6px 18px ${props => props.$accent}25;
    transform: translateX(5px);
  }

  @media (max-width: 768px) {
    ${props => props.$isOpen && css`
      animation: ${pillReveal} 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${props.$idx * 0.04}s both;
    `}
  }
`;

const SkillIcon = styled.span`
  font-size: 1rem;
  color: ${props => props.$accent};
  flex-shrink: 0;
  display: flex;
  align-items: center;
`;

const SkillPillName = styled.span`
  font-size: 0.85rem;
  font-weight: 500;
  color: ${props => props.theme.text};
  flex: 1;
`;

const DotsRow = styled.div`
  display: flex;
  gap: 3px;
  flex-shrink: 0;
`;

const Dot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${props => props.$filled ? props.theme.primary : props.theme.border};
  transition: background 0.3s ease;
`;

export default ResumePage;
