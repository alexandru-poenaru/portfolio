import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import emailjs from 'emailjs-com';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaServer, FaDatabase, FaLaptop } from 'react-icons/fa';

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState({ submitted: false, success: false, message: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.send(
        'service_1avl1t7',
        'template_z6mawq9',
        { from_name: formData.name, from_email: formData.email, subject: formData.subject, message: formData.message },
        'chS7dIITr1soaZz_G'
      );
      setFormStatus({ submitted: true, success: true, message: "Message sent! I'll get back to you soon." });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setFormStatus({ submitted: true, success: false, message: 'Something went wrong. Please try again or email me directly.' });
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
          <ContactInfoText>
            Feel free to reach out for any questions or opportunities. I'm always open to discussing new projects and ideas.
          </ContactInfoText>

          <ContactInfoItem>
            <IconWrapper href="mailto:alexandru.george.poenaru@gmail.com">
              <FaEnvelope />
            </IconWrapper>
            <div>
              <ContactInfoLabel>Email</ContactInfoLabel>
              <ContactLink href="mailto:alexandru.george.poenaru@gmail.com">
                alexandru.george.poenaru@gmail.com
              </ContactLink>
            </div>
          </ContactInfoItem>

          <ContactInfoItem>
            <IconWrapper href="tel:+32468301411">
              <FaPhone />
            </IconWrapper>
            <div>
              <ContactInfoLabel>Phone</ContactInfoLabel>
              <ContactLink href="tel:+32468301411">+32 468 30 14 11</ContactLink>
            </div>
          </ContactInfoItem>

          <ContactInfoItem>
            <IconWrapper href="https://maps.google.com/?q=Tielt+Belgium" target="_blank" rel="noopener noreferrer">
              <FaMapMarkerAlt />
            </IconWrapper>
            <div>
              <ContactInfoLabel>Location</ContactInfoLabel>
              <ContactLink href="https://maps.google.com/?q=Tielt+Belgium" target="_blank" rel="noopener noreferrer">
                Tielt, Belgium
              </ContactLink>
            </div>
          </ContactInfoItem>
        </ContactInfo>

        <ContactFormWrapper>
          <ContactFormTitle>Send a Message</ContactFormTitle>

          {formStatus.submitted ? (
            <FormStatusMessage $success={formStatus.success}>
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
                  placeholder="Subject"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Message</FormLabel>
                <FormTextarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Your message..."
                  rows="6"
                />
              </FormGroup>

              <SubmitButton type="submit" disabled={loading}>
                {loading ? 'Sending…' : 'Send Message'}
              </SubmitButton>
            </ContactForm>
          )}
        </ContactFormWrapper>
      </ContactContent>

      <BackendAnimation>
        <AnimationTitle>How Backend Systems Work</AnimationTitle>
        <AnimationContainer>
          <NodeContainer>
            <AppIcon><FaLaptop /></AppIcon>
            <NodeLabel>App</NodeLabel>
          </NodeContainer>
          <NodeContainer>
            <ServerIconEl><FaServer /></ServerIconEl>
            <NodeLabel>API Server</NodeLabel>
          </NodeContainer>
          <NodeContainer>
            <DatabaseIconEl><FaDatabase /></DatabaseIconEl>
            <NodeLabel>Database</NodeLabel>
          </NodeContainer>
          <HorizontalLine />
          <Dot1 /><Dot2 /><Dot3 /><Dot4 />
        </AnimationContainer>
      </BackendAnimation>
    </ContactContainer>
  );
};

/* ─── Dot animations ─────────────────────────────────────────────────────────── */

const appToServer = keyframes`
  0%   { left:5%;  opacity:0 }  2%  { left:5%;  opacity:1 }
  23%  { left:47%; opacity:1 }  25% { left:47%; opacity:0 }
  100% { opacity:0 }
`;
const serverToDb = keyframes`
  0%,25% { opacity:0 }  27% { left:53%; opacity:1 }
  48%    { left:95%; opacity:1 } 50% { left:95%; opacity:0 }
  100%   { opacity:0 }
`;
const dbToServer = keyframes`
  0%,50% { opacity:0 }  52% { left:95%; opacity:1 }
  73%    { left:53%; opacity:1 } 75% { left:53%; opacity:0 }
  100%   { opacity:0 }
`;
const serverToApp = keyframes`
  0%,75% { opacity:0 }  77% { left:47%; opacity:1 }
  98%    { left:5%;  opacity:1 } 100% { left:5%;  opacity:0 }
`;

