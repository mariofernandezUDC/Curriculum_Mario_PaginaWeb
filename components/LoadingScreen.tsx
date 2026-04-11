import React from 'react';
import { Language } from '../constants';

interface LoadingScreenProps {
  isVisible: boolean;
  language: Language;
  progress: number;
}

const LOADING_COPY = {
  es: {
    eyebrow: 'Portfolio técnico',
    subtitle: 'Ingeniería mecánica',
    status: 'Cargando experiencia, proyectos y documentación técnica.',
    label: 'Inicializando contenido',
    loadingState: 'Cargando',
    readyState: 'Listo',
    pills: ['CAD/CAM', 'Optimización', 'Industria'],
  },
  en: {
    eyebrow: 'Technical Portfolio',
    subtitle: 'Mechanical Engineering',
    status: 'Loading experience, projects, and technical documentation.',
    label: 'Initializing content',
    loadingState: 'Loading',
    readyState: 'Ready',
    pills: ['CAD/CAM', 'Optimization', 'Industry'],
  },
} as const;

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isVisible, language, progress }) => {
  const copy = LOADING_COPY[language];

  return (
    <div
      className={`fixed inset-0 z-[140] transition-all duration-500 ${
        isVisible ? 'opacity-100 blur-0' : 'pointer-events-none opacity-0 blur-sm'
      }`}
      aria-hidden={!isVisible}
    >
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(6,182,212,0.2),transparent_28%),radial-gradient(circle_at_82%_16%,rgba(255,255,255,0.07),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(6,182,212,0.12),transparent_40%)]" />
      <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-black/55 p-8 shadow-[0_28px_90px_rgba(0,0,0,0.52)] backdrop-blur-2xl sm:p-10">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-accent">{copy.eyebrow}</p>

              <div className="mt-5 flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-accent/35 bg-accent/10 text-lg font-black text-accent shadow-[0_0_24px_rgba(6,182,212,0.2)]">
                  MF
                </div>
                <div>
                  <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Mario Fernández</h2>
                  <p className="mt-1 text-sm uppercase tracking-[0.18em] text-gray-300">{copy.subtitle}</p>
                </div>
              </div>

              <p className="mt-6 max-w-lg text-sm leading-relaxed text-gray-300 sm:text-base">{copy.status}</p>
            </div>

            <div className="flex items-end gap-3 self-start lg:self-auto">
              <div className="h-12 w-12 rounded-full border border-accent/30 border-t-accent animate-spin" />
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-gray-500">MF SYSTEM</p>
                <p className="mt-1 text-3xl font-black text-white">{progress}%</p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <div className="mb-3 flex items-center justify-between gap-4 text-[11px] font-mono uppercase tracking-[0.18em] text-gray-400">
              <span>{copy.label}</span>
              <span>{progress < 100 ? copy.loadingState : copy.readyState}</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full border border-white/10 bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent-dim via-accent to-[#DDFBFF] transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {copy.pills.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-mono uppercase tracking-[0.14em] text-gray-300"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
