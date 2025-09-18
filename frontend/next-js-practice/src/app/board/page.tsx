"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
}

async function getPosts(): Promise<Post[]> {

  const baseUrl = '158.180.93.78';

  try {
    const res = await fetch(`http://${baseUrl}:5001/api/posts`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }
    const posts = await res.json();
    // Initialize likes to 0 if not provided by the API
    return posts.map((post: Post) => ({ ...post, likeCount: post.likeCount || 0 }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default function BoardPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts().then(initialPosts => {
      setPosts(initialPosts);
      setLoading(false);
    });
  }, []);

  const handleLike = async (postId: number) => {
    try {
      const res = await fetch(`http://localhost:5001/api/posts/${postId}/like`, {
        method: 'POST',
      });
      if (!res.ok) {
        throw new Error('Failed to like the post');
      }
      const result = await res.json();
      const newLikes = result.likeCount;
      setPosts(currentPosts =>
        currentPosts.map(post =>
          post.id === postId ? { ...post, likeCount: newLikes } : post
        )
      );
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">게시판</h1>
      {posts.length === 0 ? (
        <p>게시글이 없거나 데이터를 불러오는 데 실패했습니다.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="p-4 border rounded-md hover:bg-gray-50">
              <Link href={`/board/${post.id}`} className="block">
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-gray-600">작성자: {post.author}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
              <div className="flex items-center justify-end mt-2">
                <button
                  onClick={() => handleLike(post.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                >
                  좋아요
                </button>
                <span className="ml-3 text-lg font-semibold">{post.likeCount}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
