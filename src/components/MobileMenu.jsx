import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Compass, Film, MessageCircle, Heart, PlusSquare, User, Settings, Menu, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
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
    { name: 'Create', href: '#', icon: PlusSquare, onClick: () => { dispatch({ type: 'OPEN_UPLOAD_MODAL' }); setIsOpen(false); } },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="lg:hidden p-2 hover:bg-muted rounded-full transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="fixed inset-y-0 left-0 w-80 bg-background shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <Link 
                to="/" 
                className="text-2xl font-bold ig-text-gradient"
                onClick={handleLinkClick}
              >
                Instagram
              </Link>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
              <div className="space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={item.onClick || handleLinkClick}
                      className={`
                        flex items-center px-3 py-3 text-base font-medium rounded-lg transition-colors relative
                        ${active 
                          ? 'bg-primary/10 text-primary font-semibold' 
                          : 'text-foreground hover:bg-muted'
                        }
                      `}
                    >
                      <Icon className={`w-6 h-6 mr-4 ${active ? 'fill-current' : ''}`} />
                      <span>{item.name}</span>
                      
                      {item.badge > 0 && (
                        <span className="ml-auto bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* User Profile */}
            <div className="border-t border-border p-4">
              <div className="flex items-center">
                <div className="ig-avatar w-12 h-12 mr-3">
                  <div className="ig-avatar-inner">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.username}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-medium text-foreground truncate">
                    {currentUser.username}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {currentUser.fullName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}