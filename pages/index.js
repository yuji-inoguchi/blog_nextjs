import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout, { siteTitle } from "../components/Layout";
import styles from "../styles/Home.module.css";
import utilStyle from "../styles/utils.module.css";
import { getPostsData } from "../lib/post";

//SSGの場合
export async function getStaticProps() {
  //id, title, data, thumbnanail
  const allPostsData = getPostsData();

  return {
    props: {
      allPostsData,
    },
  };
}

//SSRの場合
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       //コンポーネントに渡すためのprops
//     },
//   };
// }

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyle.headingMd}>
        <p>Webエンジニア</p>
      </section>

      <section>
        <h2>🗒エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={`${thumbnail}`} className={styles.thumbnailImage} />
              </Link>
              <Link href="/" className={utilStyle.boldText}>
                {title}
              </Link>
              <br />
              <small className={utilStyle.lightText}>{date}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
