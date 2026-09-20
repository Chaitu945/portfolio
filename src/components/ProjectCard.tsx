import type { Project, Status } from "@/data/projects";

const STATUS_TONE: Record<Status, string> = {
  Shipped: "text-accent",
  "In progress": "text-amber-400/90",
  "Internal tool": "text-muted",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="border-t border-line py-7 first:border-t-0 first:pt-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-base font-medium tracking-tight">
          {/* Point the title at whatever a visitor can actually open: the running
              thing if there is one, otherwise the source. */}
          {project.live || project.repo ? (
            <a
              href={project.live ?? project.repo}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-accent"
            >
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h3>
        <span
          className={`font-mono text-[10px] uppercase tracking-[0.15em] ${STATUS_TONE[project.status]}`}
        >
          {project.status}
        </span>
      </div>

      <p className="mt-2.5 text-sm leading-relaxed text-muted">{project.summary}</p>

      {project.highlights.length > 0 ? (
        <ul className="mt-3.5 space-y-2">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-muted">
              <span
                aria-hidden
                className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-muted/40"
              />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted"
          >
            {tech}
          </span>
        ))}
        {project.live ? (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="ml-1 font-mono text-[10px] text-accent underline decoration-accent/40 underline-offset-4 transition-opacity hover:opacity-80"
          >
            {project.liveLabel ?? "live"}
          </a>
        ) : null}
        {project.repo ? (
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="ml-1 font-mono text-[10px] text-muted underline decoration-line underline-offset-4 transition-colors hover:text-accent"
          >
            source
          </a>
        ) : null}
      </div>
    </article>
  );
}
