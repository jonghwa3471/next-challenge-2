import { ChangeEvent, InputHTMLAttributes, ReactNode, useState } from "react";

interface InputProps {
  name: string;
  icon?: ReactNode;
  invalid: boolean;
  errors?: string[];
}

export default function Input({
  name,
  invalid,
  icon,
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  const [value, setValue] = useState("");
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };
  return (
    <div
      className={`flex items-center rounded-full border border-neutral-400 pl-3 focus-within:border focus-within:border-neutral-400 focus-within:ring-2 focus-within:ring-neutral-400 focus-within:ring-offset-4 ${invalid ? "border-red-400 focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-400 focus-within:ring-offset-4" : ""}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      <input
        onChange={onChange}
        className={`w-full rounded-full rounded-l-none p-2 font-semibold text-neutral-800 outline-none`}
        name={name}
        value={value}
        {...rest}
      />
    </div>
  );
}
