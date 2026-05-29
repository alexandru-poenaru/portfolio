import React, { useEffect, useContext, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaDownload, FaGraduationCap, FaBriefcase, FaCode } from 'react-icons/fa';
import resumePdf from '../assets/pdf/CV_Alexandru_Poenaru.pdf';
import { ThemeContext } from '../styles/ThemeContext';

const ResumePage = () => {
  const { darkMode } = useContext(ThemeContext);
  const skillsRef = useRef(null);
  const [barsVisible, setBarsVisible] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

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

  useEffect(() => {
    const currentRef = skillsRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setBarsVisible(true); observer.unobserve(entry.target); } },
      { threshold: 0.2 }
    );
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  return (
    <ResumeContainer>
      <PageTitle>My Resume</PageTitle>

      <DownloadButtonContainer>
        <DownloadButton href={resumePdf} target="_blank" rel="noopener noreferrer" download="CV_Alexandru_Poenaru.pdf">
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
                <h3>International Internship</h3>
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
              <TimelineDate>September 2019 – Present (weekends)</TimelineDate>
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
                <p>Specialization in Web Development</p>
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

        <ResumeSection ref={skillsRef}>
          <SectionHeader>
            <SectionIcon><FaCode /></SectionIcon>
            <SectionTitle>Technical Skills</SectionTitle>
          </SectionHeader>

          <SkillsGrid>
            <SkillCategory className="animate-on-scroll">
              <h3>Languages</h3>
              <SkillList>
                <SkillItem><SkillName>JavaScript</SkillName><SkillBar><SkillProgress $width={75} $visible={barsVisible} /></SkillBar></SkillItem>
                <SkillItem><SkillName>TypeScript</SkillName><SkillBar><SkillProgress $width={70} $visible={barsVisible} /></SkillBar></SkillItem>
                <SkillItem><SkillName>Python</SkillName><SkillBar><SkillProgress $width={70} $visible={barsVisible} /></SkillBar></SkillItem>
                <SkillItem><SkillName>Java</SkillName><SkillBar><SkillProgress $width={70} $visible={barsVisible} /></SkillBar></SkillItem>
                <SkillItem><SkillName>C#</SkillName><SkillBar><SkillProgress $width={50} $visible={barsVisible} /></SkillBar></SkillItem>
                <SkillItem><SkillName>HTML</SkillName><SkillBar><SkillProgress $width={70} $visible={barsVisible} /></SkillBar></SkillItem>
                <SkillItem><SkillName>CSS</SkillName><SkillBar><SkillProgress $width={60} $visible={barsVisible} /></SkillBar></SkillItem>
              </SkillList>
            </SkillCategory>

            <SkillCategory className="animate-on-scroll">
              <h3>Frameworks & Libraries</h3>
              <SkillList>
                <SkillItem><SkillName>Node.js</SkillName><SkillBar><SkillProgress $width={70} $visible={barsVisible} /></SkillBar></SkillItem>
                <SkillItem><SkillName>Spring Boot</SkillName><SkillBar><SkillProgress $width={45} $visible={barsVisible} /></SkillBar></SkillItem>
                <SkillItem><SkillName>React</SkillName><SkillBar><SkillProgress $width={60} $visible={barsVisible} /></SkillBar></SkillItem>
                <SkillItem><SkillName>JSX</SkillName><SkillBar><SkillProgress $width={60} $visible={barsVisible} /></SkillBar></SkillItem>
                <SkillItem><SkillName>Tailwind CSS</SkillName><SkillBar><SkillProgress $width={70} $visible={barsVisible} /></SkillBar></SkillItem>
                <SkillItem><SkillName>.NET Framework</SkillName><SkillBar><SkillProgress $width={65} $visible={barsVisible} /></SkillBar></SkillItem>
                <SkillItem><SkillName>Entity Framework</SkillName><SkillBar><SkillProgress $width={60} $visible={barsVisible} /></SkillBar></SkillItem>
                <SkillItem><SkillName>FastAPI</SkillName><SkillBar><SkillProgress $width={70} $visible={barsVisible} /></SkillBar></SkillItem>
                <SkillItem><SkillName>React (Native)</SkillName><SkillBar><SkillProgress $width={50} $visible={barsVisible} /></SkillBar></SkillItem>
                <SkillItem><SkillName>Llama-cpp</SkillName><SkillBar><SkillProgress $width={50} $visible={barsVisible} /></SkillBar></SkillItem>
              </SkillList>
            </SkillCategory>

            <SkillCategory className="animate-on-scroll">
              <h3>Databases</h3>
              <SkillList>
                <SkillItem><SkillName>MySQL</SkillName><SkillBar><SkillProgress $width={70} $visible={barsVisible} /></SkillBar></SkillItem>
                <SkillItem><SkillName>MS SQL Server</SkillName><SkillBar><SkillProgress $width={60} $visible={barsVisible} /></SkillBar></SkillItem>
                <SkillItem><SkillName>MongoDB</SkillName><SkillBar><SkillProgress $width={30} $visible={barsVisible} /></SkillBar></SkillItem>
                <SkillItem><SkillName>DuckDB</SkillName><SkillBar><SkillProgress $width={40} $visible={barsVisible} /></SkillBar></SkillItem>
                <SkillItem><SkillName>SQLite</SkillName><SkillBar><SkillProgress $width={40} $visible={barsVisible} /></SkillBar></SkillItem>
                <SkillItem><SkillName>PostgreSQL</SkillName><SkillBar><SkillProgress $width={60} $visible={barsVisible} /></SkillBar></SkillItem>
              </SkillList>
            </SkillCategory>

            <SkillCategory className="animate-on-scroll">
              <h3>DevOps & Tools</h3>
              <SkillList>
                <SkillItem><SkillName>Git</SkillName><SkillBar><SkillProgress $width={85} $visible={barsVisible} /></SkillBar></SkillItem>
                <SkillItem><SkillName>Docker</SkillName><SkillBar><SkillProgress $width={60} $visible={barsVisible} /></SkillBar></SkillItem>
                <SkillItem><SkillName>Yarn</SkillName><SkillBar><SkillProgress $width={60} $visible={barsVisible} /></SkillBar></SkillItem>
              </SkillList>
            </SkillCategory>
          </SkillsGrid>
        </ResumeSection>
      </ResumeContent>
    </ResumeContainer>
  );
};

