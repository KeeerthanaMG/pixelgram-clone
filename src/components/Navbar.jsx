import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, MessageCircle, PlusSquare, User } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const location = useLocation();
  const { state, dispatch } = useAppContext();
  const { notifications } = state;
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleCreatePost = () => {
    dispatch({ type: 'OPEN_UPLOAD_MODAL' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background border-b border-border z-50 lg:hidden">
      <div className="px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold ig-text-gradient">
          Instagram
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link to="/search" className="relative">
            <Search className={`w-6 h-6 ${location.pathname === '/search' ? 'text-primary' : ''}`} />
          </Link>
          
          <Link to="/notifications" className="relative">
            <Heart className={`w-6 h-6 ${location.pathname === '/notifications' ? 'fill-current text-primary' : ''}`} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Link>
          
          <Link to="/messages">
            <MessageCircle className={`w-6 h-6 ${location.pathname === '/messages' ? 'fill-current text-primary' : ''}`} />
          </Link>
          
          <button onClick={handleCreatePost}>
            <PlusSquare className="w-6 h-6" />
          </button>
          
          <Link to="/profile">
            <User className={`w-6 h-6 ${location.pathname === '/profile' ? 'fill-current text-primary' : ''}`} />
          </Link>
          
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}