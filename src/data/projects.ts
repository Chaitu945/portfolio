/**
 * The work shown on the page.
 *
 * `repo` is optional on purpose: several of these are private, and a portfolio
 * full of dead links is worse than one that explains the work inline. When there
 * is no public repo, `highlights` has to carry the weight — say what the thing
 * does and what was actually hard about it.
 *
 * `live` is for anything actually running that a visitor can open. A playable
 * game is the strongest thing on this page, so it links to the game itself
 * rather than making someone read a repository first.
 *
 * Written in plain language deliberately. "Built a thing" beats "leveraged
 * synergies", and every claim here should survive being asked about.
 */

export type Status = "Shipped" | "In progress" | "Internal tool";

export interface Project {
  slug: string;
  title: string;
  summary: string;
  highlights: string[];
  stack: string[];
  status: Status;
  /** Public repository, if there is one. */
  repo?: string;
  /** Running deployment a visitor can open, if there is one. */
  live?: string;
  /** Label for the `live` link. Defaults to "live". */
  liveLabel?: string;
}

export const projects: Project[] = [
  {
    slug: "hood-hop",
    title: "Hood Hop",
    summary:
      "A playable browser game built to occupy a community while an NFT mint was pending: pick a monkey, glide through the canopy and dodge the rug, the bear claw, the whale splash and paper hands.",
    highlights: [
      "One self-contained HTML file — no build step, no dependencies, deployed straight to GitHub Pages",
      "Keyboard and touch input, with a rotate prompt for phones",
      "Written and shipped as fan-made hype rather than an official product, and labelled that way on the page",
    ],
    stack: ["HTML", "JavaScript", "GitHub Pages"],
    status: "Shipped",
    repo: "https://github.com/Chaitu945/MonkeyHood-hop",
    live: "https://chaitu945.github.io/MonkeyHood-hop/",
    liveLabel: "play",
  },
  {
    slug: "wallet-tracker-bot",
    title: "Wallet Tracker Bot",
    summary:
      "A Discord bot that watches wallets across chains and posts an alert when one of them trades, with per-token cost-basis PnL.",
    highlights: [
      "85 unit tests, CI green on Node 20, 22 and 24",
      "Tracked down a price bug that quietly returned another chain's market for the same token address — USDC read as $0.0009 instead of $1",
      "`npm run check-keys` verifies every credential against the live API, because a well-formed key can still be revoked",
    ],
    stack: ["Node.js", "discord.js", "SQLite", "GitHub Actions"],
    status: "Shipped",
    repo: "https://github.com/Chaitu945/Wallet-Tracker-Bot",
  },
  {
    slug: "control-room",
    title: "Control Room",
    summary:
      "A dashboard for the on-chain jobs I kept doing by hand: which of my wallets hold a collection, what my wallets are trading, what is minting.",
    highlights: [
      "The holder lookup reads public RPC nodes directly with hand-rolled ABI encoding — no API key, no provider account, no per-request cost",
      "Detects ERC-721 vs ERC-1155 through ERC-165, and reports a contract that does not implement it as unconfirmed rather than guessing",
      "A failed balance call is surfaced as an error, never silently counted as zero holdings",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    status: "In progress",
  },
  {
    slug: "nft-mint-rarity-toolkit",
    title: "NFT Mint & Rarity Toolkit",
    summary:
      "Agent playbooks and working code for on-chain NFT work: minting, rarity ranking, reveal sniping, proof-of-work claims and forensics.",
    highlights: [
      "43 Python modules across minting, rarity ranking, reveal sniping, proof-of-work claims, wallet operations and on-chain forensics",
      "Packaged as installable playbooks with a guide that takes someone from nothing to a working agent in Discord",
    ],
    stack: ["Python", "Node.js", "Documentation"],
    status: "In progress",
  },
  {
    slug: "os-launchpad-bot",
    title: "OpenSea Launchpad Notifier",
    summary:
      "Watches OpenSea's Launchpad across several chains and messages Telegram when a drop goes live or one of my wallets becomes eligible to mint.",
    highlights: [
      "Eligibility is checked by calling OpenSea's own mint-transaction endpoint with my wallets, rather than reimplementing allowlists and merkle proofs",
      "Replaced manually refreshing a drop page every hour",
    ],
    stack: ["Node.js", "Telegram API"],
    status: "Shipped",
  },
  {
    slug: "nft-alert-bot",
    title: "NFT Alert Bot",
    summary:
      "A Telegram bot that monitors Ethereum wallets in real time and sends rich alerts when NFTs are bought or received.",
    highlights: [
      "Distinguishes purchases from inbound transfers before alerting, so the notifications stay worth reading",
    ],
    stack: ["Python", "Telegram API"],
    status: "Shipped",
  },
  {
    slug: "my-mint-bot",
    title: "Mint Runner",
    summary:
      "A multichain mint runner with scheduled runs, gas-price waiting and per-wallet results, built to run unattended on a VPS.",
    highlights: [
      "Waits for a gas threshold before firing and runs each wallet independently, so one failure does not abort the batch",
    ],
    stack: ["Node.js"],
    status: "Internal tool",
  },
  {
    slug: "translator-bot",
    title: "Translate Bot",
    summary: "A Telegram bot that automatically translates group messages into a target language.",
    highlights: [
      "Calls Google's key-free translation endpoint directly and parses its nested response shape, with source-language auto-detection — no API key and no paid tier to stay inside",
    ],
    stack: ["Node.js", "Telegram API"],
    status: "Shipped",
  },
  {
    slug: "boi-the-bear",
    title: "Social Content Bot",
    summary: "An automated social account that generates and posts ecosystem content on a schedule.",
    highlights: [
      "Generates posts through Gemini behind a swappable prompt layer, then formats and publishes them over a Twitter client — split into services rather than one growing script",
    ],
    stack: ["Node.js", "Gemini API"],
    status: "Internal tool",
  },
];
