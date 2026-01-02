"use server";

import db from "@/lib/db";
import z from "zod";

const formSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, "이메일을 적어주세요.")
      .pipe(z.email("이메일 형식이 아니에요."))
      .refine((email) => email.endsWith("@zod.com"), {
        message: "@zod.com 이메일만 사용할 수 있어요.",
      }),
    username: z.string().trim().min(5, "유저명은 5글자 이상입니다."),
    password: z
      .string()
      .trim()
      .min(10, "비밀번호는 10글자 이상입니다.")
      .regex(/\d/, "비밀번호에는 숫자가 최소 1개 포함되어야 합니다."),
  })
  .superRefine(async (data, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      ctx.addIssue({
        code: "custom",
        path: ["email"],
        message: "존재하지 않는 유저 정보입니다.",
      });
      return;
    }
    if (user.password !== data.password) {
      ctx.addIssue({
        code: "custom",
        path: ["password"],
        message: "비밀번호가 일치하지 않습니다.",
      });
    }
    if (user.username !== data.username) {
      ctx.addIssue({
        code: "custom",
        path: ["username"],
        message: "유저명이 일치하지 않습니다.",
      });
    }
    if (
      user &&
      user.password === data.password &&
      user.username === data.username
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Welcome back!",
      });
      return;
    }
  });

export async function login(_: unknown, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return z.flattenError(result.error);
  } else {
  }
}
