import React, { useEffect, useMemo, useState } from 'react';
import { Cog, Cpu, Gauge, Mail, Send, X } from 'lucide-react';
import { Language } from '../constants';
import RotatingModel from './RotatingModel';
import { withBasePath } from '../utils/paths';

const PROJECT_ACCESS_DESTINATION_EMAIL = 'mariofdezrguez4@gmail.com';
const PROJECT_ACCESS_REQUEST_ENDPOINT = `https://formsubmit.co/ajax/${PROJECT_ACCESS_DESTINATION_EMAIL}`;
const FULL_SYSTEM_MODEL_PATH = withBasePath('contenido/Render_Taladro_Cicloidal_.STL');
const GEOMETRY_MODEL_PATH = withBasePath('contenido/Disco_cicloidal.STL');
const CONTACT_MODEL_PATH = withBasePath('contenido/disco_pasadores.STL');
const REAL_USE_IMAGE_PATH = withBasePath('contenido/rad_eolic.jpg');
const REAL_USE_IMAGE_SECONDARY_PATH = withBasePath('contenido/brad_eolic2.jpg');
const SOLIDWORKS_AXIS_CORRECTION_X = Math.PI / 2;
const CONTACT_ISOMETRIC_TILT_X = Math.PI / 6;
const CONTACT_ISOMETRIC_TILT_Z = -Math.PI / 4;
const SECTION_SCROLL_OFFSET = 112;
const SECTION_OBSERVER_THRESHOLDS = [0, 0.15, 0.3, 0.45, 0.65, 0.85, 1];
const GEOMETRY_MODEL_VERTICAL_OFFSET = 18;
const GEOMETRY_MODEL_TARGET_SIZE = 136;
const CONTACT_MODEL_VERTICAL_OFFSET = 22;
const CONTACT_MODEL_TARGET_SIZE = 120;
const CONTACT_CAMERA_DISTANCE_MULTIPLIER = 1.85;
const CONTACT_CAMERA_HEIGHT_MULTIPLIER = 0.16;
const SYSTEM_MODEL_VERTICAL_OFFSET = 28;
const SYSTEM_MODEL_TARGET_SIZE = 112;
const SOFTWARE_LOGOS = [
  { name: 'Python', src: 'https://cdn.simpleicons.org/python/06b6d4' },
  { name: 'SolidWorks', src: 'https://cdn.simpleicons.org/dassaultsystemes/06b6d4' },
  { name: 'Siemens NX', src: 'https://cdn.simpleicons.org/siemens/06b6d4' },
];

interface ReductoraDetailProps {
  language: Language;
}

interface ReductoraSectionNavItem {
  id: string;
  label: string;
}

interface ProjectAccessRequestForm {
  fullName: string;
  email: string;
  organization: string;
  message: string;
  website: string;
}

interface OpenStageProps {
  children: React.ReactNode;
  className: string;
  label: string;
  note?: string;
  glowOrigin?: 'left' | 'right';
}

const OpenStage: React.FC<OpenStageProps> = ({
  children,
  className,
  label,
  note,
  glowOrigin = 'left',
}) => (
  <div className={`relative overflow-hidden ${className}`}>
    <div
      className={`pointer-events-none absolute inset-0 ${
        glowOrigin === 'left'
          ? 'bg-[radial-gradient(circle_at_18%_18%,rgba(6,182,212,0.22),transparent_32%),radial-gradient(circle_at_82%_58%,rgba(255,255,255,0.05),transparent_36%),linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.16)_72%,rgba(0,0,0,0.55)_100%)]'
          : 'bg-[radial-gradient(circle_at_80%_18%,rgba(6,182,212,0.22),transparent_32%),radial-gradient(circle_at_18%_60%,rgba(255,255,255,0.05),transparent_36%),linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.16)_72%,rgba(0,0,0,0.55)_100%)]'
      }`}
    />
    <div className="pointer-events-none absolute inset-x-12 bottom-8 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent" />
    <div className="pointer-events-none absolute inset-x-[18%] bottom-7 h-16 rounded-full bg-accent/10 blur-3xl" />
    <div className="pointer-events-none absolute left-4 top-4 z-20 border border-accent/30 bg-black/35 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
      {label}
    </div>
    {children}
    {note ? (
      <div className="pointer-events-none absolute bottom-5 right-4 z-20 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-gray-300">
        {note}
      </div>
    ) : null}
  </div>
);

