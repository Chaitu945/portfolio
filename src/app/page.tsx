import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{children}</h2>
  );
}

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-14 sm:py-20">
      <header className="flex items-baseline justify-between gap-6">
        <span className="font-mono text-xs text-muted">{profile.handle}</span>
        <nav className="flex gap-5 text-xs text-muted">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href={`mailto:${profile.links.email}`}
            className="transition-colors hover:text-foreground"
          >
            Email
          </a>
        </nav>
      </header>

      <section className="mt-16 sm:mt-20">
        <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {profile.name}
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-snug text-balance text-muted">
          {profile.tagline}
        </p>
        <p className="mt-7 max-w-2xl text-sm leading-relaxed text-muted">{profile.intro}</p>
      </section>

      <section className="mt-20 sm:mt-24">
        <SectionLabel>Work</SectionLabel>
        <div className="mt-7">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="mt-20 sm:mt-24">
        <SectionLabel>About</SectionLabel>
        <dl className="mt-7 space-y-3.5">
          {profile.skills.map(({ group, items }) => (
            <div key={group} className="flex flex-col gap-1 sm:flex-row sm:gap-8">
              <dt className="w-28 shrink-0 font-mono text-[11px] uppercase tracking-wider text-muted">
                {group}
              </dt>
              <dd className="text-sm text-foreground/90">{items.join("  ·  ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <footer className="mt-20 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 font-mono text-[11px] text-muted sm:mt-24">
        <span>Next.js · TypeScript · Vercel</span>
        <span className="flex gap-5">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            github.com/{profile.handle}
          </a>
          <a
            href={`mailto:${profile.links.email}`}
            className="transition-colors hover:text-foreground"
          >
            email
          </a>
        </span>
      </footer>
    </div>
  );
}
