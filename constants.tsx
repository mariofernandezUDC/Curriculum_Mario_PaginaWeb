import { CertificationCourse, EducationItem, ExperienceItem, ProjectItem, SkillGroup } from './types';

import { withBasePath } from './utils/paths';

export type Language = 'es' | 'en';

export interface HeroData {
  name: string;
  title: string;
  description: string;
  image: string;
  cvUrl: string;
  linkedinUrl: string;
}

interface LanguageData {
  language: string;
  level: string;
  logoUrl?: string;
  logoLabel?: string;
}

interface UiText {
  metaTitle: string;
  nav: {
    home: string;
    experience: string;
    education: string;
    projects: string;
    skills: string;
    contact: string;
    backToProjects: string;
    back: string;
    menu: string;
  };
  hero: {
    badge: string;
    downloadCv: string;
    linkedin: string;
    viewExperience: string;
  };
  experience: {
    title: string;
  };
  education: {
    title: string;
    certificationsTitle: string;
    certificationsSubtitle: string;
  };
  projects: {
    title: string;
    openReductoraDetailAria: string;
  };
  skills: {
    title: string;
    logosTitle: string;
    languagesTitle: string;
  };
  footer: {
    subtitle: string;
    collaboration: string;
    email: string;
    copyright: string;
  };
  reductora: {
    backLink: string;
    title: string;
    subtitle: string;
    heroHighlight: string;
    heroPill1: string;
    heroPill2: string;
    heroPill3: string;
    imageAlt: string;
    summary: string;
    contextTitle: string;
    developedTitle: string;
    developedItem1: string;
    developedItem2: string;
    developedItem3: string;
    methodologyTitle: string;
    resultsTitle: string;
    technologiesTitle: string;
    technologiesSummary: string;
    closingTitle: string;
    closingDescription: string;
    keyPointFocusLabel: string;
    keyPointFocusValue: string;
    keyPointToolsLabel: string;
    keyPointToolsValue: string;
    keyPointResultLabel: string;
    keyPointResultValue: string;
    processStep1Title: string;
    processStep1Description: string;
    processStep2Title: string;
    processStep2Description: string;
    processStep3Title: string;
    processStep3Description: string;
    downloadNote: string;
    downloadCta: string;
  };
}

const LOGO_URLS = {
  siemens: 'https://cdn.simpleicons.org/siemens/06b6d4',
  python: 'https://cdn.simpleicons.org/python/06b6d4',
  openai: 'https://cdn.simpleicons.org/openai/06b6d4',
  microsoft: withBasePath('contenido/Microsoft_logo.png'),
  sandvik: withBasePath('contenido/sandvik_logo.png'),
  bureauveritas: withBasePath('contenido/bureau_veritas_logo.png'),
  autodesk: 'https://cdn.simpleicons.org/autodesk/06b6d4',
  dassault: 'https://cdn.simpleicons.org/dassaultsystemes/06b6d4',
  arduino: 'https://cdn.simpleicons.org/arduino/06b6d4',
  cplusplus: 'https://cdn.simpleicons.org/cplusplus/06b6d4',
  ptc: 'https://cdn.simpleicons.org/ptc/06b6d4',
  sap: 'https://cdn.simpleicons.org/sap/06b6d4',
  windchill: withBasePath('contenido/Windchill_logo.png'),
  navantia: withBasePath('contenido/Navantia_logo.png'),
  texasControls: withBasePath('contenido/texas_logo.png'),
  britishCouncil: withBasePath('contenido/British_Council_logo.png'),
  foran: withBasePath('contenido/Navantia_logo.png'),
  autocad: 'https://cdn.simpleicons.org/autodesk/06b6d4',
  microstation: 'https://cdn.simpleicons.org/bentley/06b6d4',
  excel: withBasePath('logos/excel.svg'),
  sql: 'https://cdn.simpleicons.org/postgresql/06b6d4',
  access: withBasePath('logos/access.svg'),
  vibecode: withBasePath('logos/codex.svg'),
};

