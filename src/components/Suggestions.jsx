import { useAppContext } from '../context/AppContext';

export default function Suggestions() {
  const { state, dispatch } = useAppContext();
  const { users, currentUser } = state;
  
  // Get suggested users (users not being followed, excluding current user)
  const suggestedUsers = users
    .filter(user => user.id !== currentUser.id && !user.isFollowing)
    .slice(0, 5);

  const handleFollow = (userId) => {
    dispatch({ type: 'TOGGLE_FOLLOW', userId });
  };

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-500">
          Suggested for you
        </h3>
        <button className="text-xs font-semibold text-gray-900 hover:text-gray-700">
          See All
        </button>
      </div>
      
      <div className="space-y-3">
        {suggestedUsers.map((user) => (
          <div key={user.id} className="flex items-center">
            <div className="w-8 h-8 mr-3">
              <img
                src={user.avatar}
                alt={user.username}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{user.username}</p>
              <p className="text-xs text-gray-500 truncate">
                Followed by user1 + {Math.floor(Math.random() * 5) + 1} others
              </p>
            </div>
            <button
              onClick={() => handleFollow(user.id)}
              className={`text-xs font-semibold ml-2 ${
                user.isFollowing 
                  ? 'text-gray-900 hover:text-gray-700' 
                  : 'text-blue-500 hover:text-blue-700'
              }`}
            >
              {user.isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>
        ))}
      </div>
      
      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-400 space-y-2">
          <div className="flex flex-wrap gap-x-2 gap-y-1">
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Help</a>
            <a href="#" className="hover:underline">Press</a>
            <a href="#" className="hover:underline">API</a>
            <a href="#" className="hover:underline">Jobs</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
          </div>
          <div className="flex flex-wrap gap-x-2 gap-y-1">
            <a href="#" className="hover:underline">Locations</a>
            <a href="#" className="hover:underline">Language</a>
            <a href="#" className="hover:underline">Meta Verified</a>
          </div>
          <p className="mt-3">© 2024 Instagram Clone</p>
        </div>
      </div>
    </div>
  );
}