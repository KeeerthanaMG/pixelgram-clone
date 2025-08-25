import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Stories() {
  const { state } = useAppContext();
  const { stories, currentUser } = state;

  const scrollStories = (direction) => {
    const container = document.getElementById('stories-container');
    const scrollAmount = 300;
    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className="relative bg-background border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm">Stories</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => scrollStories('left')}
            className="p-1 hover:bg-muted rounded-full transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollStories('right')}
            className="p-1 hover:bg-muted rounded-full transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div
        id="stories-container"
        className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2"
        style={{ scrollBehavior: 'smooth' }}
      >
        {/* Your Story */}
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-muted-foreground/50 flex items-center justify-center">
              <img
                src={currentUser.avatar}
                alt="Your story"
                className="w-14 h-14 rounded-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center border-2 border-background">
              <span className="text-primary-foreground text-xs font-bold">+</span>
            </div>
          </div>
          <span className="text-xs text-center mt-2 text-muted-foreground max-w-[64px] truncate">
            Your story
          </span>
        </div>

        {/* Other Stories */}
        {stories.map((story) => (
          <div key={story.id} className="flex flex-col items-center flex-shrink-0">
            <div className={`ig-story-ring w-16 h-16 ${!story.viewed ? 'opacity-100' : 'opacity-50'}`}>
              <div className="ig-avatar-inner w-full h-full">
                <img
                  src={story.user.avatar}
                  alt={story.user.username}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
            <span className="text-xs text-center mt-2 max-w-[64px] truncate">
              {story.user.username}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