const HERO_DATA: Record<Language, HeroData> = {
  es: {
    name: 'Mario Fernández',
    title: 'Ingeniero Mecánico · Estudiante del Máster en Ingeniería Industrial',
    description:
      'Perfil proactivo y analítico, enfocado en conectar el diseño CAD avanzado con la realidad de la fabricación industrial y la gestión de la calidad.',
    image: withBasePath('contenido/mario.png'),
    cvUrl: withBasePath('contenido/CV_Mario_Fernandez.pdf'),
    linkedinUrl: 'https://www.linkedin.com/in/mario-fern%C3%A1ndez-rodr%C3%ADguez-072393204/',
  },
  en: {
    name: 'Mario Fernández',
    title: 'Mechanical Engineer · Industrial Engineering Master\u2019s Student',
    description:
      'Proactive and analytical engineer focused on connecting advanced CAD design with real-world manufacturing and quality management.',
    image: withBasePath('contenido/mario.png'),
    cvUrl: withBasePath('contenido/CV_Mario_Fernandez.pdf'),
    linkedinUrl: 'https://www.linkedin.com/in/mario-fern%C3%A1ndez-rodr%C3%ADguez-072393204/',
  },
};

const EXPERIENCE_DATA: Record<Language, ExperienceItem[]> = {
  es: [
    {
      id: 'exp-1',
      company: 'Navantia',
      logoUrl: LOGO_URLS.navantia,
      companyUrl: 'https://www.navantia.es/es/',
      role: 'Ingenier\u00EDa mec\u00E1nica de sistemas auxiliares',
      period: 'Actualidad',
      technologies: ['Fragata F110', 'Windchill PLM', 'SAP', 'Python', 'Siemens NX', 'Foran'],
      isCurrent: true,
    },
    {
      id: 'exp-2',
      company: 'Texas Controls',
      logoUrl: LOGO_URLS.texasControls,
      companyUrl: 'https://texascontrols.com/',
      role: 'Oficina T\u00E9cnica',
      period: '2024',
      technologies: ['SolidWorks', 'Herramientas de apriete industrial'],
      isCurrent: false,
    },
  ],
  en: [
    {
      id: 'exp-1',
      company: 'Navantia',
      logoUrl: LOGO_URLS.navantia,
      companyUrl: 'https://www.navantia.es/es/',
      role: 'Mechanical Engineering - Auxiliary Systems',
      period: 'Present',
      technologies: ['F110 Frigate', 'Windchill PLM', 'SAP', 'Python', 'Siemens NX', 'Foran'],
      isCurrent: true,
    },
    {
      id: 'exp-2',
      company: 'Texas Controls',
      logoUrl: LOGO_URLS.texasControls,
      companyUrl: 'https://texascontrols.com/',
      role: 'Technical Office',
      period: '2024',
      technologies: ['SolidWorks', 'Industrial Torque Tools'],
      isCurrent: false,
    },
  ],
};

const EDUCATION_DATA: Record<Language, EducationItem[]> = {
  es: [
    {
      id: 'edu-1',
      title: 'M\u00E1ster en Ingenier\u00EDa Industrial',
      studyUrl: 'https://estudos.udc.es/es/study/start/4497v03',
      details: ['Especializaci\u00F3n en gesti\u00F3n y procesos industriales.'],
      period: 'En curso',
    },
    {
      id: 'edu-2',
      title: 'Grado en Ingenier\u00EDa Mec\u00E1nica',
      studyUrl: 'https://estudos.udc.es/es/study/start/730g03v01',
      details: ['Menci\u00F3n en M\u00E1quinas.'],
      period: 'Finalizado',
    },
  ],
  en: [
    {
      id: 'edu-1',
      title: 'MSc in Industrial Engineering',
      studyUrl: 'https://estudos.udc.es/es/study/start/4497v03',
      details: ['Specialization in industrial management and processes.'],
      period: 'In progress',
    },
    {
      id: 'edu-2',
      title: 'BSc in Mechanical Engineering',
      studyUrl: 'https://estudos.udc.es/es/study/start/730g03v01',
      details: ['Specialization in Machines.'],
      period: 'Completed',
    },
  ],
};

