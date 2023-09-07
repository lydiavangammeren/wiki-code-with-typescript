import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
interface Params {
    params: {
        postId: string;
    }
}

// GET api/posts/:postId
export async function GET(request: Request, {params} : Params) {
    const postId = Number(params.postId);
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        author: true,
      },
    });
    return NextResponse.json(post);
  }

// Publish Post
// PUT api/posts/:postId
export async function PUT(request: Request, {params} : Params) {
 const postId = Number(params.postId);
 await prisma.post.update({where: {
    id: postId,
 },
data: {
    published: true,
}
})
return new Response("success", {status: 200});
}

// Deleting a post
// DELETE api/posts/:postId
export async function DELETE(request: Request, {params} : Params) {
    const postId = Number(params.postId);
    await prisma.post.delete({where: {id: postId}});
    return new Response("success", {status: 200});
}