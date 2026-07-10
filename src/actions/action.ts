"use server";


import { prisma } from "@/lib/db";

export async function createUser(formData: FormData): Promise<void> {
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;

  if (!email || !name) return;

  await prisma.user.create({
    data: {
      email,
      name,
      createdAt: new Date(),
    },
  });
}
