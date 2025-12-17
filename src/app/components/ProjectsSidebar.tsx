"use client";

import Link from "next/link";
import { projects } from "@/projects";
import styles from "./ProjectsSidebar.module.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ProjectsSidebar({ isOpen, onClose }: Props) {
  return (
    <>
      {isOpen && (
        <div className={styles.overlay} onClick={onClose} />
      )}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>Projects</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <div className={styles.brand}>
          <h1 className={styles.name}>Aapo Lemettinen</h1>
          <p className={styles.role}>Student at Aalto University</p>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.projectList}>
            {projects.map((project) => (
              <li key={project.slug}>
                <Link href={`/projects/${project.slug}`} onClick={onClose}>
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
    </>
  );
}

