import { Post, User } from "@prisma/client"
import Link from "next/link"
import styles from "./Post.module.css"

export type PostProps = {
    id: string;
    title: string;
    author: {
      name: string;
      email: string;
    } | null;
    content: string;
    published: boolean;
}

export default function Post({id, title, author, content, published} : PostProps) {
    const authorName = author ? author.name : "Anonymous"
    return (
        <Link href={`/posts/${id}`} className={styles.post}>
            <h2>{title}</h2>
            <small>{authorName}</small>
        </Link>
    )
}