import { createContext, useContext, useReducer } from 'react';
import { dummyUsers, dummyPosts, dummyStories, dummyMessages } from '../utils/dummyData';

const AppContext = createContext();

const initialState = {
  currentUser: dummyUsers[0],
  posts: dummyPosts,
  users: dummyUsers,
  stories: dummyStories,
  messages: dummyMessages,
  notifications: [
    {
      id: 1,
      type: 'like',
      user: dummyUsers[1],
      post: dummyPosts[0],
      timestamp: '2h',
      read: false
    },
    {
      id: 2,
      type: 'follow',
      user: dummyUsers[2],
      timestamp: '4h',
      read: false
    },
    {
      id: 3,
      type: 'comment',
      user: dummyUsers[3],
      post: dummyPosts[1],
      comment: 'Amazing shot! 📸',
      timestamp: '1d',
      read: true
    }
  ],
  isUploadModalOpen: false,
  selectedPost: null
};

function appReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_LIKE':
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.postId
            ? {
                ...post,
                isLiked: !post.isLiked,
                likes: post.isLiked ? post.likes - 1 : post.likes + 1
              }
            : post
        )
      };
    
    case 'TOGGLE_FOLLOW':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.userId
            ? { ...user, isFollowing: !user.isFollowing }
            : user
        )
      };
    
    case 'ADD_COMMENT':
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.postId
            ? {
                ...post,
                comments: [...post.comments, action.comment]
              }
            : post
        )
      };
    
    case 'OPEN_UPLOAD_MODAL':
      return { ...state, isUploadModalOpen: true };
    
    case 'CLOSE_UPLOAD_MODAL':
      return { ...state, isUploadModalOpen: false };
    
    case 'SET_SELECTED_POST':
      return { ...state, selectedPost: action.post };
    
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(notif =>
          notif.id === action.notificationId
            ? { ...notif, read: true }
            : notif
        )
      };
    
    case 'TOGGLE_SAVE':
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.postId
            ? { ...post, isSaved: !post.isSaved }
            : post
        )
      };
    
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}