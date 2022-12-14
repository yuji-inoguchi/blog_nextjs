import Head from "next/head";
import styles from "./layout.module.css";
import utilsStyles from "../styles/utils.module.css";
import Link from "next/link";

const name = "yularis";
export const siteTitle = "Next.js blog";

function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <img
              src="/images/yularis-profile.png"
              className={`${utilsStyles.borderCircle}`}
            />
            <h1 className={utilsStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <img
              src="/images/yularis-profile.png"
              className={`${utilsStyles.borderCircle}`}
            />
            <h1 className={utilsStyles.heading2Xl}>{name}</h1>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div>
          <Link href="/">←　ホームに戻る</Link>
        </div>
      )}
    </div>
  );
}

export default Layout;
