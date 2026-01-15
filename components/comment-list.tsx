import { formatDate } from "@/lib/formatDate";

interface CommentListProps {
  id: number;
  payload: string;
  userId: number;
  tweetId: number;
  created_at: Date;
  updated_at: Date;
  user: {
    id: number;
    created_at: Date;
    updated_at: Date;
    email: string;
    username: string;
    password: string;
    bio: string | null;
  };
}

export default function CommentList({
  payload,
  created_at,
  user,
}: CommentListProps) {
  return (
    <div>
      <h2 className="mt-5 font-bold">{user.username}</h2>
      <h1 className="text-3xl font-extrabold">{payload}</h1>
      <h6 className="text-xs">{formatDate(created_at)}</h6>
    </div>
  );
}
