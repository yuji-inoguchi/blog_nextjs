import Head from "next/head";
import { useInsertionEffect } from "react";
import Layout from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/post";
import utilStyles from "../../styles/utils.module.css";

export async function getStaticPaths() {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  //個別のIDのデータを取得
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData /*SSG*/ }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingX1}>{postData.title}</h1>
        <div className={utilStyles.lightText}>{postData.data}</div>
        <div
          dangerouslySetInnerHTML={{ __html: postData.blogContentHTML }}
        ></div>
      </article>
    </Layout>
  );
}
