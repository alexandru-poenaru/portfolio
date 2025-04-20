import React, { useRef, useEffect, useState } from 'react';
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
import alex from '../assets/images/alex.jpg';

const HomePage = () => {
  const serverRef = useRef(null);
  const databaseRef = useRef(null);
  const codeBlockRef = useRef(null);
  const [codeVisible, setCodeVisible] = useState(false);

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
      const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: offsetTop, // Scroll precisely to the About Me section
        behavior: 'smooth'
      });
    }
  };

  // Set up intersection observer for code block
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCodeVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 } // Trigger when 30% of the element is visible
    );
    
    // Store the ref value in a variable inside the effect
    const currentCodeBlockRef = codeBlockRef.current;
    
    if (currentCodeBlockRef) {
      observer.observe(currentCodeBlockRef);
    }
    
    return () => {
      if (currentCodeBlockRef) {
        observer.unobserve(currentCodeBlockRef);
      }
    };
  }, []);

  return (
    <>
      <FullWidthHeroContainer>
        <HeroSection>
          <video 
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 1,
              filter: 'brightness(0.5)',
            }} 
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src={require('../assets/videos/background-video.mp4')} type="video/mp4" />
          </video>
          <BackgroundOverlay />
          <HeroContent>
            <TypewriterContainer>
              <h1>Hello, I'm <HighlightSpan>Alexandru Poenaru</HighlightSpan></h1>
              <TypewriterText>Student IT-Dev@HOGENT</TypewriterText>
            </TypewriterContainer>
            <AnimatedDescription>
              I'm an Applied Information of Technology student with a passion for web- and especially back-end development. I specialize in creating efficient and scalable server-side applications.
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
        <BlurryBarrier />
      </FullWidthHeroContainer>

      <HomeContainer>
        <Section id="about">
          <SectionTitle>About Me</SectionTitle>
          <AboutContent>
            <ProfileImageContainer>
              <ProfileImage src={alex} alt="Alexandru Poenaru"/>
            </ProfileImageContainer>
            <AboutTextContent>
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
            </AboutTextContent>
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
              {/* Original dots: Server to Database */}
              <DataDot className="dot1" />
              <DataDot className="dot2" />
              
              {/* New dots: Database to Server */}
              <DataDot className="reverse-dot1" />
              <DataDot className="reverse-dot2" />
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
              <CodeLine visible={codeVisible}>export default function Data() &#123;</CodeLine>
              <CodeLine visible={codeVisible}>  const &#123; data, error, isLoading &#125; </CodeLine>
              <CodeLine visible={codeVisible}>    = useSWR('/api/data', fetcher);</CodeLine>
              <CodeLine visible={codeVisible}>  if (isLoading) return &lt;p&gt;Loading...&lt;/p&gt;;</CodeLine>
              <CodeLine visible={codeVisible}>  if (error) return &lt;p&gt;Error fetching data&lt;/p&gt;;</CodeLine>
              <CodeLine visible={codeVisible}></CodeLine>
              <CodeLine visible={codeVisible}>  return (</CodeLine>
              <CodeLine visible={codeVisible}>   &lt;div&gt;</CodeLine>
              <CodeLine visible={codeVisible}>    &lt;h2&gt;Data&lt;/h2&gt;</CodeLine>
              <CodeLine visible={codeVisible}>    &lt;pre&gt;&#123;JSON.stringify(data, null, 2)&#125;&lt;/pre&gt;</CodeLine>
              <CodeLine visible={codeVisible}>   &lt;/div&gt;</CodeLine>
              <CodeLine visible={codeVisible}>  );</CodeLine>
              <CodeLine visible={codeVisible}>&#125;</CodeLine>
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
                  A TODO-app with an integrated calendar in which you can assign tasks to yourself and other people. Written in React, Node.js, TypeScript and JSX.
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
    </>
  );
};

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

// Add this new typing animation keyframe with the other animations
const typingAnimation = keyframes`
  0% { width: 0; }
  100% { width: 100%; }
`;

// Add new keyframes for reverse direction animations
const reverseDotAnimation1 = keyframes`
  0% { right: 5%; opacity: 0; }
  10% { right: 10%; opacity: 1; }
  90% { right: 90%; opacity: 1; }
  100% { right: 95%; opacity: 0; }
`;

const reverseDotAnimation2 = keyframes`
  0% { right: 5%; opacity: 0; }
  10% { right: 10%; opacity: 1; }
  90% { right: 90%; opacity: 1; }
  100% { right: 95%; opacity: 0; }
`;

// Create vertical reverse animation for dots on mobile
const mobileReverseDotAnimation1 = keyframes`
  0% { bottom: 5%; opacity: 0; }
  10% { bottom: 10%; opacity: 1; }
  90% { bottom: 90%; opacity: 1; }
  100% { bottom: 95%; opacity: 0; }
`;

const mobileReverseDotAnimation2 = keyframes`
  0% { bottom: 5%; opacity: 0; }
  10% { bottom: 10%; opacity: 1; }
  90% { bottom: 90%; opacity: 1; }
  100% { bottom: 95%; opacity: 0; }
`;

const FullWidthHeroContainer = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;
  position: relative;
`;

const HomeContainer = styled.div` 
  width: 100%;
  max-width: 100%;
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
  width: 100%;
  margin: 0;
  padding: 0;
  
  @media (max-width: 768px) {
    align-items: flex-start;
    padding-top: 25vh;
  }
  
  @media (max-width: 480px) {
    padding-top: 20vh;
  }
