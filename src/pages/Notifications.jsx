import { useAppContext } from '../context/AppContext';

export default function Notifications() {
  const { state, dispatch } = useAppContext();
  const { notifications } = state;

  const markAsRead = (notificationId) => {
    dispatch({ type: 'MARK_NOTIFICATION_READ', notificationId });
  };

  const getNotificationText = (notification) => {
    switch (notification.type) {
      case 'like':
        return 'liked your post';
      case 'follow':
        return 'started following you';
      case 'comment':
        return `commented: "${notification.comment}"`;
      default:
        return '';
    }
  };

  const getNotificationImage = (notification) => {
    if (notification.type === 'like' || notification.type === 'comment') {
      return notification.post?.image;
    }
    return null;
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="py-6">
        <h1 className="text-2xl font-semibold mb-6">Notifications</h1>
        
        {/* Today */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
            Today
          </h2>
          
          <div className="space-y-1">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-center p-3 rounded-lg transition-colors hover:bg-muted/50 ${
                  !notification.read ? 'bg-primary/5' : ''
                }`}
                onClick={() => !notification.read && markAsRead(notification.id)}
              >
                {/* User Avatar */}
                <div className="ig-avatar w-11 h-11 mr-3">
                  <div className="ig-avatar-inner">
                    <img
                      src={notification.user.avatar}
                      alt={notification.user.username}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Notification Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start">
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-semibold">{notification.user.username}</span>
                        <span className="ml-1">{getNotificationText(notification)}</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.timestamp}
                      </p>
                    </div>
                    
                    {/* Post Image */}
                    {getNotificationImage(notification) && (
                      <img
                        src={getNotificationImage(notification)}
                        alt="Post"
                        className="w-10 h-10 rounded ml-3 object-cover"
                      />
                    )}
                    
                    {/* Follow Button */}
                    {notification.type === 'follow' && (
                      <button className="ml-3 ig-btn-primary text-xs px-3 py-1">
                        Follow Back
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Unread Indicator */}
                {!notification.read && (
                  <div className="w-2 h-2 bg-primary rounded-full ml-2"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* This Week */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
            This Week
          </h2>
          
          <div className="space-y-1">
            {/* Example older notifications */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center p-3 rounded-lg transition-colors hover:bg-muted/50">
                <div className="ig-avatar w-11 h-11 mr-3">
                  <div className="ig-avatar-inner">
                    <img
                      src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=150&h=150&fit=crop&crop=face`}
                      alt="User"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-semibold">user{i}</span>
                    <span className="ml-1">liked your post</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {i + 2}d
                  </p>
                </div>
                
                <img
                  src={`https://images.unsplash.com/photo-${1500000000000 + i * 100}?w=400&h=400&fit=crop`}
                  alt="Post"
                  className="w-10 h-10 rounded ml-3 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Empty State for older notifications */}
        <div className="text-center py-8">
          <div className="p-4 bg-muted rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-12a1 1 0 011-1h0a1 1 0 011 1v12z" />
            </svg>
          </div>
          <p className="text-muted-foreground">You're all caught up!</p>
        </div>
      </div>
    </div>
  );
}