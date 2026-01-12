"use client";

import { ChangeEvent, useState } from "react";
import { useFormStatus } from "react-dom";

export default function AddTweetInput() {
  const [value, setvalue] = useState("");
  const { pending } = useFormStatus();
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setvalue(event.currentTarget.value);
  };
  return (
    <div>
      <input
        className="w-full rounded-2xl border-2 p-10 pb-30 transition-all placeholder:font-semibold focus:bg-neutral-200 focus:outline-none"
        type="text"
        placeholder="Tweet 작성.."
        name="tweet"
        value={value}
        onChange={onChange}
      />
      <button className="absolute right-1 bottom-1 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-2xl bg-neutral-500 p-2 px-3 text-white hover:bg-neutral-400">
        {pending ? "전송 중..." : "전송"}
      </button>
    </div>
  );
}
