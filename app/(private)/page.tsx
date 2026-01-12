import AddTweet from "@/components/add-tweet";
import Tweet from "@/components/tweet";
import db from "@/lib/db";
import { formatDate } from "@/lib/formatDate";

async function getTweets() {
  const tweets = await db.tweet.findMany();
  return tweets;
}

export default async function Home() {
  const tweets = await getTweets();
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full">
        <AddTweet />
      </div>
      <div className="flex w-full flex-col gap-2 py-5">
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweet={tweet.tweet}
            id={tweet.id}
            createdAt={formatDate(tweet.created_at)}
          />
        ))}
      </div>
    </div>
  );
}
