import AddComment from "@/components/add-comment-input";
import db from "@/lib/db";
import { formatDate } from "@/lib/formatDate";
import getSession from "@/lib/session";
import LikeButton from "@/components/like-button";
import { notFound } from "next/navigation";
import AddCommentForm from "@/components/add-comment-form";

async function getTweetDetail(id: string) {
  const tweet = await db.tweet.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      tweet: true,
      created_at: true,
      userId: true,
      user: {
        select: {
          username: true,
        },
      },
    },
  });
  return tweet;
}

async function getLikeStatus(tweetId: number, userId: number) {
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        tweetId,
        userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      tweetId,
    },
  });
  return {
    isLiked: Boolean(isLiked),
    likeCount,
  };
}

export default async function TweetDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (isNaN(Number(id))) {
    return notFound();
  }
  const session = await getSession();
  const tweet = await getTweetDetail(id);
  if (!tweet) {
    return notFound();
  }
  const { likeCount, isLiked } = await getLikeStatus(Number(id), session.id!);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-2 rounded-2xl border-2 px-10 py-10">
        <div className="overflow-auto">
          <h1 className="text-3xl font-extrabold">{tweet?.tweet}</h1>
          <h4 className="mt-5 font-bold">작성자: {tweet?.user.username}</h4>
          <h6 className="text-xs">{formatDate(tweet!.created_at)}</h6>
        </div>
        <div className="flex justify-end">
          <LikeButton
            tweetId={Number(id)}
            likeCount={likeCount}
            isLiked={isLiked}
          />
        </div>
      </div>
      {session.id !== tweet?.userId && (
        <div className="pt-5">
          <AddCommentForm />
        </div>
      )}

      <div></div>
    </div>
  );
}
