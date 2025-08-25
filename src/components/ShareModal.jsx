import { useState } from 'react';
import { X, Copy, MessageCircle, Mail, Link, Facebook, Twitter, Send } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function ShareModal({ post, isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const { state } = useAppContext();
  const { users } = state;

  if (!isOpen) return null;

  const postUrl = `https://instagram.com/p/${post.id}`;
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const shareOptions = [
    { icon: MessageCircle, label: 'Send in Direct', action: () => console.log('Share via DM') },
    { icon: Copy, label: copied ? 'Link Copied!' : 'Copy Link', action: handleCopyLink },
    { icon: Facebook, label: 'Share to Facebook', action: () => console.log('Share to Facebook') },
    { icon: Twitter, label: 'Share to Twitter', action: () => console.log('Share to Twitter') },
    { icon: Mail, label: 'Share via Email', action: () => console.log('Share via Email') },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className="bg-background rounded-lg max-w-md w-full mx-4 max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-semibold text-lg">Share</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Share Options */}
        <div className="p-4">
          <div className="space-y-3">
            {shareOptions.map((option, index) => (
              <button
                key={index}
                onClick={option.action}
                className="w-full flex items-center p-3 hover:bg-muted rounded-lg transition-colors"
              >
                <div className="p-2 bg-muted rounded-full mr-3">
                  <option.icon className="w-5 h-5" />
                </div>
                <span className="font-medium">{option.label}</span>
              </button>
            ))}
          </div>

          {/* Send to Friends */}
          <div className="mt-6">
            <h3 className="font-semibold mb-3">Send to Friends</h3>
            <div className="max-h-48 overflow-y-auto space-y-2">
              {users.slice(1, 6).map((user) => (
                <div key={user.id} className="flex items-center justify-between p-2 hover:bg-muted rounded-lg">
                  <div className="flex items-center">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-medium text-sm">{user.username}</p>
                      <p className="text-xs text-muted-foreground">{user.fullName}</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-primary hover:text-primary-foreground rounded-full transition-colors">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}