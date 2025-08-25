export const dummyUsers = [
  {
    id: 1,
    username: 'john_photographer',
    fullName: 'John Smith',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Professional photographer 📸 | Travel enthusiast 🌍 | Coffee lover ☕',
    followers: 1243,
    following: 532,
    posts: 89,
    isVerified: true,
    isFollowing: false
  },
  {
    id: 2,
    username: 'sarah_adventures',
    fullName: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b29c?w=150&h=150&fit=crop&crop=face',
    bio: 'Adventure seeker 🏔️ | Digital nomad 💻 | Yoga instructor 🧘‍♀️',
    followers: 892,
    following: 123,
    posts: 156,
    isVerified: false,
    isFollowing: true
  },
  {
    id: 3,
    username: 'mike_fitness',
    fullName: 'Mike Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Fitness coach 💪 | Nutrition expert 🥗 | Motivational speaker 🎯',
    followers: 2156,
    following: 234,
    posts: 234,
    isVerified: true,
    isFollowing: false
  },
  {
    id: 4,
    username: 'emma_artist',
    fullName: 'Emma Wilson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'Digital artist 🎨 | UI/UX Designer ✨ | Creative storyteller 📖',
    followers: 678,
    following: 345,
    posts: 98,
    isVerified: false,
    isFollowing: true
  },
  {
    id: 5,
    username: 'alex_chef',
    fullName: 'Alex Thompson',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    bio: 'Head Chef 👨‍🍳 | Food lover 🍕 | Recipe creator 📝',
    followers: 1567,
    following: 189,
    posts: 267,
    isVerified: true,
    isFollowing: false
  }
];

export const dummyPosts = [
  {
    id: 1,
    user: dummyUsers[1],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
    caption: 'Mountain peaks calling my name 🏔️ Nothing beats the feeling of reaching the summit after hours of hiking. The view from up here reminds me why I love adventures so much! #MountainLife #Adventure',
    likes: 234,
    comments: [
      {
        id: 1,
        user: dummyUsers[0],
        text: 'Incredible view! 😍',
        timestamp: '2h'
      },
      {
        id: 2,
        user: dummyUsers[2],
        text: 'This is goals! What mountain is this?',
        timestamp: '1h'
      }
    ],
    timestamp: '3h',
    location: 'Swiss Alps, Switzerland',
    isLiked: false,
    isSaved: false
  },
  {
    id: 2,
    user: dummyUsers[2],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop',
    caption: 'Morning workout complete! 💪 Remember, consistency is key. Every rep counts, every day matters. Push yourself beyond your limits and watch the magic happen. #FitnessMotivation #GymLife',
    likes: 189,
    comments: [
      {
        id: 1,
        user: dummyUsers[3],
        text: 'Inspiring as always! 🔥',
        timestamp: '45m'
      }
    ],
    timestamp: '5h',
    location: 'Gold\'s Gym, LA',
    isLiked: true,
    isSaved: true
  },
  {
    id: 3,
    user: dummyUsers[3],
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=600&fit=crop',
    caption: 'New digital artwork finished! 🎨 Spent countless hours perfecting every pixel. Art is not what you see, but what you make others see. What do you think of this piece? #DigitalArt #Creative',
    likes: 156,
    comments: [
      {
        id: 1,
        user: dummyUsers[0],
        text: 'The colors are absolutely stunning! 🌈',
        timestamp: '3h'
      },
      {
        id: 2,
        user: dummyUsers[1],
        text: 'This belongs in a gallery! Amazing work 👏',
        timestamp: '2h'
      }
    ],
    timestamp: '8h',
    location: 'Art Studio, NYC',
    isLiked: false,
    isSaved: false
  },
  {
    id: 4,
    user: dummyUsers[4],
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=600&fit=crop',
    caption: 'Tonight\'s special: Homemade pasta with truffle sauce 🍝 Cooking is an art form where taste and creativity meet. Each dish tells a story, and tonight\'s story is pure indulgence! #ChefLife #Pasta',
    likes: 298,
    comments: [
      {
        id: 1,
        user: dummyUsers[1],
        text: 'This looks absolutely delicious! Recipe please? 🤤',
        timestamp: '1h'
      }
    ],
    timestamp: '12h',
    location: 'La Bernardin, NYC',
    isLiked: true,
    isSaved: true
  },
  {
    id: 5,
    user: dummyUsers[0],
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=600&fit=crop',
    caption: 'Golden hour magic ✨ There\'s something magical about this time of day. The way light dances through the trees creates the most incredible natural photography studio. Nature is the ultimate artist. #GoldenHour #Photography',
    likes: 445,
    comments: [
      {
        id: 1,
        user: dummyUsers[2],
        text: 'The lighting is perfect! 📸',
        timestamp: '30m'
      },
      {
        id: 2,
        user: dummyUsers[4],
        text: 'This is why I follow you! Always amazing shots 🔥',
        timestamp: '15m'
      }
    ],
    timestamp: '1d',
    location: 'Central Park, NYC',
    isLiked: false,
    isSaved: true
  }
];

export const dummyStories = [
  {
    id: 1,
    user: dummyUsers[0],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=700&fit=crop',
    timestamp: '2h',
    viewed: false
  },
  {
    id: 2,
    user: dummyUsers[1],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=700&fit=crop',
    timestamp: '4h',
    viewed: true
  },
  {
    id: 3,
    user: dummyUsers[2],
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=700&fit=crop',
    timestamp: '6h',
    viewed: false
  },
  {
    id: 4,
    user: dummyUsers[3],
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=700&fit=crop',
    timestamp: '8h',
    viewed: true
  }
];

export const dummyMessages = [
  {
    id: 1,
    user: dummyUsers[1],
    messages: [
      {
        id: 1,
        text: 'Hey! Loved your latest post 📸',
        timestamp: '2:30 PM',
        sent: false
      },
      {
        id: 2,
        text: 'Thank you so much! 😊',
        timestamp: '2:32 PM',
        sent: true
      },
      {
        id: 3,
        text: 'Would love to collab sometime!',
        timestamp: '2:35 PM',
        sent: false
      }
    ],
    lastMessage: 'Would love to collab sometime!',
    timestamp: '2:35 PM',
    unread: true
  },
  {
    id: 2,
    user: dummyUsers[2],
    messages: [
      {
        id: 1,
        text: 'Bro, that workout was intense! 💪',
        timestamp: '1:15 PM',
        sent: false
      },
      {
        id: 2,
        text: 'Haha yeah! You killed it though 🔥',
        timestamp: '1:20 PM',
        sent: true
      }
    ],
    lastMessage: 'Haha yeah! You killed it though 🔥',
    timestamp: '1:20 PM',
    unread: false
  },
  {
    id: 3,
    user: dummyUsers[3],
    messages: [
      {
        id: 1,
        text: 'Your art is absolutely incredible! 🎨',
        timestamp: '12:45 PM',
        sent: true
      },
      {
        id: 2,
        text: 'Thank you! That means a lot ✨',
        timestamp: '12:50 PM',
        sent: false
      }
    ],
    lastMessage: 'Thank you! That means a lot ✨',
    timestamp: '12:50 PM',
    unread: false
  }
];