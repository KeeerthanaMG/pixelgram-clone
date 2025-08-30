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
    <aside className="fixed top-0 left-0 h-screen w-[250px] border-r border-border bg-background z-40 hidden lg:block">
      <div className="flex flex-col h-full py-6 px-3">
        {/* Instagram Icon/Logo */}
        <div className="px-4 mb-8">
          <Link to="/" className="flex items-center group hover:opacity-80 transition-opacity">
            <div className="text-2xl font-bold ig-text-gradient">
              <svg width="103" height="29" viewBox="0 0 103 29" fill="none" className="w-24 h-7">
                <path d="M7.965 0.245C3.654 0.245 0.162 3.737 0.162 8.048V20.952C0.162 25.263 3.654 28.755 7.965 28.755H20.869C25.18 28.755 28.672 25.263 28.672 20.952V8.048C28.672 3.737 25.18 0.245 20.869 0.245H7.965Z" fill="url(#paint0_linear)"/>
                <path d="M14.417 7.583C10.851 7.583 7.958 10.476 7.958 14.042C7.958 17.608 10.851 20.501 14.417 20.501C17.983 20.501 20.876 17.608 20.876 14.042C20.876 10.476 17.983 7.583 14.417 7.583ZM14.417 18.292C12.071 18.292 10.167 16.388 10.167 14.042C10.167 11.696 12.071 9.792 14.417 9.792C16.763 9.792 18.667 11.696 18.667 14.042C18.667 16.388 16.763 18.292 14.417 18.292Z" fill="white"/>
                <circle cx="21.458" cy="7.583" r="1.375" fill="white"/>
                <defs>
                  <linearGradient id="paint0_linear" x1="2.917" y1="26" x2="26.917" y2="2" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FD5949"/>
                    <stop offset="0.5" stopColor="#D6249F"/>
                    <stop offset="1" stopColor="#285AEB"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
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