`;

const HeroContent = styled.div`
  text-align: center;
  z-index: 2;
  animation: ${fadeIn} 1s ease-out;
  margin-top: 0;
  
  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #fff;
  }
  
  @media (max-width: 768px) {
    margin-top: -10vh; /* Position content higher on mobile from the start */
  }
  
  @media (max-width: 480px) {
    margin-top: -15vh; /* Position content even higher on smaller screens from the start */
    
    h1 {
      font-size: 2.5rem;
    }
  }
`;

const TypewriterContainer = styled.div`
  overflow: hidden;
  margin-bottom: 1rem;
  padding: 0 5px;
`;

const TypewriterText = styled.h2`
  font-size: 2rem;
  margin: 0;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  border-right: 3px solid ${props => props.theme.primary};
  color: #fff;
  animation: ${typewriter} 2s steps(20, end) 0.5s forwards, 
             ${cursorBlink} 1s step-end infinite;
  width: 0;
  padding: 0 20px;
  @media (max-width: 576px) {
    font-size: 1.5rem;
  }
`;

const HighlightSpan = styled.span`
  color: ${props => props.theme.primary};
`;

const AnimatedDescription = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto 2rem;
  color: #fff; /* Changed from theme-based to white */
  opacity: 0;
  animation: ${fadeIn} 1s ease-out 2s forwards;
  padding: 0 20px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    gap: 30px;
  }
`;

const AboutTextContent = styled.div`
  p {
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    line-height: 1.6;
    color: ${props => props.theme.textSecondary};
  }
`;

const ProfileImageContainer = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  border: 3px solid #5be584;
  padding: 3px;
  margin-bottom: 20px;
  overflow: hidden;
  
  @media (min-width: 768px) {
    margin-right: 30px;
    margin-bottom: 0;
    flex-shrink: 0;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  background-color: ${props => props.theme.cardBackground || '#f0f0f0'};
`;

// Backend visualization components
const BackendVisualization = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
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
  z-index: 10;
  
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
  background: linear-gradient(135deg, #136f63, #00C6FF);
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
  z-index: 10;
  
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
  background: linear-gradient(to right, #136f63, #FF7200);
  margin: 10px 0;
  z-index: 5;
  overflow: visible;
  
  @media (min-width: 768px) {
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    margin: 0;
    width: 70%;
  }
  
  @media (max-width: 768px) {
    width: 3px;
    height: 120px;
    background: linear-gradient(to bottom, #136f63, #FF7200);
    margin: 0 auto;
  }
`;

const DataDot = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 15px rgba(255, 255, 255, 0.4);
  z-index: 20;
  
  /* Forward direction dots (server to database) */
  &.dot1, &.dot2 {
    top: -1px;
    left: 0;
  }
  
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
  }
  
  /* Reverse direction dots (database to server) */
  &.reverse-dot1, &.reverse-dot2 {
    top: -1px;
    right: 0;
  }
  
  &.reverse-dot1 {
    animation: ${reverseDotAnimation1} 3s infinite;
    animation-delay: 0.5s;
    
    @media (max-width: 768px) {
      animation: ${mobileReverseDotAnimation1} 3s infinite;
      animation-delay: 0.5s;
      right: -2px;
      top: auto;
    }
  }
  
  &.reverse-dot2 {
    animation: ${reverseDotAnimation2} 3s infinite;
    animation-delay: 1.5s;
    
    @media (max-width: 768px) {
      animation: ${mobileReverseDotAnimation2} 3s infinite;
      animation-delay: 1.5s;
      right: -2px;
      top: auto;
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
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const CodeLine = styled.div`
  white-space: pre;
  color: ${props => props.theme.textSecondary};
  overflow: hidden;
  width: 0;
  border-right: 2px solid transparent;
  animation: ${props => props.visible ? typingAnimation : 'none'} 1.8s forwards;
  animation-play-state: ${props => props.visible ? 'running' : 'paused'};
  
  @media (max-width: 576px) {
    font-size: 0.65rem;
  }
  
  &:nth-child(1) { animation-delay: ${props => props.visible ? '0.3s' : '0s'}; }
  &:nth-child(2) { animation-delay: ${props => props.visible ? '1.2s' : '0s'}; }
  &:nth-child(3) { animation-delay: ${props => props.visible ? '2.1s' : '0s'}; }
  &:nth-child(4) { animation-delay: ${props => props.visible ? '3.0s' : '0s'}; }
  &:nth-child(5) { animation-delay: ${props => props.visible ? '3.9s' : '0s'}; }
  &:nth-child(6) { animation-delay: ${props => props.visible ? '4.8s' : '0s'}; }
  &:nth-child(7) { animation-delay: ${props => props.visible ? '5.7s' : '0s'}; }
  &:nth-child(8) { animation-delay: ${props => props.visible ? '6.6s' : '0s'}; }
  &:nth-child(9) { animation-delay: ${props => props.visible ? '7.5s' : '0s'}; }
  &:nth-child(10) { animation-delay: ${props => props.visible ? '8.4s' : '0s'}; }
  &:nth-child(11) { animation-delay: ${props => props.visible ? '9.3s' : '0s'}; }
  &:nth-child(12) { animation-delay: ${props => props.visible ? '10.2s' : '0s'}; }
  &:nth-child(13) { animation-delay: ${props => props.visible ? '11.1s' : '0s'}; }
  
  &:last-child {
    border-right-color: transparent;
  }
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

const BlurryBarrier = styled.div`
  position: absolute;
  bottom: -50px;
  left: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(to bottom, transparent, ${props => props.theme.background});
  backdrop-filter: blur(10px);
  z-index: 5;
`;

export default HomePage;