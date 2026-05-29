import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import emailjs from 'emailjs-com';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';


const slideUp = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const orb = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%       { transform: translate(10px, -10px) scale(1.03); }
  66%       { transform: translate(-15px, 15px) scale(0.95); }
`;

const toastSlideIn = keyframes`
  from { opacity: 0; transform: translateX(-50%) translateY(-16px) scale(0.95); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0)     scale(1); }
`;

const toastSlideOut = keyframes`
  from { opacity: 1; transform: translateX(-50%) translateY(0)     scale(1); }
  to   { opacity: 0; transform: translateX(-50%) translateY(-12px) scale(0.94); }
`;

/* ─── Toast component ─────────────────────────────────────────────────────────── */

const Toast = ({ message, type, visible, onDone }) => {
  const [exiting, setExiting] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!visible) return;
    setExiting(false);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setExiting(true);
      timerRef.current = setTimeout(onDone, 320);
    }, 3200);
    return () => clearTimeout(timerRef.current);
  }, [visible, message, onDone]);

  if (!visible && !exiting) return null;

  return (
    <ToastEl $type={type} $exiting={exiting}>
      <ToastIcon $type={type}>
        {type === 'error' ? <FaExclamationTriangle /> : <FaCheckCircle />}
      </ToastIcon>
      {message}
    </ToastEl>
  );
};

/* ─── ContactPage ─────────────────────────────────────────────────────────────── */

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState({ submitted: false, success: false, message: '' });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'error' });

  const showToast = (message, type = 'error') => {
    setToast({ visible: true, message, type });
  };

  const dismissToast = () => setToast(t => ({ ...t, visible: false }));

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    const { name, email, subject, message } = formData;

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      showToast('All fields are required. Please fill everything in.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    setLoading(true);
    try {
      await emailjs.send(
        'service_1avl1t7',
        'template_z6mawq9',
        { from_name: name, from_email: email, subject, message },
        'chS7dIITr1soaZz_G'
      );
      setFormStatus({ submitted: true, success: true, message: "Message sent! I'll get back to you soon." });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setFormStatus({ submitted: true, success: false, message: 'Something went wrong. Please try again or email me directly.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContactContainer id="contact">
      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onDone={dismissToast}
      />

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
              <IconWrapperLink href="mailto:alexandru.george.poenaru@gmail.com"><FaEnvelope /></IconWrapperLink>
              <div>
                <ContactInfoLabel>Email</ContactInfoLabel>
                <ContactLink href="mailto:alexandru.george.poenaru@gmail.com">
                  alexandru.george.poenaru@gmail.com
                </ContactLink>
              </div>
            </ContactInfoItem>

            <ContactInfoItem>
              <IconWrapperLink href="tel:+32468301411"><FaPhone /></IconWrapperLink>
              <div>
                <ContactInfoLabel>Phone</ContactInfoLabel>
                <ContactLink href="tel:+32468301411">+32 468 30 14 11</ContactLink>
              </div>
            </ContactInfoItem>

            <ContactInfoItem>
              <IconWrapperLink href="https://maps.google.com/?q=Tielt+Belgium" target="_blank" rel="noopener noreferrer"><FaMapMarkerAlt /></IconWrapperLink>
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
            <ContactForm>
              <FormGroup>
                <FormLabel>Full Name</FormLabel>
                <FormInput
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
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
                  placeholder="Subject"
                />
              </FormGroup>

              <FormGroup $full>
                <FormLabel>Message</FormLabel>
                <FormTextarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  rows="6"
                />
              </FormGroup>

              <SubmitButton
                type="button"
                disabled={loading}
                onClick={!loading ? handleSubmit : undefined}
                style={{ gridColumn: '1 / -1', marginTop: '4px' }}
              >
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

const ToastEl = styled.div`
  position: fixed;
  top: 84px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 13px 22px;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  white-space: nowrap;
  pointer-events: none;

  background: ${p => p.$type === 'error'
    ? 'linear-gradient(180deg, rgba(239,68,68,0.20) 0%, rgba(239,68,68,0.10) 100%)'
    : p.theme.glassTinted};
  backdrop-filter: ${p => p.theme.glassBackdrop};
  -webkit-backdrop-filter: ${p => p.theme.glassBackdrop};
  border: 0.5px solid ${p => p.$type === 'error' ? 'rgba(239,68,68,0.45)' : p.theme.glassTintedBorder};
  box-shadow:
    inset 0 1.5px 0 ${p => p.$type === 'error' ? 'rgba(255,255,255,0.20)' : p.theme.glassTintedHighlight},
    0 8px 32px ${p => p.$type === 'error' ? 'rgba(239,68,68,0.25)' : p.theme.glow},
    0 4px 12px rgba(0,0,0,0.15);
  color: ${p => p.$type === 'error' ? '#fca5a5' : p.theme.primary};

  animation: ${p => p.$exiting
    ? css`${toastSlideOut} 0.3s ease forwards`
    : css`${toastSlideIn} 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards`};
`;

const ToastIcon = styled.span`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: ${p => p.$type === 'error' ? '#f87171' : 'inherit'};
  flex-shrink: 0;
`;

const ContactContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 24px 100px;
  content-visibility: auto;
  contain-intrinsic-size: auto 1000px;

  @media (max-width: 768px) { padding: 60px 16px 80px; }
`;