const CERTIFICATION_COURSES_DATA: Record<Language, CertificationCourse[]> = {
  es: [
    {
      id: 'cert-1',
      title: 'Siemens NX - CAD (Nivel b\u00E1sico)',
      provider: 'Siemens',
      logoUrl: LOGO_URLS.siemens,
      details: 'UDC | 2023 | 15 horas',
    },
    {
      id: 'cert-2',
      title: 'Siemens NX - CAD (Nivel intermedio)',
      provider: 'Siemens',
      logoUrl: LOGO_URLS.siemens,
      details: 'UDC | 2023 | 15 horas',
    },
    {
      id: 'cert-3',
      title: 'Siemens NX - CAM',
      provider: 'Siemens',
      logoUrl: LOGO_URLS.siemens,
      details: 'CIFP Ferrolterra | 2025 | 70 horas',
    },
    {
      id: 'cert-4',
      title: 'Inteligencia Artificial (IA)',
      provider: 'Microsoft',
      logoUrl: LOGO_URLS.microsoft,
      details: 'Founderz / Microsoft | 2025 | 8 horas',
    },
    {
      id: 'cert-5',
      title: 'Metal Cutting Technology',
      provider: 'Sandvik Coromant',
      logoUrl: LOGO_URLS.sandvik,
      details: 'Sandvik Coromant Academy | 2025 | 24 horas',
    },
    {
      id: 'cert-6',
      title: 'Python aplicado al C\u00E1lculo Cient\u00EDfico',
      provider: 'Python',
      logoUrl: LOGO_URLS.python,
      details: 'Universidad de A Coru\u00F1a | 2025 | 10 horas',
    },
    {
      id: 'cert-7',
      title: 'Curso b\u00E1sico de PRL',
      provider: 'Bureau Veritas',
      logoUrl: LOGO_URLS.bureauveritas,
      details: 'Bureau Veritas Business School | 2025 | 50 horas',
    },
  ],
  en: [
    {
      id: 'cert-1',
      title: 'Siemens NX - CAD (Basic level)',
      provider: 'Siemens',
      logoUrl: LOGO_URLS.siemens,
      details: 'UDC | 2023 | 15 hours',
    },
    {
      id: 'cert-2',
      title: 'Siemens NX - CAD (Intermediate level)',
      provider: 'Siemens',
      logoUrl: LOGO_URLS.siemens,
      details: 'UDC | 2023 | 15 hours',
    },
    {
      id: 'cert-3',
      title: 'Siemens NX - CAM',
      provider: 'Siemens',
      logoUrl: LOGO_URLS.siemens,
      details: 'CIFP Ferrolterra | 2025 | 70 hours',
    },
    {
      id: 'cert-4',
      title: 'Artificial Intelligence (AI)',
      provider: 'Microsoft',
      logoUrl: LOGO_URLS.microsoft,
      details: 'Founderz / Microsoft | 2025 | 8 hours',
    },
    {
      id: 'cert-5',
      title: 'Metal Cutting Technology',
      provider: 'Sandvik Coromant',
      logoUrl: LOGO_URLS.sandvik,
      details: 'Sandvik Coromant Academy | 2025 | 24 hours',
    },
    {
      id: 'cert-6',
      title: 'Python for Scientific Computing',
      provider: 'Python',
      logoUrl: LOGO_URLS.python,
      details: 'University of A Coru\u00F1a | 2025 | 10 hours',
    },
    {
      id: 'cert-7',
      title: 'Basic Occupational Risk Prevention Course',
      provider: 'Bureau Veritas',
      logoUrl: LOGO_URLS.bureauveritas,
      details: 'Bureau Veritas Business School | 2025 | 50 hours',
    },
  ],
};

