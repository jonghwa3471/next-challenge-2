import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";
import TweetComponent from "@/components/tweet-component";
import Comments from "@/components/comments";

export async function getTweetDetail(id: string) {
  const tweet = await db.tweet.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
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

async function getComments(tweetId: number) {
  const comments = await db.response.findMany({
    where: {
      tweetId,
    },
    include: {
      user: true,
    },
  });
  return comments;
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

export type InitialComments = Awaited<ReturnType<typeof getComments>>;

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
  const initialComments = await getComments(Number(id));
  const { likeCount, isLiked } = await getLikeStatus(Number(id), session.id!);
  return (
    <div className="flex flex-col">
      <TweetComponent tweet={tweet} likeCount={likeCount} isLiked={isLiked} />
      <Comments initialComments={initialComments} tweetId={tweet.id} />
    </div>
  );
}
