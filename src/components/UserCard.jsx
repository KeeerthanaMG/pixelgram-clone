import { useAppContext } from '../context/AppContext';

export default function UserCard({ user, showFollowButton = true }) {
  const { dispatch } = useAppContext();

  const handleFollow = () => {
    dispatch({ type: 'TOGGLE_FOLLOW', userId: user.id });
  };

  return (
    <div className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors">
      <div className="flex items-center">
        <div className="ig-avatar w-10 h-10 mr-3">
          <div className="ig-avatar-inner">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center">
            <span className="font-semibold text-sm">{user.username}</span>
            {user.isVerified && (
              <svg className="w-4 h-4 ml-1 text-primary fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9l-5.55 5.42L18 22l-6-3.27L6 22l1.55-7.58L2 9l6.91-.74L12 2z"/>
              </svg>
            )}
          </div>
          <span className="text-sm text-muted-foreground">{user.fullName}</span>
          {user.bio && (
            <p className="text-xs text-muted-foreground mt-1 max-w-[200px] truncate">
              {user.bio}
            </p>
          )}
        </div>
      </div>
      
      {showFollowButton && (
        <button
          onClick={handleFollow}
          className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-colors ${
            user.isFollowing
              ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              : 'bg-primary text-primary-foreground hover:bg-primary/90'
          }`}
        >
          {user.isFollowing ? 'Following' : 'Follow'}
        </button>
      )}
    </div>
  );
}