import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import emailjs from 'emailjs-com';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const orb = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%       { transform: translate(20px, -20px) scale(1.08); }
  66%       { transform: translate(-15px, 15px) scale(0.95); }
`;

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState({ submitted: false, success: false, message: '' });
  const [loading, setLoading] = useState(false);

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
    <ContactContainer id="contact">
      <PageTitle>Get In Touch</PageTitle>
      <ContactContent>
        <ContactInfo>
          <OrbDecor $top="10%" $left="60%" $size="180px" $delay="0s" />
          <OrbDecor $top="55%" $left="20%" $size="120px" $delay="2s" />
          <InfoInner>
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
          </InfoInner>
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

              <FormGroup $full>
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

              <FormGroup $full>
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
    </ContactContainer>
  );
};

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
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) { padding: 24px; }
`;

const InfoInner = styled.div`
  position: relative;
  z-index: 1;
`;

const OrbDecor = styled.div`
  position: absolute;
  top: ${props => props.$top};
  left: ${props => props.$left};
  width: ${props => props.$size};
  height: ${props => props.$size};
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  filter: blur(32px);
  animation: ${orb} 8s ease-in-out ${props => props.$delay} infinite;
  pointer-events: none;
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
  cursor: pointer;

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
  cursor: pointer;

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
  grid-column: ${props => props.$full ? '1 / -1' : 'auto'};
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
  cursor: text;
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

export default ContactPage;
