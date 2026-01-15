"use client";

import { useActionState } from "react";
import AddCommentInput from "./add-comment-input";
import { addComment } from "@/app/(private)/tweets/[id]/actions";

export default function AddCommentForm() {
  const [state, action] = useActionState(addComment, null);
  return (
    <form className="" action={action}>
      <AddCommentInput errors={state?.formErrors} />
    </form>
  );
}
