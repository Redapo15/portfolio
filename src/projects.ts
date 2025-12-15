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
    shortDescription: "Robotics-oriented project documented as a PDF.",
    content: `This project is documented in detail in the PDF below.`,
    pdfUrl: "/KOURA-project.pdf",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}


