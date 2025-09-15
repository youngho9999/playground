import Link from 'next/link';
import LikeButton from './LikeButton';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  likeCount?: number;
}

async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch('http://localhost:5001/api/posts', { 
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function BoardServerPage() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">게시판 (서버 컴포넌트)</h1>
      <p className="mb-4 text-gray-600">이 페이지는 서버 컴포넌트입니다. '좋아요' 버튼만 클라이언트 컴포넌트입니다.</p>
      {posts.length === 0 ? (
        <p>게시글이 없거나 데이터를 불러오는 데 실패했습니다.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="p-4 border rounded-md hover:bg-gray-50">
              <Link href={`/board-server/${post.id}`} className="block">
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-gray-600">작성자: {post.author}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
              <LikeButton postId={post.id} initialLikes={post.likeCount || 0} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
