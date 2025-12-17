import Link from "next/link";
import styles from "./page.module.css";
import { projects } from "@/projects";

export default function Home() {
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
            I document past projects here. Use the sidebar to open interesting
            project documentations.
          </p>
        </section>

        <section className={styles.about}>
          <h3>About me</h3>
          <p>
            I am an information technology student at Aalto University. I am
            planning to change to automation and robotics, so my projects are a
            bit robotics oriented. Some 3d models designs I have made can be seen from opening the side panel from right.
          </p>
        </section>
      </main>
    </div>
  );
}
