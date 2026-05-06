import React, { useRef, useEffect, useState, useContext } from 'react';
import { ThemeContext } from '../styles/ThemeContext';
import styled, { keyframes } from 'styled-components';
import { FaGithub, FaLinkedin, FaArrowDown, FaServer, FaDatabase, FaCode, FaJsSquare, FaJava, FaHtml5, FaCss3Alt, FaGitAlt, FaDocker, FaPython, FaReact, FaExternalLinkAlt } from 'react-icons/fa';
import { SiTypescript, SiNodedotjs, SiMysql, SiYarn, SiSpringboot } from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import { DiMsqlServer } from 'react-icons/di';
import { PiFileJsxDuotone } from 'react-icons/pi';
import { RiTailwindCssFill } from 'react-icons/ri';
import helpdesk from '../assets/images/helpdesk.png';
import kingdomino from '../assets/images/kingdomino.jpg';
import kottask from '../assets/images/kottask.png';
import dashboard from '../assets/images/dashboard.png';
import alex from '../assets/images/alex.jpg';

const HomePage = () => {
  const serverRef = useRef(null);
  const codeBlockRef = useRef(null);
  const [codeVisible, setCodeVisible] = useState(false);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    const interval = setInterval(() => {
      if (serverRef.current) {
        serverRef.current.classList.add('pulse');
        setTimeout(() => serverRef.current?.classList.remove('pulse'), 1000);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
    const currentRef = codeBlockRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setCodeVisible(true); observer.unobserve(entry.target); } },
      { threshold: 0.3 }
    );
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  const handleLearnMoreClick = (e) => {
    e.preventDefault();
    const id = e.currentTarget.getAttribute('href').substring(1);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <FullWidthHeroContainer>
        <HeroSection>
          <VideoBackground autoPlay loop muted playsInline>
            <source src={require('../assets/videos/background-video.mp4')} type="video/mp4" />
          </VideoBackground>
          <HeroOverlay />
          <HeroContent>
            <TypewriterContainer>
              <HeroTitle>Hello, I'm <HighlightSpan>Alexandru Poenaru</HighlightSpan></HeroTitle>
              <TypewriterText>Student IT-Dev @ HOGENT</TypewriterText>
            </TypewriterContainer>
            <AnimatedDescription>
              Applied IT student with a passion for web and back-end development.
              I build efficient, scalable server-side applications and clean front-end experiences.
            </AnimatedDescription>
            <HeroActions>
              <SocialLink href="https://github.com/alexandru-poenaru" target="_blank" rel="noopener noreferrer">
                <FaGithub /> GitHub
              </SocialLink>
              <SocialLink href="https://www.linkedin.com/in/alexandru-poenaru/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin /> LinkedIn
              </SocialLink>
            </HeroActions>
            <ScrollDownButton href="#about" onClick={handleLearnMoreClick}>
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
                Hi! I'm Alex, an enthusiastic IT student with a passion for web and backend development.
                I've been fascinated by code since I was 12 — amazed by how just the right characters in the
                right order can create something truly special. That early curiosity turned into a love for
                logic, problem-solving, and building things that actually work.
              </p>
              <p>
                I enjoy working on API development, scalable architecture, real-time data, and everything
                that makes development more efficient, elegant, or clever. Always experimenting, learning
                fast, and looking for challenges that push me to grow.
              </p>
              <p>
                Open to opportunities where I can keep learning, building cool stuff, and collaborating
                with people who love tech as much as I do.
              </p>
            </AboutTextContent>
          </AboutContent>

          <BackendVisualization>
            <ServerContainer ref={serverRef}>
              <ServerIcon><FaServer /></ServerIcon>
              <NodeLabel>Server</NodeLabel>
            </ServerContainer>

            <ConnectionLine>
              <DataDot className="dot1" />
              <DataDot className="dot2" />
              <DataDot className="reverse-dot1" />
              <DataDot className="reverse-dot2" />
            </ConnectionLine>

            <DatabaseContainer>
              <DatabaseIcon><FaDatabase /></DatabaseIcon>
              <NodeLabel>Database</NodeLabel>
            </DatabaseContainer>

            <CodeBlockContainer ref={codeBlockRef}>
              <StandaloneCodeIcon><FaCode /></StandaloneCodeIcon>
              <CodeSnippet>
                <CodeLine $visible={codeVisible}>export default function Data() &#123;</CodeLine>
                <CodeLine $visible={codeVisible}>  const &#123; data, error, isLoading &#125;</CodeLine>
                <CodeLine $visible={codeVisible}>    = useSWR('/api/data', fetcher);</CodeLine>
                <CodeLine $visible={codeVisible}>  if (isLoading) return &lt;p&gt;Loading...&lt;/p&gt;;</CodeLine>
                <CodeLine $visible={codeVisible}>  if (error) return &lt;p&gt;Error&lt;/p&gt;;</CodeLine>
                <CodeLine $visible={codeVisible}></CodeLine>
                <CodeLine $visible={codeVisible}>  return (</CodeLine>
                <CodeLine $visible={codeVisible}>   &lt;div&gt;</CodeLine>
                <CodeLine $visible={codeVisible}>    &lt;pre&gt;&#123;JSON.stringify(data)&#125;&lt;/pre&gt;</CodeLine>
                <CodeLine $visible={codeVisible}>   &lt;/div&gt;</CodeLine>
                <CodeLine $visible={codeVisible}>  );</CodeLine>
                <CodeLine $visible={codeVisible}>&#125;</CodeLine>
              </CodeSnippet>
            </CodeBlockContainer>
          </BackendVisualization>
        </Section>

        <Section id="skills">
          <SectionTitle>Technical Skills</SectionTitle>
          <SkillsContainer>
            <SkillCategory className="animate-on-scroll">
              <SkillCategoryTitle>Languages</SkillCategoryTitle>
              <SkillsList>
                <SkillItem><FaJsSquare /> JavaScript</SkillItem>
                <SkillItem><SiTypescript /> TypeScript</SkillItem>
                <SkillItem><FaPython /> Python</SkillItem>
                <SkillItem><FaJava /> Java</SkillItem>
                <SkillItem><TbBrandCSharp /> C#</SkillItem>
                <SkillItem><FaHtml5 /> HTML</SkillItem>
                <SkillItem><FaCss3Alt /> CSS</SkillItem>
              </SkillsList>
            </SkillCategory>

            <SkillCategory className="animate-on-scroll">
              <SkillCategoryTitle>Frameworks & Libraries</SkillCategoryTitle>
              <SkillsList>
                <SkillItem><SiNodedotjs /> Node.js</SkillItem>
                <SkillItem><SiSpringboot /> Spring Boot</SkillItem>
                <SkillItem><FaReact /> React</SkillItem>
                <SkillItem><PiFileJsxDuotone /> JSX</SkillItem>
                <SkillItem><RiTailwindCssFill /> Tailwind CSS</SkillItem>
              </SkillsList>
            </SkillCategory>

            <SkillCategory className="animate-on-scroll">
              <SkillCategoryTitle>Databases</SkillCategoryTitle>
              <SkillsList>
                <SkillItem><SiMysql /> MySQL</SkillItem>
                <SkillItem><DiMsqlServer /> MS SQL Server</SkillItem>
              </SkillsList>
            </SkillCategory>

            <SkillCategory className="animate-on-scroll">
              <SkillCategoryTitle>DevOps & Tools</SkillCategoryTitle>
              <SkillsList>
                <SkillItem><FaGitAlt /> Git</SkillItem>
                <SkillItem><FaDocker /> Docker</SkillItem>
                <SkillItem><SiYarn /> Yarn</SkillItem>
              </SkillsList>
            </SkillCategory>
          </SkillsContainer>
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
                  WIP
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
  from, to { border-color: transparent; }
  50%       { border-color: currentColor; }
`;

const floatAnim = keyframes`
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-8px); }
`;

const pulseAnim = keyframes`
  0%   { box-shadow: 0 0 0 0 rgba(124, 116, 255, 0.6); }
  70%  { box-shadow: 0 0 0 12px rgba(124, 116, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(124, 116, 255, 0); }
`;

const serverPulseAnim = keyframes`
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.05); }
`;

const dotFwd1 = keyframes`
  0%   { left: 5%;  opacity: 0; }
  10%  { left: 10%; opacity: 1; }
  90%  { left: 90%; opacity: 1; }
  100% { left: 95%; opacity: 0; }
