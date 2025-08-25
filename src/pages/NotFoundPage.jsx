import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative">
            <div className="text-9xl font-bold text-muted/20 select-none">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="ig-avatar w-20 h-20">
                <div className="ig-avatar-inner">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">?</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Sorry, this page isn't available.</h1>
          <p className="text-muted-foreground leading-relaxed">
            The link you followed may be broken, or the page may have been removed. 
            Go back to Instagram to discover new content.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center w-full ig-btn-primary"
          >
            <Home className="w-5 h-5 mr-2" />
            Go back to Instagram
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center w-full ig-btn-secondary"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go back
          </button>
        </div>

        {/* Help Links */}
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">Need help?</p>
          <div className="flex justify-center space-x-6 text-sm">
            <Link to="/help" className="text-primary hover:underline">
              Help Center
            </Link>
            <Link to="/support" className="text-primary hover:underline">
              Contact Support
            </Link>
            <Link to="/community" className="text-primary hover:underline">
              Community
            </Link>
          </div>
        </div>

        {/* Instagram Branding */}
        <div className="mt-12">
          <div className="text-xs text-muted-foreground">
            <p>© 2024 Instagram Clone</p>
          </div>
        </div>
      </div>
    </div>
  );
}