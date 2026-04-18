import React, { FormEvent, useEffect, useState } from 'react';
import { Linkedin, Mail, X } from 'lucide-react';
import { Language, UI_TEXT } from '../constants';
import { PRIVACY_NOTICE, PRIVACY_POLICY_URL } from '../utils/privacy';

interface FooterProps {
  language: Language;
}

const LINKEDIN_URL = 'https://www.linkedin.com/in/mario-fern%C3%A1ndez-rodr%C3%ADguez-072393204/';

const Footer: React.FC<FooterProps> = ({ language }) => {
  const footerText = UI_TEXT[language].footer;
  const copyrightText = footerText.copyright.trim();
  const authorName = 'Mario Fernández';
  const [senderEmail, setSenderEmail] = useState('');
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [hasAcceptedPrivacy, setHasAcceptedPrivacy] = useState(false);

  const emailInputPlaceholder = language === 'es' ? 'Tu correo electrónico' : 'Your email address';
  const modalTitle = language === 'es' ? 'Enviar correo' : 'Send email';
  const contactBadge = language === 'es' ? 'Contacto' : 'Contact';
  const submitLabel = language === 'es' ? 'Abrir correo' : 'Open email';
  const privacyNotice = PRIVACY_NOTICE[language];
  const modalSubtitle =
    language === 'es'
      ? 'Antes de contactar, necesito registrar tu correo electrónico.'
      : 'Before contacting me, please provide your email address.';

  const closeEmailModal = () => {
    setIsEmailModalOpen(false);
    setSenderEmail('');
    setHasAcceptedPrivacy(false);
  };

  useEffect(() => {
    if (!isEmailModalOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeEmailModal();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isEmailModalOpen]);

  const handleEmailSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedEmail = senderEmail.trim();

    if (!normalizedEmail || !hasAcceptedPrivacy) {
      return;
    }

    const subject = encodeURIComponent(language === 'es' ? 'Contacto desde el portfolio' : 'Portfolio contact');
    const body = encodeURIComponent(
      `${language === 'es' ? 'Correo de contacto' : 'Contact email'}: ${normalizedEmail}\n\n${
        language === 'es' ? 'Mensaje' : 'Message'
      }:`,
    );

    closeEmailModal();
    window.location.href = `mailto:mariofdezrguez4@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <footer id="contact" className="px-6 pb-16 pt-20 lg:px-24">
        <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] via-black/45 to-black/80 p-7 shadow-[0_20px_50px_rgba(0,0,0,0.35)] md:p-10">
          <div className="mb-8 flex flex-col justify-between gap-8 md:flex-row md:items-start">
            <div>
              <p className="mb-3 inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.18em] text-accent">
                {contactBadge}
              </p>
              <h4 className="text-2xl font-black tracking-tight text-white">{authorName}</h4>
              <p className="mt-2 text-sm text-gray-300">{footerText.subtitle}</p>
            </div>

            <p className="max-w-sm text-sm text-gray-300 md:text-right">{footerText.collaboration}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setIsEmailModalOpen(true)}
              className="group inline-flex items-center gap-2 rounded-xl border border-accent/35 bg-accent/10 px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:text-black"
            >
              <Mail className="h-4 w-4" />
              <span>{footerText.email}</span>
            </button>

            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-sm font-medium text-gray-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
            >
              <Linkedin className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>
          </div>

          <div className="mt-10 border-t border-white/10 pt-5">
            <p className="text-xs font-mono text-gray-500">
              &copy; {new Date().getFullYear()} {authorName}
              {copyrightText ? `. ${copyrightText}` : ''}
            </p>
          </div>
        </div>
      </footer>

      {isEmailModalOpen ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center px-4">
          <button
            type="button"
            aria-label={language === 'es' ? 'Cerrar ventana' : 'Close window'}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeEmailModal}
          />

          <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-accent/35 bg-[#0b0b0b] p-6 shadow-[0_0_55px_rgba(6,182,212,0.22)]">
            <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-accent/20 blur-2xl" />

            <button
              type="button"
              onClick={closeEmailModal}
              className="absolute right-3 top-3 text-gray-500 transition-colors hover:text-white"
              aria-label={language === 'es' ? 'Cerrar' : 'Close'}
            >
              <X className="h-4 w-4" />
            </button>

            <h5 className="relative mb-2 text-xl font-bold text-white">{modalTitle}</h5>
            <p className="relative mb-5 text-sm text-gray-300">{modalSubtitle}</p>

            <form onSubmit={handleEmailSubmit} className="relative space-y-4">
              <input
                type="email"
                required
                autoFocus
                value={senderEmail}
                onChange={(event) => setSenderEmail(event.target.value)}
                placeholder={emailInputPlaceholder}
                className="w-full rounded-lg border border-white/20 bg-black/20 px-3 py-2.5 text-sm text-gray-100 outline-none transition-colors focus:border-accent"
              />

              <div className="space-y-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <p className="text-xs leading-relaxed text-gray-300">
                  {privacyNotice.summary} {privacyNotice.rights}
                </p>

                <label className="flex items-start gap-3 text-xs leading-relaxed text-gray-300">
                  <input
                    type="checkbox"
                    required
                    checked={hasAcceptedPrivacy}
                    onChange={(event) => setHasAcceptedPrivacy(event.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-white/20 bg-transparent text-accent focus:ring-accent"
                  />
                  <span>
                    {privacyNotice.checkboxLabel}{' '}
                    <a
                      href={PRIVACY_POLICY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent underline-offset-4 transition-colors hover:text-white hover:underline"
                    >
                      {privacyNotice.policyLinkLabel}
                    </a>
                    .
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-accent py-2.5 text-sm font-semibold text-black transition-colors hover:bg-accent-dim hover:text-white"
              >
                {submitLabel}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Footer;
