import Image from "next/image";

import type { Project, Status } from "@/data/projects";

const STATUS_STYLE: Record<Status, string> = {
  Shipped: "border-accent/30 bg-accent/10 text-accent",
  "In progress": "border-amber-400/30 bg-amber-400/10 text-amber-300",
  "Internal tool": "border-line bg-white/[0.03] text-muted",
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 font-mono text-[11px] tracking-wide ${STATUS_STYLE[status]}`}
    >
      {status}
    </span>
  );
}

function StackTags({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Built with">
      {stack.map((tech) => (
        <li
          key={tech}
          className="rounded-md border border-line bg-white/[0.02] px-2 py-0.5 font-mono text-[11px] text-muted"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}

/** Play / live and source links, sized to be easy to hit on a phone. */
function ProjectLinks({ project }: { project: Project }) {
  if (!project.live && !project.repo) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {project.live ? (
        <a
          href={project.live}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-accent px-4 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          {capitalise(project.liveLabel ?? "live")}
          <span aria-hidden>↗</span>
        </a>
      ) : null}
      {project.repo ? (
        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-line px-4 text-sm text-foreground/90 transition-colors hover:border-accent/50 hover:text-accent"
        >
          Source
          <span aria-hidden>↗</span>
        </a>
      ) : null}
    </div>
  );
}

function capitalise(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** The visual at the top of a featured card: a real screenshot or real terminal output. */
function ProjectMedia({ project }: { project: Project }) {
  if (project.shot) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-line bg-[#0f0f12]">
        <Image
          src={project.shot}
          alt={project.shotAlt ?? `${project.title} screenshot`}
          fill
          sizes="(max-width: 768px) 100vw, 480px"
          className="object-contain"
        />
      </div>
    );
  }
  if (project.terminal) {
    return (
      <figure className="flex aspect-[16/10] flex-col overflow-hidden rounded-lg border border-line bg-[#0f0f12]">
        <div className="flex items-center gap-1.5 border-b border-line px-3 py-2" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
        </div>
        <pre className="flex-1 overflow-hidden px-3 py-2.5 font-mono text-[10.5px] leading-[1.55] text-muted">
          {project.terminal.lines.map((line) => (
            <span key={line} className={`block truncate ${lineTone(line)}`}>
              {line}
            </span>
          ))}
        </pre>
        <figcaption className="border-t border-line px-3 py-1.5 font-mono text-[10px] text-muted/80">
          {project.terminal.caption}
        </figcaption>
      </figure>
    );
  }
  return null;
}

function lineTone(line: string) {
  if (line.startsWith("SUCCESS") || line.includes("minted successfully")) return "text-accent";
  if (line.startsWith("STUCK") || line.startsWith("WARNING")) return "text-amber-300/90";
  return "";
}

/** A large card for the handful of projects worth looking at first. */
export function FeaturedCard({ project }: { project: Project }) {
  return (
    <article
      id={project.slug}
      className="flex min-w-0 flex-col gap-4 rounded-xl border border-line bg-white/[0.015] p-4 sm:p-5"
    >
      <ProjectMedia project={project} />

      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
        <StatusBadge status={project.status} />
      </div>

      <p className="text-sm leading-relaxed text-muted">{project.summary}</p>

      {project.highlights.length > 0 ? (
        <ul className="space-y-2">
          {project.highlights.slice(0, 3).map((highlight) => (
            <li key={highlight} className="flex gap-2.5 text-sm leading-relaxed text-foreground/80">
              <span aria-hidden className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-accent/70" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-auto flex flex-col gap-4 pt-1">
        <StackTags stack={project.stack} />
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}

/** A compact row for everything else, so the strong work is not buried. */
export function ProjectRow({ project }: { project: Project }) {
  const href = project.live ?? project.repo;
  return (
    <article id={project.slug} className="flex min-w-0 flex-col gap-2.5 py-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-medium tracking-tight">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent/50"
            >
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h3>
        <StatusBadge status={project.status} />
      </div>
      <p className="text-sm leading-relaxed text-muted">{project.summary}</p>
      {project.highlights[0] ? (
        <p className="text-sm leading-relaxed text-foreground/75">{project.highlights[0]}</p>
      ) : null}
      <StackTags stack={project.stack} />
    </article>
  );
}
