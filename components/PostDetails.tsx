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
}: Props) {
  const router = useRouter();
  async function publishPost(postId: string) {
    await fetch(`/api/posts/${postId}`, {
      method: "PUT",
      mode: "cors",
    });
    router.refresh();
    router.push("/");
  }

  async function deletePost(postId: string) {
    await fetch(`http://localhost:3000/api/posts/${postId}`, {
      method: "DELETE",
      mode: "cors",
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
