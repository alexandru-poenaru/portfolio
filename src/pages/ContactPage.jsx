import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import emailjs from 'emailjs-com';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaExclamationTriangle, FaCheckCircle, FaChevronRight } from 'react-icons/fa';


const slideUp = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
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
          <InfoHeader>
            <InfoHeaderDots />
            <InfoHeaderGlow />
            <InfoHeaderContent>
              <InfoHeaderEyebrow>Let's Connect</InfoHeaderEyebrow>
              <InfoHeaderName>Alexandru Poenaru</InfoHeaderName>
              <InfoHeaderRole>Full-Stack Developer · Belgium</InfoHeaderRole>
            </InfoHeaderContent>
          </InfoHeader>

          <ContactRows>
            <ContactRow href="mailto:alexandru.george.poenaru@gmail.com" title="alexandru.george.poenaru@gmail.com">
              <RowIconBadge $color="#e26d5c"><FaEnvelope /></RowIconBadge>
              <RowText>
                <RowLabel>Email</RowLabel>
                <RowValue>alexandru.george.poenaru@gmail.com</RowValue>
              </RowText>
              <RowArrow><FaChevronRight /></RowArrow>
            </ContactRow>

            <RowSep />

            <ContactRow href="tel:+32468301411">
              <RowIconBadge $color="#c9cba3"><FaPhone /></RowIconBadge>
              <RowText>
                <RowLabel>Phone</RowLabel>
                <RowValue>+32 468 30 14 11</RowValue>
              </RowText>
              <RowArrow><FaChevronRight /></RowArrow>
            </ContactRow>

            <RowSep />

            <ContactRow href="https://maps.google.com/?q=Tielt+Belgium" target="_blank" rel="noopener noreferrer">
              <RowIconBadge $color="#ffe1a8"><FaMapMarkerAlt /></RowIconBadge>
              <RowText>
                <RowLabel>Location</RowLabel>
                <RowValue>Tielt, Belgium</RowValue>
              </RowText>
              <RowArrow><FaChevronRight /></RowArrow>
            </ContactRow>
          </ContactRows>
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
  border-radius: 0;
  font-size: 0.9rem;
  font-weight: 600;
  white-space: nowrap;
  pointer-events: none;

  background: ${p => p.$type === 'error'
    ? 'rgba(193,18,31,0.18)'
    : p.theme.glassTinted};
  border: 1px solid ${p => p.$type === 'error' ? '#c1121f' : p.theme.glassTintedBorder};
  box-shadow: 0 8px 32px ${p => p.$type === 'error' ? 'rgba(193,18,31,0.25)' : p.theme.glow}, 0 4px 12px rgba(0,0,0,0.3);
  color: ${p => p.$type === 'error' ? '#fdf0d5' : p.theme.primary};

  animation: ${p => p.$exiting
    ? css`${toastSlideOut} 0.3s ease forwards`
    : css`${toastSlideIn} 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards`};
`;

const ToastIcon = styled.span`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: ${p => p.$type === 'error' ? '#c1121f' : 'inherit'};
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
    border-radius: 0;
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
  border: 1px solid ${props => props.theme.glassTintedBorder};
  box-shadow: 0 12px 40px ${props => props.theme.glow}, ${props => props.theme.glassShadow};
  padding: 0;
  border-radius: 0;
  overflow: hidden;
`;

const InfoHeader = styled.div`
  position: relative;
  overflow: hidden;
  padding: 28px 28px 24px;
  border-bottom: 1px solid ${props => props.theme.glassTintedBorder};
`;

const InfoHeaderDots = styled.div`
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, ${props => props.theme.border} 1.5px, transparent 1.5px);
  background-size: 22px 22px;
  opacity: 0.55;
`;

const InfoHeaderGlow = styled.div`
  position: absolute;
  top: -50px;
  right: -50px;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: radial-gradient(circle, ${props => props.theme.glow} 0%, transparent 70%);
  filter: blur(24px);
  pointer-events: none;
`;

const InfoHeaderContent = styled.div`
  position: relative;
  z-index: 1;
