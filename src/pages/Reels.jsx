import { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Volume2, VolumeX, Play, Music } from 'lucide-react';
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
      isLiked: false,
      isSaved: false
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
      isLiked: true,
      isSaved: false
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
      isLiked: false,
      isSaved: true
    }
  ];

  const handleLike = (reelId) => {
    console.log('Liked reel:', reelId);
    // Here you would update the reel's like status
  };

  const handleSave = (reelId) => {
    console.log('Saved reel:', reelId);
    // Here you would update the reel's save status
  };

  const handleShare = (reelId) => {
    console.log('Share reel:', reelId);
    dispatch({ type: 'OPEN_SHARE_MODAL', payload: { postId: reelId, type: 'reel' } });
  };

  const handleScroll = (e) => {
    const container = e.target;
    const reelHeight = container.clientHeight;
    const scrollTop = container.scrollTop;
    const newCurrentReel = Math.round(scrollTop / reelHeight);
    
    if (newCurrentReel !== currentReel && newCurrentReel >= 0 && newCurrentReel < reels.length) {
      setCurrentReel(newCurrentReel);
    }
  };

  const togglePlay = () => {
    setPlaying(!playing);
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  return (
    <div className="relative h-screen bg-black overflow-hidden w-full">
      {/* Reels Container */}
      <div 
        className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        onScroll={handleScroll}
        style={{ scrollBehavior: 'smooth' }}
      >
        {reels.map((reel, index) => (
          <div key={reel.id} className="relative h-screen snap-start flex items-center justify-center">
            {/* Video/Image Background */}
            <div className="relative w-full max-w-[380px] mx-auto h-full bg-black rounded-lg overflow-hidden">
              {/* Media Content */}
              <img
                src={reel.thumbnail}
                alt={reel.caption}
                className="w-full h-full object-cover"
              />
              
              {/* Play/Pause Overlay */}
              <div 
                className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/10"
                onClick={togglePlay}
              >
                {!playing && (
                  <div className="bg-black/60 rounded-full p-6 backdrop-blur-sm">
                    <Play className="w-12 h-12 text-white fill-current ml-1" />
                  </div>
                )}
              </div>

              {/* Volume Control */}
              <button 
                onClick={toggleMute}
                className="absolute top-4 right-4 p-2 bg-black/50 rounded-full backdrop-blur-sm hover:bg-black/70 transition-colors"
              >
                {muted ? (
                  <VolumeX className="w-5 h-5 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
              </button>

              {/* User Info Overlay */}
              <div className="absolute bottom-0 left-0 right-16 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3">
                    <img
                      src={reel.user.avatar}
                      alt={reel.user.username}
                      className="w-full h-full rounded-full object-cover border-2 border-white/20"
                    />
                  </div>
                  <span className="font-semibold text-sm text-white">{reel.user.username}</span>
                  <button className="ml-3 text-sm font-semibold border border-white/60 px-4 py-1 rounded-md hover:bg-white hover:text-black transition-all duration-200 text-white">
                    Follow
                  </button>
                </div>
                
                <p className="text-sm mb-3 leading-relaxed text-white/90">{reel.caption}</p>
                
                <div className="flex items-center text-xs text-white/80">
                  <Music className="w-4 h-4 mr-2" />
                  <span>{reel.music}</span>
                </div>
              </div>

              {/* Right Actions */}
              <div className="absolute bottom-20 right-4 flex flex-col items-center space-y-6">
                <button 
                  onClick={() => handleLike(reel.id)}
                  className="flex flex-col items-center group"
                >
                  <div className="p-3 bg-black/40 rounded-full backdrop-blur-sm hover:bg-black/60 transition-colors">
                    <Heart 
                      className={`w-7 h-7 ${reel.isLiked ? 'fill-red-500 text-red-500' : 'text-white'} group-hover:scale-110 transition-transform`} 
                    />
                  </div>
                  <span className="text-white text-xs font-semibold mt-1">
                    {reel.likes.toLocaleString()}
                  </span>
                </button>

                <button className="flex flex-col items-center group">
                  <div className="p-3 bg-black/40 rounded-full backdrop-blur-sm hover:bg-black/60 transition-colors">
                    <MessageCircle className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-white text-xs font-semibold mt-1">
                    {reel.comments}
                  </span>
                </button>

                <button 
                  onClick={() => handleShare(reel.id)}
                  className="flex flex-col items-center group"
                >
                  <div className="p-3 bg-black/40 rounded-full backdrop-blur-sm hover:bg-black/60 transition-colors">
                    <Send className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
                  </div>
                </button>

                <button 
                  onClick={() => handleSave(reel.id)}
                  className="flex flex-col items-center group"
                >
                  <div className="p-3 bg-black/40 rounded-full backdrop-blur-sm hover:bg-black/60 transition-colors">
                    <Bookmark className={`w-7 h-7 ${reel.isSaved ? 'fill-white text-white' : 'text-white'} group-hover:scale-110 transition-transform`} />
                  </div>
                </button>

                <button className="flex flex-col items-center group">
                  <div className="p-3 bg-black/40 rounded-full backdrop-blur-sm hover:bg-black/60 transition-colors">
                    <MoreHorizontal className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
                  </div>
                </button>

                {/* Profile Picture for Music */}
                <div className="w-12 h-12 rounded-full border-2 border-white/30 overflow-hidden animate-spin-slow">
                  <img
                    src={reel.user.avatar}
                    alt="Music"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2 z-20">
        {reels.map((_, index) => (
          <div
            key={index}
            className={`w-1 h-8 rounded-full transition-all duration-300 ${
              index === currentReel ? 'bg-white shadow-lg' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}