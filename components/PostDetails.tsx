"use client";
import { Post, User } from "@prisma/client";
import Markdown from "markdown-to-jsx";
import styles from "./PostDetails.module.css";
import { useRouter } from "next/navigation";

type Props = Post & {
  author: User | null;
};

export default function PostDetails({
  id,
  author,
  published,
  content,
  title,
  updatedAt
}: Props) {
  const router = useRouter();
  async function publishPost(postId: number) {
    await fetch(`http://localhost:3000/api/posts/${postId}`, {
      method: "PUT",
    });
    router.refresh();
    router.push("/");
  }

  async function deletePost(postId: number) {
    await fetch(`http://localhost:3000/api/posts/${postId}`, {
      method: "DELETE",
    });
    router.refresh();
    router.push("/");
  }
  return (
    <main>
      <h1>{published ? title : `${title} (Draft)`}</h1>
      <p>by {author?.name || "anonymous"}</p>
      <section className={styles.section}>
        <Markdown>{content || ""}</Markdown>
      </section>
      <p>Last modified on: {String(updatedAt)}</p>
      {!published && (
        <button
          className={styles.button}
          onClick={() => {
            publishPost(id);
          }}
        >
          Publish
        </button>
      )}
      <button
        className={styles.button}
        onClick={() => {
          deletePost(id);
        }}
      >
        Delete
      </button>
    </main>
  );
}