const PROJECTS_DATA: Record<Language, ProjectItem[]> = {
  es: [
    {
      id: 'proj-1',
      title: 'Reductora cicloidal para apriete industrial',
      description:
        'Dise\u00F1o y evaluaci\u00F3n de viabilidad de una reductora cicloidal para apriete industrial, con modelado y optimizaci\u00F3n geom\u00E9trica en Python.',
      visualType: 'image',
      visualContent: withBasePath('contenido/pistola.png'),
      tags: ['Python', 'NSGA-II', 'SolidWorks', 'Siemens NX CAM'],
      size: 'large',
    },
    {
      id: 'proj-2',
      title: 'Nave industrial en BIM',
      description: 'Modelado estructural y coordinaci\u00F3n de instalaciones.',
      visualType: 'wireframe',
      visualContent: withBasePath('contenido/nave.png'),
      tags: ['Revit', 'BIM', 'Estructuras'],
      size: 'normal',
    },
    {
      id: 'proj-4',
      title: 'F1 por superficies',
      status: 'in-progress',
      description:
        'Dise\u00F1o conceptual de un monoplaza de F1 mediante modelado de superficies en SolidWorks. Proyecto actualmente en desarrollo.',
      visualType: 'model',
      visualContent: withBasePath('contenido/F1.STL'),
      tags: ['SolidWorks', 'Superficies', 'Dise\u00F1o conceptual'],
      size: 'large',
    },
  ],
  en: [
    {
      id: 'proj-1',
      title: 'Cycloidal Reducer for Industrial Torque Tools',
      description:
        'Design and feasibility assessment of a cycloidal reducer for industrial torque tools, supported by geometric modeling and optimization in Python.',
      visualType: 'image',
      visualContent: withBasePath('contenido/pistola.png'),
      tags: ['Python', 'NSGA-II', 'SolidWorks', 'Siemens NX CAM'],
      size: 'large',
    },
    {
      id: 'proj-2',
      title: 'Industrial Building in BIM',
      description: 'Structural modeling and building-services coordination.',
      visualType: 'wireframe',
      visualContent: withBasePath('contenido/nave.png'),
      tags: ['Revit', 'BIM', 'Structures'],
      size: 'normal',
    },
    {
      id: 'proj-4',
      title: 'F1 Surface Modeling',
      status: 'in-progress',
      description:
        'Conceptual F1 single-seater design through surface modeling in SolidWorks. Project currently in development.',
      visualType: 'model',
      visualContent: withBasePath('contenido/F1.STL'),
      tags: ['SolidWorks', 'Surfaces', 'Concept design'],
      size: 'large',
    },
  ],
};

