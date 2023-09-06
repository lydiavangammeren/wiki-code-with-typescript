import { Post, User } from "@prisma/client";
import Markdown from "markdown-to-jsx";
import styles from "./PostDetails.module.css"

type Props = Post & {
    author: User | null
}

export default function PostDetails({id, author, published, content, title}: Props) {
 return (
    <main>
        <h1>{published ? title : `${title} (Draft)`}</h1>
        <p>by {author?.name || "anonymous"}</p>
        <section className={styles.section}>
            <Markdown>{content || ""}</Markdown>
        </section>
        {!published && (
            <button className={styles.button}>Publish</button>
        )}
        <button className={styles.button}>Delete</button>
    </main>
 )
}