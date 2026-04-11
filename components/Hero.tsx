import React from 'react';
import { getHeroData, Language, UI_TEXT } from '../constants';
import { ChevronDown, Cpu, Download, Gauge, Linkedin, Wrench } from 'lucide-react';

interface HeroProps {
  language: Language;
}

const Hero: React.FC<HeroProps> = ({ language }) => {
  const heroData = getHeroData(language);
  const heroText = UI_TEXT[language].hero;
  const [firstName, ...restName] = heroData.name.split(' ');
  const mainSurname = restName.join(' ');
  const profileTagTop = language === 'es' ? 'MEC\u00C1NICA' : 'MECHANICAL';
  const profileTagBottom = language === 'es' ? 'INGENIER\u00CDA' : 'ENGINEERING';

  const highlights =
    language === 'es'
      ? [
          { icon: Cpu, title: 'Modelado 3D', subtitle: 'Siemens NX y SolidWorks' },
          { icon: Gauge, title: 'Optimizaci\u00F3n', subtitle: 'Automatizaci\u00F3n y optimizaci\u00F3n con c\u00F3digo' },
          { icon: Wrench, title: 'Industrial', subtitle: 'Dise\u00F1o orientado a fabricaci\u00F3n y CAM' },
        ]
      : [
          { icon: Cpu, title: 'CAD/CAM', subtitle: 'Siemens NX and SolidWorks' },
          { icon: Gauge, title: 'Optimization', subtitle: 'Code-assisted engineering workflows' },
          { icon: Wrench, title: 'Industrial', subtitle: 'Design for manufacturing with CAM' },
        ];

  return (
    <section
      id="home"
      className="relative flex min-h-[100vh] items-center justify-center overflow-hidden px-6 pb-20 pt-36 lg:px-24"
    >
      <div className="absolute -left-14 top-24 hidden h-56 w-56 rounded-full bg-accent/18 blur-3xl md:block" />
      <div className="absolute right-0 top-1/3 hidden h-[1px] w-32 bg-accent/45 md:block" />

      <div className="relative z-10 grid w-full max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-12">
        <div className="order-2 animate-slide-up lg:order-1 lg:col-span-7">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/35 bg-accent/10 px-4 py-1.5">
            <Cpu className="h-4 w-4 text-accent" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{heroText.badge}</span>
          </div>

          <h1 className="mb-4 text-5xl font-black leading-[0.96] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
            <span className="block text-white/95">{firstName}</span>
            <span className="block bg-gradient-to-r from-white via-accent to-white/80 bg-clip-text text-transparent">
              {mainSurname}
            </span>
          </h1>

          <h2 className="mb-8 max-w-2xl border-l-2 border-accent pl-4 text-base font-medium uppercase tracking-[0.14em] text-gray-300 sm:text-lg">
            {heroData.title}
          </h2>

          <p className="mb-10 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">{heroData.description}</p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={heroData.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-accent/40 bg-accent px-7 py-3 text-sm font-semibold tracking-wide text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-dim hover:text-white"
            >
              <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
              {heroText.downloadCv}
            </a>

            <a
              href={heroData.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-7 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
            >
              <Linkedin className="h-4 w-4" />
              {heroText.linkedin}
            </a>

            <a
              href="#experience"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.02] px-7 py-3 text-sm font-semibold tracking-wide text-gray-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:text-white"
            >
              {heroText.viewExperience}
            </a>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 transition-all duration-300 hover:border-accent/45 hover:bg-black/40"
              >
                <div className="mb-2 flex items-center gap-2">
                  <item.icon className="h-4 w-4 text-accent" />
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-200">{item.title}</p>
                </div>
                <p className="text-xs text-gray-400">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="order-1 flex justify-center animate-fade-in lg:order-2 lg:col-span-5 lg:justify-end">
          <div className="relative h-[360px] w-[300px] sm:h-[430px] sm:w-[350px]">
            <div className="absolute -inset-5 rounded-[2.2rem] bg-[conic-gradient(from_90deg,rgba(6,182,212,0.28),transparent_35%,rgba(255,255,255,0.1),transparent_70%)] blur-2xl" />
            <div className="absolute inset-0 rounded-[1.9rem] border border-white/15 bg-gradient-to-br from-white/10 to-transparent" />
            <div className="absolute inset-3 rounded-[1.6rem] border border-accent/35" />

            <div className="absolute inset-6 overflow-hidden rounded-[1.3rem] border border-white/10 shadow-[0_24px_45px_rgba(0,0,0,0.45)]">
              <img
                src={heroData.image}
                alt={heroData.name}
                className="h-full w-full object-cover object-top grayscale contrast-125 brightness-90 transition-all duration-700 hover:grayscale-0"
              />
            </div>

            <div className="absolute -left-5 top-8 rounded-lg border border-white/20 bg-black/70 px-3 py-2 backdrop-blur">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">{profileTagTop}</p>
            </div>

            <div className="absolute -right-4 bottom-10 rounded-lg border border-accent/40 bg-black/75 px-3 py-2 shadow-[0_0_20px_rgba(6,182,212,0.22)] backdrop-blur">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white">{profileTagBottom}</p>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#experience"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full border border-white/20 bg-black/35 p-2 text-white/70 transition-colors hover:border-accent hover:text-accent"
        aria-label={language === 'es' ? 'Ir a la secci\u00F3n de experiencia' : 'Go to experience section'}
      >
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
};

export default Hero;
