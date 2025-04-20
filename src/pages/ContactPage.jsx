import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import emailjs from 'emailjs-com';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaServer, FaDatabase, FaLaptop } from 'react-icons/fa';

// Define the fade-in animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  
  // Reset scroll position when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Replace these with your actual EmailJS credentials
      const serviceId = 'service_1avl1t7'; // The ID of the email service you created in EmailJS
      const templateId = 'template_z6mawq9'; // The ID of the email template you created in EmailJS
      const userId = 'chS7dIITr1soaZz_G'; // Your EmailJS user ID (public key)
      
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        userId
      );
      
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Your message has been sent successfully! I will get back to you soon.'
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending email:', error);
      setFormStatus({
        submitted: true,
        success: false,
        message: 'There was an error sending your message. Please try again or contact me directly.'
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <ContactContainer>
      <PageTitle>Get In Touch</PageTitle>
      <ContactContent>
        <ContactInfo>
          <ContactInfoTitle>Contact Information</ContactInfoTitle>
          <ContactInfoText>Feel free to reach out with any questions or opportunities. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.</ContactInfoText>
            <ContactInfoItem>
            <a href="mailto:alexandru.george.poenaru@gmail.com" style={{ textDecoration: 'none' }}>
              <IconWrapper>
                <FaEnvelope />
              </IconWrapper>
            </a>
            <div>
              <ContactInfoLabel>Email</ContactInfoLabel>
              <ContactInfoValue>
                <ContactLink href="mailto:alexandru.george.poenaru@gmail.com">
                  alexandru.george.poenaru@gmail.com
                </ContactLink>
              </ContactInfoValue>
            </div>
          </ContactInfoItem>
            <ContactInfoItem>
            <a href="tel:+32468301411" style={{ textDecoration: 'none' }}>
              <IconWrapper>
                <FaPhone />
              </IconWrapper>
            </a>
            <div>
              <ContactInfoLabel>Phone</ContactInfoLabel>
              <ContactInfoValue>
                <ContactLink href="tel:+32468301411">
                  +32468 30 14 11
                </ContactLink>
              </ContactInfoValue>
            </div>
          </ContactInfoItem>            <ContactInfoItem>
            <a href="https://maps.google.com/?q=Tielt+Belgium" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <IconWrapper>
                <FaMapMarkerAlt />
              </IconWrapper>
            </a>
            <div>
              <ContactInfoLabel>Location</ContactInfoLabel>
              <ContactInfoValue>
                <ContactLink href="https://maps.google.com/?q=Tielt+Belgium" target="_blank" rel="noopener noreferrer">
                  Tielt, Belgium
                </ContactLink>
              </ContactInfoValue>
            </div>
          </ContactInfoItem>
        </ContactInfo>
        
        <ContactFormWrapper>
          <ContactFormTitle>Send Me a Message</ContactFormTitle>
          
          {formStatus.submitted ? (
            <FormStatusMessage success={formStatus.success}>
              {formStatus.message}
            </FormStatusMessage>
          ) : (
            <ContactForm onSubmit={handleSubmit}>
              <FormGroup>
                <FormLabel>Full Name</FormLabel>
                <FormInput 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  placeholder="Your Full Name"
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Email</FormLabel>
                <FormInput 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  placeholder="your@email.com"
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Subject</FormLabel>
                <FormInput 
                  type="text" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  required 
                  placeholder="Subject of your message"
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Message</FormLabel>
                <FormTextarea 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                  placeholder="Your message here..."
                  rows="6"
                />
              </FormGroup>
              
              <SubmitButton type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </SubmitButton>
            </ContactForm>
          )}
        </ContactFormWrapper>
      </ContactContent>

      {/* Backend Animation */}
      <BackendAnimation>
        <AnimationTitle>How Backend Systems Work</AnimationTitle>
        <AnimationContainer>
          <NodeContainer>
            <AppIcon>
              <FaLaptop />
            </AppIcon>
            <NodeLabel>App</NodeLabel>
          </NodeContainer>
          
          <NodeContainer>
            <ServerIcon>
              <FaServer />
            </ServerIcon>
            <NodeLabel>API Server</NodeLabel>
          </NodeContainer>
          
          <NodeContainer>
            <DatabaseIcon>
              <FaDatabase />
            </DatabaseIcon>
            <NodeLabel>Database</NodeLabel>
          </NodeContainer>
          
          <HorizontalLine />
          
          <Dot1 />
          <Dot2 />
          <Dot3 />
          <Dot4 />
        </AnimationContainer>
      </BackendAnimation>
    </ContactContainer>
  );
};

