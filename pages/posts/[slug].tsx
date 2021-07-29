import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { createClient } from "contentful";
import { GetStaticPaths, InferGetStaticPropsType, NextPage } from "next";
import { BLOCKS } from "@contentful/rich-text-types";
import styled from "styled-components";
import Image from "next/image";

const client = createClient({
  space: process.env.CTF_SPACE_ID || "",
  accessToken: process.env.CTF_CDA_ACCESS_TOKEN || "",
});

export const getStaticPaths: GetStaticPaths = async () => {
  const res: any = await client.getEntries({
    content_type: "blogPost",
  });

  const paths = res.items.map((item: any) => {
    return {
      params: { slug: item.sys.id },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: any }) => {
  const id = params.slug;
  const response = await client.getEntry(id);

  return {
    props: {
      posts: response,
    },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Posts: NextPage<Props> = ({ posts }: { posts: any }) => {
  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any, children: any) => {
        const src = "https:" + node.data.target.fields.file.url;
        const height = node.data.target.fields.file.details.height;
        const width = node.data.target.fields.file.details.width;
        return <Image src={src} width={width} height={height} />;
      },
    },
  };
  console.log(posts);
  return (
    <SlugStyled>
      <div className="container">
        <h1>{posts.fields.title}</h1>
        {posts.fields.body.content.map((item: any) => (
          <div>{documentToReactComponents(item, options)}</div>
        ))}
      </div>
    </SlugStyled>
  );
};

export default Posts;

const SlugStyled = styled.div`
  .container {
    margin: 0 20%;
  }

  ul,
  ol {
    border-top: solid #fffffe 1px; /*上のボーダー*/
    border-bottom: solid #fffffe 1px; /*下のボーダー*/
    padding: 0.5em 0 0.5em 1.5em;
  }
`;
