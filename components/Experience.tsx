import React from 'react';
import { getExperienceData, Language, UI_TEXT } from '../constants';
import { Briefcase, ExternalLink } from 'lucide-react';

interface ExperienceProps {
  language: Language;
}

const Experience: React.FC<ExperienceProps> = ({ language }) => {
  const experienceData = getExperienceData(language);
  const experienceTitle = UI_TEXT[language].experience.title;
  const currentLabel = language === 'es' ? 'Actual' : 'Current';
  const technologiesLabel = language === 'es' ? 'Tecnolog\u00EDas' : 'Technologies';

  return (
    <section id="experience" className="px-6 py-24 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex items-center space-x-4">
          <Briefcase className="h-6 w-6 text-accent" />
          <h3 className="text-2xl font-bold tracking-tight text-white">{experienceTitle}</h3>
          <div className="h-[1px] flex-grow bg-white/10" />
        </div>

        <div className="space-y-8">
          {experienceData.map((item, index) => (
            <article
              key={item.id}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] via-black/45 to-black/80 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-1 hover:border-accent/50 md:p-8"
            >
              <div className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-accent/16 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-accent/0 via-accent/70 to-accent/0 opacity-50" />

              <div className="relative grid grid-cols-1 gap-6 md:grid-cols-[220px,1fr] md:gap-8">
                <div className="rounded-2xl border border-white/15 bg-black/45 p-5 backdrop-blur-sm">
                  <div className="flex h-28 items-center justify-center rounded-xl border border-white/10 bg-black/35 p-4">
                    {item.logoUrl ? (
                      <img
                        src={item.logoUrl}
                        alt={`Logo ${item.company}`}
                        className="max-h-20 w-full object-contain drop-shadow-[0_8px_18px_rgba(6,182,212,0.22)]"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">{item.company}</div>
                    )}
                  </div>

                  <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-gray-400">
                    {`0${index + 1}`}
                  </p>
                </div>

                <div>
                  <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
                    <div>
                      {item.companyUrl ? (
                        <a
                          href={item.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-3xl font-black tracking-tight text-white transition-colors hover:text-accent"
                        >
                          {item.company}
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      ) : (
                        <h4 className="text-3xl font-black tracking-tight text-white">{item.company}</h4>
                      )}

                      <p className="mt-2 text-base text-gray-200">{item.role}</p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className="rounded-md border border-white/20 px-3 py-1 text-xs font-mono text-gray-200">{item.period}</span>
                      {item.isCurrent ? (
                        <span className="rounded-md border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
                          {currentLabel}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  {item.technologies?.length ? (
                    <div>
                      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-gray-400">{technologiesLabel}</p>
                      <div className="flex flex-wrap gap-2.5">
                        {item.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="rounded-lg border border-white/15 bg-white/[0.03] px-3 py-1.5 text-xs text-gray-200 transition-all duration-300 hover:border-accent/55 hover:bg-accent/10 hover:text-accent"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