// Animations for the sequence of dots with smooth transitions
const appToServerAnimation = keyframes`
  0% { left: 5%; opacity: 0; }
  2% { left: 5%; opacity: 1; }
  23% { left: 47%; opacity: 1; }
  25% { left: 47%; opacity: 0; }
  26%, 100% { opacity: 0; }
`;

const serverToDatabaseAnimation = keyframes`
  0%, 25% { opacity: 0; }
  27% { left: 53%; opacity: 1; }
  48% { left: 95%; opacity: 1; }
  50% { left: 95%; opacity: 0; }
  51%, 100% { opacity: 0; }
`;

const databaseToServerAnimation = keyframes`
  0%, 50% { opacity: 0; }
  52% { left: 95%; opacity: 1; }
  73% { left: 53%; opacity: 1; }
  75% { left: 53%; opacity: 0; }
  76%, 100% { opacity: 0; }
`;

const serverToAppAnimation = keyframes`
  0%, 75% { opacity: 0; }
  77% { left: 47%; opacity: 1; }
  98% { left: 5%; opacity: 1; }
  100% { left: 5%; opacity: 0; }
`;

// Mobile animations with clean, consistent percentages
const topToMiddleAnimation = keyframes`
  0% { top: 20%; opacity: 0; }
  5% { top: 20%; opacity: 1; }
  20% { top: 45%; opacity: 1; }
  25% { top: 45%; opacity: 0; }
  100% { top: 20%; opacity: 0; }
`;

const middleToBottomAnimation = keyframes`
  0% { top: 45%; opacity: 0; }
  30% { top: 45%; opacity: 1; }
  45% { top: 70%; opacity: 1; }
  50% { top: 70%; opacity: 0; }
  100% { top: 45%; opacity: 0; }
`;

const bottomToMiddleAnimation = keyframes`
  0% { top: 70%; opacity: 0; }
  55% { top: 70%; opacity: 1; }
  70% { top: 45%; opacity: 1; }
  75% { top: 45%; opacity: 0; }
  100% { top: 70%; opacity: 0; }
`;

const middleToTopAnimation = keyframes`
  0% { top: 45%; opacity: 0; }
  80% { top: 45%; opacity: 1; }
  95% { top: 20%; opacity: 1; }
  100% { top: 20%; opacity: 0; }
`;

const Dot1 = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: ${props => props.theme.primary || '#0078FF'};
  border-radius: 50%;
  top: 42px;
  transform: translateY(-50%);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
  animation: ${appToServerAnimation} 12s cubic-bezier(0.4, 0.0, 0.2, 1) infinite;

  @media (max-width: 768px) {
    top: auto;
    left: 50%;
    transform: translateX(-50%);
    animation: ${topToMiddleAnimation} 12s infinite;
  }
`;

const Dot2 = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: ${props => props.theme.primary || '#0078FF'};
  border-radius: 50%;
  top: 42px;
  transform: translateY(-50%);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
  animation: ${serverToDatabaseAnimation} 12s cubic-bezier(0.4, 0.0, 0.2, 1) infinite;

  @media (max-width: 768px) {
    top: auto;
    left: 50%;
    transform: translateX(-50%);
    animation: ${middleToBottomAnimation} 12s infinite;
  }
`;

