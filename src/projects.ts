/**
 * HOW TO ADD A NEW PROJECT:
 * 
 * 1. Add a new object to the projects array below
 * 2. Required fields:
 *    - slug: URL-friendly name (e.g., "my-robot-project")
 *    - title: Display name
 *    - shortDescription: Brief summary (shown in sidebar)
 *    - content: Markdown-like text (supports # headings, - lists, paragraphs)
 * 3. Optional fields:
 *    - pdfUrl: Path to PDF file in /public folder (e.g., "/my-doc.pdf")
 * 
 * Example:
 * {
 *   slug: "my-new-project",
 *   title: "My New Project",
 *   shortDescription: "A cool robotics project.",
 *   content: `# My New Project\n\nDescription here...`,
 *   pdfUrl: "/my-new-project.pdf",  // Optional
 * }
 */

export type Project = {
  slug: string;
  title: string;
  shortDescription: string;
  // You can extend this later with tags, links, images, etc.
  content: string;
  pdfUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "koura-project",
    title: "KOURA Project",
    shortDescription: "Award winning electronics workshop course project 2025",
    content: `This project is documented in detail in the PDF below.`,
    pdfUrl: "/KOURA-project.pdf",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}


