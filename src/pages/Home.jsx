import Stories from '../components/Stories';
import Post from '../components/Post';
import Suggestions from '../components/Suggestions';
import { useAppContext } from '../context/AppContext';

export default function Home() {
  const { state } = useAppContext();
  const { posts } = state;

  return (
    <div className="flex">
      {/* Main Feed */}
      <div className="flex-1 max-w-[470px] mx-auto lg:mx-0 lg:ml-8">
        <div className="space-y-6">
          <Stories />
          
          {/* Posts Feed */}
          <div className="space-y-6">
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
          
          {/* Load More */}
          <div className="text-center py-8">
            <button className="ig-btn-secondary">
              Load more posts
            </button>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Suggestions */}
      <aside className="hidden lg:block w-[319px] ml-8 sticky top-6 h-fit">
        <div className="space-y-6">
          {/* Current User Card */}
          <div className="bg-background rounded-lg border border-border p-4">
            <div className="flex items-center">
              <div className="ig-avatar w-14 h-14 mr-4">
                <div className="ig-avatar-inner">
                  <img
                    src={state.currentUser.avatar}
                    alt={state.currentUser.username}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{state.currentUser.username}</h3>
                <p className="text-sm text-muted-foreground">{state.currentUser.fullName}</p>
              </div>
              <button className="text-primary text-sm font-semibold">
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