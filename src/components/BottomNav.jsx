import { Link, useLocation } from 'react-router-dom';
import { Home, Search, PlusSquare, Film, User } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function BottomNav() {
  const location = useLocation();
  const { dispatch } = useAppContext();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Search', href: '/search', icon: Search },
    { name: 'Create', href: '#', icon: PlusSquare, onClick: () => dispatch({ type: 'OPEN_UPLOAD_MODAL' }) },
    { name: 'Reels', href: '/reels', icon: Film },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="ig-mobile-nav">
      <div className="flex">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={item.onClick}
              className={`
                flex-1 flex flex-col items-center justify-center py-2 px-1
                ${active ? 'text-primary' : 'text-muted-foreground'}
              `}
            >
              <Icon className={`w-6 h-6 ${active ? 'fill-current' : ''}`} />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}