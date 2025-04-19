import React, { useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FaDownload, FaGraduationCap, FaBriefcase, FaCode } from 'react-icons/fa';
import resumePdf from '../assets/pdf/CV_Alexandru_Poenaru.pdf';

const ResumePage = () => {
  // Add animation for each timeline item when it comes into view
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, { threshold: 0.2 });
    
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      elements.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);
  
  return (
    <ResumeContainer>
      <PageTitle>My Resume</PageTitle>
      
      <DownloadButtonContainer>
        <DownloadButton href={resumePdf} target="_blank" rel="noopener noreferrer" download="CV_Alexandru_Poenaru.pdf">
          <FaDownload /> Download CV
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
              <TimelineDate>July 2024</TimelineDate>
              <TimelineContent>
                <h3>Student Worker</h3>
                <h4>INJEXTRU Tielt</h4>
                <ul>
                  <li>Responsible for production and packaging of products from multiple machines</li>
                  <li>Handled large plastic parts (swimming pool shutters)</li>
                </ul>
              </TimelineContent>
            </TimelineItem>
            
            <TimelineItem className="animate-on-scroll">
              <TimelineDate>August 2024</TimelineDate>
              <TimelineContent>
                <h3>Student Worker</h3>
                <h4>SOVAPLASTICS Tielt</h4>
                <ul>
                  <li>Responsible for production and packaging of products from multiple machines</li>
                  <li>Handled small plastic parts (caps, baskets, etc.)</li>
                </ul>
              </TimelineContent>
            </TimelineItem>
            
            <TimelineItem className="animate-on-scroll">
              <TimelineDate>July 2023 - August 2023</TimelineDate>
              <TimelineContent>
                <h3>IT Helpdesk Intern</h3>
                <h4>Sint-Andriesziekenhuis Tielt</h4>
                <ul>
                  <li>Assisted doctors with technical computer-related issues</li>
                  <li>Installed computers in the workplace</li>
                </ul>
              </TimelineContent>
            </TimelineItem>
            
            <TimelineItem className="animate-on-scroll">
              <TimelineDate>September 2019 - Present (weekends)</TimelineDate>
              <TimelineContent>
                <h3>Student Worker</h3>
                <h4>Groot Ambachtelijke Bakkerij Ranson-Cannière Tielt</h4>
                <ul>
                  <li>Preparing and packaging (fruit) cakes</li>
                  <li>Preparing bread, cakes, and pastries for orders</li>
                </ul>
              </TimelineContent>
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
              <TimelineDate>2023 - 2026</TimelineDate>
              <TimelineContent>
                <h3>Bachelor of Applied Information Technology</h3>
                <h4>HOGENT University of Applied Sciences and Arts, Ghent</h4>
                <p>Specialization in Web Development</p>
              </TimelineContent>
            </TimelineItem>
            
            <TimelineItem className="animate-on-scroll">
              <TimelineDate>2017 - 2023</TimelineDate>
              <TimelineContent>
                <h3>Secondary School Degree</h3>
                <h4>Regina Pacis, Tielt</h4>
                <p>Diploma in IT Management (Informaticabeheer)</p>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </ResumeSection>
        
        <ResumeSection>
          <SectionHeader>
            <SectionIcon><FaCode /></SectionIcon>
            <SectionTitle>Technical Skills</SectionTitle>
          </SectionHeader>
          
          <SkillsGrid>
            <SkillCategory className="animate-on-scroll">
              <h3>Languages</h3>
              <SkillList>
                <SkillItem>
                  <SkillName>JavaScript</SkillName>
                  <SkillBar>
                    <SkillProgress width={75} />
                  </SkillBar>
                </SkillItem>
                <SkillItem>
                  <SkillName>TypeScript</SkillName>
                  <SkillBar>
                    <SkillProgress width={70} />
                  </SkillBar>
                </SkillItem>
                <SkillItem>
                  <SkillName>Python</SkillName>
                  <SkillBar>
                    <SkillProgress width={50} />
                  </SkillBar>
                </SkillItem>
                <SkillItem>
                  <SkillName>Java</SkillName>
                  <SkillBar>
                    <SkillProgress width={70} />
                  </SkillBar>
                </SkillItem>
                <SkillItem>
                  <SkillName>C#</SkillName>
                  <SkillBar>
                    <SkillProgress width={20} />
                  </SkillBar>
                </SkillItem>
                <SkillItem>
                  <SkillName>HTML</SkillName>
                  <SkillBar>
                    <SkillProgress width={70} />
                  </SkillBar>
                </SkillItem>
                <SkillItem>
                  <SkillName>CSS</SkillName>
                  <SkillBar>
                    <SkillProgress width={60} />
                  </SkillBar>
                </SkillItem>
              </SkillList>
            </SkillCategory>
            
            <SkillCategory className="animate-on-scroll">
              <h3>Frameworks & Libraries</h3>
              <SkillList>
                <SkillItem>
                  <SkillName>Node.js</SkillName>
                  <SkillBar>
                    <SkillProgress width={70} />
                  </SkillBar>
                </SkillItem>
                <SkillItem>
                  <SkillName>Spring Boot</SkillName>
                  <SkillBar>
                    <SkillProgress width={45} />
                  </SkillBar>
                </SkillItem>
                <SkillItem>
                  <SkillName>React</SkillName>
                  <SkillBar>
                    <SkillProgress width={60} />
                  </SkillBar>
                </SkillItem>
                <SkillItem>
                  <SkillName>JSX</SkillName>
                  <SkillBar>
                    <SkillProgress width={60} />
                  </SkillBar>
                </SkillItem>
                <SkillItem>
                  <SkillName>Tailwind CSS</SkillName>
                  <SkillBar>
                    <SkillProgress width={70} />
                  </SkillBar>
                </SkillItem>
              </SkillList>
            </SkillCategory>
            
            <SkillCategory className="animate-on-scroll">
              <h3>Databases</h3>
              <SkillList>
                <SkillItem>
                  <SkillName>MySQL</SkillName>
                  <SkillBar>
                    <SkillProgress width={70} />
                  </SkillBar>
                </SkillItem>
                <SkillItem>
                  <SkillName>MS SQL Server</SkillName>
                  <SkillBar>
                    <SkillProgress width={60} />
                  </SkillBar>
                </SkillItem>
              </SkillList>
            </SkillCategory>
            
            <SkillCategory className="animate-on-scroll">
              <h3>DevOps & Tools</h3>
              <SkillList>
                <SkillItem>
                  <SkillName>Git</SkillName>
                  <SkillBar>
                    <SkillProgress width={75} />
                  </SkillBar>
                </SkillItem>
                <SkillItem>
                  <SkillName>Docker</SkillName>
                  <SkillBar>
                    <SkillProgress width={35} />
                  </SkillBar>
                </SkillItem>
                <SkillItem>
                  <SkillName>Yarn</SkillName>
                  <SkillBar>
                    <SkillProgress width={70} />
                  </SkillBar>
                </SkillItem>
              </SkillList>
            </SkillCategory>
          </SkillsGrid>
        </ResumeSection>
      </ResumeContent>
    </ResumeContainer>
  );
};

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const matrix = keyframes`
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 100%;
  }
`;

