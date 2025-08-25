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
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar - Fixed Left */}
      <Sidebar />
      
      {/* Mobile Top Navbar */}
      <Navbar />
      
      {/* Main Content Area */}
      <main className="flex-1 lg:ml-[244px] pt-16 lg:pt-0 pb-16 lg:pb-0 min-h-screen">
        {children}
      </main>
      
      {/* Mobile Bottom Navigation */}
      <BottomNav />
      
      {/* Upload Modal */}
      <UploadModal />
    </div>
  );
}