const SKILLS_DATA: Record<Language, SkillGroup[]> = {
  es: [
    {
      category: 'Dise\u00F1o Mec\u00E1nico',
      items: [
        { name: 'Siemens NX', level: 82, logoUrl: LOGO_URLS.siemens },
        { name: 'Foran (Naval)', level: 68, logoUrl: LOGO_URLS.foran },
        { name: 'AutoCAD', level: 74, logoUrl: LOGO_URLS.autocad },
        { name: 'SolidWorks', level: 86, logoUrl: LOGO_URLS.dassault },
        { name: 'MicroStation', level: 62, logoUrl: LOGO_URLS.microstation },
      ],
    },
    {
      category: 'Programaci\u00F3n',
      items: [
        { name: 'Python', level: 72, logoUrl: LOGO_URLS.python },
        { name: 'VibeCode', level: 88, logoUrl: LOGO_URLS.vibecode },
        { name: 'Arduino', level: 60, logoUrl: LOGO_URLS.arduino },
      ],
    },
    {
      category: 'Datos y Ofim\u00E1tica',
      items: [
        { name: 'Excel', level: 90, logoUrl: LOGO_URLS.excel },
        { name: 'SQL', level: 35, logoUrl: LOGO_URLS.sql },
        { name: 'Access', level: 28, logoUrl: LOGO_URLS.access },
      ],
    },
    {
      category: 'Gesti\u00F3n Industrial',
      items: [
        { name: 'Windchill PLM', level: 80, logoUrl: LOGO_URLS.windchill },
        { name: 'SAP', level: 50, logoUrl: LOGO_URLS.sap },
      ],
    },
  ],
  en: [
    {
      category: 'Mechanical Design',
      items: [
        { name: 'Siemens NX', level: 82, logoUrl: LOGO_URLS.siemens },
        { name: 'Foran (Naval)', level: 68, logoUrl: LOGO_URLS.foran },
        { name: 'AutoCAD', level: 74, logoUrl: LOGO_URLS.autocad },
        { name: 'SolidWorks', level: 86, logoUrl: LOGO_URLS.dassault },
        { name: 'MicroStation', level: 62, logoUrl: LOGO_URLS.microstation },
      ],
    },
    {
      category: 'Programming',
      items: [
        { name: 'Python', level: 72, logoUrl: LOGO_URLS.python },
        { name: 'VibeCode', level: 88, logoUrl: LOGO_URLS.vibecode },
        { name: 'Arduino', level: 60, logoUrl: LOGO_URLS.arduino },
      ],
    },
    {
      category: 'Data & Office',
      items: [
        { name: 'Excel', level: 90, logoUrl: LOGO_URLS.excel },
        { name: 'SQL', level: 35, logoUrl: LOGO_URLS.sql },
        { name: 'Access', level: 28, logoUrl: LOGO_URLS.access },
      ],
    },
    {
      category: 'Industrial Management',
      items: [
        { name: 'Windchill PLM', level: 80, logoUrl: LOGO_URLS.windchill },
        { name: 'SAP', level: 50, logoUrl: LOGO_URLS.sap },
      ],
    },
  ],
};

const LANGUAGES_DATA: Record<Language, LanguageData[]> = {
  es: [
    { language: 'Espa\u00F1ol', level: 'Nativo' },
    {
      language: 'Ingl\u00E9s',
      level: 'C1 (Advanced)',
      logoUrl: LOGO_URLS.britishCouncil,
      logoLabel: 'British Council',
    },
  ],
  en: [
    { language: 'Spanish', level: 'Native' },
    {
      language: 'English',
      level: 'C1 (Advanced)',
      logoUrl: LOGO_URLS.britishCouncil,
      logoLabel: 'British Council',
    },
  ],
};

