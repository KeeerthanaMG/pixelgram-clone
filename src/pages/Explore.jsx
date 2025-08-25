import { useState } from 'react';
import { useAppContext } from '../context/AppContext';

export default function Explore() {
  const { state, dispatch } = useAppContext();
  const { posts } = state;
  const [selectedPost, setSelectedPost] = useState(null);

  // Create a grid of explore posts (mix of regular and different sized posts)
  const explorePosts = [...posts, ...posts, ...posts].map((post, index) => ({
    ...post,
    id: `${post.id}-${index}`,
    gridSize: index % 10 === 0 ? 'large' : index % 7 === 0 ? 'wide' : 'normal'
  }));

  const openPost = (post) => {
    setSelectedPost(post);
    dispatch({ type: 'SET_SELECTED_POST', post });
  };

  const closePost = () => {
    setSelectedPost(null);
    dispatch({ type: 'SET_SELECTED_POST', post: null });
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Explore Grid */}
      <div className="grid grid-cols-3 gap-1 lg:gap-2">
        {explorePosts.map((post) => (
          <div
            key={post.id}
            className={`relative group cursor-pointer overflow-hidden ${
              post.gridSize === 'large' 
                ? 'col-span-2 row-span-2' 
                : post.gridSize === 'wide' 
                ? 'col-span-2' 
                : ''
            }`}
            onClick={() => openPost(post)}
          >
            <img
              src={post.image}
              alt={post.caption}
              className="w-full h-full object-cover aspect-square transition-transform group-hover:scale-105"
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="text-white flex items-center space-x-4">
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-2 fill-current" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  <span className="font-semibold">{post.likes}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-2 fill-current" viewBox="0 0 24 24">
                    <path d="M21,6H3A1,1 0 0,0 2,7V17A1,1 0 0,0 3,18H8.5L12,21.5L15.5,18H21A1,1 0 0,0 22,17V7A1,1 0 0,0 21,6M18,14H6V12H18V14Z"/>
                  </svg>
                  <span className="font-semibold">{post.comments.length}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Post Detail Modal */}
      {selectedPost && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={closePost}
        >
          <div 
            className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="flex-1 bg-black flex items-center justify-center">
              <img
                src={selectedPost.image}
                alt={selectedPost.caption}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            
            {/* Post Details */}
            <div className="w-80 border-l border-border flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center">
                  <div className="ig-avatar w-8 h-8 mr-3">
                    <div className="ig-avatar-inner">
                      <img
                        src={selectedPost.user.avatar}
                        alt={selectedPost.user.username}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </div>
                  <span className="font-semibold text-sm">{selectedPost.user.username}</span>
                </div>
                <button 
                  onClick={closePost}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Caption and Comments */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  <div>
                    <span className="font-semibold text-sm mr-2">{selectedPost.user.username}</span>
                    <span className="text-sm">{selectedPost.caption}</span>
                  </div>
                  
                  {selectedPost.comments.map((comment) => (
                    <div key={comment.id} className="text-sm">
                      <span className="font-semibold mr-2">{comment.user.username}</span>
                      <span>{comment.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Actions */}
              <div className="border-t border-border p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-4">
                    <button className="hover:text-muted-foreground">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <button className="hover:text-muted-foreground">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </button>
                  </div>
                  <button className="hover:text-muted-foreground">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </button>
                </div>
                <div className="text-sm font-semibold mb-2">{selectedPost.likes} likes</div>
                <div className="text-xs text-muted-foreground">{selectedPost.timestamp} ago</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}