import React, { useEffect, useState, useContext } from 'react';
import { ThemeContext } from '../styles/ThemeContext';
import styled, { keyframes } from 'styled-components';
import { FaGithub, FaLinkedin, FaArrowDown } from 'react-icons/fa';

import helpdesk from '../assets/images/helpdesk.png';
import kingdomino from '../assets/images/kingdomino.jpg';
import kottask from '../assets/images/kottask.png';
import dashboard from '../assets/images/dashboard.png';
import alex from '../assets/images/alex.jpg';

/* ─── API Terminal Data ──────────────────────────────────────────────────────── */

const ENDPOINTS = [
  {
    method: 'GET',
    url: 'https://api.alex.dev/portfolio/projects',
    color: '#34D399',
    response: `{
  "status": "success",
  "data": [
    {
      "name": "KotTask",
      "tech": ["React", "Node.js", "TypeScript"],
      "status": "live"
    },
    {
      "name": "AI Privacy Engine",
      "tech": ["Python", "FastAPI", "NLP"],
      "status": "live"
    }
  ]
}`,
  },
  {
    method: 'POST',
    url: 'https://api.alex.dev/portfolio/contact',
    color: '#FB923C',
    response: `{
  "status": "success",
  "message": "Message delivered",
  "timestamp": "2026-05-29T10:42:00Z",
  "recipient": "Alexandru Poenaru"
}`,
  },
  {
    method: 'GET',
    url: 'https://api.alex.dev/portfolio/skills',
    color: '#34D399',
    response: `{
  "status": "success",
  "languages": ["JavaScript", "TypeScript",
                "Python", "Java"],
  "frameworks": ["React", "Node.js", "FastAPI",
                 "Spring Boot"],
  "databases": ["PostgreSQL", "MySQL", "DuckDB"]
}`,
  },
];

/* ─── ApiTerminal Component ──────────────────────────────────────────────────── */