export const UI_TEXT: Record<Language, UiText> = {
  es: {
    metaTitle: 'Mario Fernández | Ingeniero Mecánico',
    nav: {
      home: 'Inicio',
      experience: 'Experiencia',
      education: 'Formaci\u00F3n',
      projects: 'Proyectos',
      skills: 'Habilidades e Idiomas',
      contact: 'Contacto',
      backToProjects: 'Volver a Proyectos',
      back: 'Volver',
      menu: 'Men\u00FA',
    },
    hero: {
      badge: 'Portfolio profesional',
      downloadCv: 'DESCARGAR CV',
      linkedin: 'LINKEDIN',
      viewExperience: 'VER EXPERIENCIA',
    },
    experience: {
      title: 'Experiencia profesional',
    },
    education: {
      title: 'Formaci\u00F3n acad\u00E9mica',
      certificationsTitle: 'Cursos y Certificaciones',
      certificationsSubtitle: 'En este bloque se muestran cursos t\u00E9cnicos con su marca asociada.',
    },
    projects: {
      title: 'Proyectos Destacados',
      openReductoraDetailAria: 'Abrir detalle de la reductora cicloidal para apriete industrial',
    },
    skills: {
      title: 'Habilidades t\u00E9cnicas',
      logosTitle: 'Logos del Stack',
      languagesTitle: 'Idiomas',
    },
    footer: {
      subtitle: 'Ingeniero mec\u00E1nico',
      collaboration: 'Disponible para colaboraciones y oportunidades profesionales.',
      email: 'Correo',
      copyright: '',
    },
    reductora: {
      backLink: 'Volver a Proyectos Destacados',
      title: 'Reductora cicloidal para apriete industrial',
      subtitle: 'Dise\u00F1o, modelado y evaluaci\u00F3n de viabilidad con enfoque en aplicaci\u00F3n real.',
      heroHighlight:
        'Un desarrollo mec\u00E1nico orientado a transmitir alto par en formato compacto, respaldado por modelado geom\u00E9trico y an\u00E1lisis num\u00E9rico.',
      heroPill1: 'Compacidad',
      heroPill2: 'Transmisi\u00F3n de carga',
      heroPill3: 'Viabilidad t\u00E9cnica',
      imageAlt: 'Render del proyecto de reductora cicloidal',
      summary:
        'El proyecto aborda el dise\u00F1o de una reductora cicloidal orientada a herramientas de apriete industrial, buscando un equilibrio entre compactaci\u00F3n, capacidad de transmisi\u00F3n y factibilidad mec\u00E1nica.',
      contextTitle: 'Contexto industrial',
      developedTitle: 'Qu\u00E9 se desarroll\u00F3',
      developedItem1:
        'Dise\u00F1o de una reductora cicloidal orientada a herramientas de apriete industrial.',
      developedItem2: 'Optimizaci\u00F3n geom\u00E9trica del perfil cicloidal para mejorar el comportamiento mec\u00E1nico.',
      developedItem3:
        'An\u00E1lisis del contacto disco-pasador y evaluaci\u00F3n del reparto de carga y fuerzas transmitidas.',
      methodologyTitle: 'Metodolog\u00EDa de ingenier\u00EDa',
      resultsTitle: 'Aportaciones clave',
      technologiesTitle: 'Tecnolog\u00EDas utilizadas',
      technologiesSummary:
        'Python se utiliz\u00F3 como eje principal para modelado, simulaci\u00F3n y optimizaci\u00F3n, apoyado en herramientas de c\u00E1lculo num\u00E9rico para validar el dise\u00F1o.',
      closingTitle: 'Valor del proyecto',
      closingDescription:
        'No es solo un ejercicio acad\u00E9mico: es un desarrollo de ingenier\u00EDa con base anal\u00EDtica y orientaci\u00F3n clara a aplicaci\u00F3n industrial.',
      keyPointFocusLabel: 'Foco t\u00E9cnico',
      keyPointFocusValue: 'Compacidad y capacidad de transmisi\u00F3n de par',
      keyPointToolsLabel: 'Rigor anal\u00EDtico',
      keyPointToolsValue: 'Modelado y simulaci\u00F3n num\u00E9rica en Python',
      keyPointResultLabel: 'Resultado de viabilidad',
      keyPointResultValue: 'Base t\u00E9cnica s\u00F3lida para evolucionar hacia un dise\u00F1o industrial',
      processStep1Title: 'Modelado geom\u00E9trico',
      processStep1Description:
        'Definici\u00F3n del perfil cicloidal y ajuste de par\u00E1metros geom\u00E9tricos para una arquitectura compacta.',
      processStep2Title: 'Simulaci\u00F3n y optimizaci\u00F3n',
      processStep2Description:
        'Evaluaci\u00F3n del contacto disco-pasador, esfuerzos y fuerzas transmitidas mediante c\u00E1lculo num\u00E9rico en Python.',
      processStep3Title: 'Evaluaci\u00F3n de viabilidad',
      processStep3Description:
        'An\u00E1lisis del reparto de carga entre elementos activos y validaci\u00F3n del potencial de aplicaci\u00F3n industrial.',
      downloadNote:
        'Consulta la versi\u00F3n resumida para revisar el enfoque t\u00E9cnico y la l\u00F3gica de dise\u00F1o aplicados al caso.',
      downloadCta: 'DESCARGAR PROYECTO',
    },
  },
  en: {
    metaTitle: 'Mario Fernández | Mechanical Engineer',
    nav: {
      home: 'Home',
      experience: 'Experience',
      education: 'Education',
      projects: 'Projects',
      skills: 'Skills and Languages',
      contact: 'Contact',
      backToProjects: 'Back to Projects',
      back: 'Back',
      menu: 'Menu',
    },
    hero: {
      badge: 'Professional portfolio',
      downloadCv: 'DOWNLOAD CV',
      linkedin: 'LINKEDIN',
      viewExperience: 'VIEW EXPERIENCE',
    },
    experience: {
      title: 'Professional Experience',
    },
    education: {
      title: 'Academic Background',
      certificationsTitle: 'Courses and Certifications',
      certificationsSubtitle: 'This section lists technical courses together with their associated brand.',
    },
    projects: {
      title: 'Featured Projects',
      openReductoraDetailAria: 'Open the cycloidal reducer for industrial torque tools detail page',
    },
    skills: {
      title: 'Technical Skills',
      logosTitle: 'Stack Logos',
      languagesTitle: 'Languages',
    },
    footer: {
      subtitle: 'Mechanical engineer',
      collaboration: 'Available for professional collaborations and opportunities.',
      email: 'Email',
      copyright: '',
    },
    reductora: {
      backLink: 'Back to Featured Projects',
      title: 'Cycloidal reducer for industrial torque tools',
      subtitle: 'Design, modeling, and feasibility assessment with a real-application focus.',
      heroHighlight:
        'A mechanical development aimed at high torque transmission in a compact envelope, supported by geometric modeling and numerical analysis.',
      heroPill1: 'Compactness',
      heroPill2: 'Load transmission',
      heroPill3: 'Technical feasibility',
      imageAlt: 'Render of the cycloidal reducer project',
      summary:
        'The project addresses the design of a cycloidal reducer for industrial torque tools, balancing compactness, transmission capacity, and mechanical feasibility.',
      contextTitle: 'Industrial context',
      developedTitle: 'What was developed',
      developedItem1: 'Design of a cycloidal reducer for industrial torque tools.',
      developedItem2: 'Geometric optimization of the cycloidal profile to improve mechanical behavior.',
      developedItem3:
        'Disk-pin contact analysis and evaluation of load sharing and transmitted forces.',
      methodologyTitle: 'Engineering methodology',
      resultsTitle: 'Key contributions',
      technologiesTitle: 'Technologies used',
      technologiesSummary:
        'Python was the core environment for modeling, simulation, and optimization, supported by numerical analysis tools to validate the design.',
      closingTitle: 'Project value',
      closingDescription:
        'More than an academic exercise: an engineering development with analytical rigor and clear industrial application potential.',
      keyPointFocusLabel: 'Technical focus',
      keyPointFocusValue: 'Compactness and torque transmission capability',
      keyPointToolsLabel: 'Analytical rigor',
      keyPointToolsValue: 'Modeling and numerical simulation in Python',
      keyPointResultLabel: 'Feasibility outcome',
      keyPointResultValue: 'Solid technical basis for further industrial development',
      processStep1Title: 'Geometric modeling',
      processStep1Description:
        'Cycloidal profile definition and geometric parameter tuning for a compact architecture.',
      processStep2Title: 'Simulation and optimization',
      processStep2Description:
        'Disk-pin contact, stresses, and transmitted forces assessed through numerical analysis in Python.',
      processStep3Title: 'Feasibility assessment',
      processStep3Description:
        'Load-sharing evaluation across active elements and validation of industrial application potential.',
      downloadNote:
        'Open the summarized version to review the technical approach and design logic behind the case.',
      downloadCta: 'DOWNLOAD PROJECT',
    },
  },
};

export const getHeroData = (language: Language): HeroData => HERO_DATA[language];

export const getExperienceData = (language: Language): ExperienceItem[] => EXPERIENCE_DATA[language];

export const getEducationData = (language: Language): EducationItem[] => EDUCATION_DATA[language];

export const getCertificationCoursesData = (language: Language): CertificationCourse[] =>
  CERTIFICATION_COURSES_DATA[language];

export const getProjectsData = (language: Language): ProjectItem[] => PROJECTS_DATA[language];

export const getSkillsData = (language: Language): SkillGroup[] => SKILLS_DATA[language];

export const getLanguagesData = (language: Language): LanguageData[] => LANGUAGES_DATA[language];
