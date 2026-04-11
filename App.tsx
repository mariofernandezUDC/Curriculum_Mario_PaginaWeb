import React, { useEffect, useState } from 'react';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import ReductoraDetail from './components/ReductoraDetail';
import Skills from './components/Skills';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import { getHeroData, Language, UI_TEXT } from './constants';

const LANGUAGE_STORAGE_KEY = 'portfolio-language';
const OBSERVED_SECTION_IDS = ['home', 'experience', 'education', 'projects', 'skills', 'contact'] as const;
const REDUCTORA_SECTION_IDS = [
  'reductora-hero',
  'reductora-geometry',
  'reductora-contact',
  'reductora-system',
  'reductora-closing',
] as const;
const LOADER_MIN_DURATION_MS = 1200;
const LOADER_EXIT_DURATION_MS = 520;

const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') {
    return 'es';
  }

  const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (savedLanguage === 'es' || savedLanguage === 'en') {
    return savedLanguage;
  }

  return window.navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en';
};

const getCurrentHash = (): string => {
  if (typeof window === 'undefined') {
    return '#home';
  }
  return window.location.hash || '#home';
};

function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [currentHash, setCurrentHash] = useState<string>(getCurrentHash);
  const [isLoaderMounted, setIsLoaderMounted] = useState(true);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);
  const [loaderProgress, setLoaderProgress] = useState(14);
  const isReductoraPage = currentHash === '#reductora' || currentHash.startsWith('#reductora-');
  const uiText = UI_TEXT[language];
  const brandLabel = language === 'es' ? 'Portfolio de ingenier\u00EDa mec\u00E1nica' : 'Mechanical engineering portfolio';
  const spanishButtonAria = language === 'es' ? 'Cambiar idioma a espa\u00F1ol' : 'Switch language to Spanish';
  const englishButtonAria = language === 'es' ? 'Cambiar idioma a ingl\u00E9s' : 'Switch language to English';
  const reductoraNavLinks =
    language === 'es'
      ? [
          { name: 'Visi\u00f3n general', href: '#reductora-hero' },
          { name: 'Geometr\u00eda', href: '#reductora-geometry' },
          { name: 'Contacto', href: '#reductora-contact' },
          { name: 'Integraci\u00f3n', href: '#reductora-system' },
          { name: 'Cierre', href: '#reductora-closing' },
        ]
      : [
          { name: 'Overview', href: '#reductora-hero' },
          { name: 'Geometry', href: '#reductora-geometry' },
          { name: 'Contact', href: '#reductora-contact' },
          { name: 'Integration', href: '#reductora-system' },
          { name: 'Closing', href: '#reductora-closing' },
        ];

  const navLinks = isReductoraPage
    ? reductoraNavLinks
    : [
        { name: uiText.nav.home, href: '#home' },
        { name: uiText.nav.experience, href: '#experience' },
        { name: uiText.nav.education, href: '#education' },
        { name: uiText.nav.projects, href: '#projects' },
        { name: uiText.nav.skills, href: '#skills' },
        { name: uiText.nav.contact, href: '#contact' },
      ];

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const timerIds: number[] = [];
    const loaderStart = window.performance.now();
    const initialHeroImage = getHeroData(getInitialLanguage()).image;
    let isCancelled = false;
    let hasLoaderFinished = false;

    const scheduleProgressStep = (value: number, delay: number) => {
      timerIds.push(
        window.setTimeout(() => {
          if (isCancelled) {
            return;
          }

          setLoaderProgress((currentProgress) => Math.max(currentProgress, value));
        }, delay),
      );
    };

    const finishLoader = () => {
      if (hasLoaderFinished) {
        return;
      }

      hasLoaderFinished = true;
      const elapsed = window.performance.now() - loaderStart;
      const remainingTime = Math.max(0, LOADER_MIN_DURATION_MS - elapsed);

      timerIds.push(
        window.setTimeout(() => {
          if (isCancelled) {
            return;
          }

          setLoaderProgress(100);
          setIsLoaderVisible(false);
          timerIds.push(
            window.setTimeout(() => {
              if (!isCancelled) {
                setIsLoaderMounted(false);
              }
            }, LOADER_EXIT_DURATION_MS),
          );
        }, remainingTime),
      );
    };

    scheduleProgressStep(38, 120);
    scheduleProgressStep(76, 420);

    const heroImage = new window.Image();
    let isWindowLoaded = document.readyState === 'complete';
    let isHeroImageLoaded = false;

    const markReadyIfDone = () => {
      if (isWindowLoaded && isHeroImageLoaded) {
        finishLoader();
      }
    };

    const onWindowLoad = () => {
      isWindowLoaded = true;
      markReadyIfDone();
    };

    heroImage.onload = () => {
      isHeroImageLoaded = true;
      markReadyIfDone();
    };
    heroImage.onerror = () => {
      isHeroImageLoaded = true;
      markReadyIfDone();
    };
    heroImage.src = initialHeroImage;

    if (heroImage.complete) {
      isHeroImageLoaded = true;
    }

    if (!isWindowLoaded) {
      window.addEventListener('load', onWindowLoad, { once: true });
    }

    markReadyIfDone();

    return () => {
      isCancelled = true;
      window.removeEventListener('load', onWindowLoad);
      timerIds.forEach((timerId) => window.clearTimeout(timerId));
    };
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    if (isLoaderMounted) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isLoaderMounted]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleHashChange = () => {
      setCurrentHash(getCurrentHash());
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !isReductoraPage) {
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [isReductoraPage]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const observedSectionIds = isReductoraPage ? REDUCTORA_SECTION_IDS : OBSERVED_SECTION_IDS;
    const sectionElements = observedSectionIds.map((id) => document.getElementById(id)).filter(
      (section): section is HTMLElement => Boolean(section),
    );

    if (!sectionElements.length) {
      return;
    }

    const visibilityBySection = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.getAttribute('id');
          if (!sectionId) {
            return;
          }

          visibilityBySection.set(sectionId, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let bestSectionId: string | null = null;
        let bestVisibility = 0;

        visibilityBySection.forEach((visibility, sectionId) => {
          if (visibility > bestVisibility) {
            bestVisibility = visibility;
            bestSectionId = sectionId;
          }
        });

        if (!bestSectionId) {
          if (!isReductoraPage && window.scrollY < 80) {
            setCurrentHash('#home');
            if (window.location.hash !== '#home') {
              window.history.replaceState(null, '', '#home');
            }
          }
          return;
        }

        const nextHash = `#${bestSectionId}`;
        setCurrentHash((previousHash) => (previousHash === nextHash ? previousHash : nextHash));
        if (window.location.hash !== nextHash) {
          window.history.replaceState(null, '', nextHash);
        }
      },
      {
        rootMargin: '-32% 0px -50% 0px',
        threshold: [0, 0.15, 0.3, 0.45, 0.65, 0.85, 1],
      },
    );

    sectionElements.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isReductoraPage]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language;
    document.title = uiText.metaTitle;
  }, [language, uiText.metaTitle]);

  const isLinkActive = (href: string): boolean =>
    href === '#reductora-hero' ? currentHash === '#reductora' || currentHash === '#reductora-hero' : currentHash === href;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-white font-sans selection:bg-accent/20 selection:text-accent">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_10%,rgba(6,182,212,0.22),transparent_34%),radial-gradient(circle_at_84%_18%,rgba(255,255,255,0.08),transparent_38%),radial-gradient(circle_at_50%_92%,rgba(6,182,212,0.12),transparent_44%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.04),transparent_28%,rgba(6,182,212,0.08),transparent_72%)]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:54px_54px]" />
      </div>

      <nav className="fixed left-0 top-4 z-50 w-full px-4 transition-all duration-300 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-2xl border border-white/10 bg-background/70 shadow-[0_14px_55px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <a
                href={isReductoraPage ? '#projects' : '#home'}
                className="flex shrink-0 items-center gap-2 text-white transition-colors hover:text-accent"
              >
                <span className="text-xl font-black tracking-tight">MF.</span>
                {!isReductoraPage ? (
                  <span className="hidden text-[10px] uppercase tracking-[0.22em] text-gray-400 sm:block">
                    {brandLabel}
                  </span>
                ) : null}
              </a>

              {isReductoraPage ? (
                <div className="hidden min-w-0 items-center gap-1 overflow-x-auto rounded-xl border border-white/10 bg-black/25 p-1 lg:flex">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className={`shrink-0 rounded-lg px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition-all ${
                        isLinkActive(link.href)
                          ? 'bg-accent text-black shadow-[0_0_18px_rgba(6,182,212,0.35)]'
                          : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>

            {!isReductoraPage ? (
              <div className="hidden items-center gap-1 rounded-xl border border-white/10 bg-black/25 p-1 lg:flex">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`rounded-lg px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition-all ${
                      isLinkActive(link.href)
                        ? 'bg-accent text-black shadow-[0_0_18px_rgba(6,182,212,0.35)]'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            ) : null}

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 rounded-xl border border-white/15 bg-white/[0.02] p-1">
                <button
                  type="button"
                  onClick={() => setLanguage('es')}
                  className={`min-w-9 rounded-md px-2.5 py-1.5 text-[11px] font-semibold transition-all ${
                    language === 'es'
                      ? 'bg-accent text-black shadow-[0_0_14px_rgba(6,182,212,0.4)]'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                  aria-label={spanishButtonAria}
                >
                  ES
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`min-w-9 rounded-md px-2.5 py-1.5 text-[11px] font-semibold transition-all ${
                    language === 'en'
                      ? 'bg-accent text-black shadow-[0_0_14px_rgba(6,182,212,0.4)]'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                  aria-label={englishButtonAria}
                >
                  EN
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto border-t border-white/10 px-3 py-2.5 lg:hidden">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`shrink-0 rounded-md px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] transition-all ${
                  isLinkActive(link.href)
                    ? 'bg-accent/90 text-black'
                    : 'border border-white/10 text-gray-300 hover:border-accent/40 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {isReductoraPage ? (
        <ReductoraDetail language={language} />
      ) : (
        <>
          <Hero language={language} />
          <Experience language={language} />
          <Education language={language} />
          <Projects language={language} />
          <Skills language={language} />
          <Footer language={language} />
        </>
      )}

      {isLoaderMounted ? <LoadingScreen isVisible={isLoaderVisible} language={language} progress={loaderProgress} /> : null}
    </main>
  );
}

export default App;
