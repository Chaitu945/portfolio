import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { projects } from "@/data/projects";

/**
 * Screenshot integrity.
 *
 * A wrong path in `shot` does not break the build and does not fail any other
 * test — it renders as a broken image icon on a live portfolio. That is the
 * single worst failure this page can have, and nothing else would catch it, so
 * the assets are asserted directly.
 *
 * These screenshots are captured from the running thing, never mocked up.
 */

const PUBLIC_DIR = path.join(process.cwd(), "public");
const withShots = projects.filter((p) => p.shot);

describe("screenshots", () => {
  it("actually uses screenshots, or this file is pointless", () => {
    expect(withShots.length).toBeGreaterThan(0);
  });

  it("pairs every screenshot with alt text", () => {
    for (const project of withShots) {
      expect(project.shotAlt, `${project.slug} has a shot but no shotAlt`).toBeTruthy();
    }
  });

  it("writes alt text that describes the image rather than naming it", () => {
    // "screenshot" as alt text tells a screen-reader user nothing.
    for (const project of withShots) {
      const alt = project.shotAlt ?? "";
      expect(alt.length, `${project.slug} alt text is too short to be useful`).toBeGreaterThan(30);
      expect(alt.toLowerCase(), `${project.slug} alt text just says "screenshot"`).not.toBe(
        "screenshot"
      );
    }
  });

  it("points at a root-relative path under /public", () => {
    for (const project of withShots) {
      expect(project.shot, project.slug).toMatch(/^\/[\w./-]+\.png$/);
    }
  });

  it("has the file on disk for every declared screenshot", () => {
    for (const project of withShots) {
      const file = path.join(PUBLIC_DIR, project.shot as string);
      expect(fs.existsSync(file), `missing file: public${project.shot}`).toBe(true);
    }
  });

  it("ships a real image, not a zero-byte or error-page stub", () => {
    for (const project of withShots) {
      const file = path.join(PUBLIC_DIR, project.shot as string);
      const buf = fs.readFileSync(file);

      // PNG magic bytes — catches an HTML error page saved with a .png name.
      expect(buf.subarray(0, 8).toString("hex"), `${project.slug} is not a PNG`).toBe(
        "89504e470d0a1a0a"
      );
      // A blank or failed capture compresses to almost nothing.
      expect(buf.byteLength, `${project.slug} screenshot looks empty`).toBeGreaterThan(5_000);
    }
  });

  it("keeps screenshots small enough to load on a phone", () => {
    for (const project of withShots) {
      const size = fs.statSync(path.join(PUBLIC_DIR, project.shot as string)).size;
      expect(size, `${project.slug} screenshot is too heavy`).toBeLessThan(1_000_000);
    }
  });
});