`;

const InfoHeaderEyebrow = styled.div`
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${props => props.theme.primary};
  margin-bottom: 7px;
`;

const InfoHeaderName = styled.div`
  font-size: 1.35rem;
  font-weight: 900;
  letter-spacing: -0.03em;
  color: ${props => props.theme.text};
  margin-bottom: 4px;
`;

const InfoHeaderRole = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.textSecondary};
`;

const ContactRows = styled.div`
  padding: 8px 16px 16px;
`;

const ContactRow = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 10px;
  text-decoration: none;
  border-radius: 0;
  cursor: pointer;
  transition: background 0.18s ease;

  &:hover {
    background: rgba(253, 240, 213, 0.06);
  }

  &:hover > *:last-child {
    opacity: 1;
    transform: translateX(3px);
  }
`;

const RowIconBadge = styled.div`
  width: 36px;
  height: 36px;
  min-width: 36px;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.88rem;
  color: ${props => props.$color};
  background: ${props => props.$color}18;
  border: 1px solid ${props => props.$color}55;
  flex-shrink: 0;
`;

const RowText = styled.div`
  flex: 1;
  min-width: 0;
  overflow: hidden;
`;

const RowLabel = styled.div`
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${props => props.theme.textSecondary};
  margin-bottom: 2px;
`;

const RowValue = styled.div`
  font-size: 0.82rem;
  font-weight: 500;
  color: ${props => props.theme.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RowArrow = styled.div`
  font-size: 0.68rem;
  color: ${props => props.theme.textSecondary};
  opacity: 0;
  flex-shrink: 0;
  transition: opacity 0.18s ease, transform 0.18s ease;
`;

const RowSep = styled.div`
  height: 1px;
  background: ${props => props.theme.glassTintedBorder};
  margin: 0 10px;
  opacity: 0.3;
`;

const ContactFormWrapper = styled.div`
  background: ${props => props.theme.glass};
  border: 1px solid ${props => props.theme.glassBorder};
  box-shadow: ${props => props.theme.glassShadow};
  padding: 36px;
  border-radius: 0;
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
  border-radius: 0;
  font-size: 0.95rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
  cursor: text;
`;

const FormInput = styled.input`
  ${inputBase}
  border: 1px solid ${props => props.theme.glassBorder};
  background: ${props => props.theme.cardBackground};
  color: ${props => props.theme.text};

  &::placeholder { color: ${props => props.theme.textSecondary}; opacity: 0.55; }

  &:focus {
    border-color: ${props => props.theme.glassTintedBorder};
    box-shadow: 0 0 0 3px ${props => props.theme.glow};
  }
`;

const FormTextarea = styled.textarea`
  ${inputBase}
  border: 1px solid ${props => props.theme.glassBorder};
  background: ${props => props.theme.cardBackground};
  color: ${props => props.theme.text};
  resize: vertical;

  &::placeholder { color: ${props => props.theme.textSecondary}; opacity: 0.55; }

  &:focus {
    border-color: ${props => props.theme.glassTintedBorder};
    box-shadow: 0 0 0 3px ${props => props.theme.glow};
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: ${props => props.theme.glassTinted};
  border: 1px solid ${props => props.theme.glassTintedBorder};
  box-shadow: 0 4px 14px ${props => props.theme.glow};
  color: ${props => props.theme.primary};
  padding: 13px 32px;
  border-radius: 0;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.3s ease, background 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    background: ${props => props.theme.primary};
    color: ${props => props.theme.text};
    box-shadow: 0 12px 30px ${props => props.theme.glowStrong};
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

const FormStatusMessage = styled.div`
  padding: 20px;
  border-radius: 0;
  border: 1px solid ${props => props.$success ? props.theme.glassTintedBorder : '#c1121f'};
  background: ${props => props.$success ? props.theme.glassTinted : 'rgba(193,18,31,0.10)'};
  color: ${props => props.$success ? props.theme.text : '#fdf0d5'};
  text-align: center;
  font-weight: 500;
`;

export default ContactPage;
