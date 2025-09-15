import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

async function getPost(id: string): Promise<Post | null> {
  try {
    const res = await fetch(`http://localhost:5001/api/posts/${id}`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch post');
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  if (!post) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">게시글을 찾을 수 없습니다.</h1>
        <Link href="/board-server" className="text-blue-500 hover:underline mt-4 inline-block">
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="border-b pb-4 mb-4">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
          <span>작성자: {post.author}</span>
          <span>작성일: {new Date(post.createdAt).toLocaleString()}</span>
        </div>
      </div>
      <div className="prose max-w-none">
        <p>{post.content}</p>
      </div>
      <div className="mt-8">
        <Link href="/board-server" className="text-blue-500 hover:underline">
          목록으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
