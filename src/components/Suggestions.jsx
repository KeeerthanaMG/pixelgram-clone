import UserCard from './UserCard';
import { useAppContext } from '../context/AppContext';

export default function Suggestions() {
  const { state } = useAppContext();
  const { users, currentUser } = state;
  
  // Get suggested users (users not being followed, excluding current user)
  const suggestedUsers = users
    .filter(user => user.id !== currentUser.id && !user.isFollowing)
    .slice(0, 5);

  return (
    <div className="bg-background rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-muted-foreground text-sm">
          Suggested for you
        </h3>
        <button className="text-foreground text-xs font-semibold hover:text-muted-foreground">
          See All
        </button>
      </div>
      
      <div className="space-y-2">
        {suggestedUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      
      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="text-xs text-muted-foreground space-y-2">
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