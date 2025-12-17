"use client";

import { useState } from "react";
import ProjectsSidebar from "./ProjectsSidebar";
import styles from "./ProjectsToggle.module.css";

export default function ProjectsToggle() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Projects"
      >
        <span className={styles.textContainer}>
          <span className={styles.text}>Projects</span>
        </span>
      </button>
      <ProjectsSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

