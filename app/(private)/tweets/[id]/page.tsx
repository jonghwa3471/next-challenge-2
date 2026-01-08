import db from "@/lib/db";
import { formatDate } from "@/lib/formatDate";

async function getTweetDetail(id: string) {
  const tweet = await db.tweet.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      tweet: true,
      created_at: true,
      user: {
        select: {
          username: true,
        },
      },
    },
  });
  return tweet;
}

export default async function TweetDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tweet = await getTweetDetail(id);
  return (
    <div className="flex flex-col gap-2 pt-10">
      <h1 className="text-3xl font-extrabold">{tweet?.tweet}</h1>
      <h4 className="mt-5 font-bold">작성자: {tweet?.user.username}</h4>
      <h6 className="text-xs">{formatDate(tweet!.created_at)}</h6>
    </div>
  );
}
