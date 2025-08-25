import { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Volume2, VolumeX, Play } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Reels() {
  const { state, dispatch } = useAppContext();
  const [currentReel, setCurrentReel] = useState(0);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const videoRefs = useRef([]);

  // Create dummy reels data
  const reels = [
    {
      id: 1,
      user: state.users[1],
      video: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=700&fit=crop',
      caption: 'Mountain adventures await! 🏔️ #adventure #mountains #hiking',
      likes: 2847,
      comments: 156,
      music: 'Adventure Vibes • Original Audio',
      isLiked: false
    },
    {
      id: 2,
      user: state.users[2],
      video: 'https://player.vimeo.com/external/434045522.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e49c02&profile_id=139&oauth2_token_id=57447761',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=700&fit=crop',
      caption: 'Monday motivation 💪 Never give up on your dreams! #fitness #motivation #gym',
      likes: 1923,
      comments: 89,
      music: 'Workout Mix • Trending',
      isLiked: true
    },
    {
      id: 3,
      user: state.users[3],
      video: 'https://player.vimeo.com/external/395375429.sd.mp4?s=7c1de20a5c03e3f28eb0e21d72b6b57e4318894e&profile_id=139&oauth2_token_id=57447761',
      thumbnail: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=700&fit=crop',
      caption: 'Art in progress 🎨 Creating magic one stroke at a time ✨ #art #creative #digitalart',
      likes: 3456,
      comments: 234,
      music: 'Chill Vibes • Popular',
      isLiked: false
    }
  ];

  const handleLike = (reelId) => {
    // In real app, this would update the reel's like status
    console.log('Liked reel:', reelId);
  };

  const handleScroll = (e) => {
    const container = e.target;
    const reelHeight = container.clientHeight;
    const scrollTop = container.scrollTop;
    const newCurrentReel = Math.round(scrollTop / reelHeight);
    
    if (newCurrentReel !== currentReel) {
      setCurrentReel(newCurrentReel);
    }
  };

  const togglePlay = () => {
    setPlaying(!playing);
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  useEffect(() => {
    // Auto-scroll to next reel functionality could be added here
    const interval = setInterval(() => {
      if (playing && currentReel < reels.length - 1) {
        // Auto advance logic could go here
      }
    }, 15000); // 15 seconds per reel

    return () => clearInterval(interval);
  }, [currentReel, playing, reels.length]);

  return (
    <div className="relative h-screen bg-black overflow-hidden">
      {/* Reels Container */}
      <div 
        className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        onScroll={handleScroll}
        style={{ scrollBehavior: 'smooth' }}
      >
        {reels.map((reel, index) => (
          <div key={reel.id} className="relative h-screen snap-start flex items-center justify-center">
            {/* Video/Image Background */}
            <div className="relative w-full max-w-sm mx-auto h-full bg-black">
              {/* For demo, using image instead of video */}
              <img
                src={reel.thumbnail}
                alt={reel.caption}
                className="w-full h-full object-cover"
              />
              
              {/* Play/Pause Overlay */}
              <div 
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                onClick={togglePlay}
              >
                {!playing && (
                  <div className="bg-black/50 rounded-full p-4">
                    <Play className="w-12 h-12 text-white fill-current" />
                  </div>
                )}
              </div>

              {/* User Info Overlay */}
              <div className="absolute bottom-20 left-4 right-20 text-white">
                <div className="flex items-center mb-3">
                  <div className="ig-avatar w-8 h-8 mr-3">
                    <div className="ig-avatar-inner">
                      <img
                        src={reel.user.avatar}
                        alt={reel.user.username}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </div>
                  <span className="font-semibold text-sm">{reel.user.username}</span>
                  <button className="ml-3 text-sm font-semibold border border-white px-3 py-1 rounded hover:bg-white hover:text-black transition-colors">
                    Follow
                  </button>
                </div>
                
                <p className="text-sm mb-2 leading-relaxed">{reel.caption}</p>
                
                <div className="flex items-center text-xs">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                  </svg>
                  <span>{reel.music}</span>
                </div>
              </div>

              {/* Right Actions */}
              <div className="absolute bottom-20 right-4 flex flex-col items-center space-y-6">
                <button 
                  onClick={() => handleLike(reel.id)}
                  className="flex flex-col items-center"
                >
                  <div className="p-3 bg-black/30 rounded-full">
                    <Heart 
                      className={`w-7 h-7 text-white ${reel.isLiked ? 'fill-red-500 text-red-500' : ''}`} 
                    />
                  </div>
                  <span className="text-white text-xs font-semibold mt-1">
                    {reel.likes.toLocaleString()}
                  </span>
                </button>

                <button className="flex flex-col items-center">
                  <div className="p-3 bg-black/30 rounded-full">
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-white text-xs font-semibold mt-1">
                    {reel.comments}
                  </span>
                </button>

                <button className="flex flex-col items-center">
                  <div className="p-3 bg-black/30 rounded-full">
                    <Send className="w-7 h-7 text-white" />
                  </div>
                </button>

                <button className="flex flex-col items-center">
                  <div className="p-3 bg-black/30 rounded-full">
                    <Bookmark className="w-7 h-7 text-white" />
                  </div>
                </button>

                <button className="flex flex-col items-center">
                  <div className="p-3 bg-black/30 rounded-full">
                    <MoreHorizontal className="w-7 h-7 text-white" />
                  </div>
                </button>
              </div>

              {/* Volume Control */}
              <button 
                onClick={toggleMute}
                className="absolute top-4 right-4 p-2 bg-black/30 rounded-full"
              >
                {muted ? (
                  <VolumeX className="w-5 h-5 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="fixed right-2 top-1/2 transform -translate-y-1/2 flex flex-col space-y-1">
        {reels.map((_, index) => (
          <div
            key={index}
            className={`w-1 h-6 rounded-full transition-colors ${
              index === currentReel ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Top Navigation */}
      <div className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between p-4">
        <h1 className="text-white text-xl font-semibold">Reels</h1>
        <button className="text-white p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}