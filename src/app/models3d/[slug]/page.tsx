import Link from "next/link";
import { getModel3DBySlug, models3d } from "@/models3d";
import styles from "./model3d.module.css";

type Props = {
  params: Promise<{ slug: string }> | { slug: string };
};

export const dynamic = "force-dynamic";

export default async function Model3DPage({ params }: Props) {
  const resolvedParams = await Promise.resolve(params);
  const slug = decodeURIComponent(resolvedParams.slug);
  
  const model = getModel3DBySlug(slug);

  if (!model) {
    return (
      <div className={styles.page}>
        <aside className={styles.sidebar}>
          <div className={styles.brand}>
            <h1 className={styles.name}>Aapo Lemettinen</h1>
            <p className={styles.role}>Student at Aalto University</p>
          </div>
          <nav className={styles.nav}>
            <h2 className={styles.navTitle}>3D Models</h2>
            <ul className={styles.modelList}>
              {models3d.map((m) => (
                <li key={m.slug}>
                  <Link href={`/models3d/${m.slug}`}>
                    <span className={styles.modelTitle}>{m.title}</span>
                    <span className={styles.modelSubtitle}>
                      {m.shortDescription}
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
            <h1>3D Model not found</h1>
            <p>The 3D model you are looking for does not exist.</p>
          </header>
        </main>
      </div>
    );
  }

  const lines = model.content.split("\n");

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <h1 className={styles.name}>Aapo Lemettinen</h1>
          <p className={styles.role}>Student at Aalto University</p>
        </div>
        <nav className={styles.nav}>
          <h2 className={styles.navTitle}>3D Models</h2>
          <ul className={styles.modelList}>
            {models3d.map((m) => (
              <li key={m.slug}>
                <Link href={`/models3d/${m.slug}`}>
                  <span
                    className={
                      m.slug === model.slug
                        ? styles.modelTitleActive
                        : styles.modelTitle
                    }
                  >
                    {m.title}
                  </span>
                  <span className={styles.modelSubtitle}>
                    {m.shortDescription}
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
          <h1>{model.title}</h1>
          <p>{model.shortDescription}</p>
        </header>

        <section className={styles.downloadSection}>
          <div className={styles.downloadCard}>
            <div className={styles.downloadInfo}>
              <h2 className={styles.downloadTitle}>Download 3D Model</h2>
              <p className={styles.downloadFormat}>Format: {model.fileFormat}</p>
            </div>
            <a
              href={model.fileUrl}
              download
              className={styles.downloadButton}
            >
              Download {model.fileFormat} File ↓
            </a>
          </div>
        </section>

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