const topToMid = keyframes`
  0%  { top:20%; opacity:0 }  5%  { top:20%; opacity:1 }
  20% { top:45%; opacity:1 }  25% { top:45%; opacity:0 }
  100%{ top:20%; opacity:0 }
`;
const midToBot = keyframes`
  0%  { top:45%; opacity:0 }  30% { top:45%; opacity:1 }
  45% { top:70%; opacity:1 }  50% { top:70%; opacity:0 }
  100%{ top:45%; opacity:0 }
`;
const botToMid = keyframes`
  0%  { top:70%; opacity:0 }  55% { top:70%; opacity:1 }
  70% { top:45%; opacity:1 }  75% { top:45%; opacity:0 }
  100%{ top:70%; opacity:0 }
`;
const midToTop = keyframes`
  0%  { top:45%; opacity:0 }  80% { top:45%; opacity:1 }
  95% { top:20%; opacity:1 } 100% { top:20%; opacity:0 }
`;

const dotBase = `
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  top: 42px;
  transform: translateY(-50%);
`;

const Dot1 = styled.div`
  ${dotBase}
  background: ${props => props.theme.primary};
  box-shadow: 0 0 10px ${props => props.theme.glow};
  animation: ${appToServer} 12s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  @media (max-width: 768px) {
    top: auto; left: 50%; transform: translateX(-50%);
    animation: ${topToMid} 12s infinite;
  }
`;
const Dot2 = styled.div`
  ${dotBase}
  background: ${props => props.theme.primary};
  box-shadow: 0 0 10px ${props => props.theme.glow};
  animation: ${serverToDb} 12s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  @media (max-width: 768px) {
    top: auto; left: 50%; transform: translateX(-50%);
    animation: ${midToBot} 12s infinite;
  }
`;
const Dot3 = styled.div`
  ${dotBase}
  background: ${props => props.theme.primary};
  box-shadow: 0 0 10px ${props => props.theme.glow};
  animation: ${dbToServer} 12s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  @media (max-width: 768px) {
    top: auto; left: 50%; transform: translateX(-50%);
    animation: ${botToMid} 12s infinite;
  }
`;
const Dot4 = styled.div`
  ${dotBase}
  background: ${props => props.theme.primary};
  box-shadow: 0 0 10px ${props => props.theme.glow};
  animation: ${serverToApp} 12s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  @media (max-width: 768px) {
    top: auto; left: 50%; transform: translateX(-50%);
    animation: ${midToTop} 12s infinite;
  }
`;

/* ─── Styled components ──────────────────────────────────────────────────────── */

const ContactContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 24px 100px;

  @media (max-width: 768px) { padding: 60px 16px 80px; }
`;

const PageTitle = styled.h1`
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  text-align: center;
  margin-bottom: 60px;
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

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 32px;
  animation: ${slideUp} 0.7s ease both;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
  background: ${props => props.theme.primary};
  padding: 36px;
  border-radius: 18px;
  box-shadow: 0 12px 40px ${props => props.theme.glow};

  @media (max-width: 768px) { padding: 24px; }
`;

const ContactInfoTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0 0 12px;
  color: #fff;
`;

const ContactInfoText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.92rem;
  line-height: 1.6;
  margin: 0 0 36px;
`;

const ContactInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;

  &:last-child { margin-bottom: 0; }
`;

const IconWrapper = styled.a`
  width: 46px;
  height: 46px;
  min-width: 46px;
  background: rgba(255, 255, 255, 0.18);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: #fff;
  text-decoration: none;
  transition: background 0.25s ease, transform 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.32);
    transform: scale(1.08);
  }
`;

const ContactInfoLabel = styled.h3`
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.65);
  margin: 0 0 4px;
`;

const ContactLink = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  word-break: break-all;
  transition: opacity 0.2s;

  &:hover { opacity: 0.75; text-decoration: underline; }
`;

const ContactFormWrapper = styled.div`
  background: ${props => props.theme.card};
  border: 1px solid ${props => props.theme.border};
  padding: 36px;
  border-radius: 18px;
  box-shadow: 0 8px 32px ${props => props.theme.shadow};
  animation: ${slideUp} 0.7s ease 0.15s both;

  @media (max-width: 768px) { padding: 24px; }