`;
const dotFwd2 = keyframes`
  0%   { left: 5%;  opacity: 0; }
  10%  { left: 10%; opacity: 1; }
  90%  { left: 90%; opacity: 1; }
  100% { left: 95%; opacity: 0; }
`;
const dotRev1 = keyframes`
  0%   { right: 5%;  opacity: 0; }
  10%  { right: 10%; opacity: 1; }
  90%  { right: 90%; opacity: 1; }
  100% { right: 95%; opacity: 0; }
`;
const dotRev2 = keyframes`
  0%   { right: 5%;  opacity: 0; }
  10%  { right: 10%; opacity: 1; }
  90%  { right: 90%; opacity: 1; }
  100% { right: 95%; opacity: 0; }
`;
const mobDotFwd1 = keyframes`
  0%   { top: 5%;  opacity: 0; }
  10%  { top: 10%; opacity: 1; }
  90%  { top: 90%; opacity: 1; }
  100% { top: 95%; opacity: 0; }
`;
const mobDotFwd2 = keyframes`
  0%   { top: 5%;  opacity: 0; }
  10%  { top: 10%; opacity: 1; }
  90%  { top: 90%; opacity: 1; }
  100% { top: 95%; opacity: 0; }
`;
const mobDotRev1 = keyframes`
  0%   { bottom: 5%;  opacity: 0; }
  10%  { bottom: 10%; opacity: 1; }
  90%  { bottom: 90%; opacity: 1; }
  100% { bottom: 95%; opacity: 0; }
