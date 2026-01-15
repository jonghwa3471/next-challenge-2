import Link from "next/link";

interface TweetProps {
  tweet: string;
  id: number;
  createdAt: string;
  username: string;
  likeCount: number;
}

export default function Tweet({
  tweet,
  id,
  createdAt,
  username,
  likeCount,
}: TweetProps) {
  return (
    <Link href={`/tweets/${id}`}>
      <div className="flex flex-col gap-2 rounded-2xl bg-neutral-700 p-5 py-8 text-xl text-white transition hover:bg-neutral-600">
        <h1 className="text-sm">{username}</h1>
        <h2 className="font-extrabold">{tweet}</h2>
        <h6 className="text-xs">{createdAt}</h6>
        <span className="text-xs">좋아요: {likeCount}</span>
      </div>
    </Link>
  );
}
