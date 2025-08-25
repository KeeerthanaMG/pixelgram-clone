import { useAppContext } from '../context/AppContext';

export default function UserCard({ user, showFollowButton = true }) {
  const { dispatch } = useAppContext();

  const handleFollow = () => {
    dispatch({ type: 'TOGGLE_FOLLOW', userId: user.id });
  };

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center">
        <div className="w-8 h-8 mr-3">
          <img
            src={user.avatar}
            alt={user.username}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div>
          <div className="flex items-center">
            <span className="font-semibold text-sm">{user.username}</span>
            {user.isVerified && (
              <svg className="w-3 h-3 ml-1 text-blue-500 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9l-5.55 5.42L18 22l-6-3.27L6 22l1.55-7.58L2 9l6.91-.74L12 2z"/>
              </svg>
            )}
          </div>
          <span className="text-xs text-gray-500">Followed by user1 + {Math.floor(Math.random() * 5) + 1} others</span>
        </div>
      </div>
      
      {showFollowButton && (
        <button
          onClick={handleFollow}
          className={`text-xs font-semibold ${
            user.isFollowing
              ? 'text-gray-900 hover:text-gray-700'
              : 'text-blue-500 hover:text-blue-700'
          }`}
        >
          {user.isFollowing ? 'Following' : 'Follow'}
        </button>
      )}
    </div>
  );
}