`;

const ContactFormTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0 0 28px;
  color: ${props => props.theme.text};
`;

const ContactForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 576px) { grid-template-columns: 1fr; }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  &:nth-child(3), &:nth-child(4) { grid-column: 1 / -1; }
`;

const FormLabel = styled.label`
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${props => props.theme.textSecondary};
  margin-bottom: 8px;
`;

const inputBase = `
  padding: 12px 14px;
  border-radius: 10px;
  font-size: 0.95rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
`;

const FormInput = styled.input`
  ${inputBase}
  border: 1px solid ${props => props.theme.border};
  background: ${props => props.theme.cardBackground};
  color: ${props => props.theme.text};

  &::placeholder { color: ${props => props.theme.textSecondary}; opacity: 0.5; }

  &:focus {
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.glow};
  }
`;

const FormTextarea = styled.textarea`
  ${inputBase}
  border: 1px solid ${props => props.theme.border};
  background: ${props => props.theme.cardBackground};
  color: ${props => props.theme.text};
  resize: vertical;

  &::placeholder { color: ${props => props.theme.textSecondary}; opacity: 0.5; }

  &:focus {
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.glow};
  }
`;

const SubmitButton = styled.button`
  grid-column: 1 / -1;
  background: ${props => props.theme.primary};
  color: #fff;
  border: none;
  padding: 13px 32px;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 4px;
  transition: background 0.25s ease, transform 0.2s ease, box-shadow 0.3s ease;

  &:hover:not(:disabled) {
    background: ${props => props.theme.primaryDark};
    transform: translateY(-2px);
    box-shadow: 0 8px 24px ${props => props.theme.glow};
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

const FormStatusMessage = styled.div`
  padding: 20px;
  border-radius: 10px;
  border: 1px solid ${props => props.$success ? props.theme.primary : '#ef4444'};
  background: ${props => props.$success ? props.theme.glow : 'rgba(239,68,68,0.08)'};
  color: ${props => props.$success ? props.theme.text : '#ef4444'};
  text-align: center;
  font-weight: 500;
`;

const BackendAnimation = styled.div`
  margin-top: 80px;
  padding: 40px;
  background: ${props => props.theme.card};
  border: 1px solid ${props => props.theme.border};
  border-radius: 18px;
  box-shadow: 0 8px 32px ${props => props.theme.shadow};
  animation: ${slideUp} 0.7s ease 0.3s both;

  @media (max-width: 768px) { display: none; }
`;

const AnimationTitle = styled.h2`
  text-align: center;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 48px;
  color: ${props => props.theme.text};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 40px;
    height: 2px;
    background: ${props => props.theme.primary};
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 2px;
    box-shadow: 0 0 10px ${props => props.theme.glow};
  }
`;

const AnimationContainer = styled.div`
  height: 140px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 40px;
  max-width: 720px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 40px 0;
    gap: 72px;
  }
`;

const nodeIconBase = `
  width: 72px;
  height: 72px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.8rem;
  margin-bottom: 10px;
  transition: transform 0.3s;
  z-index: 1;
  &:hover { transform: scale(1.06); }
`;

const AppIcon = styled.div`
  ${nodeIconBase}
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  box-shadow: 0 8px 24px rgba(106, 17, 203, 0.3);
`;
const ServerIconEl = styled.div`
  ${nodeIconBase}
  background: linear-gradient(135deg, #0078FF, #00C6FF);
  box-shadow: 0 8px 24px rgba(0, 120, 255, 0.3);
`;
const DatabaseIconEl = styled.div`
  ${nodeIconBase}
  background: linear-gradient(135deg, #FF7200, #FF4B00);
  box-shadow: 0 8px 24px rgba(255, 114, 0, 0.3);
`;

const NodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const NodeLabel = styled.div`
  font-size: 0.82rem;
  font-weight: 600;
  color: ${props => props.theme.textSecondary};
  letter-spacing: 0.04em;
`;

const HorizontalLine = styled.div`
  position: absolute;
  height: 2px;
  width: 82%;
  background: linear-gradient(to right, #6a11cb, #0078FF, #FF7200);
  top: 38px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 0;
  border-radius: 1px;

  @media (max-width: 768px) {
    width: 2px;
    height: 82%;
    top: 9%;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(to bottom, #6a11cb, #0078FF, #FF7200);
  }
`;

export default ContactPage;
