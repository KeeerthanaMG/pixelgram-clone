import Stories from '../components/Stories';
import Post from '../components/Post';
import Suggestions from '../components/Suggestions';
import { useAppContext } from '../context/AppContext';

export default function Home() {
  const { state } = useAppContext();
  const { posts } = state;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Feed */}
      <div className="flex-1 max-w-[470px] mx-auto pt-8 px-4">
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
      <aside className="hidden xl:block w-[319px] pt-8 pr-4 sticky top-0 h-screen overflow-y-auto">
        <div className="space-y-6">
          {/* Current User Card */}
          <div className="bg-background rounded-lg p-4">
            <div className="flex items-center">
              <div className="w-14 h-14 mr-4">
                <img
                  src={state.currentUser.avatar}
                  alt={state.currentUser.username}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">{state.currentUser.username}</h3>
                <p className="text-sm text-gray-500">{state.currentUser.fullName}</p>
              </div>
              <button className="text-blue-500 text-xs font-semibold">
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