import { useAppContext } from '../context/AppContext';

export default function Stories() {
  const { state } = useAppContext();
  const { stories, currentUser } = state;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {/* Your Story */}
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="relative">
            <div className="w-14 h-14 rounded-full border-2 border-gray-300 p-0.5">
              <img
                src={currentUser.avatar}
                alt="Your story"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
              <span className="text-white text-xs font-bold">+</span>
            </div>
          </div>
          <span className="text-xs mt-2 text-center max-w-[64px] truncate">Your story</span>
        </div>

        {/* Other Stories */}
        {stories.map((story) => (
          <div key={story.id} className="flex flex-col items-center flex-shrink-0">
            <div className={`w-14 h-14 rounded-full p-0.5 ${
              story.viewed 
                ? 'border-2 border-gray-300' 
                : 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600'
            }`}>
              <div className="w-full h-full rounded-full border-2 border-white p-0.5">
                <img
                  src={story.user.avatar}
                  alt={story.user.username}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
            <span className="text-xs mt-2 text-center max-w-[64px] truncate">
              {story.user.username}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
