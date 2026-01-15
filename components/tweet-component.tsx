"use client";

import { getTweetDetail } from "@/app/(private)/tweets/[id]/page";
import LikeButton from "./like-button";
import { formatDate } from "@/lib/formatDate";

interface TweetComponentProps {
  tweet: Awaited<ReturnType<typeof getTweetDetail>>;
  likeCount: number;
  isLiked: boolean;
}

export default function TweetComponent({
  tweet,
  likeCount,
  isLiked,
}: TweetComponentProps) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border-2 px-10 py-10">
      <div className="overflow-auto">
        <h1 className="text-3xl font-extrabold">{tweet?.tweet}</h1>
        <h4 className="mt-5 font-bold">작성자: {tweet?.user.username}</h4>
        <h6 className="text-xs">{formatDate(tweet!.created_at)}</h6>
      </div>
      <div className="flex justify-end">
        <LikeButton
          tweetId={tweet!.id}
          likeCount={likeCount}
          isLiked={isLiked}
        />
      </div>
    </div>
  );
}
