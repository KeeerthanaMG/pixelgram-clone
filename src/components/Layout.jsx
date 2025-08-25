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
  
  // Pages that use full screen (like Reels)
  const fullScreenPages = ['/reels'];
  const isFullScreenPage = fullScreenPages.includes(location.pathname);

  if (isNoLayoutPage) {
    return (
      <>
        {children}
        <UploadModal />
      </>
    );
  }

  if (isFullScreenPage) {
    return (
      <>
        {children}
        <BottomNav />
        <UploadModal />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <Sidebar />
      
      {/* Mobile Top Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main className="ig-main-content pt-16 lg:pt-0 pb-16 lg:pb-0">
        <div className="lg:px-8 py-6">
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