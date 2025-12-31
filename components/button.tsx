import { useFormStatus } from "react-dom";

interface ButtonProps {
  name: string;
}

export default function Button({ name }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button className="flex cursor-pointer items-center justify-center rounded-full bg-neutral-300 p-3 transition outline-none hover:bg-neutral-200 focus:bg-neutral-200 active:scale-95">
      <span className="font-bold"> {pending ? "Loading..." : name}</span>
    </button>
  );
}
