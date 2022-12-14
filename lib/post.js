import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

//mdファイルのデータを取り出す
export function getPostsData() {
  //外部APIから情報を取り出すとき
  // const fetchData = await fetch("endpoint")

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    //mdの拡張子を取り出す(/\.md$/)
    const id = fileName.replace(/\.md$/, ""); //ファイル名(id)

    //マークダウンファイルを文字列として読み取る
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    //idとデータを返す(meta情報)
    return {
      id,
      ...matterResult.data,
    };
  });
  return allPostsData;
}

//getStaticPathでreturnで使うpathを取得する
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
  //下記のようにidがreturnされる
  /*
    [
        {
            params: {
                id: "ssg-ssr"
            }
        }
    ]
  */
}

//idに基づいてブログ投稿データを返す
export async function getPostData(id) {
  //マークダウンファイル読み込み
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContent = fs.readFileSync(fullPath, "utf8");

  //メタデータ解析
  const matterResult = matter(fileContent);

  //HTML変換ライブラリ remark
  const blogContent = await remark()
    .use(html)
    //文字列↓ HTMLに変換↑
    .process(matterResult.content);

  const blogContentHTML = blogContent.toString();

  return {
    id,
    blogContentHTML,
    ...matterResult.data,
  };
}
