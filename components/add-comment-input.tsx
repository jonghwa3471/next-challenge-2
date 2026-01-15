"use client";

import { ChangeEvent, useState } from "react";
import { useFormStatus } from "react-dom";

interface AddCommentInputProps {
  errors?: string[];
}

export default function AddCommentInput({ errors }: AddCommentInputProps) {
  const [value, setvalue] = useState("");
  const { pending } = useFormStatus();
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setvalue(event.currentTarget.value);
  };
  return (
    <div className="flex flex-col">
      <input
        className="w-full rounded-2xl border-2 p-5 transition-all placeholder:font-semibold focus:bg-neutral-200 focus:outline-none"
        type="text"
        placeholder="댓글 작성.."
        name="comment"
        value={value}
        onChange={onChange}
      />
      <button className="mt-2 w-full cursor-pointer rounded-2xl bg-neutral-500 p-2 px-3 text-white hover:bg-neutral-400">
        {pending ? "작성 중..." : "댓글 작성"}
      </button>
      {errors?.map((error, index) => (
        <span
          className="pt-2 pl-2 text-xs font-semibold text-red-500"
          key={index}
        >
          {error}
        </span>
      ))}
    </div>
  );
}
