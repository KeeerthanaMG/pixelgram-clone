import Stories from '../components/Stories';
import Post from '../components/Post';
import Suggestions from '../components/Suggestions';
import { useAppContext } from '../context/AppContext';

export default function Home() {
  const { state } = useAppContext();
  const { posts } = state;

  return (
    <div className="flex max-w-screen-lg mx-auto px-6 py-8">
      {/* Main Feed */}
      <div className="flex-1 max-w-[470px] mx-auto lg:mx-0">
        <div className="space-y-8">
          <Stories />
          
          {/* Posts Feed */}
          <div className="space-y-8">
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
          
          {/* Load More */}
          <div className="text-center py-8">
            <button className="ig-btn-secondary hover:scale-105 transition-transform">
              Load more posts
            </button>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Suggestions */}
      <aside className="hidden lg:block w-[319px] ml-16 sticky top-8 h-fit">
        <div className="space-y-6">
          {/* Current User Card */}
          <div className="bg-background rounded-lg p-4">
            <div className="flex items-center">
              <div className="w-14 h-14 mr-4">
                <img
                  src={state.currentUser.avatar}
                  alt={state.currentUser.username}
                  className="w-full h-full rounded-full object-cover border-2 border-border"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{state.currentUser.username}</h3>
                <p className="text-sm text-muted-foreground">{state.currentUser.fullName}</p>
              </div>
              <button className="text-primary text-sm font-semibold hover:opacity-80 transition-opacity">
                Switch
              </button>
            </div>
          </div>
          
          <Suggestions />
        </div>
      </aside>
    </div>
  );
}