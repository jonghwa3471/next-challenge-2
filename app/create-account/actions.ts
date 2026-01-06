"use server";

import db from "@/lib/db";
import z from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

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
    confirmPassword: z
      .string()
      .trim()
      .min(10, "비밀번호는 10글자 이상입니다.")
      .regex(/\d/, "비밀번호에는 숫자가 최소 1개 포함되어야 합니다."),
    bio: z
      .string()
      .trim()
      .max(200, "bio는 200자 이내로 적어주세요.")
      .optional(),
  })
  .superRefine(async (data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "비밀번호를 다시 한 번 확인해주세요.",
      });
      return;
    }
    const user = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        path: ["email"],
        message: "이미 존재하는 이메일입니다.",
      });
    }
  });

export async function login(_: unknown, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    bio: formData.get("bio"),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return z.flattenError(result.error);
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    await db.user.create({
      data: {
        email: result.data.email,
        username: result.data.username,
        password: hashedPassword,
        bio: result.data.bio || null,
      },
      select: {
        id: true,
      },
    });
    redirect("/login");
  }
}
