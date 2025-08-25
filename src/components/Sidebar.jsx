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
      <div className="flex flex-col h-full py-8 px-3">
        {/* Logo */}
        <div className="px-3 mb-10">
          <Link to="/" className="text-2xl font-bold ig-text-gradient">
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
                  flex items-center px-3 py-3 text-base font-normal rounded-xl transition-all duration-200 relative group
                  ${active 
                    ? 'bg-gray-100 font-bold' 
                    : 'hover:bg-gray-50'
                  }
                `}
              >
                <Icon className={`w-7 h-7 mr-4 transition-transform group-hover:scale-105 ${
                  active ? 'stroke-2' : 'stroke-1.5'
                } ${
                  item.name === 'Notifications' && item.badge > 0 ? 'text-red-500' : ''
                }`} />
                <span className={active ? 'font-bold' : 'font-normal'}>{item.name}</span>
                
                {item.badge > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        
        {/* Bottom Menu */}
        <div className="space-y-2 mb-6">
          <Link
            to="/settings"
            className={`
              flex items-center px-3 py-3 text-base font-normal rounded-xl transition-all duration-200 group
              ${isActive('/settings') 
                ? 'bg-gray-100 font-bold' 
                : 'hover:bg-gray-50'
              }
            `}
          >
            <Settings className={`w-7 h-7 mr-4 transition-transform group-hover:scale-105 ${
              isActive('/settings') ? 'stroke-2' : 'stroke-1.5'
            }`} />
            <span className={isActive('/settings') ? 'font-bold' : 'font-normal'}>Settings</span>
          </Link>
          
          <button className="flex items-center w-full px-3 py-3 text-base font-normal rounded-xl transition-all duration-200 hover:bg-gray-50 group">
            <Menu className="w-7 h-7 mr-4 transition-transform group-hover:scale-105 stroke-1.5" />
            <span>More</span>
          </button>
          
          {/* User Profile */}
          <div className="flex items-center px-3 py-4 border-t border-gray-200">
            <div className="w-10 h-10 mr-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.username}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                {currentUser.username}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {currentUser.fullName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}