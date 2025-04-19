import React, { useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaGithub, FaLinkedin, FaArrowDown, FaServer, FaDatabase, FaCode, FaJsSquare, FaJava, FaHtml5, FaCss3Alt, FaGitAlt, FaDocker, FaPython, FaReact } from 'react-icons/fa';
import { SiTypescript, SiNodedotjs, SiMysql, SiYarn, SiSpringboot } from 'react-icons/si';
import { TbBrandCSharp } from "react-icons/tb";
import { DiMsqlServer } from "react-icons/di";
import { PiFileJsxDuotone } from "react-icons/pi";
import { RiTailwindCssFill } from "react-icons/ri";
// Import project images
import helpdesk from '../assets/images/helpdesk.png'
import kingdomino from '../assets/images/kingdomino.jpg';
import kottask from '../assets/images/kottask.png';
import dashboard from '../assets/images/dashboard.png';

// You'll need to add a video to your assets folder
// Example path: '../assets/videos/code-background.mp4'
const videoPlaceholder = "#"; // Replace with actual video path when you have one

const HomePage = () => {
  const serverRef = useRef(null);
  const databaseRef = useRef(null);
  const codeBlockRef = useRef(null);

  // Animation for server-client communication simulation
  useEffect(() => {
    const interval = setInterval(() => {
      if (serverRef.current) {
        serverRef.current.classList.add('pulse');
        setTimeout(() => {
          serverRef.current?.classList.remove('pulse');
        }, 1000);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  
  // Handle smooth scrolling for the Learn More button
  const handleLearnMoreClick = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop, // Scroll so About Me is at the top
        behavior: 'smooth'
      });
    }
  };

  return (
    <HomeContainer>
      <BackgroundVideo autoPlay muted loop>
        <source src={videoPlaceholder} type="video/mp4" />
      </BackgroundVideo>
      <BackgroundOverlay />

      <HeroSection>
        <HeroContent>
          <TypewriterContainer>
            <h1>Hello, I'm <HighlightSpan>Alexandru Poenaru</HighlightSpan></h1>
            <TypewriterText>Student</TypewriterText>
          </TypewriterContainer>
          <AnimatedDescription>
            I'm a Applied Computer Science student with a passion for web and especially backend development. I specialize in creating efficient and scalable server-side applications.
          </AnimatedDescription>
          <SocialLinks>
            <SocialLink href="https://github.com/alexandru-poenaru" target="_blank" rel="noopener noreferrer">
              <FaGithub /> GitHub
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/in/alexandru-poenaru/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin /> LinkedIn
            </SocialLink>
          </SocialLinks>
          <ScrollDownButton href="#about" onClick={handleLearnMoreClick}>
            <FaArrowDown /> Learn More
          </ScrollDownButton>
        </HeroContent>
      </HeroSection>

      <Section id="about">
        <SectionTitle>About Me</SectionTitle>
        <AboutContent>
          <p>
          Hi! I’m Alex, an enthusiastic IT student with a passion for web and backend development. 
          I’ve been fascinated by code since I was 12, amazed by how just the right characters in the right order can create something truly special. 
          That early curiosity turned into a love for logic, problem-solving, and building things that actually work.
          </p>
          <p>
          I enjoy working on API development, scalable architecture, real-time data, and everything that makes development more efficient, elegant, or clever.
          I’m always experimenting, learning fast, and looking for challenges that push me to grow.
          </p>
          <p>
          Open to opportunities where I can keep learning, building cool stuff,
          and collaborate with people who love tech as much as I do.
          </p>
        </AboutContent>
        
        {/* Backend Developer Animation */}
        <BackendVisualization>
          <ServerContainer ref={serverRef}>
            <ServerIcon>
              <FaServer />
            </ServerIcon>
            <ServerLabel>Server</ServerLabel>
          </ServerContainer>
          
          <ConnectionLine>
            <DataDot className="dot1" />
            <DataDot className="dot2" />
            <DataDot className="dot3" />
          </ConnectionLine>
          
          <DatabaseContainer ref={databaseRef}>
            <DatabaseIcon>
              <FaDatabase />
            </DatabaseIcon>
            <DatabaseLabel>Database</DatabaseLabel>
          </DatabaseContainer>
          
          <CodeBlockContainer ref={codeBlockRef}>
            <StandaloneCodeIcon>
              <FaCode />
            </StandaloneCodeIcon>
            <CodeSnippet>
            <CodeLine>export default function Data() &#123;</CodeLine>
            <CodeLine>  const &#123; data, err, isL &#125; </CodeLine>
            <CodeLine>    = useSWR('/api/data', fetcher);</CodeLine>
            <CodeLine>  if (isL) return &lt;p&gt;Loading...&lt;/p&gt;;</CodeLine>
            <CodeLine>  if (err) return &lt;p&gt;Error fetching data&lt;/p&gt;;</CodeLine>
            <CodeLine></CodeLine>
            <CodeLine>  return (</CodeLine>
            <CodeLine>   &lt;div&gt;</CodeLine>
            <CodeLine>    &lt;h2&gt;Data&lt;/h2&gt;</CodeLine>
            <CodeLine>    &lt;pre&gt;&#123;JSON.stringify(data, null, 2)&#125;&lt;/pre&gt;</CodeLine>
            <CodeLine>   &lt;/div&gt;</CodeLine>
            <CodeLine>  );</CodeLine>
            <CodeLine>&#125;</CodeLine>
            </CodeSnippet>
          </CodeBlockContainer>
        </BackendVisualization>
      </Section>

      <Section id="skills">
        <SectionTitle>Technical Skills</SectionTitle>
        <SkillsContainer>
          <SkillCategory>
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
          
          <SkillCategory>
            <SkillCategoryTitle>Frameworks & Libraries</SkillCategoryTitle>
            <SkillsList>
              <SkillItem><SiNodedotjs /> Node.js</SkillItem>
              <SkillItem><SiSpringboot /> Spring Boot</SkillItem>
              <SkillItem><FaReact /> React</SkillItem>
              <SkillItem><PiFileJsxDuotone /> JSX</SkillItem>
              <SkillItem><RiTailwindCssFill /> Tailwind CSS</SkillItem>
            </SkillsList>
          </SkillCategory>
          
          <SkillCategory>
            <SkillCategoryTitle>Databases</SkillCategoryTitle>
            <SkillsList>
              <SkillItem><SiMysql /> MySQL</SkillItem>
              <SkillItem><DiMsqlServer /> MS SQL Server</SkillItem>
            </SkillsList>
          </SkillCategory>
          
          <SkillCategory>
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
          <ProjectCard>
            <ProjectImage src={helpdesk} alt="Helpdesk Project" />
            <ProjectContent>
              <ProjectDescription>
                A ticket system for for the helpdesk of my internship company in 2023 written in C#. 
              </ProjectDescription>
              <ProjectButton href="https://github.com/alexandru-poenaru/helpdesk-sintandries" target="_blank" rel="noopener noreferrer">
                GitHub Repo
              </ProjectButton>
            </ProjectContent>
          </ProjectCard>
          
          <ProjectCard>
            <ProjectImage src={kingdomino} alt="Kingdomino Project" />
            <ProjectContent>
              <ProjectDescription>
                The game KingDomino that can be played by 2-4 players written in Java.
              </ProjectDescription>
              <ProjectButton href="https://github.com/alexandru-poenaru/kingdomino" target="_blank" rel="noopener noreferrer">
                GitHub Repo
              </ProjectButton>
            </ProjectContent>
          </ProjectCard>
          
          <ProjectCard>
            <ProjectImage src={kottask} alt="KotTask Project" />
            <ProjectContent>
              <ProjectDescription>
                A TODO-app with an integrated calendar in which you can assign tasks to yourself and other people. Written with React, Node.js, TypeScript and JSX.
              </ProjectDescription>
              <ProjectButton href="https://github.com/alexandru-poenaru/kottask" target="_blank" rel="noopener noreferrer">
                GitHub Repo
              </ProjectButton>
            </ProjectContent>
          </ProjectCard>
          
          <ProjectCard>
            <ProjectImage src={dashboard} alt="Dashboard Project" />
            <ProjectContent>
              <ProjectDescription>
                An app for the production of a company, with a KPI Dashboard, Overview maintenances, machines, ... Written in React, Node.js, TypeScript and JSX + Java (WIP).
              </ProjectDescription>
              <ProjectButton href="https://github.com/alexandru-poenaru" target="_blank" rel="noopener noreferrer" style={{pointerEvents: 'none'}}>
                WIP
              </ProjectButton>
            </ProjectContent>
          </ProjectCard>
        </ProjectsGrid>
      </Section>
    </HomeContainer>
  );
};

// Full-screen video background
const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  object-fit: cover;
  z-index: -2;
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(
    to bottom,
    ${props => props.theme.background}99,
    ${props => props.theme.background}
  );
  z-index: -1;
`;

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const typewriter = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const cursorBlink = keyframes`
  from, to { border-color: transparent; }
  50% { border-color: ${props => props.theme.primary}; }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulseAnimation = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(0, 120, 255, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(0, 120, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 120, 255, 0); }
`;

const serverPulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Create a data flow animation for the dots with correct positioning
const dotAnimation1 = keyframes`
  0% { left: 5%; opacity: 0; }
  10% { left: 10%; opacity: 1; }
  90% { left: 90%; opacity: 1; }
  100% { left: 95%; opacity: 0; }
`;

const dotAnimation2 = keyframes`
  0% { left: 5%; opacity: 0; }
  10% { left: 10%; opacity: 1; }
  90% { left: 90%; opacity: 1; }
  100% { left: 95%; opacity: 0; }
`;

const dotAnimation3 = keyframes`
  0% { left: 5%; opacity: 0; }
  10% { left: 10%; opacity: 1; }
  90% { left: 90%; opacity: 1; }
  100% { left: 95%; opacity: 0; }
`;

// Create vertical animation for dots on mobile
const mobileDotAnimation1 = keyframes`
  0% { top: 5%; opacity: 0; }
  10% { top: 10%; opacity: 1; }
  90% { top: 90%; opacity: 1; }
  100% { top: 95%; opacity: 0; }
`;

const mobileDotAnimation2 = keyframes`
  0% { top: 5%; opacity: 0; }
  10% { top: 10%; opacity: 1; }
  90% { top: 90%; opacity: 1; }
  100% { top: 95%; opacity: 0; }
`;

const mobileDotAnimation3 = keyframes`
  0% { top: 5%; opacity: 0; }
  10% { top: 10%; opacity: 1; }
  90% { top: 90%; opacity: 1; }
  100% { top: 95%; opacity: 0; }
`;

const HomeContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
`;

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const HeroContent = styled.div`
  text-align: center;
  z-index: 2;
  animation: ${fadeIn} 1s ease-out;
  
  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: ${props => props.theme.text};
  }
`;

const TypewriterContainer = styled.div`
  overflow: hidden;
  margin-bottom: 1rem;
`;

const TypewriterText = styled.h2`
  font-size: 2rem;
  margin: 0;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  border-right: 3px solid ${props => props.theme.primary};
  color: ${props => props.theme.text};
  animation: ${typewriter} 2s steps(20, end) 0.5s forwards, 
             ${cursorBlink} 1s step-end infinite;
  width: 0;
`;

const HighlightSpan = styled.span`
  color: ${props => props.theme.primary};
`;

const AnimatedDescription = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto 2rem;
  color: ${props => props.theme.textSecondary};
  opacity: 0;
  animation: ${fadeIn} 1s ease-out 2s forwards;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  gap: 1rem;
  opacity: 0;
  animation: ${fadeIn} 1s ease-out 2.5s forwards;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: ${props => props.theme.card};
  color: ${props => props.theme.text};
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s;
  box-shadow: 0 2px 10px ${props => props.theme.shadow};
  
  svg {
    margin-right: 8px;
  }
  
  &:hover {
    background-color: ${props => props.theme.primary};
    color: white;
    transform: translateY(-3px);
  }
`;

const ScrollDownButton = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: transparent;
  color: ${props => props.theme.primary};
  border: 1px solid ${props => props.theme.primary};
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s;
  opacity: 0;
  animation: ${fadeIn} 1s ease-out 3s forwards, ${floatAnimation} 3s ease-in-out infinite 3s;
  
  svg {
    margin-right: 8px;
  }
  
  &:hover {
    background-color: ${props => props.theme.primary};
    color: white;
  }
`;

const Section = styled.section`
  padding: 80px 0;
  position: relative;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 40px;
  position: relative;
  color: ${props => props.theme.text};
  
  &:after {
    content: '';
    position: absolute;
    width: 80px;
    height: 3px;
    background-color: ${props => props.theme.primary};
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const AboutContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  
  p {
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    line-height: 1.6;
    color: ${props => props.theme.textSecondary};
  }
`;

// Backend visualization components
const BackendVisualization = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  position: relative;
  min-height: 400px;
  
  @media (max-width: 768px) {
    min-height: 500px;
    justify-content: space-between;
    gap: 10px;
  }
`;

const ServerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  
  &.pulse {
    animation: ${serverPulseAnimation} 1s ease;
  }
  
  @media (min-width: 768px) {
    position: absolute;
    left: 15%;
    top: 20px;
  }
`;

const ServerIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  background: linear-gradient(135deg, #0078FF, #00C6FF);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  box-shadow: 0 10px 20px rgba(0, 120, 255, 0.3);
  animation: ${pulseAnimation} 3s infinite;
  margin-bottom: 10px;
  transition: all 0.3s;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ServerLabel = styled.div`
  font-weight: 500;
  color: ${props => props.theme.text};
`;

const DatabaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  
  @media (min-width: 768px) {
    position: absolute;
    right: 15%;
    top: 20px;
  }
`;

const DatabaseIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  background: linear-gradient(135deg, #FF7200, #FF4B00);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  box-shadow: 0 10px 20px rgba(255, 114, 0, 0.3);
  margin-bottom: 10px;
  transition: all 0.3s;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const DatabaseLabel = styled.div`
  font-weight: 500;
  color: ${props => props.theme.text};
`;

const ConnectionLine = styled.div`
  position: relative;
  width: 60%;
  height: 3px;
  background: linear-gradient(to right, #0078FF, #FF7200);
  margin: 10px 0;
  z-index: 5;
  overflow: visible;
  
  @media (min-width: 768px) {
    position: absolute;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
    margin: 0;
    width: 56%;
  }
  
  @media (max-width: 768px) {
    width: 3px;
    height: 80px;
    background: linear-gradient(to bottom, #0078FF, #FF7200);
    margin: 5px auto;
  }
`;

const DataDot = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: white;
  border-radius: 50%;
  top: -1px;
  left: 0;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 15px rgba(255, 255, 255, 0.4);
  z-index: 20;
  
  &.dot1 {
    animation: ${dotAnimation1} 3s infinite;
    animation-delay: 0s;
    
    @media (max-width: 768px) {
      animation: ${mobileDotAnimation1} 3s infinite;
      animation-delay: 0s;
      left: -2px;
    }
  }
  
  &.dot2 {
    animation: ${dotAnimation2} 3s infinite;
    animation-delay: 1s;
    
    @media (max-width: 768px) {
      animation: ${mobileDotAnimation2} 3s infinite;
      animation-delay: 1s;
      left: -2px;
    }
  }
  
  &.dot3 {
    animation: ${dotAnimation3} 3s infinite;
    animation-delay: 2s;
    
    @media (max-width: 768px) {
      animation: ${mobileDotAnimation3} 3s infinite;
      animation-delay: 2s;
      left: -2px;
    }
  }
`;

const CodeBlockContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  background-color: ${props => props.theme.card};
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 10px 30px ${props => props.theme.shadow};
  font-family: 'Courier New', monospace;
  overflow: visible;
  margin-top: 20px;
  z-index: 10;
  
  @media (min-width: 768px) {
    margin-top: 150px;
    width: 80%;
  }
`;

const StandaloneCodeIcon = styled.div`
  position: absolute;
  top: -15px;
  right: -15px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.theme.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
  z-index: 999;
  transform: translateZ(0);
  
  @media (max-width: 768px) {
    top: -15px;
    right: -15px;
  }
`;

const CodeSnippet = styled.div`
  font-size: 0.8rem;
  line-height: 1.5;
  color: ${props => props.theme.text};
`;

const CodeLine = styled.div`
  white-space: pre;
  color: ${props => props.theme.textSecondary};
  opacity: 0;
  animation: ${fadeIn} 0.5s forwards;
  
  &:nth-child(1) { animation-delay: 0.1s; }
  &:nth-child(2) { animation-delay: 0.2s; }
  &:nth-child(3) { animation-delay: 0.3s; }
  &:nth-child(4) { animation-delay: 0.4s; }
  &:nth-child(5) { animation-delay: 0.5s; }
  &:nth-child(6) { animation-delay: 0.6s; }
  &:nth-child(7) { animation-delay: 0.7s; }
  &:nth-child(8) { animation-delay: 0.8s; }
  &:nth-child(9) { animation-delay: 0.9s; }
  &:nth-child(10) { animation-delay: 1s; }
`;

const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1000px;
  margin: 0 auto;
`;

const SkillCategory = styled.div`
  background-color: ${props => props.theme.card};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 5px 15px ${props => props.theme.shadow};
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px ${props => props.theme.shadowHover};
  }
`;

const SkillCategoryTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: ${props => props.theme.primary};
`;

const SkillsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const SkillItem = styled.li`
  padding: 8px 0;
  border-bottom: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.textSecondary};
  display: flex;
  align-items: center;
  gap: 10px;
  
  svg {
    color: ${props => props.theme.primary};
    font-size: 1.2rem;
  }
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (min-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ProjectCard = styled.div`
  background-color: ${props => props.theme.card};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px ${props => props.theme.shadow};
  transition: transform 0.3s, box-shadow 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px ${props => props.theme.shadowHover};
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 240px;
  object-fit: contain;
  background-color: ${props => props.theme.cardBackground || '#f5f5f5'};
  padding: 15px;
  margin-bottom: 0;
`;

const ProjectContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.textSecondary};
  margin-bottom: 20px;
`;

const ProjectButton = styled.a`
  display: inline-block;
  padding: 10px 20px;
  background-color: ${props => props.theme.primary};
  color: white;
  text-decoration: none;
  border-radius: 4px;
  text-align: center;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: ${props => props.theme.primaryHover};
  }
`;

export default HomePage;