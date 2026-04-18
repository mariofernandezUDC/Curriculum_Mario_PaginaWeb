import { withBasePath } from './paths';

type PrivacyLanguage = 'es' | 'en';

export const PRIVACY_POLICY_URL = withBasePath('privacy-policy.html');

export const PRIVACY_NOTICE: Record<
  PrivacyLanguage,
  {
    summary: string;
    rights: string;
    checkboxLabel: string;
    policyLinkLabel: string;
  }
> = {
  es: {
    summary:
      'Tus datos se usarán únicamente para responder a tu mensaje o gestionar tu solicitud. No se utilizarán para spam ni para fines comerciales ajenos a este contacto.',
    rights:
      'Puedes solicitar acceso, rectificación o eliminación escribiendo a mariofdezrguez4@gmail.com.',
    checkboxLabel:
      'He leído y acepto la política de privacidad y el tratamiento de mis datos para esta finalidad.',
    policyLinkLabel: 'Política de privacidad',
  },
  en: {
    summary:
      'Your data will only be used to answer your message or manage your request. It will not be used for spam or unrelated marketing purposes.',
    rights:
      'You can request access, correction, or deletion by writing to mariofdezrguez4@gmail.com.',
    checkboxLabel: 'I have read and accept the privacy policy and the processing of my data for this purpose.',
    policyLinkLabel: 'Privacy policy',
  },
};