const ApiTerminal = () => {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState('typing'); // typing | response | done
  const [typed, setTyped] = useState('');
  const endpoint = ENDPOINTS[idx];
  const command = `curl -X ${endpoint.method} \\\n  "${endpoint.url}"`;

  useEffect(() => {
    setPhase('typing');
    setTyped('');
  }, [idx]);

  useEffect(() => {
    if (phase !== 'typing') return;
    if (typed.length < command.length) {
      const t = setTimeout(() => setTyped(command.slice(0, typed.length + 1)), 28);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPhase('response'), 900);
    return () => clearTimeout(t);
  }, [phase, typed, command]);

  useEffect(() => {
    if (phase !== 'response') return;
    const t = setTimeout(() => setPhase('done'), 200);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    const t = setTimeout(() => setIdx(i => (i + 1) % ENDPOINTS.length), 8000);
    return () => clearTimeout(t);
  }, [idx]);

  const syntaxHighlight = (json) =>
    json.split('\n').map((line, i) => {
      const parts = line.split(/("[\w\s]+"(?=:)|"[^"]*"|[\d.]+(?=[,\n}])|[{}[\],])/g);
      return (
        <div key={i}>
          {parts.map((part, j) => {
            if (/^"[\w\s]+"$/.test(part) && line.includes(`${part}:`)) return <JsonKey key={j}>{part}</JsonKey>;
            if (/^"/.test(part)) return <JsonString key={j}>{part}</JsonString>;
            if (/^\d/.test(part)) return <JsonNumber key={j}>{part}</JsonNumber>;
            if (/^[{}[\],]$/.test(part)) return <JsonPunct key={j}>{part}</JsonPunct>;
            return <span key={j}>{part}</span>;
          })}
        </div>
      );
    });

  return (
    <TerminalWrapper>
      <TerminalHeader>
        <TrafficLights>
          <TrafficDot $color="#FF5F57" />
          <TrafficDot $color="#FFBD2E" />
          <TrafficDot $color="#28C840" />
        </TrafficLights>
        <TerminalLabel>api.alex.dev — terminal</TerminalLabel>
        <MethodBadge $color={endpoint.color}>{endpoint.method}</MethodBadge>
      </TerminalHeader>
      <TerminalBody>
        <TerminalLine>
          <Prompt>$</Prompt>
          <CommandText>{typed}<Caret /></CommandText>
        </TerminalLine>
        {phase === 'response' && (
          <LoadingLine><Spinner>⠋</Spinner> Waiting for response...</LoadingLine>
        )}
        {phase === 'done' && (
          <>
            <StatusLine><StatusOk>HTTP/1.1 200 OK</StatusOk></StatusLine>
            <ContentType>Content-Type: application/json</ContentType>
            <Divider />
            <ResponseBlock>{syntaxHighlight(endpoint.response)}</ResponseBlock>
          </>
        )}
      </TerminalBody>
    </TerminalWrapper>
  );
};

/* ─── HomePage ───────────────────────────────────────────────────────────────── */

const HomePage = () => {
  const { darkMode } = useContext(ThemeContext);

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

  const handleScrollClick = (e) => {
    e.preventDefault();
    const el = document.getElementById('about');
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
  };

  return (
    <>
      <FullWidthHeroContainer>
        <HeroSection id="hero">
          <AnimatedHeroBg />
          <HeroOverlay />
          <HeroContent>
            <TypewriterContainer>
              <HeroTitle>Hello, I'm <HighlightSpan>Alexandru Poenaru</HighlightSpan></HeroTitle>
              <TypewriterText>Student Full Stack Development @ HOGENT</TypewriterText>
            </TypewriterContainer>
            <AnimatedDescription>
              Full-stack developer who loves building clean interfaces, but lives for the logic, structure,
              and architecture that makes them work.
            </AnimatedDescription>
            <HeroActions>
              <SocialLink href="https://github.com/alexandru-poenaru" target="_blank" rel="noopener noreferrer"><FaGithub /> GitHub</SocialLink>
              <SocialLink href="https://www.linkedin.com/in/alexandru-poenaru/" target="_blank" rel="noopener noreferrer"><FaLinkedin /> LinkedIn</SocialLink>
            </HeroActions>
            <ScrollDownButton href="#about" onClick={handleScrollClick}>
              <FaArrowDown />
              <span>Scroll</span>
            </ScrollDownButton>
          </HeroContent>
        </HeroSection>
        <HeroBottomFade />
      </FullWidthHeroContainer>

      <HomeContainer>
        <Section id="about">
          <SectionTitle>About Me</SectionTitle>
          <AboutContent>
            <ProfileImageContainer className="animate-on-scroll">
              <ProfileImage src={alex} alt="Alexandru Poenaru" />
            </ProfileImageContainer>
            <AboutTextContent>
              <p>
                Hi! I'm Alex, a 21 year old IT student based in Tielt, Belgium. My relationship with technology
                started at 10, when I got into robotics. Soldering components onto a motherboard in just
                the right order, and watching something actually work as a result. No code, just patience
                and precision. It was the best thing in the world to me at the time.
              </p>
              <p>
                A couple of years later I discovered programming, and everything clicked into place. I
                realized the software was where the real power was. You could build anything, with no physical
                limits, just logic. So I shifted my focus to development, and that decision has shaped
                everything since.
              </p>
              <p>
                I enjoy working across the full stack. Frontend is satisfying when the details come together
                and something looks and feels right. But backend is where I genuinely love spending time.
                The structure, the data flow, the architecture decisions that determine how well something
                actually scales. That is where I feel most in my element.
              </p>
              <p>
                I am currently finishing my Bachelor of Applied IT at HOGENT, specializing in Full Stack Development.
                I am always looking for challenges that push me further, and for people who care as much
                about building things well as I do.
              </p>
            </AboutTextContent>
          </AboutContent>

          <TerminalSection className="animate-on-scroll">
            <TerminalIntro>
              <TerminalIntroLabel>Live API Explorer</TerminalIntroLabel>
              <TerminalIntroText>A peek at the APIs powering this portfolio</TerminalIntroText>
            </TerminalIntro>
            <ApiTerminal />
          </TerminalSection>
        </Section>

        <Section id="projects">
          <SectionTitle>Projects</SectionTitle>
          <ProjectsGrid>
            <ProjectCard className="animate-on-scroll">
              <ProjectImageWrapper>
                <ProjectImage src={helpdesk} alt="Helpdesk Project" />
              </ProjectImageWrapper>
              <ProjectContent>
                <ProjectDescription>
                  A ticket system for the helpdesk of my internship company (2023), written in C#.
                </ProjectDescription>
                <ProjectButton href="https://github.com/alexandru-poenaru/helpdesk-sintandries" target="_blank" rel="noopener noreferrer"><FaGithub /> GitHub Repo</ProjectButton>
              </ProjectContent>
            </ProjectCard>

            <ProjectCard className="animate-on-scroll">
              <ProjectImageWrapper>
                <ProjectImage src={kingdomino} alt="Kingdomino Project" />
              </ProjectImageWrapper>
              <ProjectContent>
                <ProjectDescription>
                  The board game KingDomino playable by 2–4 players, written in Java.
                </ProjectDescription>
                <ProjectButton href="https://github.com/alexandru-poenaru/kingdomino" target="_blank" rel="noopener noreferrer"><FaGithub /> GitHub Repo</ProjectButton>
              </ProjectContent>
            </ProjectCard>

            <ProjectCard className="animate-on-scroll">
              <ProjectImageWrapper>
                <ProjectImage src={kottask} alt="KotTask Project" />
              </ProjectImageWrapper>
              <ProjectContent>
                <ProjectDescription>
                  A TODO-app with integrated calendar — assign tasks to yourself and others. Built with React, Node.js, TypeScript.
                </ProjectDescription>
                <ProjectButton href="https://github.com/alexandru-poenaru/kottask" target="_blank" rel="noopener noreferrer"><FaGithub /> GitHub Repo</ProjectButton>
              </ProjectContent>
            </ProjectCard>

            <ProjectCard className="animate-on-scroll">
              <ProjectImageWrapper>
                <ProjectImage src={dashboard} alt="Dashboard Project" />
              </ProjectImageWrapper>
              <ProjectContent>
                <ProjectDescription>
                  Production KPI Dashboard with machine maintenance overview. React + Node.js + TypeScript + Java (WIP).
                </ProjectDescription>
                <ProjectButton as="span" $disabled>
                  Unavailable
                </ProjectButton>
              </ProjectContent>
            </ProjectCard>
          </ProjectsGrid>
        </Section>
      </HomeContainer>
    </>
  );
};

/* ─── Keyframes ──────────────────────────────────────────────────────────────── */

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const typewriter = keyframes`
  from { max-width: 0; }
  to   { max-width: 100vw; }
`;

const cursorBlink = keyframes`
  from, to { opacity: 1; }
  50%       { opacity: 0; }
`;

const cursorHide = keyframes`
  to { border-color: transparent; }
`;

const floatAnim = keyframes`
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-8px); }
`;

const spinnerAnim = keyframes`
  0%   { content: '⠋'; }
  12%  { content: '⠙'; }
  25%  { content: '⠹'; }
  37%  { content: '⠸'; }
  50%  { content: '⠼'; }
  62%  { content: '⠴'; }
  75%  { content: '⠦'; }
  87%  { content: '⠧'; }
  100% { content: '⠇'; }
`;

const responseFadeIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ─── AnimatedHeroBg ────────────────────────────────────────────────────────── */

const bgBlob1 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  25%       { transform: translate(80px, -100px) scale(1.12); }
  50%       { transform: translate(160px, 30px) scale(0.92); }
  75%       { transform: translate(50px, -60px) scale(1.06); }
`;
const bgBlob2 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%       { transform: translate(-100px, 80px) scale(1.15); }
  66%       { transform: translate(60px, -120px) scale(0.90); }
`;
const bgBlob3 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  40%       { transform: translate(120px, 100px) scale(1.08); }
  75%       { transform: translate(-80px, 50px) scale(0.96); }
`;
const orbDrift1 = keyframes`
  0%, 100% { transform: translateY(0px) translateX(0px); }
  33%       { transform: translateY(-30px) translateX(14px); }
  66%       { transform: translateY(-16px) translateX(-20px); }
`;
const orbDrift2 = keyframes`
  0%, 100% { transform: translateY(0px) translateX(0px); }
  40%       { transform: translateY(-40px) translateX(-18px); }
  75%       { transform: translateY(-22px) translateX(24px); }
`;

const BgRoot = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  background: ${props => props.theme.body};
  transition: background 0.4s ease;
`;

const GridDots = styled.div`
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, ${props => props.theme.border} 1px, transparent 1px);
  background-size: 52px 52px;
`;

const AuroraBase = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(88px);
  will-change: transform;
  transition: background 0.4s ease;
`;

const Aurora1 = styled(AuroraBase)`
  width: 900px; height: 700px;
  top: -200px; left: -200px;
  background: radial-gradient(ellipse, ${props => props.theme.glowStrong} 0%, ${props => props.theme.glow} 45%, transparent 70%);
  animation: ${bgBlob1} 20s ease-in-out infinite;
`;
const Aurora2 = styled(AuroraBase)`
  width: 780px; height: 620px;
  bottom: -180px; right: -140px;
  background: radial-gradient(ellipse, ${props => props.theme.glowStrong} 0%, ${props => props.theme.glow} 45%, transparent 70%);
  animation: ${bgBlob2} 24s ease-in-out infinite;
`;
const Aurora3 = styled(AuroraBase)`
  width: 580px; height: 480px;
  top: 35%; left: 42%;
  background: radial-gradient(ellipse, ${props => props.theme.glow} 0%, transparent 70%);
  animation: ${bgBlob3} 17s ease-in-out infinite;
`;

const OrbBase = styled.div`
  position: absolute;
  border-radius: 50%;
  background:
    radial-gradient(circle at 30% 26%, ${props => props.theme.glassHighlight} 0%, transparent 42%),
    radial-gradient(circle at 50% 50%, ${props => props.theme.glow} 0%, transparent 70%);
  border: 1px solid ${props => props.theme.border};
  box-shadow:
    inset 0 2px 0 ${props => props.theme.glassHighlight},
    0 0 60px ${props => props.theme.glow};
  backdrop-filter: blur(0.5px);
  -webkit-backdrop-filter: blur(0.5px);
  will-change: transform;
`;

const Orb1 = styled(OrbBase)`
  width: 520px; height: 520px;
  top: -80px; left: -130px;
  animation: ${orbDrift1} 14s ease-in-out infinite;
`;
const Orb2 = styled(OrbBase)`
  width: 360px; height: 360px;
  bottom: -50px; right: -90px;
  animation: ${orbDrift2} 19s ease-in-out 1.5s infinite;
`;
const Orb3 = styled(OrbBase)`
  width: 210px; height: 210px;
  top: 18%; right: 10%;
  animation: ${orbDrift1} 12s ease-in-out 0.7s infinite;
`;
const Orb4 = styled(OrbBase)`
  width: 155px; height: 155px;
  top: 55%; left: 22%;
  animation: ${orbDrift2} 16s ease-in-out 2.8s infinite;
`;

const AnimatedHeroBg = () => (
  <BgRoot>
    <GridDots />
    <Aurora1 />
    <Aurora2 />
    <Aurora3 />
    <Orb1 />
    <Orb2 />
    <Orb3 />
    <Orb4 />
  </BgRoot>
);

/* ─── Hero ───────────────────────────────────────────────────────────────────── */

const FullWidthHeroContainer = styled.div`
  width: 100%;
  position: relative;
`;

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    align-items: flex-start;
    padding-top: 22vh;
  }
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 0%,
    ${props => props.theme.body}55 55%,
    ${props => props.theme.body} 100%
  );
  z-index: 1;
  transition: background 0.4s ease;
`;

const HeroBottomFade = styled.div`
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 120px;
  background: linear-gradient(to bottom, transparent, ${props => props.theme.body});
  z-index: 5;
  pointer-events: none;
  transition: background 0.4s ease;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 0 24px;
  max-width: 820px;
  animation: ${fadeIn} 0.8s ease-out both;
`;

const TypewriterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.2rem;
`;

const HeroTitle = styled.h1`
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: ${props => props.theme.text};
  margin: 0 0 0.8rem;
  line-height: 1.15;
`;

const HighlightSpan = styled.span`
  color: ${props => props.theme.text};
`;

const TypewriterText = styled.h2`
  font-size: clamp(1.1rem, 2.5vw, 1.6rem);
  font-weight: 500;
  margin: 0;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid ${props => props.theme.primary};
  color: ${props => props.theme.primary};
  animation:
    ${typewriter} 3.2s steps(40, end) 0.6s forwards,
    ${cursorBlink} 0.8s 0.6s 5,
    ${cursorHide} 0.05s 4.65s forwards;
  max-width: 0;
  padding-right: 4px;

  @media (max-width: 480px) {
    font-size: 0.78rem;
  }
`;

const AnimatedDescription = styled.p`
  font-size: clamp(0.95rem, 1.6vw, 1.1rem);
  max-width: 580px;
  margin: 0 auto 2rem;
  color: ${props => props.theme.textSecondary};
  opacity: 0;
  animation: ${fadeIn} 0.8s ease-out 2.2s forwards;
  line-height: 1.7;
`;

const HeroActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 2.5rem;
  opacity: 0;
  animation: ${fadeIn} 0.8s ease-out 2.8s forwards;
  flex-wrap: wrap;
`;

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 22px;
  border-radius: 50px;
  color: ${props => props.theme.text};
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  background: ${props => props.theme.glass};
  backdrop-filter: ${props => props.theme.glassBackdrop};
  -webkit-backdrop-filter: ${props => props.theme.glassBackdrop};
  border: 0.5px solid ${props => props.theme.glassBorder};
  box-shadow: inset 0 1.5px 0 ${props => props.theme.glassHighlight}, ${props => props.theme.glassShadow};
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-3px);
    box-shadow:
      inset 0 1.5px 0 ${props => props.theme.glassHighlight},
      0 12px 32px ${props => props.theme.glowStrong};
  }
