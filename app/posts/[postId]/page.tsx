import PostDetails from "@/components/PostDetails";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
    params: {
        postId: string;
    }
}

export default async function PostPage({params}: Props) {
    
    const post = await prisma.post.findUnique({
        where: {
            id: params.postId
        },
        include: {
            author: true
        }
    })

    if (!post) {
        return notFound();
    }
    return (
        <PostDetails {...post}/>
    )
}