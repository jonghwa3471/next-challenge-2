import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

export default async function Profile() {
  const session = await getSession();
  const userId = session.id;
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return notFound();
  }
  const logOut = async () => {
    "use server";
    const session = await getSession();
    session.destroy();
    redirect("/login");
  };
  return (
    <div className="flex flex-col items-start justify-center gap-2 pb-50">
      <h1 className="text-2xl font-extrabold">{user.username}의 프로필</h1>
      <div className="flex flex-col text-lg font-semibold">
        <h3>이메일: {user.email}</h3>
        <h3>자기소개: {user.bio}</h3>
      </div>
      <form action={logOut}>
        <button className="cursor-pointer rounded-full bg-red-400 p-2">
          Log out
        </button>
      </form>
    </div>
  );
}
