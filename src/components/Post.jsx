import { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Post({ post }) {
  const { dispatch } = useAppContext();
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  
  const handleLike = () => {
    dispatch({ type: 'TOGGLE_LIKE', postId: post.id });
  };

  const handleSave = () => {
    dispatch({ type: 'TOGGLE_SAVE', postId: post.id });
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      dispatch({
        type: 'ADD_COMMENT',
        postId: post.id,
        comment: {
          id: Date.now(),
          user: { username: 'john_photographer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
          text: comment.trim(),
          timestamp: 'now'
        }
      });
      setComment('');
    }
  };

  return (
    <article className="bg-white border border-gray-200 rounded-lg mb-4">
      {/* Post Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center">
          <div className="w-8 h-8 mr-3">
            <img
              src={post.user.avatar}
              alt={post.user.username}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{post.user.username}</span>
            {post.location && (
              <span className="text-xs text-gray-500">{post.location}</span>
            )}
          </div>
        </div>
        <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Post Image */}
      <div className="relative">
        <img
          src={post.image}
          alt={post.caption}
          className="w-full aspect-square object-cover"
        />
      </div>

      {/* Post Actions */}
      <div className="px-3 pt-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleLike}
              className={`transition-transform hover:scale-110 ${
                post.isLiked ? 'animate-bounce-heart' : ''
              }`}
            >
              <Heart 
                className={`w-6 h-6 ${
                  post.isLiked ? 'fill-red-500 text-red-500' : 'hover:text-gray-500'
                }`} 
              />
            </button>
            <button className="hover:scale-110 transition-transform hover:text-gray-500">
              <MessageCircle className="w-6 h-6" />
            </button>
            <button className="hover:scale-110 transition-transform hover:text-gray-500">
              <Send className="w-6 h-6" />
            </button>
          </div>
          <button className="hover:scale-110 transition-transform hover:text-gray-500">
            <Bookmark 
              onClick={handleSave}
              className={`w-6 h-6 ${post.isSaved ? 'fill-black' : ''}`} 
            />
          </button>
        </div>

        {/* Likes Count */}
        <div className="mb-2">
          <span className="font-semibold text-sm">{post.likes} likes</span>
        </div>

        {/* Caption */}
        <div className="mb-2">
          <span className="font-semibold text-sm mr-2">{post.user.username}</span>
          <span className="text-sm">{post.caption}</span>
        </div>

        {/* Comments */}
        {post.comments.length > 0 && (
          <div className="space-y-1 mb-2">
            {post.comments.length > 2 && (
              <button className="text-sm text-gray-500">
                View all {post.comments.length} comments
              </button>
            )}
            {post.comments.slice(-2).map((comment) => (
              <div key={comment.id} className="text-sm">
                <span className="font-semibold mr-2">{comment.user.username}</span>
                <span>{comment.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <div className="text-xs text-gray-500 mb-3">
          {post.timestamp} ago
        </div>
      </div>

      {/* Add Comment */}
      <form onSubmit={handleComment} className="flex items-center border-t border-gray-200 px-3 py-3">
        <input
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="flex-1 text-sm bg-transparent border-none outline-none placeholder:text-gray-400"
        />
        {comment.trim() && (
          <button type="submit" className="text-blue-500 text-sm font-semibold ml-2 hover:text-blue-700">
            Post
          </button>
        )}
      </form>
    </article>
  );
}