const Dot3 = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: ${props => props.theme.primary || '#0078FF'};
  border-radius: 50%;
  top: 42px;
  transform: translateY(-50%);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
  animation: ${databaseToServerAnimation} 12s cubic-bezier(0.4, 0.0, 0.2, 1) infinite;

  @media (max-width: 768px) {
    top: auto;
    left: 50%;
    transform: translateX(-50%);
    animation: ${bottomToMiddleAnimation} 12s infinite;
  }
`;

const Dot4 = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: ${props => props.theme.primary || '#0078FF'};
  border-radius: 50%;
  top: 42px;
  transform: translateY(-50%);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
  animation: ${serverToAppAnimation} 12s cubic-bezier(0.4, 0.0, 0.2, 1) infinite;

  @media (max-width: 768px) {
    top: auto;
    left: 50%;
    transform: translateX(-50%);
    animation: ${middleToTopAnimation} 12s infinite;
  }
`;

const ContactContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 20px;
  
  @media (max-width: 768px) {
    padding: 60px 15px;
    width: 100%;
  }
  
  @media (max-width: 480px) {
    padding: 40px 8px;
  }
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 50px;
  color: ${props => props.theme.text};
  position: relative;
  font-family: 'Montserrat', sans-serif;
  
  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 40px;
  }
  
  &:after {
    content: '';
    position: absolute;
    width: 100px;
    height: 3px;
    background-color: ${props => props.theme.primary};
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    
    @media (max-width: 480px) {
      width: 80px;
      bottom: -12px;
    }
  }
`;

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  @media (max-width: 480px) {
    gap: 25px;
  }
`;

const ContactInfo = styled.div`
  background-color: ${props => props.theme.primary};
  color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 30px ${props => props.theme.shadow};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: ${fadeIn} 0.8s ease forwards;
  font-family: 'Montserrat', sans-serif;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px ${props => props.theme.shadowHover};
  }
  
  @media (max-width: 768px) {
    padding: 25px;
    width: 100%;
    margin: 0 auto;
  }
  
  @media (max-width: 480px) {
    padding: 20px 15px;
    width: 100%;
    max-width: 100%;
  }
`;

const ContactInfoTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: white;
  font-family: 'Montserrat', sans-serif;
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
`;

const ContactInfoText = styled.p`
  margin-bottom: 40px;
  line-height: 1.6;
  color: white;
  font-family: 'Montserrat', sans-serif;
  
  @media (max-width: 480px) {
    margin-bottom: 30px;
    font-size: 0.95rem;
    line-height: 1.5;
  }
`;

const ContactInfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 20px;
  }
`;

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-size: 1.2rem;
  transition: transform 0.3s ease, background-color 0.3s ease;
  flex-shrink: 0; /* Prevent icon from shrinking */
  
  &:hover {
    transform: scale(1.1);
    background-color: rgba(255, 255, 255, 0.3);
  }
  
  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    font-size: 1rem;
    margin-right: 10px;
  }
`;

const ContactInfoLabel = styled.h3`
  font-size: 1rem;
  margin: 0 0 5px;
  font-weight: 600;
  color: white;
  font-family: 'Montserrat', sans-serif;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin: 0 0 3px;
  }
`;

const ContactInfoValue = styled.p`
  margin: 0;
  word-wrap: break-word;
  max-width: 100%;
`;

const ContactLink = styled.a`
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
  word-wrap: break-word;
  display: inline-block;
  max-width: 100%;
  text-decoration: underline;
  font-family: 'Montserrat', sans-serif;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
  
  &:hover {
    color: ${props => props.theme.secondary};
  }
`;

const ContactFormWrapper = styled.div`
  background-color: ${props => props.theme.card};
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 5px 20px ${props => props.theme.shadow};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: ${fadeIn} 0.8s ease forwards;
  animation-delay: 0.2s;
  opacity: 0;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px ${props => props.theme.shadowHover};
  }
  
  @media (max-width: 768px) {
    padding: 25px;
    width: 100%;
    margin: 0 auto;
  }
  
  @media (max-width: 480px) {
    padding: 20px 15px;
    width: 100%;
    max-width: 100%;
  }
