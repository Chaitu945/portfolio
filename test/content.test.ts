import { describe, expect, it } from "vitest";

import { profile } from "@/data/profile";
import { projects, type Status } from "@/data/projects";

/**
 * These tests exist because the failure mode of a content site is not a crash —
 * it is shipping placeholder text, a dead link, or a project with no explanation.
 * None of that breaks a build, so it has to be asserted.
 */

const STATUSES: Status[] = ["Shipped", "In progress", "Internal tool"];

const PLACEHOLDER =
  /\b(lorem ipsum|todo|tbd|fixme|xxx+|placeholder|your name here|change me|sample text)\b/i;

function allStrings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(allStrings);
  if (value && typeof value === "object") return Object.values(value).flatMap(allStrings);
  return [];
}

describe("profile", () => {
  it("fills every field the page renders", () => {
    expect(profile.name.trim()).not.toBe("");
    expect(profile.handle.trim()).not.toBe("");
    expect(profile.tagline.trim()).not.toBe("");
    expect(profile.intro.trim()).not.toBe("");
  });

  it("keeps the tagline to one line and the intro short", () => {
    // Both render as narrow columns; long copy wrecks the layout, not the build.
    expect(profile.tagline.length).toBeLessThanOrEqual(120);
    expect(profile.intro.length).toBeLessThanOrEqual(480);
  });

  it("uses a well-formed email address", () => {
    expect(profile.links.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it("links to an https GitHub profile", () => {
    expect(profile.links.github).toMatch(/^https:\/\/github\.com\/[\w-]+\/?$/);
  });

  it("gives every skill group a name and at least one item", () => {
    expect(profile.skills.length).toBeGreaterThan(0);
    for (const { group, items } of profile.skills) {
      expect(group.trim()).not.toBe("");
      expect(items.length).toBeGreaterThan(0);
    }
  });

  it("contains no placeholder text", () => {
    for (const value of allStrings(profile)) {
      expect(value, `placeholder text found in: ${value}`).not.toMatch(PLACEHOLDER);
    }
  });
});

describe("projects", () => {
  it("shows a real body of work", () => {
    expect(projects.length).toBeGreaterThanOrEqual(5);
  });

  it("gives every project the fields the card needs", () => {
    for (const project of projects) {
      expect(project.title.trim(), project.slug).not.toBe("");
      expect(project.summary.trim(), project.slug).not.toBe("");
      expect(project.stack.length, project.slug).toBeGreaterThan(0);
      expect(STATUSES, project.slug).toContain(project.status);
    }
  });

  it("keeps summaries to a readable length", () => {
    for (const project of projects) {
      expect(project.summary.length, project.slug).toBeLessThanOrEqual(260);
    }
  });

  it("uses unique, url-safe slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug, slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it("links only to https GitHub repositories", () => {
    for (const project of projects) {
      if (!project.repo) continue;
      expect(project.repo, project.slug).toMatch(
        /^https:\/\/github\.com\/Chaitu945\/[\w.-]+$/
      );
    }
  });

  it("links only to https deployments, and never to the same place twice", () => {
    for (const project of projects) {
      if (!project.live) continue;
      expect(project.live, project.slug).toMatch(/^https:\/\/[\w.-]+\/.+/);
      // A "live" link that just points at the repo is a mislabelled source link.
      expect(project.live, project.slug).not.toBe(project.repo);
    }
  });

  it("gives a live project a label a visitor can act on", () => {
    for (const project of projects) {
      if (!project.live) continue;
      expect(project.liveLabel ?? "live", project.slug).toMatch(/^[a-z]+$/);
    }
  });

  it("never repeats a highlight, which would read as padding", () => {
    for (const project of projects) {
      expect(new Set(project.highlights).size, project.slug).toBe(project.highlights.length);
      for (const highlight of project.highlights) {
        expect(highlight.trim(), project.slug).not.toBe("");
      }
    }
  });

  it("makes an unlinked project explain itself inline", () => {
    // The design rule: with no public repo to click, the highlights ARE the
    // evidence. A project card with neither is a claim with nothing behind it.
    for (const project of projects.filter((p) => !p.repo)) {
      expect(project.highlights.length, `${project.slug} has no repo and no highlights`)
        .toBeGreaterThan(0);
    }
  });

  it("contains no placeholder text", () => {
    for (const value of allStrings(projects)) {
      expect(value, `placeholder text found in: ${value}`).not.toMatch(PLACEHOLDER);
    }
  });
});
