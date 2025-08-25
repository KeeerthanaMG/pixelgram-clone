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
        <div className="px-4 mb-10">
          <Link to="/" className="text-2xl font-bold ig-text-gradient hover:opacity-80 transition-opacity">
            Instagram
          </Link>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={item.onClick}
                className={`
                  flex items-center px-4 py-3 text-base font-normal rounded-xl transition-all duration-200 relative group
                  ${active 
                    ? 'bg-muted text-foreground font-semibold' 
                    : 'text-foreground hover:bg-muted/70 hover:scale-105'
                  }
                `}
              >
                <Icon className={`w-6 h-6 mr-4 transition-transform group-hover:scale-110 ${active ? 'stroke-2' : 'stroke-1'}`} />
                <span className="select-none">{item.name}</span>
                
                {item.badge > 0 && (
                  <span className="ml-auto bg-destructive text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        
        {/* Bottom Menu */}
        <div className="space-y-2 pt-4 border-t border-border">
          <Link
            to="/settings"
            className={`
              flex items-center px-4 py-3 text-base font-normal rounded-xl transition-all duration-200 group
              ${isActive('/settings') 
                ? 'bg-muted text-foreground font-semibold' 
                : 'text-foreground hover:bg-muted/70 hover:scale-105'
              }
            `}
          >
            <Settings className="w-6 h-6 mr-4 transition-transform group-hover:scale-110" />
            <span className="select-none">Settings</span>
          </Link>
          
          <button className="flex items-center w-full px-4 py-3 text-base font-normal rounded-xl transition-all duration-200 text-foreground hover:bg-muted/70 hover:scale-105 group">
            <Menu className="w-6 h-6 mr-4 transition-transform group-hover:scale-110" />
            <span className="select-none">More</span>
          </button>
          
          {/* User Profile */}
          <div className="flex items-center px-4 py-4 mt-6 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
            <div className="w-10 h-10 mr-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.username}
                className="w-full h-full rounded-full object-cover border-2 border-border"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
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