const typewriter = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const cursorBlink = keyframes`
  from, to { border-color: transparent; }
  50% { border-color: ${props => props.theme.primary}; }
`;

const dataFlow = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const ResumeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 20px;
  color: ${props => props.theme.text};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 100px;
    height: 3px;
    background-color: ${props => props.theme.primary};
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const DownloadButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0;
`;

const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 12px 30px;
  background-color: ${props => props.theme.primary};
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
  transition: all 0.3s;
  box-shadow: 0 4px 12px ${props => props.theme.shadow};
  
  svg {
    margin-right: 8px;
  }
  
  &:hover {
    background-color: ${props => props.theme.primaryDark};
    transform: translateY(-3px);
    box-shadow: 0 8px 16px ${props => props.theme.shadow};
  }
`;

const ResumeContent = styled.div`
  background-color: ${props => props.theme.card};
  border-radius: 8px;
  box-shadow: 0 5px 25px ${props => props.theme.shadow};
  padding: 40px;
  margin-top: 40px;
`;

const ResumeSection = styled.section`
  margin-bottom: 60px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  border-bottom: 1px solid ${props => props.theme.border};
  padding-bottom: 15px;
`;

const SectionIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${props => props.theme.primary};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-size: 1.2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: ${props => props.theme.text};
  margin: 0;
