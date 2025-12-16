import Link from "next/link";
import { getProjectBySlug, projects } from "@/projects";
import styles from "./project.module.css";

type Props = {
  params: Promise<{ slug: string }> | { slug: string };
};

// Render this route dynamically on each request instead of relying on
// pre-generated params. This avoids any mismatch between build-time
// and runtime that could cause a 404.

export const dynamic = "force-dynamic";

export default async function ProjectPage({ params }: Props) {
  const resolvedParams = await Promise.resolve(params);
  // Decode URL-encoded slugs (e.g., "my-project" stays "my-project", but handles edge cases)
  const slug = decodeURIComponent(resolvedParams.slug);
  
  const project = getProjectBySlug(slug);




  if (!project) {
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
                    <span className={styles.projectTitle}>{p.title}</span>
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
            <h1>Project not found</h1>
            <p>The project you are looking for does not exist.</p>
          </header>
        </main>
      </div>
    );
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

      <main className={project.pdfUrl ? styles.mainPdf : styles.main}>
        {project.pdfUrl ? (
          <>
            <div className={styles.pdfHeader}>
              <div>
                <h1 className={styles.pdfTitle}>{project.title}</h1>
                <p className={styles.pdfSubtitle}>{project.shortDescription}</p>
              </div>
              <a
                href={project.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.pdfLink}
              >
                Open in new tab ↗
              </a>
            </div>
            <iframe
              src={`${project.pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
              className={styles.pdfViewer}
              title={`${project.title} Documentation`}
            />
          </>
        ) : (
          <>
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
          </>
        )}
      </main>
    </div>
  );
}


