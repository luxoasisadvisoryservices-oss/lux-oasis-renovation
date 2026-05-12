// ─────────────────────────────────────────────
// Projects.jsx
// Edit: project content in src/data/content.js → projects array
// Images: upload to /public/images/[project-folder]/
// Videos: upload to /public/videos/ then set hasFile=true in shared.jsx VideoBlock
// ─────────────────────────────────────────────
import { SectionHeading, ProjectImage, VideoBlock, BeforeAfterCard, useInView } from "../components/shared";
import { projects } from "../data/content";

export default function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="Selected Transformations"
          title="Past projects. Real outcomes."
          subtitle="A selection of transformation work — each approached with the same strategic discipline: upgrade with intent, invest with logic."
        />
        <div className="space-y-24">
          {projects.map((project, idx) => {
            const [ref, inView] = useInView(0.1);
            const isEven = idx % 2 === 0;
            return (
              <div key={project.id} ref={ref}
                className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>

                {/* Project header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-8 pb-6 border-b border-stone-200">
                  <div>
                    <p className="text-xs tracking-[0.25em] uppercase text-amber-700 font-medium mb-2">{project.type}</p>
                    <h3 className="font-display text-2xl md:text-3xl text-stone-900">{project.title}</h3>
                    <p className="text-stone-400 text-sm mt-1 flex items-center gap-1.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                      </svg>
                      {project.location}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 text-xs bg-stone-100 text-stone-600 border border-stone-200 tracking-wide">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Content grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                  {/* Text side */}
                  <div className={isEven ? "" : "lg:order-2"}>
                    <p className="text-stone-600 leading-relaxed mb-6 text-base">{project.narrative}</p>
                    <div className="mb-6">
                      <p className="text-xs tracking-[0.2em] uppercase text-stone-400 font-medium mb-3">What Was Improved</p>
                      <ul className="space-y-2.5">
                        {project.improvements.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-stone-600 text-sm">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-600 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-5 bg-amber-50 border-l-2 border-amber-700">
                      <p className="text-xs tracking-[0.2em] uppercase text-amber-700 font-medium mb-2">Strategic Note</p>
                      <p className="text-stone-700 text-sm leading-relaxed italic">{project.strategicNote}</p>
                    </div>
                    {project.video && (
                      <div className="mt-8">
                        <p className="text-xs tracking-[0.2em] uppercase text-stone-400 font-medium mb-3">Walkthrough</p>
                        <VideoBlock src={project.video} label={`${project.title} walkthrough`} />
                      </div>
                    )}
                  </div>

                  {/* Images side */}
                  <div className={`space-y-4 ${isEven ? "" : "lg:order-1"}`}>
                    <ProjectImage src={project.heroImage} alt={project.title} className="w-full aspect-[16/10]" />
                    {project.images.length > 0 && (
                      <div className="grid grid-cols-3 gap-3">
                        {project.images.slice(0, 3).map((img) => (
                          <div key={img.src}>
                            <ProjectImage src={img.src} alt={img.label} className="w-full aspect-square" />
                            <p className="text-[10px] text-stone-400 mt-1.5 font-mono">{img.label}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {project.beforeAfter.length > 0 && (
                      <div>
                        <p className="text-xs tracking-[0.2em] uppercase text-stone-400 font-medium mb-3">Before / After</p>
                        <div className="grid grid-cols-2 gap-3">
                          {project.beforeAfter.map((ba) => (
                            <BeforeAfterCard key={ba.label} before={ba.before} after={ba.after} label={ba.label} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
