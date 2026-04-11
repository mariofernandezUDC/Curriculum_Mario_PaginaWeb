import React from 'react';
import { getSkillsData, getLanguagesData, Language, UI_TEXT } from '../constants';
import { Globe, Terminal } from 'lucide-react';

interface SkillsProps {
  language: Language;
}

const Skills: React.FC<SkillsProps> = ({ language }) => {
  const skillsData = getSkillsData(language);
  const languagesData = getLanguagesData(language);
  const skillsText = UI_TEXT[language].skills;

  return (
    <section id="skills" className="px-6 py-24 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex items-center space-x-4">
          <Terminal className="h-6 w-6 text-accent" />
          <h3 className="text-2xl font-bold tracking-tight text-white">{skillsText.title}</h3>
          <div className="h-[1px] flex-grow bg-white/10" />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {skillsData.map((group, idx) => (
            <article
              key={idx}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] via-black/35 to-black/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50"
            >
              <h4 className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-sm font-semibold text-accent">
                {group.category}
              </h4>

              <div className="space-y-5">
                {group.items.map((skill, skillIdx) => (
                  <div key={skillIdx}>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-2.5">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/15 bg-black/40 p-1">
                          <img
                            src={skill.logoUrl}
                            alt={`Logo ${skill.name}`}
                            className="h-full w-full object-contain"
                            loading="lazy"
                          />
                        </div>
                        <span className="truncate text-sm text-gray-200">{skill.name}</span>
                      </div>
                      <span className="text-xs font-mono text-accent">{skill.level}%</span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full border border-white/10 bg-black/35">
                      <div
                        className="relative h-full rounded-full bg-gradient-to-r from-accent-dim via-accent to-[#89ecff]"
                        style={{ width: `${skill.level}%` }}
                      >
                        <span className="absolute right-0 top-0 h-full w-[2px] bg-white/85" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14">
          <div className="mb-8 flex items-center space-x-4">
            <Globe className="h-5 w-5 text-accent" />
            <h3 className="text-xl font-bold tracking-tight text-white">{skillsText.languagesTitle}</h3>
            <div className="h-[1px] flex-grow bg-white/10" />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {languagesData.map((lang, idx) => (
              <article
                key={idx}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/45 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50"
              >
                <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-accent/18 blur-2xl" />

                <div className="relative flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {lang.logoUrl ? (
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-black/40 p-1.5">
                        <img
                          src={lang.logoUrl}
                          alt={`Logo ${lang.logoLabel ?? lang.language}`}
                          className="h-full w-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    ) : null}
                    <p className="text-base font-medium text-gray-100">{lang.language}</p>
                  </div>

                  <span className="rounded-lg border border-accent/35 bg-accent/10 px-3 py-1.5 text-xs font-mono text-accent transition-colors group-hover:bg-accent/15">
                    {lang.level}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
