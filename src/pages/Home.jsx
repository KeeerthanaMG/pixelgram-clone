import Stories from '../components/Stories';
import Post from '../components/Post';
import Suggestions from '../components/Suggestions';
import { useAppContext } from '../context/AppContext';

export default function Home() {
  const { state } = useAppContext();
  const { posts } = state;

  return (
    <div className="flex max-w-screen-lg mx-auto">
      {/* Main Feed */}
      <div className="flex-1 max-w-[470px] mx-auto lg:mx-0">
        <div className="space-y-6">
          <Stories />
          
          {/* Posts Feed */}
          <div className="space-y-6">
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Right Sidebar - Suggestions */}
      <div className="hidden lg:block w-80 ml-8">
        <div className="sticky top-8">
          <Suggestions />
        </div>
      </div>
    </div>
  );
}