"use client";

import { useState } from 'react';

interface LikeButtonProps {
  postId: number;
  initialLikes: number;
}

export default function LikeButton({ postId, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`http://localhost:5001/api/posts/${postId}/like`, {
        method: 'POST',
      });
      if (!res.ok) {
        throw new Error('Failed to like the post');
      }
      const result = await res.json();
      setLikes(result.likeCount);
    } catch (error) {
      console.error('Error liking post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-end mt-2">
      <button
        onClick={handleLike}
        disabled={isLoading}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded disabled:bg-gray-400"
      >
        {isLoading ? '...' : '좋아요'}
      </button>
      <span className="ml-3 text-lg font-semibold">{likes}</span>
    </div>
  );
}
