import React from 'react';
import { getProjectsData, Language, UI_TEXT } from '../constants';
import { ExternalLink, FolderGit2 } from 'lucide-react';
import RotatingModel from './RotatingModel';
import { withBasePath } from '../utils/paths';

interface ProjectsProps {
  language: Language;
}

const MODEL_3D_PATH = withBasePath('contenido/Render_Taladro_Cicloidal_.STL');
const PROJECTS_MODEL_VERTICAL_OFFSET = 32.5;
const PROJECTS_MODEL_TARGET_SIZE = 105;
const F1_MODEL_VERTICAL_OFFSET = 6;
const F1_MODEL_TARGET_SIZE = 210;
const F1_CAMERA_DISTANCE_MULTIPLIER = 1.7;
const F1_CAMERA_HEIGHT_MULTIPLIER = 0.12;
const SOLIDWORKS_AXIS_CORRECTION_X = Math.PI / 2;
const F1_UPSIDE_DOWN_CORRECTION_Z = Math.PI;
const CNC_IMAGE_PRIMARY_PATH = withBasePath('contenido/cnc_1.png');
const CNC_IMAGE_SECONDARY_PATH = withBasePath('contenido/cnc_2.png');

const Projects: React.FC<ProjectsProps> = ({ language }) => {
  const projectsData = getProjectsData(language);
  const projectsText = UI_TEXT[language].projects;
  const modelBadge = language === 'es' ? 'MODELO 3D' : '3D MODEL';
  const mainProjectKicker =
    language === 'es' ? 'CASO T\u00C9CNICO DE INGENIER\u00CDA' : 'ENGINEERING CASE STUDY';
  const mainProjectCta = language === 'es' ? 'Ver caso t\u00E9cnico completo' : 'View full case study';
  const inProgressLabel = language === 'es' ? 'EN PROGRESO' : 'IN PROGRESS';
  const camProjectTitle = language === 'es' ? 'NX CAM - Fabricación Mecánica' : 'NX CAM - Manufacturing Engineering';

  return (
    <section id="projects" className="py-24 px-6 lg:px-24 bg-surface/30">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-16 space-x-4">
          <FolderGit2 className="w-6 h-6 text-accent" />
          <h3 className="text-2xl font-bold text-white tracking-tight">{projectsText.title}</h3>
          <div className="h-[1px] flex-grow bg-white/10"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(320px,auto)]">
          {projectsData.map((project) => {
            const isMainProject = project.id === 'proj-1';
            const isModelProject = project.visualType === 'model';
            const isF1Project = project.id === 'proj-4';
            const isBimProject = project.id === 'proj-2';
            const overlayClass = isF1Project
              ? 'bg-gradient-to-t from-black/50 via-black/18 to-transparent'
              : isBimProject
                ? 'bg-gradient-to-t from-black/60 via-black/28 to-transparent'
                : 'bg-gradient-to-t from-black via-black/85 to-transparent';

            return (
              <React.Fragment key={project.id}>
                <div
                className={`group relative overflow-hidden border border-white/10 bg-[#0d0d0d] transition-all duration-500 hover:border-accent/60 ${
                  project.size === 'large' ? 'md:col-span-2 md:row-span-1' : 'md:col-span-1'
                } ${isMainProject ? 'cursor-pointer shadow-[0_0_40px_rgba(6,182,212,0.12)]' : ''} ${
                  isF1Project ? 'min-h-[400px] md:min-h-[520px]' : ''
                }`}
              >
                {isMainProject ? (
                  <>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,0.16),transparent_40%)] z-0"></div>
                  </>
                ) : null}
                {isMainProject || isModelProject ? (
                  <div className="absolute top-4 right-4 z-20 text-[11px] tracking-widest font-semibold text-accent border border-accent/40 bg-black/40 px-2 py-1">
                    {modelBadge}
                  </div>
                ) : null}

                <div className="absolute inset-0 z-0">
                  {isMainProject ? (
                    <RotatingModel
                      modelPath={MODEL_3D_PATH}
                      language={language}
                      className="h-full w-full"
                      verticalOffset={PROJECTS_MODEL_VERTICAL_OFFSET}
                      targetSize={PROJECTS_MODEL_TARGET_SIZE}
                    />
                  ) : project.visualType === 'model' ? (
                    <RotatingModel
                      modelPath={project.visualContent}
                      language={language}
                      className="h-full w-full"
                      verticalOffset={F1_MODEL_VERTICAL_OFFSET}
                      targetSize={F1_MODEL_TARGET_SIZE}
                      cameraDistanceMultiplier={F1_CAMERA_DISTANCE_MULTIPLIER}
                      cameraHeightMultiplier={F1_CAMERA_HEIGHT_MULTIPLIER}
                      // SolidWorks exports this STL with a different axis convention than the web viewer, so we correct it here with a 90deg X rotation.
                      rotationOffsetX={SOLIDWORKS_AXIS_CORRECTION_X}
                      rotationOffsetZ={F1_UPSIDE_DOWN_CORRECTION_Z}
                      autoRotate
                      autoRotateAxis="y"
                    />
                  ) : project.visualType === 'code' ? (
                    <div className="w-full h-full bg-[#0d0d0d] p-4 overflow-hidden">
                      <pre className="text-xs text-gray-500 font-mono opacity-50 group-hover:opacity-80 transition-opacity">
                        <code>{project.visualContent}</code>
                      </pre>
                    </div>
                  ) : (
                    <img
                      src={project.visualContent}
                      alt={project.title}
                      loading="lazy"
                      className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                        project.visualType === 'wireframe' ? 'grayscale invert opacity-45' : 'grayscale opacity-60'
                      }`}
                      style={
                        isBimProject
                          ? { objectPosition: '50% 12%' }
                          : undefined
                      }
                    />
                  )}
                </div>

                <div
                  className={`absolute inset-0 ${overlayClass} z-10 flex flex-col justify-end p-6 md:p-8 opacity-95 group-hover:opacity-100 transition-opacity pointer-events-none`}
                >
                  {isMainProject ? (
                    <p className="mb-2 inline-flex w-fit border border-white/20 bg-black/45 px-2 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-gray-200">
                      {mainProjectKicker}
                    </p>
                  ) : null}
                  {project.status === 'in-progress' ? (
                    <p className="mb-2 inline-flex w-fit border border-amber-400/50 bg-amber-500/15 px-2 py-1 text-[10px] font-mono font-semibold uppercase tracking-[0.16em] text-amber-300">
                      {inProgressLabel}
                    </p>
                  ) : null}

                  <h4 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors flex items-center gap-2">
                    {project.title}
                    {isMainProject ? (
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-1 group-hover:translate-y-0 duration-300" />
                    ) : null}
                  </h4>

                  <p className="text-gray-300 text-sm mb-4 line-clamp-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs font-mono text-accent/80 bg-accent/10 px-2 py-1 rounded border border-accent/20">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {isMainProject ? (
                    <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                      {mainProjectCta}
                      <ExternalLink className="h-4 w-4" />
                    </p>
                  ) : null}
                </div>

                {isMainProject ? (
                  <a href="#reductora" aria-label={projectsText.openReductoraDetailAria} className="absolute inset-0 z-20" />
                ) : null}
                </div>

                {isF1Project ? (
                  <div className="group relative overflow-hidden border border-white/10 bg-[#0d0d0d] transition-all duration-500 hover:border-accent/60 md:col-span-1 min-h-[400px] md:min-h-[520px]">
                    <div className="absolute inset-0 grid grid-rows-2 gap-[1px] bg-white/10">
                      <div className="overflow-hidden bg-black/20">
                        <img
                          src={CNC_IMAGE_PRIMARY_PATH}
                          alt={`${camProjectTitle} 1`}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                      </div>

                      <div className="overflow-hidden bg-black/20">
                        <img
                          src={CNC_IMAGE_SECONDARY_PATH}
                          alt={`${camProjectTitle} 2`}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                      </div>
                    </div>

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_14%,rgba(6,182,212,0.14),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.72)_100%)]" />

                    <div className="relative z-10 flex h-full items-end p-5 md:p-6">
                      <h4 className="max-w-[15ch] text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-accent">
                        {camProjectTitle}
                      </h4>
                    </div>
                  </div>
                ) : null}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
