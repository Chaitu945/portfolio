# Portfolio

A single-page site listing what I have built. Next.js, TypeScript, Tailwind —
fully static, so it deploys to Vercel with no configuration.

## Editing the content

Everything the page shows comes from two files. There is no CMS and no database.

| File | Holds |
| --- | --- |
| `src/data/profile.ts` | Name, handle, tagline, intro, links, skills |
| `src/data/projects.ts` | The project list |

Change those, and the page changes. Nothing else needs touching.

### Adding a project

Append an object to `projects` in `src/data/projects.ts`:

```ts
{
  slug: "my-project",           // unique, url-safe
  title: "My Project",
  summary: "One or two sentences on what it does.",
  highlights: ["What was hard, or what it does that is interesting."],
  stack: ["Node.js"],
  status: "Shipped",            // "Shipped" | "In progress" | "Internal tool"
  repo: "https://github.com/Chaitu945/my-project",  // optional
  live: "https://my-project.vercel.app",            // optional
  liveLabel: "play",                                // optional, defaults to "live"
}
```

**`repo` is optional, and that is load-bearing.** Several of these projects are
private, and a portfolio of dead links is worse than one that explains the work
inline. A test enforces the rule that follows from this: **a project with no
public repo must have at least one highlight**, so every card has something
backing it up.

**`live` is for anything actually running**, and it takes priority: when it is
set, the project title links to the running thing rather than the source, and a
labelled link appears alongside it. That is deliberate — a playable game should
be one click from the page, not two clicks and a README away.

## Tests

```bash
npm test
```

The tests assert the things a content site gets wrong without ever breaking a
build:

- no placeholder text (`TODO`, lorem ipsum, "Your name here") anywhere in the content
- every project has the fields its card renders, and a valid status
- slugs are unique and url-safe, so anchors stay stable
- repo links are https and point at the expected account
- live links are https and are **not** just the repo link again (a mislabelled source link)
- summaries stay within the length the layout can hold
- no project is listed without either a public repo or a highlight

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
```

Node 22 or newer.

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

CI runs all four on Node 22 and 24.

## Deploying

```bash
npx vercel
```

No environment variables, no build settings, no server runtime — every page is
prerendered at build time.

## Layout

```
src/
  app/
    layout.tsx      metadata + fonts
    page.tsx        the whole page: header, hero, work, about, footer
    icon.svg        favicon
  components/
    ProjectCard.tsx one project: title, status, summary, highlights, stack
  data/
    profile.ts      who the site is about
    projects.ts     the work
test/
  content.test.ts   content integrity
```
