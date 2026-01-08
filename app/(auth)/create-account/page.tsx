"use client";

import Input from "@/components/input";
import { useActionState } from "react";
import { login } from "./actions";
import Button from "@/components/button";
import Link from "next/link";

export default function Home() {
  const [state, action] = useActionState(login, null);
  const invalid = {
    email: false,
    username: false,
    password: false,
    confirmPassword: false,
    bio: false,
  };
  if (state?.fieldErrors.email) {
    invalid.email = true;
  }
  if (state?.fieldErrors.username) {
    invalid.username = true;
  }
  if (state?.fieldErrors.password) {
    invalid.password = true;
  }
  if (state?.fieldErrors.confirmPassword) {
    invalid.confirmPassword = true;
  }
  if (state?.fieldErrors.bio) {
    invalid.bio = true;
  }
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center p-5">
        <span>
          <svg
            className="size-20"
            data-slot="icon"
            strokeWidth={1.5}
            stroke="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fill="#FF7F7C"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
            />
            <path
              fill="#FFFFFF"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
            />
          </svg>
        </span>
        <form action={action} className="flex w-full flex-col gap-4 px-20 py-5">
          <Input
            invalid={invalid.email}
            name="email"
            placeholder="Email"
            type="email"
            required
            icon={
              <svg
                className="size-5 text-neutral-500"
                data-slot="icon"
                fill="#737373"
                strokeWidth={1.5}
                stroke="white"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
            }
          />

          {state?.fieldErrors.email?.map((emailError, index) => (
            <span key={index} className="text-xs text-red-500">
              {emailError}
            </span>
          ))}

          <Input
            invalid={invalid.username}
            name="username"
            placeholder="Username"
            type="text"
            required
            icon={
              <svg
                className="size-5 text-neutral-500"
                data-slot="icon"
                fill="#737373"
                strokeWidth={1.5}
                stroke="white"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            }
          />
          {state?.fieldErrors.username?.map((usernameError, index) => (
            <span key={index} className="text-xs text-red-500">
              {usernameError}
            </span>
          ))}
          <Input
            invalid={invalid.password}
            name="password"
            placeholder="Password"
            type="password"
            required
            icon={
              <svg
                className="size-5 text-neutral-500"
                data-slot="icon"
                fill="#737373"
                strokeWidth={1.5}
                stroke="white"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                />
              </svg>
            }
          />
          {state?.fieldErrors.password?.map((passwordError, index) => (
            <span key={index} className="text-xs text-red-500">
              {passwordError}
            </span>
          ))}
          <Input
            invalid={invalid.password}
            name="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            required
            icon={
              <svg
                className="size-5 text-neutral-500"
                data-slot="icon"
                fill="#737373"
                strokeWidth={1.5}
                stroke="white"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                />
              </svg>
            }
          />
          {state?.fieldErrors.confirmPassword?.map(
            (confirmPasswordError, index) => (
              <span key={index} className="text-xs text-red-500">
                {confirmPasswordError}
              </span>
            ),
          )}
          <Input
            invalid={invalid.bio}
            name="bio"
            placeholder="Bio"
            type="text"
            icon={
              <svg
                className="size-5 text-neutral-500"
                data-slot="icon"
                fill="none"
                strokeWidth={1.5}
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
            }
          />
          {state?.fieldErrors.bio?.map((bioError, index) => (
            <span key={index} className="text-xs text-red-500">
              {bioError}
            </span>
          ))}
          <Button name={"Create Account"} />
          <Link className="flex items-center justify-center" href="/login">
            <span className="text-xs font-semibold underline">
              Log In &rarr;
            </span>
          </Link>
        </form>
      </div>
    </div>
  );
}