`;
const mobDotRev2 = keyframes`
  0%   { bottom: 5%;  opacity: 0; }
  10%  { bottom: 10%; opacity: 1; }
  90%  { bottom: 90%; opacity: 1; }
  100% { bottom: 95%; opacity: 0; }
`;
const typingAnim = keyframes`
  from { width: 0; }
  to   { width: 100%; }
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
  filter: brightness(0.35) saturate(0.7);
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

  svg {
    font-size: 1.1rem;
    animation: ${floatAnim} 2.5s ease-in-out infinite;
  }

  &:hover {
    color: ${props => props.theme.primary};
  }
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

/* ─── Backend Visualization ──────────────────────────────────────────────────── */

const BackendVisualization = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 72px;
  position: relative;
  min-height: 380px;

  @media (max-width: 768px) {
    min-height: 480px;
    gap: 12px;
  }
`;

const ServerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;

  &.pulse {
    animation: ${serverPulseAnim} 1s ease;
  }

  @media (min-width: 768px) {
    position: absolute;
    left: 12%;
    top: 16px;
  }
`;

const ServerIcon = styled.div`
  width: 76px;
  height: 76px;
  border-radius: 16px;
  background: linear-gradient(135deg, #136f63, #00C6FF);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.8rem;
  box-shadow: 0 8px 28px rgba(0, 198, 255, 0.3);
  animation: ${pulseAnim} 3s infinite;
  margin-bottom: 10px;
  transition: transform 0.3s;

  &:hover { transform: scale(1.06); }
`;

const DatabaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;

  @media (min-width: 768px) {
    position: absolute;
    right: 12%;
    top: 16px;
  }