const PageTitle = styled.h1`
  font-size: clamp(2.2rem, 4vw, 3rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  text-align: center;
  margin-bottom: 60px;
  color: ${props => props.theme.text};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 40px;
    height: 3px;
    background: ${props => props.theme.primary};
    bottom: -18px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 1px;
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
  background: ${props => props.theme.glassTinted};
  backdrop-filter: ${props => props.theme.glassBackdrop};
  -webkit-backdrop-filter: ${props => props.theme.glassBackdrop};
  border: 0.5px solid ${props => props.theme.glassTintedBorder};
  box-shadow:
    inset 0 1.5px 0 ${props => props.theme.glassTintedHighlight},
    0 12px 40px ${props => props.theme.glow},
    ${props => props.theme.glassShadow};
  padding: 36px;
  border-radius: 24px;
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
  animation: ${orb} 30s ease-in-out ${props => props.$delay} infinite;
  pointer-events: none;
`;

const ContactInfoTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0 0 12px;
  color: ${props => props.theme.text};
`;

const ContactInfoText = styled.p`
  color: ${props => props.theme.textSecondary};
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

const iconWrapperStyles = `
  width: 46px;
  height: 46px;
  min-width: 46px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.25s ease, border-color 0.2s ease;
`;

const IconWrapperLink = styled.a`
  ${iconWrapperStyles}
  background: ${props => props.theme.glass};
  backdrop-filter: ${props => props.theme.glassBackdrop};
  -webkit-backdrop-filter: ${props => props.theme.glassBackdrop};
  border: 0.5px solid ${props => props.theme.glassBorder};
  box-shadow: inset 0 1.5px 0 ${props => props.theme.glassHighlight};
  color: ${props => props.theme.primary};
  text-decoration: none;

  &:hover {
    transform: scale(1.1);
    border-color: ${props => props.theme.glassTintedBorder};
    box-shadow:
      inset 0 1.5px 0 ${props => props.theme.glassTintedHighlight},
      0 6px 18px ${props => props.theme.glow};
  }
`;

const ContactInfoLabel = styled.h3`
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${props => props.theme.textSecondary};
  margin: 0 0 4px;
`;

const ContactLink = styled.a`
  color: ${props => props.theme.primary};
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  word-break: break-all;
  transition: opacity 0.2s;
  cursor: pointer;

  &:hover { opacity: 0.75; text-decoration: underline; }
`;

const ContactFormWrapper = styled.div`
  background: ${props => props.theme.glass};
  backdrop-filter: ${props => props.theme.glassBackdrop};
  -webkit-backdrop-filter: ${props => props.theme.glassBackdrop};
  border: 0.5px solid ${props => props.theme.glassBorder};
  box-shadow:
    inset 0 1.5px 0 ${props => props.theme.glassHighlight},
    ${props => props.theme.glassShadow};
  padding: 36px;
  border-radius: 24px;
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
  border-radius: 14px;
  font-size: 0.95rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
  cursor: text;
`;

const FormInput = styled.input`
  ${inputBase}
  border: 0.5px solid ${props => props.theme.glassBorder};
  background: ${props => props.theme.glass};
  backdrop-filter: ${props => props.theme.glassBackdrop};
  -webkit-backdrop-filter: ${props => props.theme.glassBackdrop};
  box-shadow: inset 0 1px 0 ${props => props.theme.glassHighlight};
  color: ${props => props.theme.text};

  &::placeholder { color: ${props => props.theme.textSecondary}; opacity: 0.55; }

  &:focus {
    border-color: ${props => props.theme.glassTintedBorder};
    box-shadow:
      inset 0 1px 0 ${props => props.theme.glassTintedHighlight},
      0 0 0 3px ${props => props.theme.glow};
  }
`;

const FormTextarea = styled.textarea`
  ${inputBase}
  border: 0.5px solid ${props => props.theme.glassBorder};
  background: ${props => props.theme.glass};
  backdrop-filter: ${props => props.theme.glassBackdrop};
  -webkit-backdrop-filter: ${props => props.theme.glassBackdrop};
  box-shadow: inset 0 1px 0 ${props => props.theme.glassHighlight};
  color: ${props => props.theme.text};
  resize: vertical;

  &::placeholder { color: ${props => props.theme.textSecondary}; opacity: 0.55; }

  &:focus {
    border-color: ${props => props.theme.glassTintedBorder};
    box-shadow:
      inset 0 1px 0 ${props => props.theme.glassTintedHighlight},
      0 0 0 3px ${props => props.theme.glow};
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: ${props => props.theme.glassTinted};
  backdrop-filter: ${props => props.theme.glassBackdrop};
  -webkit-backdrop-filter: ${props => props.theme.glassBackdrop};
  border: 0.5px solid ${props => props.theme.glassTintedBorder};
  box-shadow:
    inset 0 1.5px 0 ${props => props.theme.glassTintedHighlight},
    0 4px 14px ${props => props.theme.glow};
  color: ${props => props.theme.primary};
  padding: 13px 32px;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.3s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow:
      inset 0 1.5px 0 ${props => props.theme.glassTintedHighlight},
      0 12px 30px ${props => props.theme.glowStrong};
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

const FormStatusMessage = styled.div`
  padding: 20px;
  border-radius: 14px;
  border: 0.5px solid ${props => props.$success ? props.theme.glassTintedBorder : 'rgba(239,68,68,0.5)'};
  background: ${props => props.$success ? props.theme.glassTinted : 'rgba(239,68,68,0.08)'};
  backdrop-filter: ${props => props.theme.glassBackdrop};
  -webkit-backdrop-filter: ${props => props.theme.glassBackdrop};
  box-shadow: inset 0 1px 0 ${props => props.$success ? props.theme.glassTintedHighlight : 'rgba(255,255,255,0.15)'};
  color: ${props => props.$success ? props.theme.text : '#ef4444'};
  text-align: center;
  font-weight: 500;
`;

export default ContactPage;