/* ─── Keyframes ──────────────────────────────────────────────────────────────── */

const progressFill = keyframes`
  from { width: 0; }
`;

const dataFlow = keyframes`
  0%, 100% { background-position: 0% 50%; }
  50%       { background-position: 100% 50%; }
`;

/* ─── Layout ─────────────────────────────────────────────────────────────────── */

const ResumeContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 80px 24px 100px;
`;

const PageTitle = styled.h1`
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  text-align: center;
  margin-bottom: 24px;
  color: ${props => props.theme.text};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 48px;
    height: 3px;
    background: ${props => props.theme.primary};
    bottom: -16px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 2px;
    box-shadow: 0 0 14px ${props => props.theme.glow};
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
  background: ${props => props.theme.primary};
  color: #fff;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.95rem;
  box-shadow: 0 6px 24px ${props => props.theme.glow};
  transition: background 0.25s ease, transform 0.2s ease, box-shadow 0.3s ease;

  &:hover {
    background: ${props => props.theme.primaryDark};
    transform: translateY(-3px);
    box-shadow: 0 12px 32px ${props => props.theme.glowStrong};
  }
`;

const ResumeContent = styled.div`
  background: ${props => props.theme.card};
  border: 1px solid ${props => props.theme.border};
  border-radius: 20px;
  box-shadow: 0 8px 40px ${props => props.theme.shadow};
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
  border-bottom: 1px solid ${props => props.theme.border};
`;

const SectionIcon = styled.div`
  width: 38px;
  height: 38px;
  background: ${props => props.theme.primary};
  color: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  flex-shrink: 0;
  box-shadow: 0 4px 14px ${props => props.theme.glow};
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
  background: ${props => props.theme.primary};
  border: 2px solid ${props => props.theme.body};
  box-shadow: 0 0 10px ${props => props.theme.glow};
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
  background: ${props => props.theme.cardBackground};
  border: 1px solid ${props => props.theme.border};
  border-radius: 12px;
  padding: 18px 20px;
  box-shadow: 0 2px 12px ${props => props.theme.shadow};
  transition: box-shadow 0.3s ease, border-color 0.3s ease;

  &:hover {
    box-shadow: 0 8px 28px ${props => props.theme.shadowHover};
    border-color: ${props => props.theme.borderStrong};
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
  background: ${props => props.theme.cardBackground};
  border: 1px solid ${props => props.theme.border};
  padding: 22px;
  border-radius: 14px;
  box-shadow: 0 2px 12px ${props => props.theme.shadow};
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease, border-color 0.3s ease;

  &.animate {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    box-shadow: 0 10px 32px ${props => props.theme.shadowHover};
    border-color: ${props => props.theme.borderStrong};
    transform: translateY(-4px);
  }

  h3 {
    margin: 0 0 18px;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${props => props.theme.primary};
  }
`;

const SkillList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SkillItem = styled.div``;

const SkillName = styled.div`
  margin-bottom: 6px;
  font-size: 0.88rem;
  font-weight: 500;
  color: ${props => props.theme.text};
`;

const SkillBar = styled.div`
  height: 6px;
  background: ${props => props.theme.border};
  border-radius: 3px;
  overflow: hidden;
`;

const SkillProgress = styled.div`
  height: 100%;
  border-radius: 3px;
  background: linear-gradient(90deg, ${props => props.theme.primaryDark}, ${props => props.theme.primaryLight});
  background-size: 200% 200%;
  width: ${props => props.$visible ? `${props.$width}%` : '0'};
  animation: ${props => props.$visible ? progressFill : 'none'} 0.9s cubic-bezier(0.16, 1, 0.3, 1) both,
             ${dataFlow} 3s linear infinite;
  box-shadow: 0 0 8px ${props => props.theme.glow};
  transition: width 0.9s cubic-bezier(0.16, 1, 0.3, 1);
`;

export default ResumePage;
