/**
 * Who this site is about. Everything personal lives here and nowhere else — change
 * this file and the whole page updates.
 */

export const profile = {
  /** Matches the public GitHub profile name. Change it if you prefer another form. */
  name: "Krishna Chaitanya",
  handle: "Chaitu945",

  /** One line. Shown under the name. */
  tagline: "I build small tools that watch the chain and make it readable.",

  /** Two or three sentences. No adjectives you would not defend in an interview. */
  intro:
    "I work mostly in Node and TypeScript, with Python for on-chain tooling. Nearly everything here started as something I wanted for myself: a bot that tells me when a drop goes live, a script that works out which of my wallets holds a collection, a runner that mints across chains while I sleep.",

  links: {
    github: "https://github.com/Chaitu945",
    email: "krishnachaitanyaappari@gmail.com",
  },

  /**
   * Grouped skills. Keep these honest — anything listed here is fair game for an
   * interviewer to probe.
   */
  skills: [
    { group: "Languages", items: ["TypeScript", "JavaScript", "Python"] },
    { group: "Frameworks", items: ["Node.js", "React", "Next.js", "FastAPI"] },
    { group: "Data", items: ["SQLite", "JSON-RPC", "REST APIs"] },
    { group: "Tooling", items: ["GitHub Actions", "Vercel", "Vitest", "ESLint"] },
  ],
} as const;

export type Profile = typeof profile;
