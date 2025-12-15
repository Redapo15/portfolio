export type Project = {
  slug: string;
  title: string;
  shortDescription: string;
  // You can extend this later with tags, links, images, etc.
  content: string;
};

export const projects: Project[] = [
  {
    slug: "my-first-project",
    title: "My First Project",
    shortDescription: "Short summary of what this project is about.",
    content: `My First Project

Describe what the project does, why you built it, and any interesting technical details.

- What problem does it solve?
- What technologies did you use?
- Anything you're particularly proud of.
`,
  },
  {
    slug: "another-cool-thing",
    title: "Another Cool Thing",
    shortDescription: "Another example project.",
    content: `# Another Cool Thing

Use this space for more detailed documentation or notes about the project.
`,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}


