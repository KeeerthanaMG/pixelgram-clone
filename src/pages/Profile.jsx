import { useState } from 'react';
import { Settings, Grid, Bookmark, UserCheck } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Profile() {
  const { state } = useAppContext();
  const { currentUser, posts } = state;
  const [activeTab, setActiveTab] = useState('posts');

  // Filter posts by current user (in real app, this would come from API)
  const userPosts = posts.filter(post => post.user.id === currentUser.id);

  const tabs = [
    { id: 'posts', label: 'Posts', icon: Grid, count: userPosts.length },
    { id: 'saved', label: 'Saved', icon: Bookmark, count: 0 },
    { id: 'tagged', label: 'Tagged', icon: UserCheck, count: 0 },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Profile Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center py-8 border-b border-border">
        <div className="flex-shrink-0 mb-6 lg:mb-0 lg:mr-12">
          <div className="ig-avatar w-32 h-32 lg:w-40 lg:h-40">
            <div className="ig-avatar-inner">
              <img
                src={currentUser.avatar}
                alt={currentUser.username}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        </div>
        
        <div className="flex-1 w-full lg:w-auto">
          {/* Username and Actions */}
          <div className="flex flex-col lg:flex-row lg:items-center mb-6">
            <div className="flex items-center mb-4 lg:mb-0 lg:mr-6">
              <h1 className="text-2xl font-light mr-4">{currentUser.username}</h1>
              {currentUser.isVerified && (
                <svg className="w-6 h-6 text-primary fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9l-5.55 5.42L18 22l-6-3.27L6 22l1.55-7.58L2 9l6.91-.74L12 2z"/>
                </svg>
              )}
            </div>
            
            <div className="flex space-x-2">
              <button className="ig-btn-secondary">
                Edit profile
              </button>
              <button className="ig-btn-secondary">
                View archive
              </button>
              <button className="p-2 hover:bg-muted rounded transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex space-x-8 mb-6">
            <div className="text-center lg:text-left">
              <span className="font-semibold">{currentUser.posts}</span>
              <span className="text-sm text-muted-foreground ml-1">posts</span>
            </div>
            <div className="text-center lg:text-left">
              <span className="font-semibold">{currentUser.followers}</span>
              <span className="text-sm text-muted-foreground ml-1">followers</span>
            </div>
            <div className="text-center lg:text-left">
              <span className="font-semibold">{currentUser.following}</span>
              <span className="text-sm text-muted-foreground ml-1">following</span>
            </div>
          </div>
          
          {/* Bio */}
          <div>
            <h2 className="font-semibold mb-1">{currentUser.fullName}</h2>
            <p className="text-sm whitespace-pre-line">{currentUser.bio}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center border-b border-border">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-1 py-4 px-6 text-sm font-medium border-t-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-foreground text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="uppercase tracking-wide">{tab.label}</span>
              {tab.count > 0 && (
                <span className="ml-1">({tab.count})</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="py-8">
        {activeTab === 'posts' && (
          <div>
            {userPosts.length > 0 ? (
              <div className="grid grid-cols-3 gap-1 lg:gap-2">
                {userPosts.map((post) => (
                  <div
                    key={post.id}
                    className="relative group cursor-pointer overflow-hidden aspect-square"
                  >
                    <img
                      src={post.image}
                      alt={post.caption}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="text-white flex items-center space-x-4">
                        <div className="flex items-center">
                          <svg className="w-6 h-6 mr-2 fill-current" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                          </svg>
                          <span className="font-semibold">{post.likes}</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-6 h-6 mr-2 fill-current" viewBox="0 0 24 24">
                            <path d="M21,6H3A1,1 0 0,0 2,7V17A1,1 0 0,0 3,18H8.5L12,21.5L15.5,18H21A1,1 0 0,0 22,17V7A1,1 0 0,0 21,6M18,14H6V12H18V14Z"/>
                          </svg>
                          <span className="font-semibold">{post.comments.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="p-6 border-2 border-foreground rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Grid className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-light mb-2">No Posts Yet</h3>
                <p className="text-muted-foreground">Start sharing your moments!</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'saved' && (
          <div className="text-center py-12">
            <div className="p-6 border-2 border-foreground rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Bookmark className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-light mb-2">No Saved Posts</h3>
            <p className="text-muted-foreground">Save posts you want to see again.</p>
          </div>
        )}
        
        {activeTab === 'tagged' && (
          <div className="text-center py-12">
            <div className="p-6 border-2 border-foreground rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <UserCheck className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-light mb-2">No Tagged Posts</h3>
            <p className="text-muted-foreground">Photos of you will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}