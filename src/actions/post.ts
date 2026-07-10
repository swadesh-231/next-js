"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/db";

export async function createPost(formData: FormData): Promise<void> {
  const title = (formData.get("title") as string)?.trim();
  const content = (formData.get("content") as string)?.trim();

  if (!title) return;

  await prisma.post.create({
    data: {
      title,
      content: content || null,
      createdAt: new Date(),
    },
  });

  revalidatePath("/posts");
}

export async function getAllPosts() {
  return prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function updatePost(
  id: string,
  formData: FormData
): Promise<void> {
  const title = (formData.get("title") as string)?.trim();
  const content = (formData.get("content") as string)?.trim();

  if (!title) return;

  await prisma.post.update({
    where: { id },
    data: {
      title,
      content: content || null,
    },
  });

  revalidatePath("/posts");
}

export async function deletePost(id: string): Promise<void> {
  await prisma.post.delete({
    where: { id },
  });

  revalidatePath("/posts");
}