`;

const ContactFormTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 30px;
  color: ${props => props.theme.text};
`;

const ContactForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  
  &:nth-child(3),
  &:nth-child(4) {
    grid-column: 1 / -1;
  }
`;

const FormLabel = styled.label`
  font-weight: 600;
  margin-bottom: 8px;
  color: ${props => props.theme.text};
`;

const FormInput = styled.input`
  padding: 12px 15px;
  border: 1px solid ${props => props.theme.border};
  border-radius: 4px;
  font-size: 1rem;
  background-color: ${props => props.theme.cardBackground};
  color: ${props => props.theme.text};
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  
  &:focus {
    border-color: ${props => props.theme.primary};
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.theme.primary}33;
  }
  
  &::placeholder {
    color: ${props => props.theme.textSecondary};
    opacity: 0.6;
  }
`;

const FormTextarea = styled.textarea`
  padding: 12px 15px;
  border: 1px solid ${props => props.theme.border};
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
  background-color: ${props => props.theme.cardBackground};
  color: ${props => props.theme.text};
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  
  &:focus {
    border-color: ${props => props.theme.primary};
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.theme.primary}33;
  }
  
  &::placeholder {
    color: ${props => props.theme.textSecondary};
    opacity: 0.6;
  }
`;

const SubmitButton = styled.button`
  grid-column: 1 / -1;
  background-color: ${props => props.theme.primary};
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 10px;
  
  &:hover {
    background-color: ${props => props.theme.primaryDark};
    transform: translateY(-3px);
    box-shadow: 0 4px 10px ${props => props.theme.shadow};
  }
  
  &:disabled {
    background-color: ${props => props.theme.textSecondary};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const FormStatusMessage = styled.div`
  padding: 20px;
  background-color: ${props => props.success ? props.theme.cardBackground : '#ff00000a'};
  border: 1px solid ${props => props.success ? props.theme.primary : '#ff0000'};
  color: ${props => props.success ? props.theme.text : '#ff0000'};
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
`;

const BackendAnimation = styled.div`
  margin-top: 100px;
  padding: 40px;
  background-color: ${props => props.theme.cardBackground || '#1a1a1a'};
  border-radius: 10px;
  box-shadow: 0 5px 20px ${props => props.theme.shadow || 'rgba(0,0,0,0.3)'};
  animation: ${fadeIn} 0.8s ease forwards;
  animation-delay: 0.4s;
  opacity: 0;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const AnimationTitle = styled.h2`
  text-align: center;
  margin-bottom: 50px;
  color: ${props => props.theme.text || '#ffffff'};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 60px;
    height: 3px;
    background-color: ${props => props.theme.primary || '#0078FF'};
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const AnimationContainer = styled.div`
  height: 150px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 40px 0;
    gap: 80px;
  }
`;

const AppIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: white;
  font-size: 2rem;
  box-shadow: 0 10px 20px rgba(106, 17, 203, 0.3);
  margin-bottom: 10px;
  transition: all 0.3s;
  z-index: 1;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ServerIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0078FF, #00C6FF);
  color: white;
  font-size: 2rem;
  box-shadow: 0 10px 20px rgba(0, 120, 255, 0.3);
  margin-bottom: 10px;
  transition: all 0.3s;
  z-index: 1;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const DatabaseIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #FF7200, #FF4B00);
  color: white;
  font-size: 2rem;
  box-shadow: 0 10px 20px rgba(255, 114, 0, 0.3);
  margin-bottom: 10px;
  transition: all 0.3s;
  z-index: 1;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const NodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const NodeLabel = styled.div`
  font-weight: 500;
  color: ${props => props.theme.text || '#ffffff'};
`;

const HorizontalLine = styled.div`
  position: absolute;
  height: 3px;
  width: 80%;
  background: linear-gradient(to right, #6a11cb, #0078FF, #FF7200);
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 0;
  
  @media (max-width: 768px) {
    width: 3px;
    height: 80%;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(to bottom, #6a11cb, #0078FF, #FF7200);
  }
`;

export default ContactPage;