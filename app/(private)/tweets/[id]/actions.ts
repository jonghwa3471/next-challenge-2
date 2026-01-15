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

const schema = z.object({
  comment: z
    .string()
    .trim()
    .min(1, "댓글을 입력해주세요.")
    .max(200, "댓글은 200자 이내로 작성해주세요."),
  tweetId: z.coerce.number().int().positive(),
});

export async function addComment(_: unknown, formData: FormData) {
  const raw = {
    comment: formData.get("comment"),
    tweetId: formData.get("tweetId"),
  };

  const result = schema.safeParse(raw);

  if (!result.success) {
    const errors = z.flattenError(result.error);
    return errors;
  }

  const { comment, tweetId } = result.data;
  const session = await getSession();

  await db.response.create({
    data: {
      tweetId,
      payload: comment,
      userId: session.id!,
    },
  });

  revalidatePath(`/tweets/${tweetId}`);
  revalidatePath("/");
}
