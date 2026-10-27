import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { FeaturedCard, ProjectRow } from "@/components/ProjectCard";

const featured = projects.filter((p) => p.featured);
const more = projects.filter((p) => !p.featured);

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{children}</h2>
  );
}

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
      <header className="flex items-center justify-between gap-6">
        <span className="font-mono text-sm text-muted">{profile.handle}</span>
        <nav className="flex gap-1 text-sm text-muted">
          <a href="#work" className="rounded-md px-3 py-2 transition-colors hover:text-foreground">
            Work
          </a>
          <a href="#skills" className="rounded-md px-3 py-2 transition-colors hover:text-foreground">
            Skills
          </a>
        </nav>
      </header>

      <section className="mt-14 max-w-3xl sm:mt-20">
        <p className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs text-accent">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
          {profile.lookingFor}
        </p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {profile.name}
        </h1>
        <p className="mt-4 text-lg leading-snug text-balance text-foreground/80 sm:text-xl">
          {profile.tagline}
        </p>
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted">{profile.intro}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-accent px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            View GitHub <span aria-hidden>↗</span>
          </a>
          <a
            href={`mailto:${profile.links.email}`}
            className="inline-flex min-h-11 items-center rounded-lg border border-line px-5 text-sm text-foreground/90 transition-colors hover:border-accent/50 hover:text-accent"
          >
            Email me
          </a>
        </div>
      </section>

      <section id="work" className="mt-20 scroll-mt-8 sm:mt-24">
        <SectionLabel>Featured work</SectionLabel>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {featured.map((project) => (
            <FeaturedCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="mt-16 sm:mt-20">
        <SectionLabel>More projects</SectionLabel>
        <div className="mt-2 grid gap-x-10 divide-y divide-line md:grid-cols-2 md:divide-y-0">
          {more.map((project) => (
            <div key={project.slug} className="md:border-b md:border-line">
              <ProjectRow project={project} />
            </div>
          ))}
        </div>
      </section>

      <section id="skills" className="mt-16 scroll-mt-8 sm:mt-20">
        <SectionLabel>Skills</SectionLabel>
        <dl className="mt-6 grid gap-5 sm:grid-cols-2">
          {profile.skills.map(({ group, items }) => (
            <div key={group} className="rounded-xl border border-line bg-white/[0.015] p-4">
              <dt className="font-mono text-xs uppercase tracking-wider text-muted">{group}</dt>
              <dd className="mt-3 flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-line px-2.5 py-1 text-sm text-foreground/90"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <footer className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 text-sm text-muted sm:mt-20">
        <span className="font-mono text-xs">Next.js · TypeScript · Vercel</span>
        <span className="flex gap-2">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-md px-2 py-2 transition-colors hover:text-foreground"
          >
            github.com/{profile.handle}
          </a>
          <a
            href={`mailto:${profile.links.email}`}
            className="rounded-md px-2 py-2 transition-colors hover:text-foreground"
          >
            Email
          </a>
        </span>
      </footer>
    </div>
  );
}
