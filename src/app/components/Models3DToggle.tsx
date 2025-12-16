"use client";

import { useState } from "react";
import Models3DSidebar from "./Models3DSidebar";
import styles from "./Models3DToggle.module.css";

export default function Models3DToggle() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle 3D Models"
      >
        <span className={styles.textContainer}>
          <span className={styles.text}>3D</span>
          <span className={styles.text}>Models</span>
        </span>
      </button>
      <Models3DSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

