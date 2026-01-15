"use client";

import { dislikeTweet, likeTweet } from "@/app/(private)/tweets/[id]/actions";
import { startTransition, useOptimistic } from "react";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as OutlineHandThumbUpIcon } from "@heroicons/react/24/outline";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
}

export default function LikeButton({
  isLiked,
  likeCount,
  tweetId,
}: LikeButtonProps) {
  const [state, reducerFn] = useOptimistic(
    { isLiked, likeCount },
    (previousState) => ({
      isLiked: !previousState.isLiked,
      likeCount: previousState.isLiked
        ? previousState.likeCount - 1
        : previousState.likeCount + 1,
    }),
  );
  const onClick = async () => {
    startTransition(() => reducerFn(undefined));
    if (isLiked) {
      await dislikeTweet(tweetId);
    } else {
      await likeTweet(tweetId);
    }
  };
  return (
    <span
      className="flex cursor-pointer flex-col items-center justify-center"
      onClick={onClick}
    >
      {state.isLiked ? (
        <HandThumbUpIcon className="size-8" />
      ) : (
        <OutlineHandThumbUpIcon className="size-8" />
      )}
      <span className="font-semibold">{state.likeCount}</span>
    </span>
  );
}
