"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidatePath } from "next/cache";
import z from "zod";

export async function likeTweet(tweetId: number) {
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        tweetId,
        userId: session.id!,
      },
    });
    revalidatePath(`/tweets/${tweetId}`);
    revalidatePath("/");
  } catch {}
}

export async function dislikeTweet(tweetId: number) {
  const session = await getSession();
  try {
    await db.like.delete({
      where: {
        id: {
          tweetId,
          userId: session.id!,
        },
      },
    });
    revalidatePath(`/tweets/${tweetId}`);
    revalidatePath("/");
  } catch {}
}

const commentSchema = z
  .string()
  .trim()
  .max(200, "댓글은 200자 이내로 작성해주세요.");

export async function addComment(_: unknown, formData: FormData) {
  const comment = formData.get("comment");
  const result = commentSchema.safeParse(comment);
  if (!result.success) {
    return z.flattenError(result.error);
  }
}