`;

const DatabaseIcon = styled.div`
  width: 76px;
  height: 76px;
  border-radius: 16px;
  background: linear-gradient(135deg, #FF7200, #FF4B00);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.8rem;
  box-shadow: 0 8px 28px rgba(255, 114, 0, 0.3);
  margin-bottom: 10px;
  transition: transform 0.3s;

  &:hover { transform: scale(1.06); }
`;

const NodeLabel = styled.div`
  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  color: ${props => props.theme.textSecondary};
`;

const ConnectionLine = styled.div`
  position: relative;
  width: 60%;
  height: 2px;
  background: linear-gradient(to right, #136f63, #FF7200);
  margin: 8px 0;
  z-index: 5;
  overflow: visible;

  @media (min-width: 768px) {
    position: absolute;
    top: 54px;
    left: 50%;
    transform: translateX(-50%);
    margin: 0;
    width: 76%;
  }

  @media (max-width: 768px) {
    width: 2px;
    height: 100px;
    background: linear-gradient(to bottom, #136f63, #FF7200);
    margin: 0 auto;
  }
`;

const DataDot = styled.div`
  position: absolute;
  width: 7px;
  height: 7px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(255,255,255,0.9), 0 0 20px ${props => props.theme.glow};
  z-index: 20;

  &.dot1, &.dot2 { top: -2px; left: 0; }
  &.dot1 {
    animation: ${dotFwd1} 3s infinite;
    @media (max-width: 768px) { animation: ${mobDotFwd1} 3s infinite; left: -2px; }
  }
  &.dot2 {
    animation: ${dotFwd2} 3s infinite 1s;
    @media (max-width: 768px) { animation: ${mobDotFwd2} 3s infinite 1s; left: -2px; }
  }

  &.reverse-dot1, &.reverse-dot2 { top: -2px; right: 0; }
  &.reverse-dot1 {
    animation: ${dotRev1} 3s infinite 0.5s;
    @media (max-width: 768px) { animation: ${mobDotRev1} 3s infinite 0.5s; right: -2px; top: auto; }
  }
  &.reverse-dot2 {
    animation: ${dotRev2} 3s infinite 1.5s;
    @media (max-width: 768px) { animation: ${mobDotRev2} 3s infinite 1.5s; right: -2px; top: auto; }
  }
`;

const CodeBlockContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 480px;
  background: ${props => props.theme.card};
  border: 1px solid ${props => props.theme.border};
  border-radius: 14px;
  padding: 20px 24px;
  box-shadow: 0 12px 40px ${props => props.theme.shadow};
  font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
  margin-top: 16px;
  z-index: 10;

  @media (min-width: 768px) {
    margin-top: 140px;
    width: 76%;
  }
`;

const StandaloneCodeIcon = styled.div`
  position: absolute;
  top: -14px;
  right: -14px;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: ${props => props.theme.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  box-shadow: 0 4px 16px ${props => props.theme.glow};
  z-index: 999;
`;

const CodeSnippet = styled.div`
  font-size: 0.78rem;
  line-height: 1.6;
`;

const CodeLine = styled.div`
  white-space: pre;
  color: ${props => props.theme.textSecondary};
  overflow: hidden;
  width: 0;
  animation: ${props => props.$visible ? typingAnim : 'none'} 0.8s forwards;

  @media (max-width: 576px) { font-size: 0.65rem; }

  &:nth-child(1)  { animation-delay: ${props => props.$visible ? '0.1s'  : '0s'}; }
  &:nth-child(2)  { animation-delay: ${props => props.$visible ? '0.55s' : '0s'}; }
  &:nth-child(3)  { animation-delay: ${props => props.$visible ? '1.0s'  : '0s'}; }
  &:nth-child(4)  { animation-delay: ${props => props.$visible ? '1.45s' : '0s'}; }
  &:nth-child(5)  { animation-delay: ${props => props.$visible ? '1.9s'  : '0s'}; }
  &:nth-child(6)  { animation-delay: ${props => props.$visible ? '2.35s' : '0s'}; }
  &:nth-child(7)  { animation-delay: ${props => props.$visible ? '2.8s'  : '0s'}; }
  &:nth-child(8)  { animation-delay: ${props => props.$visible ? '3.25s' : '0s'}; }
  &:nth-child(9)  { animation-delay: ${props => props.$visible ? '3.7s'  : '0s'}; }
  &:nth-child(10) { animation-delay: ${props => props.$visible ? '4.15s' : '0s'}; }
  &:nth-child(11) { animation-delay: ${props => props.$visible ? '4.6s'  : '0s'}; }
  &:nth-child(12) { animation-delay: ${props => props.$visible ? '5.05s' : '0s'}; }
`;

/* ─── Skills ─────────────────────────────────────────────────────────────────── */

const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
  max-width: 1000px;
  margin: 0 auto;
`;

const SkillCategory = styled.div`
  background: ${props => props.theme.card};
  border: 1px solid ${props => props.theme.border};
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 24px ${props => props.theme.shadow};
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.4s ease, border-color 0.3s ease;

  &.animate {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    box-shadow: 0 12px 40px ${props => props.theme.shadowHover};
    border-color: ${props => props.theme.borderStrong};
    transform: translateY(-6px);
  }
`;

const SkillCategoryTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${props => props.theme.primary};
  margin: 0 0 16px;
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const SkillItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 100px;
  border: 1px solid ${props => props.theme.border};
  background: ${props => props.theme.cardBackground};
  color: ${props => props.theme.textSecondary};
  font-size: 0.82rem;
  font-weight: 500;
  cursor: default;
  transition: all 0.25s ease;

  svg {
    color: ${props => props.theme.primary};
    font-size: 0.95rem;
    flex-shrink: 0;
  }

  &:hover {
    border-color: ${props => props.theme.primary};
    background: ${props => props.theme.glow};
    color: ${props => props.theme.text};
    box-shadow: 0 4px 16px ${props => props.theme.glow};
    transform: translateY(-2px);
  }
`;

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