`;

const ScrollDownButton = styled.a`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: ${props => props.theme.textSecondary};
  text-decoration: none;
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  opacity: 0;
  animation: ${fadeIn} 0.8s ease-out 3.4s forwards;
  transition: color 0.3s;
  cursor: pointer;

  svg {
    font-size: 1.1rem;
    animation: ${floatAnim} 2.5s ease-in-out infinite;
  }

  &:hover { color: ${props => props.theme.primary}; }
`;

/* ─── Sections ───────────────────────────────────────────────────────────────── */

const HomeContainer = styled.div`
  width: 100%;
  max-width: 100%;
  padding: 0 24px;
`;

const Section = styled.section`
  padding: 96px 0;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  text-align: center;
  margin-bottom: 64px;
  color: ${props => props.theme.text};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 48px;
    height: 3px;
    background: ${props => props.theme.primary};
    bottom: -18px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 2px;
    box-shadow: 0 0 14px ${props => props.theme.glow};
  }
`;

/* ─── About ──────────────────────────────────────────────────────────────────── */

const AboutContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const ProfileImageContainer = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  flex-shrink: 0;
  padding: 3px;
  background: ${props => props.theme.glassTinted};
  backdrop-filter: ${props => props.theme.glassBackdrop};
  -webkit-backdrop-filter: ${props => props.theme.glassBackdrop};
  border: 0.5px solid ${props => props.theme.glassTintedBorder};
  box-shadow:
    inset 0 1.5px 0 ${props => props.theme.glassTintedHighlight},
    0 0 40px ${props => props.theme.glow},
    ${props => props.theme.glassShadow};
  opacity: 0;
  transform: translateY(20px) scale(0.95);
  transition: opacity 0.5s ease, transform 0.5s ease;

  &.animate {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  display: block;
`;

