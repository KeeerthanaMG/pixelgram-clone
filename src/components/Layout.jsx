import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import UploadModal from './UploadModal';

export default function Layout({ children }) {
  const location = useLocation();
  
  // Pages that don't use the main layout
  const noLayoutPages = ['/login', '/signup'];
  const isNoLayoutPage = noLayoutPages.includes(location.pathname);

  if (isNoLayoutPage) {
    return (
      <>
        {children}
        <UploadModal />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Left Sidebar - Always visible and fixed */}
      <Sidebar />
      
      {/* Main Content Area - Scrolls independently */}
      <main className="ml-0 lg:ml-[245px] min-h-screen overflow-y-auto">
        <div className="py-6 lg:py-8 px-4 lg:px-6">
          {children}
        </div>
      </main>
      
      {/* Mobile Bottom Navigation */}
      <BottomNav />
      
      {/* Upload Modal */}
      <UploadModal />
    </div>
  );
}