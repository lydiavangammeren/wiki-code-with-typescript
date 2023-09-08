import prisma from "@/lib/prisma";
import { GetServerSideProps } from "next";
import Post, { PostProps } from "@/components/Post";
import styles from "./Drafts.module.css";

export const getServerSideProps: GetServerSideProps = async () => {
  const drafts = await prisma.post.findMany({
    where: { published: false },
    include: { author: true },
  });
  return {
    props: { drafts },
    revalidate: 0,
  };
};

type Props = {
  drafts: PostProps[];
};
export default async function DraftsPage(props: Props) {
  //const drafts = await prisma.post.findMany({where: {published: false}, include: {author: true}});

  return (
    <main>
      <h1>Drafts</h1>
      {props.drafts.map((post) => (
        <div key={post.id} className={styles.draft}>
          <Post id={post.id} title={post.title} author={post.author} content={post.content} published={post.published} />
        </div>
      ))}
    </main>
  );
}