const ReductoraDetail: React.FC<ReductoraDetailProps> = ({ language }) => {
  const copy = useMemo(
    () =>
      language === 'es'
        ? {
            backLink: 'Volver a Proyectos Destacados',
            badge: 'Proyecto de ingenier\u00eda mec\u00e1nica',
            heroTitle: 'Reductora cicloidal para apriete industrial',
            heroSubtitle: 'Desarrollo mec\u00e1nico orientado a precisi\u00f3n, durabilidad y alta capacidad de carga',
            heroTags: ['Optimizaci\u00f3n geom\u00e9trica', 'Param\u00e9trico', 'Transmisi\u00f3n de alto par'],
            heroJump: 'Explorar sistema',
            navOverview: 'Visi\u00f3n general',
            geometryTitle: 'Geometr\u00eda',
            geometryDescription:
              'Dados el n\u00famero de pasadores y el di\u00e1metro exterior, el programa calcula la geometr\u00eda optimizada del perfil cicloidal para mejorar el reparto de carga entre los elementos de contacto.',
            geometryStageLabel: 'Disco cicloidal',
            geometryStageNote: 'Pieza base',
            contactTitle: 'Contacto',
            contactDescription:
              'La optimizaci\u00f3n geom\u00e9trica permite aumentar el par de apriete disponible y reducir de forma significativa el error de transmisi\u00f3n.',
            contactStageLabel: 'Subconjunto cr\u00edtico',
            contactStageNote: 'Vista isom\u00e9trica inicial',
            systemTitle: 'Integraci\u00f3n del sistema',
            systemDescription:
              'El conjunto completo se desarroll\u00f3 con un enfoque estructural, funcional y de montaje, complementado con un estudio de elementos finitos para contrastar los resultados te\u00f3ricos y con una configuraci\u00f3n adaptable a las estructuras actualmente presentes en el mercado.',
            systemStageLabel: 'Sistema completo',
            systemStageNote: 'Vista general del conjunto',
            audienceBadge: 'Para qui\u00e9n est\u00e1 pensada',
            audienceTitle: 'Aplicaciones objetivo',
            audienceSubtitle:
              'Pensada para entornos industriales que exigen capacidad de carga, fiabilidad operativa e integraci\u00f3n con configuraciones estructurales ya implantadas.',
            sectorsLabel: 'Sectores',
            sectorsValue:
              'E\u00f3lico, naval, mantenimiento industrial, estructuras met\u00e1licas, energ\u00eda y otros sectores donde se requieren soluciones compactas, robustas y con elevada capacidad de transmisi\u00f3n.',
            audienceImageAlt: 'Aplicaci\u00f3n industrial de referencia en entorno e\u00f3lico',
            audienceImageAltSecondary: 'Segunda aplicaci\u00f3n industrial de referencia en entorno e\u00f3lico',
            closingTitle: 'Cierre',
            closingDescription:
              'Un proyecto de dise\u00f1o mec\u00e1nico donde geometr\u00eda, contacto e integraci\u00f3n se desarrollan como un mismo sistema.',
            downloadNote:
              'Si quieres revisar la versión completa del trabajo, puedes solicitar acceso y validaré la petición antes de facilitar el documento.',
            requestCta: 'SOLICITAR PROYECTO COMPLETO',
            requestBadge: 'Solicitud de acceso',
            requestTitle: 'Acceso al proyecto completo',
            requestDescription:
              'Indica quién eres y tu correo. La solicitud quedará registrada para revisar manualmente si se comparte la documentación completa.',
            requestFullNameLabel: 'Nombre y apellidos',
            requestFullNamePlaceholder: 'Tu nombre completo',
            requestEmailLabel: 'Correo electrónico',
            requestEmailPlaceholder: 'tu@empresa.com',
            requestOrganizationLabel: 'Empresa u organización',
            requestOrganizationPlaceholder: 'Empresa, universidad o entidad',
            requestMessageLabel: 'Motivo de la solicitud',
            requestMessagePlaceholder: 'Indica brevemente el contexto o el interés en el proyecto.',
            requestSubmitCta: 'Enviar solicitud',
            requestSubmitting: 'Enviando solicitud...',
            requestSuccess:
              'Solicitud registrada correctamente. Revisaré el acceso al documento completo.',
            requestMailtoSuccess:
              'Solicitud enviada correctamente. Recibiré el aviso en mi correo para revisar el acceso.',
            requestError:
              'No se ha podido registrar la solicitud. Prueba de nuevo o escríbeme directamente.',
            requestCloseAria: 'Cerrar ventana',
            requestViewerAria: 'Cerrar visor',
          }
        : {
            backLink: 'Back to Featured Projects',
            badge: 'Mechanical engineering project',
            heroTitle: 'Cycloidal reducer for industrial torque tools',
            heroSubtitle: 'Mechanical development focused on precision, durability, and high load capacity',
            heroTags: ['Geometric optimization', 'Parametric geometry', 'High-torque transmission'],
            heroJump: 'Explore system',
            navOverview: 'Overview',
            geometryTitle: 'Geometry',
            geometryDescription:
              'Given the number of pins and the outer diameter, the program computes the optimized cycloidal profile geometry to improve load distribution across the contact elements.',
            geometryStageLabel: 'Cycloidal disk',
            geometryStageNote: 'Base part',
            contactTitle: 'Contact',
            contactDescription:
              'Geometric optimization increases the available tightening torque while significantly reducing transmission error.',
            contactStageLabel: 'Critical subassembly',
            contactStageNote: 'Initial isometric view',
            systemTitle: 'System integration',
            systemDescription:
              'Development of the full assembly from a structural, functional, and integration standpoint, supported by a finite element study to verify the theoretical results and configured to adapt to structural layouts commonly found in current market applications.',
            systemStageLabel: 'Complete system',
            systemStageNote: 'Overall assembly view',
            audienceBadge: 'Intended applications',
            audienceTitle: 'Target applications',
            audienceSubtitle:
              'Designed for industrial environments that demand load capacity, operational reliability, and integration with structural layouts already used in the market.',
            sectorsLabel: 'Sectors',
            sectorsValue:
              'Wind energy, shipbuilding, industrial maintenance, steel structures, energy, and other sectors that require compact, robust, high-capacity transmission solutions.',
            audienceImageAlt: 'Reference industrial application in a wind-energy environment',
            audienceImageAltSecondary: 'Second reference industrial application in a wind-energy environment',
            closingTitle: 'Closing',
            closingDescription:
              'A mechanical design project where geometry, contact, and integration are developed as one system.',
            downloadNote:
              'If you want to review the complete work, you can request access and I will validate the request before sharing the full document.',
            requestCta: 'REQUEST FULL PROJECT',
            requestBadge: 'Access request',
            requestTitle: 'Access to the full project',
            requestDescription:
              'Tell me who you are and provide your email address. The request will be recorded so I can manually review whether to share the complete documentation.',
            requestFullNameLabel: 'Full name',
            requestFullNamePlaceholder: 'Your full name',
            requestEmailLabel: 'Email address',
            requestEmailPlaceholder: 'you@company.com',
            requestOrganizationLabel: 'Company or organization',
            requestOrganizationPlaceholder: 'Company, university, or institution',
            requestMessageLabel: 'Reason for the request',
            requestMessagePlaceholder: 'Briefly explain the context or your interest in the project.',
            requestSubmitCta: 'Send request',
            requestSubmitting: 'Sending request...',
            requestSuccess: 'Request submitted successfully. I will review access to the full document.',
            requestMailtoSuccess:
              'Request sent successfully. I will receive the email notification and review access.',
            requestError: 'The request could not be processed. Please try again or contact me directly.',
            requestCloseAria: 'Close window',
            requestViewerAria: 'Close viewer',
          },
    [language],
  );

  const [isAccessRequestOpen, setIsAccessRequestOpen] = useState(false);
  const [requestStatus, setRequestStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [requestFeedback, setRequestFeedback] = useState('');
  const [requestForm, setRequestForm] = useState<ProjectAccessRequestForm>({
    fullName: '',
    email: '',
    organization: '',
    message: '',
    website: '',
  });

  const sectionNavItems = useMemo<ReductoraSectionNavItem[]>(
    () => [
      { id: 'reductora-hero', label: copy.navOverview },
      { id: 'reductora-geometry', label: copy.geometryTitle },
      { id: 'reductora-contact', label: copy.contactTitle },
      { id: 'reductora-system', label: copy.systemTitle },
      { id: 'reductora-closing', label: copy.closingTitle },
    ],
    [
      copy.closingTitle,
      copy.contactTitle,
      copy.geometryTitle,
      copy.navOverview,
      copy.systemTitle,
    ],
  );
  const [activeSectionId, setActiveSectionId] = useState<string>(sectionNavItems[0].id);

  useEffect(() => {
    setActiveSectionId(sectionNavItems[0].id);
  }, [sectionNavItems]);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    if (!isAccessRequestOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isAccessRequestOpen]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (!isAccessRequestOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsAccessRequestOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAccessRequestOpen]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const sectionElements = sectionNavItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sectionElements.length) {
      return;
    }

    const visibilityBySection = new Map<string, number>();
    sectionNavItems.forEach((item) => visibilityBySection.set(item.id, 0));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.getAttribute('id');
          if (!sectionId) {
            return;
          }

          visibilityBySection.set(sectionId, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let bestSectionId = sectionNavItems[0].id;
        let bestVisibility = -1;

        visibilityBySection.forEach((visibility, sectionId) => {
          if (visibility > bestVisibility) {
            bestVisibility = visibility;
            bestSectionId = sectionId;
          }
        });

        setActiveSectionId((previousId) => (previousId === bestSectionId ? previousId : bestSectionId));
      },
      {
        rootMargin: '-28% 0px -50% 0px',
        threshold: SECTION_OBSERVER_THRESHOLDS,
      },
    );

    sectionElements.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionNavItems]);

  const handleSectionClick = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (!section) {
      return;
    }

    const nextTop = section.getBoundingClientRect().top + window.scrollY - SECTION_SCROLL_OFFSET;
    window.scrollTo({ top: Math.max(nextTop, 0), behavior: 'smooth' });
  };

  const handleRequestInputChange =
    (field: keyof ProjectAccessRequestForm) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setRequestForm((currentForm) => ({ ...currentForm, [field]: event.target.value }));

      if (requestStatus !== 'idle') {
        setRequestStatus('idle');
        setRequestFeedback('');
      }
    };

  const handleAccessRequestSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedForm = {
      fullName: requestForm.fullName.trim(),
      email: requestForm.email.trim(),
      organization: requestForm.organization.trim(),
      message: requestForm.message.trim(),
      website: requestForm.website.trim(),
    };

    if (normalizedForm.website) {
      setRequestStatus('success');
      setRequestFeedback(copy.requestSuccess);
      return;
    }

    if (!normalizedForm.fullName || !normalizedForm.email) {
      return;
    }

    setRequestStatus('submitting');
    setRequestFeedback('');

    try {
      const formData = new FormData();
      formData.append('name', normalizedForm.fullName);
      formData.append('email', normalizedForm.email);
      formData.append('_replyto', normalizedForm.email);
      formData.append(
        'organization',
        normalizedForm.organization || (language === 'es' ? 'No indicada' : 'Not provided'),
      );
      formData.append(
        'message',
        normalizedForm.message || (language === 'es' ? 'Sin mensaje adicional.' : 'No additional message.'),
      );
      formData.append('project', 'Reductora cicloidal');
      formData.append('language', language);
      formData.append('requested_at', new Date().toISOString());
      formData.append('_subject', 'Solicitud de acceso al proyecto completo | Reductora cicloidal');
      formData.append('_template', 'table');
      formData.append('_url', typeof window === 'undefined' ? '' : window.location.href);

      const response = await fetch(PROJECT_ACCESS_REQUEST_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });
      const payload = await response.json().catch(() => null);

      if (!response.ok || (payload && typeof payload === 'object' && 'success' in payload && payload.success === false)) {
        throw new Error('Request failed');
      }

      setRequestStatus('success');
      setRequestFeedback(copy.requestSuccess);
      setRequestForm({
        fullName: '',
        email: '',
        organization: '',
        message: '',
        website: '',
      });
    } catch {
      setRequestStatus('error');
      setRequestFeedback(copy.requestError);
    }
  };

  return (
    <section id="reductora" className="px-6 pb-28 pt-28 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <section id="reductora-hero" className="scroll-mt-32 pb-10">
          <div className="grid items-center gap-10">
            <div className="relative z-10 max-w-4xl">
              <p className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.18em] text-accent">
                {copy.badge}
              </p>
              <h1 className="mt-6 max-w-4xl text-3xl font-black leading-[1.04] tracking-tight text-white sm:text-4xl md:text-5xl xl:text-6xl">
                {copy.heroTitle}
              </h1>
              <p className="mt-4 text-base text-gray-300 md:text-lg">{copy.heroSubtitle}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {copy.heroTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => handleSectionClick('reductora-geometry')}
                  className="inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-5 py-2.5 text-sm font-semibold text-accent transition-all hover:bg-accent hover:text-black"
                >
                  {copy.heroJump}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="reductora-geometry" className="scroll-mt-32 py-10">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.46fr)_minmax(0,1.14fr)]">
            <div className="max-w-sm">
              <div className="mb-4 flex items-center gap-3">
                <Cog className="h-5 w-5 text-accent" />
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">{copy.geometryTitle}</h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-300 md:text-base">{copy.geometryDescription}</p>
            </div>

            <OpenStage
              className="h-[340px] md:h-[460px]"
              label={copy.geometryStageLabel}
              note={copy.geometryStageNote}
              glowOrigin="right"
            >
              <RotatingModel
                modelPath={GEOMETRY_MODEL_PATH}
                language={language}
                className="h-full w-full"
                verticalOffset={GEOMETRY_MODEL_VERTICAL_OFFSET}
                targetSize={GEOMETRY_MODEL_TARGET_SIZE}
                rotationOffsetX={SOLIDWORKS_AXIS_CORRECTION_X}
                interactive
                enableZoom={false}
                autoRotate={false}
              />
            </OpenStage>
          </div>
        </section>

        <section id="reductora-contact" className="scroll-mt-32 py-10">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.56fr)]">
            <OpenStage className="h-[340px] md:h-[460px]" label={copy.contactStageLabel} note={copy.contactStageNote}>
              <RotatingModel
                modelPath={CONTACT_MODEL_PATH}
                language={language}
                className="h-full w-full"
                verticalOffset={CONTACT_MODEL_VERTICAL_OFFSET}
                targetSize={CONTACT_MODEL_TARGET_SIZE}
                cameraDistanceMultiplier={CONTACT_CAMERA_DISTANCE_MULTIPLIER}
                cameraHeightMultiplier={CONTACT_CAMERA_HEIGHT_MULTIPLIER}
                rotationOffsetX={SOLIDWORKS_AXIS_CORRECTION_X + CONTACT_ISOMETRIC_TILT_X}
                rotationOffsetZ={CONTACT_ISOMETRIC_TILT_Z}
                autoRotate={false}
              />
            </OpenStage>

            <div className="max-w-sm justify-self-end">
              <div className="mb-4 flex items-center gap-3">
                <Gauge className="h-5 w-5 text-accent" />
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">{copy.contactTitle}</h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-300 md:text-base">{copy.contactDescription}</p>
            </div>
          </div>
        </section>

        <section id="reductora-system" className="scroll-mt-32 py-10">
          <div className="mb-6 max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <Cpu className="h-5 w-5 text-accent" />
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">{copy.systemTitle}</h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-300 md:text-base">{copy.systemDescription}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {SOFTWARE_LOGOS.map((logo) => (
                <div
                  key={logo.name}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_10px_24px_rgba(0,0,0,0.18)] transition-transform duration-300 hover:-translate-y-1 hover:border-accent/35"
                  aria-label={logo.name}
                  title={logo.name}
                >
                  <img src={logo.src} alt={logo.name} className="h-6 w-6 object-contain" loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-10">
            <OpenStage
              className="h-[420px] md:h-[560px]"
              label={copy.systemStageLabel}
              note={copy.systemStageNote}
              glowOrigin="right"
            >
              <RotatingModel
                modelPath={FULL_SYSTEM_MODEL_PATH}
                language={language}
                className="h-full w-full"
                verticalOffset={SYSTEM_MODEL_VERTICAL_OFFSET}
                targetSize={SYSTEM_MODEL_TARGET_SIZE}
              />
            </OpenStage>

            <article className="w-full rounded-2xl border border-white/10 bg-black/35 p-6 md:p-7">
              <p className="inline-flex rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.18em] text-accent">
                {copy.audienceBadge}
              </p>
              <div className="mt-5 grid items-center gap-4 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.2fr)_minmax(0,0.72fr)]">
                <div className="overflow-hidden rounded-xl border border-white/10 bg-black/25 justify-self-center">
                  <img
                    src={REAL_USE_IMAGE_PATH}
                    alt={copy.audienceImageAlt}
                    className="h-48 w-full max-w-[390px] object-cover md:h-56"
                    loading="lazy"
                  />
                </div>
                <div className="rounded-xl border border-white/10 bg-black/25 p-5 text-center">
                  <h3 className="text-2xl font-bold tracking-tight text-white">{copy.audienceTitle}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-300 md:text-base">{copy.audienceSubtitle}</p>
                  <p className="mt-5 text-[11px] font-mono uppercase tracking-[0.18em] text-gray-400">
                    {copy.sectorsLabel}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-200">{copy.sectorsValue}</p>
                </div>
                <div className="overflow-hidden rounded-xl border border-white/10 bg-black/25 justify-self-center">
                  <img
                    src={REAL_USE_IMAGE_SECONDARY_PATH}
                    alt={copy.audienceImageAltSecondary}
                    className="h-40 w-full max-w-[320px] object-cover md:h-48"
                    loading="lazy"
                  />
                </div>
              </div>
            </article>
          </div>
        </section>

        <section id="reductora-closing" className="scroll-mt-32 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-accent">{copy.closingTitle}</p>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-white md:text-4xl">
              {copy.closingDescription}
            </h2>
            {copy.downloadNote ? <p className="mt-5 text-sm text-gray-400">{copy.downloadNote}</p> : null}

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setRequestStatus('idle');
                  setRequestFeedback('');
                  setIsAccessRequestOpen(true);
                }}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-accent-dim hover:text-white"
              >
                <Mail className="h-4 w-4" />
                {copy.requestCta}
              </button>
              <a
                href="#projects"
                className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:border-accent/35 hover:text-accent"
              >
                {copy.backLink}
              </a>
            </div>
          </div>
        </section>
      </div>

      {isAccessRequestOpen ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center px-4 py-8">
          <button
            type="button"
            aria-label={copy.requestCloseAria}
            className="absolute inset-0 bg-black/82 backdrop-blur-sm"
            onClick={() => setIsAccessRequestOpen(false)}
          />

          <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0a0a0a] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.55)] md:p-7">
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/20 blur-3xl" />

            <button
              type="button"
              aria-label={copy.requestCloseAria}
              onClick={() => setIsAccessRequestOpen(false)}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-gray-300 transition-all hover:border-accent/35 hover:text-accent"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative">
              <p className="inline-flex rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.18em] text-accent">
                {copy.requestBadge}
              </p>
              <h3 className="mt-4 text-2xl font-black tracking-tight text-white md:text-3xl">{copy.requestTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-300">{copy.requestDescription}</p>

              <form onSubmit={handleAccessRequestSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                    {copy.requestFullNameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={requestForm.fullName}
                    onChange={handleRequestInputChange('fullName')}
                    placeholder={copy.requestFullNamePlaceholder}
                    className="w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-accent/45"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                      {copy.requestEmailLabel}
                    </label>
                    <input
                      type="email"
                      required
                      value={requestForm.email}
                      onChange={handleRequestInputChange('email')}
                      placeholder={copy.requestEmailPlaceholder}
                      className="w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-accent/45"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                      {copy.requestOrganizationLabel}
                    </label>
                    <input
                      type="text"
                      value={requestForm.organization}
                      onChange={handleRequestInputChange('organization')}
                      placeholder={copy.requestOrganizationPlaceholder}
                      className="w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-accent/45"
                    />
                  </div>
                </div>

                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={requestForm.website}
                  onChange={handleRequestInputChange('website')}
                  className="hidden"
                />

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                    {copy.requestMessageLabel}
                  </label>
                  <textarea
                    rows={5}
                    value={requestForm.message}
                    onChange={handleRequestInputChange('message')}
                    placeholder={copy.requestMessagePlaceholder}
                    className="w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-accent/45"
                  />
                </div>

                {requestFeedback ? (
                  <p
                    className={`text-sm ${
                      requestStatus === 'error' ? 'text-red-300' : 'text-emerald-300'
                    }`}
                  >
                    {requestFeedback}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={requestStatus === 'submitting'}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-accent-dim hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <Send className="h-4 w-4" />
                  {requestStatus === 'submitting' ? copy.requestSubmitting : copy.requestSubmitCta}
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default ReductoraDetail;