const AboutTextContent = styled.div`
  p {
    font-size: 1rem;
    line-height: 1.75;
    margin: 0 0 1rem;
    color: ${props => props.theme.textSecondary};

    &:last-child { margin-bottom: 0; }
  }
`;

/* ─── Terminal ───────────────────────────────────────────────────────────────── */

const TerminalSection = styled.div`
  margin-top: 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;

  &.animate {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TerminalIntro = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

const TerminalIntroLabel = styled.div`
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${props => props.theme.primary};
  margin-bottom: 6px;
`;

const TerminalIntroText = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.textSecondary};
`;

const TerminalWrapper = styled.div`
  width: 100%;
  max-width: 780px;
  background: linear-gradient(180deg, rgba(13,17,23,0.85) 0%, rgba(13,17,23,0.75) 100%);
  backdrop-filter: blur(44px) saturate(1.8) brightness(0.95);
  -webkit-backdrop-filter: blur(44px) saturate(1.8) brightness(0.95);
  border-radius: 18px;
  overflow: hidden;
  border: 0.5px solid rgba(255,255,255,0.12);
  box-shadow:
    inset 0 1.5px 0 rgba(255,255,255,0.14),
    0 24px 64px rgba(0, 0, 0, 0.55),
    0 6px 20px rgba(0,0,0,0.3);
  font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
`;

const TerminalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: rgba(22,27,34,0.60);
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.10);
`;

const TrafficLights = styled.div`
  display: flex;
  gap: 6px;
`;

const TrafficDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.$color};
  opacity: 0.9;
`;

const TerminalLabel = styled.span`
  flex: 1;
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.35);
  text-align: center;
`;

const MethodBadge = styled.span`
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 3px 8px;
  border-radius: 6px;
  color: ${props => props.$color};
  border: 1px solid ${props => props.$color}50;
  background: ${props => props.$color}15;
`;

const TerminalBody = styled.div`
  padding: 20px 20px 24px;
  min-height: 220px;
  font-size: 0.8rem;
  line-height: 1.65;
  color: #C9D1D9;
`;

const TerminalLine = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
  white-space: pre-wrap;
  word-break: break-all;
`;

const Prompt = styled.span`
  color: #34D399;
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 1px;
`;

const CommandText = styled.span`
  color: #E6EDF3;
  white-space: pre-wrap;
`;

const Caret = styled.span`
  display: inline-block;
  width: 8px;
  height: 1em;
  background: #818CF8;
  vertical-align: text-bottom;
  margin-left: 2px;
  animation: ${cursorBlink} 1s step-end infinite;
`;

const LoadingLine = styled.div`
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.78rem;
  margin-top: 8px;
  animation: ${responseFadeIn} 0.3s ease;
