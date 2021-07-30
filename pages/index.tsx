import React, { VFC } from "react";
import Head from "next/head";
import styled from "styled-components";
import { createClient } from "contentful";
import { InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";

export const getStaticProps = async () => {
  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "",
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "",
  });

  const response: any = await client.getEntries({
    content_type: "blogPost",
  });

  return {
    props: {
      posts: response.items,
    },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div>
      <Head>
        <title>Homepage</title>
      </Head>
      <PostListStyled>
        <h3>記事一覧</h3>
        <ul>
          {posts.map((item: any) => (
            <li key={item.sys.id}>
              <Link href={"/posts/" + item.sys.id}>
                <a>{item.fields.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </PostListStyled>
    </div>
  );
};

export default Home;

const PostListStyled = styled.div`
  h3 {
    text-align: center;
  }
  ul,
  ol {
    padding: 0;
    position: relative;
  }

  ul li,
  ol li {
    margin: 0 auto;
    color: #fffffe;
    border-left: solid 6px #fffffe; /*左側の線*/
    background: #a7a9be; /*背景色*/
    margin-bottom: 3px; /*下のバーとの余白*/
    line-height: 1.5;
    padding: 0.5em;
    list-style-type: none !important; /*ポチ消す*/
    width: 400px;
  }
`;
