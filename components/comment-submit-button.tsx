"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button className="mt-2 w-full cursor-pointer rounded-2xl bg-neutral-500 p-2 px-3 text-white hover:bg-neutral-400">
      {pending ? "작성 중..." : "댓글 작성"}
    </button>
  );
}
