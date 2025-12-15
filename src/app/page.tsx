import Link from "next/link";
import styles from "./page.module.css";
import { projects } from "@/projects";

export default function Home() {
  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <h1 className={styles.name}>Your Name</h1>
          <p className={styles.role}>Developer / Designer</p>
        </div>
        <nav className={styles.nav}>
          <h2 className={styles.navTitle}>Projects</h2>
          <ul className={styles.projectList}>
            {projects.map((project) => (
              <li key={project.slug}>
                <Link href={`/projects/${project.slug}`}>
                  <span className={styles.projectTitle}>{project.title}</span>
                  <span className={styles.projectSubtitle}>
                    {project.shortDescription}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h2>Welcome to my portfolio</h2>
          <p>
            This is a place where I collect my projects, experiments, and
            documentation. Use the sidebar to open any project and read more
            about it.
          </p>
        </section>

        <section className={styles.about}>
          <h3>About me</h3>
          <p>
            Write a short introduction about who you are, what you work on, and
            what kind of projects you like to build.
          </p>
        </section>
      </main>
    </div>
  );
}
