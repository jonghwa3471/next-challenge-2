"use client";

import { useActionState } from "react";
import AddTweetInput from "./add-tweet-input";
import { postTweet } from "@/app/(private)/actions";

export default function AddTweet() {
  const [state, action] = useActionState(postTweet, null);
  return (
    <div>
      <form className="relative" action={action}>
        <AddTweetInput />
      </form>
      <span className="pt-3 pl-2 text-sm font-semibold text-red-500">
        {state?.formErrors}
      </span>
    </div>
  );
}
