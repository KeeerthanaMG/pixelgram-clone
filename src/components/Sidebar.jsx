import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Compass, Film, MessageCircle, Heart, PlusSquare, User, Settings, Menu } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Sidebar() {
  const location = useLocation();
  const { state, dispatch } = useAppContext();
  const { currentUser, notifications } = state;
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Search', href: '/search', icon: Search },
    { name: 'Explore', href: '/explore', icon: Compass },
    { name: 'Reels', href: '/reels', icon: Film },
    { name: 'Messages', href: '/messages', icon: MessageCircle },
    { name: 'Notifications', href: '/notifications', icon: Heart, badge: unreadCount },
    { name: 'Create', href: '#', icon: PlusSquare, onClick: () => dispatch({ type: 'OPEN_UPLOAD_MODAL' }) },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <aside className="ig-sidebar ig-desktop-only">
      <div className="flex flex-col h-full py-6 px-3">
        {/* Logo */}
        <div className="px-3 mb-8">
          <Link to="/" className="text-2xl font-bold ig-text-gradient">
            Instagram
          </Link>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={item.onClick}
                className={`
                  flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors relative
                  ${active 
                    ? 'bg-primary/10 text-primary font-semibold' 
                    : 'text-foreground hover:bg-muted'
                  }
                `}
              >
                <Icon className={`w-6 h-6 mr-3 ${active ? 'fill-current' : ''}`} />
                <span>{item.name}</span>
                
                {item.badge > 0 && (
                  <span className="ml-auto bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        
        {/* Bottom Menu */}
        <div className="space-y-1">
          <Link
            to="/settings"
            className={`
              flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors
              ${isActive('/settings') 
                ? 'bg-primary/10 text-primary font-semibold' 
                : 'text-foreground hover:bg-muted'
              }
            `}
          >
            <Settings className="w-6 h-6 mr-3" />
            <span>Settings</span>
          </Link>
          
          <button className="flex items-center w-full px-3 py-3 text-sm font-medium rounded-lg transition-colors text-foreground hover:bg-muted">
            <Menu className="w-6 h-6 mr-3" />
            <span>More</span>
          </button>
          
          {/* User Profile */}
          <div className="flex items-center px-3 py-3 mt-4 border-t border-border">
            <div className="ig-avatar w-8 h-8 mr-3">
              <div className="ig-avatar-inner">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.username}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {currentUser.username}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {currentUser.fullName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}