`;

const Spinner = styled.span`
  display: inline-block;
  animation: ${spinnerAnim} 0.8s linear infinite;
`;

const StatusLine = styled.div`
  margin-top: 12px;
  animation: ${responseFadeIn} 0.4s ease;
`;

const StatusOk = styled.span`
  color: #34D399;
  font-weight: 700;
`;

const ContentType = styled.div`
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.75rem;
  margin-bottom: 12px;
  animation: ${responseFadeIn} 0.4s ease 0.05s both;
`;

const Divider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin-bottom: 12px;
`;

const ResponseBlock = styled.div`
  animation: ${responseFadeIn} 0.5s ease 0.1s both;
  font-size: 0.78rem;
  line-height: 1.7;
`;

const JsonKey = styled.span`color: #818CF8;`;
const JsonString = styled.span`color: #34D399;`;
const JsonNumber = styled.span`color: #FB923C;`;
const JsonPunct = styled.span`color: rgba(255,255,255,0.35);`;

/* ─── Projects ───────────────────────────────────────────────────────────────── */

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  max-width: 1100px;
  margin: 0 auto;

  @media (min-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ProjectCard = styled.div`
  background: ${props => props.theme.glass};
  backdrop-filter: ${props => props.theme.glassBackdrop};
  -webkit-backdrop-filter: ${props => props.theme.glassBackdrop};
  border: 0.5px solid ${props => props.theme.glassBorder};
  border-radius: 22px;
  overflow: hidden;
  box-shadow:
    inset 0 1.5px 0 ${props => props.theme.glassHighlight},
    ${props => props.theme.glassShadow};
  display: flex;
  flex-direction: column;
  height: 100%;
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 0.5s ease,
    transform 0.55s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.4s ease,
    border-color 0.3s ease;

  &.animate {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    transform: translateY(-10px) perspective(900px) rotateX(-2deg);
    box-shadow:
      inset 0 1.5px 0 ${props => props.theme.glassHighlight},
      0 28px 56px ${props => props.theme.shadowHover},
      0 8px 20px rgba(0,0,0,0.15);
    border-color: ${props => props.theme.glassTintedBorder};
  }
`;

const ProjectImageWrapper = styled.div`
  overflow: hidden;
  height: 220px;
  background: rgba(255, 255, 255, 0.04);
  border-bottom: 0.5px solid ${props => props.theme.glassBorder};
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 16px;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);

  ${ProjectCard}:hover & {
    transform: scale(1.04);
  }
`;

const ProjectContent = styled.div`
  padding: 22px 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  gap: 16px;
`;

const ProjectDescription = styled.p`
  font-size: 0.92rem;
  color: ${props => props.theme.textSecondary};
  margin: 0;
  line-height: 1.65;
`;

const ProjectButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 18px;
  border-radius: 50px;
  font-size: 0.84rem;
  font-weight: 600;
  align-self: flex-start;
  text-decoration: none;
  cursor: ${props => props.$disabled ? 'default' : 'pointer'};
  position: relative;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.25s ease;

  background: ${props => props.$disabled
    ? props.theme.glass
    : props.theme.glassTinted};
  backdrop-filter: ${props => props.theme.glassBackdrop};
  -webkit-backdrop-filter: ${props => props.theme.glassBackdrop};
  border: 0.5px solid ${props => props.$disabled
    ? props.theme.glassBorder
    : props.theme.glassTintedBorder};
  box-shadow: inset 0 1px 0 ${props => props.$disabled
    ? props.theme.glassHighlight
    : props.theme.glassTintedHighlight};
  color: ${props => props.$disabled ? props.theme.textSecondary : props.theme.primary};

  ${props => !props.$disabled && `
    &:hover {
      transform: translateY(-2px);
      box-shadow:
        inset 0 1px 0 rgba(255,255,255,0.35),
        0 8px 24px rgba(79,70,229,0.28);
    }
  `}
`;

export default HomePage;
