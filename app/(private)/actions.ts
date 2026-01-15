"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

const tweetSchema = z.string().trim().min(5, "5글자 이상이어야 합니다.");

export async function postTweet(_: unknown, formData: FormData) {
  const tweet = formData.get("tweet");
  const result = tweetSchema.safeParse(tweet);
  if (!result.success) {
    return z.flattenError(result.error);
  } else {
    const session = await getSession();
    await db.tweet.create({
      data: {
        tweet: result.data,
        userId: Number(session.id),
      },
    });
    revalidatePath("/");
    redirect("/");
  }
}
