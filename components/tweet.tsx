import Link from "next/link";

interface TweetProps {
  tweet: string;
  id: number;
  createdAt: string;
}

export default function Tweet({ tweet, id, createdAt }: TweetProps) {
  return (
    <Link href={`/tweets/${id}`}>
      <div className="flex flex-col gap-2 rounded-2xl bg-neutral-700 p-5 py-8 text-xl text-white transition hover:bg-neutral-600">
        <h1 className="font-extrabold">{tweet}</h1>
        <h6 className="text-xs">{createdAt}</h6>
      </div>
    </Link>
  );
}
