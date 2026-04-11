import React from 'react';
import { getCertificationCoursesData, getEducationData, Language, UI_TEXT } from '../constants';
import { Award, ExternalLink, GraduationCap } from 'lucide-react';

interface EducationProps {
  language: Language;
}

const Education: React.FC<EducationProps> = ({ language }) => {
  const educationData = getEducationData(language);
  const certifications = getCertificationCoursesData(language);
  const educationText = UI_TEXT[language].education;

  return (
    <section id="education" className="px-6 py-24 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex items-center space-x-4">
          <GraduationCap className="h-6 w-6 text-accent" />
          <h3 className="text-2xl font-bold tracking-tight text-white">{educationText.title}</h3>
          <div className="h-[1px] flex-grow bg-white/10" />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {educationData.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] via-black/35 to-black/65 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/45"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                {item.studyUrl ? (
                  <a
                    href={item.studyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-lg font-bold text-white transition-colors hover:text-accent"
                  >
                    {item.title}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ) : (
                  <h4 className="text-lg font-bold text-white">{item.title}</h4>
                )}

                {item.period ? (
                  <span className="rounded-md border border-white/15 px-2.5 py-1 text-[11px] font-mono uppercase tracking-[0.14em] text-accent">
                    {item.period}
                  </span>
                ) : null}
              </div>

              <ul className="space-y-2.5">
                {item.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-16">
          <div className="mb-4 flex items-center space-x-4">
            <Award className="h-5 w-5 text-accent" />
            <h4 className="text-xl font-bold tracking-tight text-white">{educationText.certificationsTitle}</h4>
            <div className="h-[1px] flex-grow bg-white/10" />
          </div>
          <p className="mb-8 text-sm text-gray-400">{educationText.certificationsSubtitle}</p>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {certifications.map((course) => (
              <article
                key={course.id}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50"
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-accent/15 blur-2xl" />

                <div className="relative mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] p-2.5">
                    <img
                      src={course.logoUrl}
                      alt={`Logo ${course.provider}`}
                      className="h-full w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                    {course.provider}
                  </span>
                </div>

                <p className="relative text-sm leading-relaxed text-gray-100">{course.title}</p>

                {course.details ? (
                  <p className="relative mt-4 border-t border-white/10 pt-3 text-xs text-gray-400">{course.details}</p>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
