import { useState } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import UserCard from '../components/UserCard';
import { useAppContext } from '../context/AppContext';

export default function Search() {
  const { state } = useAppContext();
  const { users, posts } = state;
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory] = useState([
    'photography',
    'travel',
    'fitness',
    'art',
    'food'
  ]);

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPosts = posts.filter(post =>
    post.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Search Header */}
      <div className="sticky top-0 bg-background z-20 py-4 border-b border-border">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="block w-full pl-10 pr-10 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>
      </div>

      {/* Search Results */}
      <div className="py-6">
        {searchQuery ? (
          <div className="space-y-8">
            {/* Users Results */}
            {filteredUsers.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-4">People</h2>
                <div className="space-y-2">
                  {filteredUsers.map((user) => (
                    <UserCard key={user.id} user={user} />
                  ))}
                </div>
              </div>
            )}

            {/* Posts Results */}
            {filteredPosts.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Posts</h2>
                <div className="grid grid-cols-3 gap-1 lg:gap-2">
                  {filteredPosts.map((post) => (
                    <div key={post.id} className="relative group cursor-pointer overflow-hidden aspect-square">
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
              </div>
            )}

            {/* No Results */}
            {filteredUsers.length === 0 && filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <div className="p-4 bg-muted rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <SearchIcon className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground">
                  Try searching for something else or check the spelling.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Search History */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Recent</h2>
              <div className="space-y-2">
                {searchHistory.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(term)}
                    className="flex items-center justify-between w-full p-3 hover:bg-muted rounded-lg transition-colors text-left"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center mr-3">
                        <SearchIcon className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <span className="text-sm">{term}</span>
                    </div>
                    <button className="text-muted-foreground hover:text-foreground">
                      <X className="w-4 h-4" />
                    </button>
                  </button>
                ))}
              </div>
            </div>

            {/* Trending/Discover */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Discover People</h2>
              <div className="space-y-2">
                {users.slice(0, 5).map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            </div>

            {/* Popular Posts Grid */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Popular</h2>
              <div className="grid grid-cols-3 gap-1 lg:gap-2">
                {posts.slice().sort((a, b) => b.likes - a.likes).slice(0, 9).map((post) => (
                  <div key={post.id} className="relative group cursor-pointer overflow-hidden aspect-square">
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}