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
          <VideoBackground autoPlay loop muted playsInline>
            <source src={require('../assets/videos/background-video.mp4')} type="video/mp4" />
          </VideoBackground>
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
              <SocialLink href="https://github.com/alexandru-poenaru" target="_blank" rel="noopener noreferrer">
                <FaGithub /> GitHub
              </SocialLink>
              <SocialLink href="https://www.linkedin.com/in/alexandru-poenaru/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin /> LinkedIn
              </SocialLink>
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
                Hi! I'm Alex, an IT student based in Tielt, Belgium. My relationship with technology
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
                <ProjectButton href="https://github.com/alexandru-poenaru/helpdesk-sintandries" target="_blank" rel="noopener noreferrer">
                  <FaGithub /> GitHub Repo
                </ProjectButton>
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
                <ProjectButton href="https://github.com/alexandru-poenaru/kingdomino" target="_blank" rel="noopener noreferrer">
                  <FaGithub /> GitHub Repo
                </ProjectButton>
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
                <ProjectButton href="https://github.com/alexandru-poenaru/kottask" target="_blank" rel="noopener noreferrer">
                  <FaGithub /> GitHub Repo
                </ProjectButton>
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
  from { width: 0; }
  to   { width: 100%; }
`;

const cursorBlink = keyframes`
  from, to { opacity: 1; }
  50%       { opacity: 0; }
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

const VideoBackground = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.3) saturate(0.6);
  z-index: 0;
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
  margin-bottom: 1.2rem;
`;

const HeroTitle = styled.h1`
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #fff;
  margin: 0 0 0.8rem;
  line-height: 1.15;
`;

const HighlightSpan = styled.span`
  color: ${props => props.theme.primary};
  text-shadow: 0 0 24px ${props => props.theme.glow};
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
  animation: ${typewriter} 1.8s steps(22, end) 0.6s forwards,
             ${cursorBlink} 1s infinite;
  width: 0;
  padding-right: 4px;
`;

const AnimatedDescription = styled.p`
  font-size: clamp(0.95rem, 1.6vw, 1.1rem);
  max-width: 580px;
  margin: 0 auto 2rem;
  color: rgba(255, 255, 255, 0.75);
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
  padding: 10px 20px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 10px;
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.primary};
    border-color: ${props => props.theme.primary};
    box-shadow: 0 8px 28px ${props => props.theme.glow};
    transform: translateY(-3px);
  }
`;

const ScrollDownButton = styled.a`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: rgba(255, 255, 255, 0.55);
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
  background: linear-gradient(135deg, ${props => props.theme.primary}, ${props => props.theme.primaryLight});
  box-shadow: 0 0 28px ${props => props.theme.glow};
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
  background: #0D1117;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.06);
  font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
`;

const TerminalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: #161B22;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
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
  background: ${props => props.theme.card};
  border: 1px solid ${props => props.theme.border};
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 8px 32px ${props => props.theme.shadow};
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
    box-shadow: 0 28px 56px ${props => props.theme.shadowHover};
    border-color: ${props => props.theme.borderStrong};
  }
`;

const ProjectImageWrapper = styled.div`
  overflow: hidden;
  height: 220px;
  background: ${props => props.theme.cardBackground};
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
  background: ${props => props.$disabled ? props.theme.cardBackground : props.theme.primary};
  color: ${props => props.$disabled ? props.theme.textSecondary : '#fff'};
  text-decoration: none;
  border-radius: 9px;
  font-size: 0.84rem;
  font-weight: 600;
  align-self: flex-start;
  border: 1px solid ${props => props.$disabled ? props.theme.border : 'transparent'};
  cursor: ${props => props.$disabled ? 'default' : 'pointer'};
  transition: background 0.25s ease, transform 0.2s ease, box-shadow 0.3s ease;

  ${props => !props.$disabled && `
    &:hover {
      background: ${props.theme.primaryDark};
      transform: translateY(-2px);
      box-shadow: 0 6px 20px ${props.theme.glow};
    }
  `}
`;

export default HomePage;
