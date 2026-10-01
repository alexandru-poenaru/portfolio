import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../content/LanguageContext';

const email = 'alexandru.george.poenaru@gmail.com';
export default function ContactPage() {
  const { text, language } = useLanguage();
  const copy = text.contact;
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [status, setStatus] = useState('idle');
  const sending = useRef(false);
  const formRef = useRef(null);
  useEffect(() => {
    // Clear any browser validation message in the previous language.
    for (const field of formRef.current?.elements || []) field.setCustomValidity?.('');
  }, [language]);
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(email); setCopied(true); setCopyError(false); }
    catch { setCopied(false); setCopyError(true); }
  };
  const validate = event => {
    const field = event.target;
    field.setCustomValidity(field.validity.valueMissing ? copy.required : field.validity.typeMismatch ? copy.invalidEmail : '');
  };
  const sendMessage = async event => {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const values = Object.fromEntries([...new FormData(form).entries()].map(([key, value]) => [key, value.trim()]));
    if (Object.values(values).some(value => !value)) { setStatus('invalid'); return; }
    sending.current = true;
    setStatus('sending');
    try {
      // Delivery code is only downloaded when a visitor sends a message.
      const { default: emailjs } = await import('emailjs-com');
      await emailjs.send('service_1avl1t7', 'template_z6mawq9', {
        from_name: values.name, from_email: values.email, subject: values.subject, message: values.message,
      }, 'chS7dIITr1soaZz_G');
      setStatus('success'); form.reset();
    } catch { setStatus('error'); }
    finally { sending.current = false; }
  };
  const fieldProps = { onInvalid: validate, onInput: event => event.target.setCustomValidity(''), disabled: status === 'sending' };
  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title" tabIndex={-1}>
      <div className="container">
        <span className="eyebrow">{copy.eyebrow}</span>
        <div className="contact-grid">
          <div className="contact-intro">
            <h2 id="contact-title">{copy.title[0]}<br />{copy.title[1]}<span className="accent">?</span></h2>
            <p>{copy.introduction[0]}<br />{copy.introduction[1]}</p>
            <div className="email-contact">
              <span className="meta contact-email-label">{copy.email}</span>
              <a href={'mailto:' + email}>{email} <span aria-hidden="true">↗</span></a>
              <button className="copy-button meta" onClick={copyEmail}>{copied ? copy.copied : copy.copy}</button>
              <span className="sr-only" role="status">{copied ? copy.copied : ''}</span>
              {copyError && <span className="copy-feedback" role="alert">{copy.copyError}</span>}
            </div>
            <div className="contact-links">
              <a className="text-link" href="https://www.linkedin.com/in/alexandru-poenaru/" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
              <a className="text-link" href="https://github.com/alexandru-poenaru" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
              <a className="text-link" href="tel:+32468301411">{copy.phone} <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <form ref={formRef} className="contact-form" onSubmit={sendMessage} aria-label={copy.form} aria-busy={status === 'sending'}>
            <h3>{copy.form}</h3>
            <div className="form-pair"><label>{copy.name}<input name="name" autoComplete="name" required maxLength={100} placeholder={copy.namePlaceholder} {...fieldProps} /></label><label>{copy.email}<input type="email" name="email" autoComplete="email" required maxLength={254} placeholder={copy.emailPlaceholder} {...fieldProps} /></label></div>
            <label>{copy.subject}<input name="subject" required maxLength={200} placeholder={copy.subjectPlaceholder} {...fieldProps} /></label>
            <label>{copy.message}<textarea name="message" required maxLength={5000} rows={3} placeholder={copy.messagePlaceholder} {...fieldProps} /></label>
            <div className="form-bottom"><span className="meta">{copy.inbox}</span><button type="submit" className="send-button" disabled={status === 'sending'}>{status === 'sending' ? copy.sending : copy.send} <span aria-hidden="true">↗</span></button></div>
            <p className={'form-status ' + (status === 'error' || status === 'invalid' ? 'accent' : '')} role="status">{copy.status[status] || ''}</p>
          </form>
        </div>
      </div>
    </section>
  );
}
