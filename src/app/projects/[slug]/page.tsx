import Link from "next/link";
import { getProjectBySlug, projects } from "@/projects";
import styles from "./project.module.css";

type Props = {
  params: { slug: string };
};

// Render this route dynamically on each request instead of relying on
// pre-generated params. This avoids any mismatch between build-time
// and runtime that could cause a 404.
export const dynamic = "force-dynamic";

export default function ProjectPage({ params }: Props) {
  const slug = decodeURIComponent(params.slug);
  console.log("params.slug:", params.slug);
  console.log("decoded slug:", slug);
  console.log("available slugs:", projects.map(p => p.slug));

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

      <main className={styles.main}>
        <header className={styles.header}>
          <h1>{project.title}</h1>
          <p>{project.shortDescription}</p>
        </header>

        {project.pdfUrl && (
          <section className={styles.article}>
            <h2 className={styles.h2}>Documentation (PDF)</h2>
            <p className={styles.p}>
              You can read the full documentation below or{" "}
              <a href={project.pdfUrl} target="_blank" rel="noopener noreferrer">
                open it in a new tab
              </a>
              .
            </p>
            <object
              data={project.pdfUrl}
              type="application/pdf"
              width="100%"
              height="600px"
            >
              <p>
                Your browser cannot display the PDF.{" "}
                <a href={project.pdfUrl} target="_blank" rel="noopener noreferrer">
                  Click here to download it.
                </a>
              </p>
            </object>
          </section>
        )}

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


