"use client";

import {
  ChangeEvent,
  FormEvent,
  startTransition,
  useActionState,
  useOptimistic,
  useState,
} from "react";
import CommentList from "./comment-list";
import { InitialComments } from "@/app/(private)/tweets/[id]/page";
import { addComment } from "@/app/(private)/tweets/[id]/actions";
import SubmitButton from "./comment-submit-button";
import z from "zod";

interface CommentsProps {
  initialComments: InitialComments;
  tweetId: number;
}

const commentSchema = z
  .string()
  .trim()
  .min(1, "댓글을 입력해주세요.")
  .max(200, "댓글은 200자 이내로 작성해주세요.");

export default function Comments({ initialComments, tweetId }: CommentsProps) {
  const [comments, reducerFn] = useOptimistic(
    initialComments,
    (previousState, payload: string) => [
      ...previousState,
      {
        id: -Date.now(),
        payload,
        userId: -1,
        tweetId,
        created_at: new Date(),
        updated_at: new Date(),
        user: {
          id: -1,
          created_at: new Date(),
          updated_at: new Date(),
          email: "",
          username: "You",
          password: "",
          bio: null,
        },
      },
    ],
  );
  const [state, action] = useActionState(addComment, null);
  const [value, setvalue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setvalue(event.currentTarget.value);
  };
  const onSubmitCapture = (event: FormEvent<HTMLFormElement>) => {
    const result = commentSchema.safeParse(value);
    if (!result.success) {
      event.preventDefault();
      setError(result.error.issues?.[0]?.message ?? "댓글을 확인해주세요.");
      return;
    }
    startTransition(() => {
      reducerFn(result.data);
      setvalue("");
    });
  };
  return (
    <div>
      <div className="pt-5">
        <form className="" action={action} onSubmitCapture={onSubmitCapture}>
          <input type="hidden" name="tweetId" value={tweetId} />
          <div className="flex flex-col">
            <input
              className="w-full rounded-2xl border-2 p-5 transition-all placeholder:font-semibold focus:bg-neutral-200 focus:outline-none"
              type="text"
              placeholder="댓글 작성.."
              name="comment"
              value={value}
              onChange={onChange}
            />
            <SubmitButton />
            {error ? (
              <span className="pt-2 pl-2 text-xs font-semibold text-red-500">
                {error}
              </span>
            ) : null}
            {state?.formErrors?.map((error, index) => (
              <span
                className="pt-2 pl-2 text-xs font-semibold text-red-500"
                key={index}
              >
                {error}
              </span>
            ))}
          </div>
        </form>
      </div>
      <div className="pt-10">
        {comments.map((comment) => (
          <CommentList key={comment.id} {...comment} />
        ))}
      </div>
    </div>
  );
}
