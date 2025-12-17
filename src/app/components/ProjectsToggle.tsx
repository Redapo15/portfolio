"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { projects } from "@/projects";
import ProjectsSidebar from "./ProjectsSidebar";
import styles from "./ProjectsToggle.module.css";

export default function ProjectsToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPdfPage, setIsPdfPage] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 901);
    };
    
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    // Check if we're on a project page with PDF
    if (pathname?.startsWith("/projects/")) {
      const slug = pathname.split("/projects/")[1];
      const project = projects.find(p => p.slug === slug);
      setIsPdfPage(!!project?.pdfUrl);
    } else {
      setIsPdfPage(false);
    }
  }, [pathname]);

  // Hide on desktop PDF pages only
  if (isDesktop && isPdfPage) {
    return null;
  }

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

