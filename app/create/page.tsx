import Link from "next/link";
import styles from "./CreatePost.module.css"
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default function CreatePostPage() {

    async function submitAction(formData: FormData) {
        "use server"
        const title = String(formData.get('title'));
        const email = String(formData.get('email'));
        const content = String(formData.get('content'));
        if (title && email && content) {
            await prisma.post.create({
                data: {title, content, author: {connect: {email}}}
            })
        }
        redirect('/drafts');
    }
    return (
        <main>
            <form action={submitAction}>
                <h1>Create Draft</h1>
                <input name="title" placeholder="Title" type="text"/>
                <input name="email" placeholder="Author (email address)" type="email"/>
                <textarea name="content" cols={50} rows={8} placeholder="Content"/>
                <button type="submit">Create Post</button>
                <Link href="/" className={styles.back}>or Cancel</Link>
            </form>
        </main>
    )
}