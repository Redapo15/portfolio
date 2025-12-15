import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/projects";
import styles from "./project.module.css";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default function ProjectPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return notFound();
  }

  // Very small Markdown-like rendering: just support line breaks and headings.
  const lines = project.content.split("\n");

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <h1 className={styles.name}>Aapo Lemettinen</h1>
          <p className={styles.role}>Student at Aalto University</p>
        </div>
        <nav className={styles.nav}>
          <h2 className={styles.navTitle}>Projects</h2>
          <ul className={styles.projectList}>
            {projects.map((p) => (
              <li key={p.slug}>
                <Link href={`/projects/${p.slug}`}>
                  <span
                    className={
                      p.slug === project.slug
                        ? styles.projectTitleActive
                        : styles.projectTitle
                    }
                  >
                    {p.title}
                  </span>
                  <span className={styles.projectSubtitle}>
                    {p.shortDescription}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/" className={styles.backHome}>
            ← Back to overview
          </Link>
        </nav>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <h1>{project.title}</h1>
          <p>{project.shortDescription}</p>
        </header>

        <article className={styles.article}>
          {lines.map((line, index) => {
            if (line.startsWith("# ")) {
              return (
                <h2 key={index} className={styles.h2}>
                  {line.replace(/^# /, "")}
                </h2>
              );
            }
            if (line.startsWith("## ")) {
              return (
                <h3 key={index} className={styles.h3}>
                  {line.replace(/^## /, "")}
                </h3>
              );
            }
            if (line.startsWith("- ")) {
              return (
                <li key={index} className={styles.li}>
                  {line.replace(/^- /, "")}
                </li>
              );
            }
            if (line.trim() === "") {
              return <br key={index} />;
            }
            return (
              <p key={index} className={styles.p}>
                {line}
              </p>
            );
          })}
        </article>
      </main>
    </div>
  );
}


