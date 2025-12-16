"use client";

import Link from "next/link";
import { models3d } from "@/models3d";
import styles from "./Models3DSidebar.module.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Models3DSidebar({ isOpen, onClose }: Props) {
  return (
    <>
      {isOpen && (
        <div className={styles.overlay} onClick={onClose} />
      )}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>3D Models</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.modelList}>
            {models3d.map((model) => (
              <li key={model.slug}>
                <Link href={`/models3d/${model.slug}`} onClick={onClose}>
                  <span className={styles.modelTitle}>{model.title}</span>
                  <span className={styles.modelSubtitle}>
                    {model.shortDescription}
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