`;

const Timeline = styled.div`
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    left: 10px;
    top: 0;
    height: 100%;
    width: 2px;
    background-color: ${props => props.theme.timeline};
    
    @media (min-width: 768px) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 40px;
  padding-left: 45px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
  
  &.animate {
    opacity: 1;
    transform: translateY(0);
  }
  
  @media (min-width: 768px) {
    padding-left: 0;
    
    &:nth-child(even) {
      margin-left: 50%;
      padding-left: 45px;
      
      &:before {
        left: 0;
      }
    }
    
    &:nth-child(odd) {
      margin-right: 50%;
      padding-right: 45px;
      text-align: right;
      
      &:before {
        right: 0;
      }
    }
  }
  
  &:before {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.theme.primary};
    top: 10px;
    left: 0;
    z-index: 2;
    
    @media (min-width: 768px) {
      left: auto;
      
      &:nth-child(odd):before {
        left: auto;
        right: 0;
      }
    }
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const TimelineDate = styled.div`
  font-weight: bold;
  color: ${props => props.theme.primary};
  margin-bottom: 10px;
  font-size: 1.1rem;
`;

const TimelineContent = styled.div`
  background-color: ${props => props.theme.cardBackground};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 3px 10px ${props => props.theme.shadow};
  
  h3 {
    margin-top: 0;
    color: ${props => props.theme.text};
  }
  
  h4 {
    color: ${props => props.theme.textSecondary};
    font-weight: normal;
    margin-bottom: 15px;
  }
  
  ul {
    margin: 15px 0 0;
    padding-left: 20px;
    
    li {
      margin-bottom: 8px;
      color: ${props => props.theme.textSecondary};
    }
  }
  
  p {
    color: ${props => props.theme.textSecondary};
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const SkillCategory = styled.div`
  margin-bottom: 30px;
  background-color: ${props => props.theme.cardBackground};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 3px 10px ${props => props.theme.shadow};
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
  
  &.animate {
    opacity: 1;
    transform: translateY(0);
  }
  
  &:hover {
    box-shadow: 0 8px 20px ${props => props.theme.shadowHover};
    transform: translateY(-5px);
  }
  
  h3 {
    margin-top: 0;
    margin-bottom: 20px;
    color: ${props => props.theme.text};
    font-size: 1.3rem;
  }
`;

const SkillList = styled.div``;

const SkillItem = styled.div`
  margin-bottom: 15px;
`;

const SkillName = styled.div`
  margin-bottom: 8px;
  font-weight: 500;
  color: ${props => props.theme.textSecondary};
`;

const SkillBar = styled.div`
  height: 8px;
  background-color: ${props => props.theme.background};
  border-radius: 4px;
  overflow: hidden;
`;

const SkillProgress = styled.div`
  height: 100%;
  background: linear-gradient(90deg, ${props => props.theme.primary}, ${props => props.theme.primaryDark});
  width: ${props => props.width}%;
  border-radius: 4px;
  background-size: 200% 200%;
  animation: ${dataFlow} 3s linear infinite;
`;

const CodeAnimation = styled.div`
  margin-top: 50px;
  padding: 30px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const MatrixBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, ${props => props.theme.background} 25%, ${props => props.theme.cardBackground} 25%, ${props => props.theme.cardBackground} 50%, ${props => props.theme.background} 50%, ${props => props.theme.background} 75%, ${props => props.theme.cardBackground} 75%, ${props => props.theme.cardBackground});
  background-size: 10px 10px;
  opacity: 0.2;
  animation: ${matrix} 20s linear infinite;
  z-index: 1;
`;

const AnimatedCode = styled.div`
  font-family: 'Courier New', monospace;
  color: ${props => props.theme.text};
  font-size: 1.1rem;
  z-index: 2;
  width: 100%;
  max-width: 500px;
`;

const CodeLine = styled.div`
  white-space: pre;
  overflow: hidden;
  border-right: 3px solid ${props => props.theme.primary};
  animation: ${typewriter} 1s steps(40) ${props => props.delay}s forwards,
             ${cursorBlink} 0.75s step-end infinite;
  width: 0;
  margin-bottom: 8px;
  color: ${props => props.theme.primary};
`;

export default ResumePage;