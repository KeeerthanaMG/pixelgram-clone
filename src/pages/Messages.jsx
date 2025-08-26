import { useState } from 'react';
import { Send, Phone, VideoIcon, Info, Smile } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Messages() {
  const { state } = useAppContext();
  const { messages, currentUser } = state;
  const [selectedChat, setSelectedChat] = useState(messages[0]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // In a real app, this would send the message
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Conversations List */}
      <div className={`w-full lg:w-96 border-r border-border bg-background ${selectedChat ? 'hidden lg:block' : 'block'}`}>
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">{currentUser.username}</h1>
            <button className="p-2 hover:bg-muted rounded-full transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="overflow-y-auto">
          {messages.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`w-full flex items-center p-4 hover:bg-muted transition-colors ${
                selectedChat?.id === chat.id ? 'bg-muted' : ''
              }`}
            >
              <div className="ig-avatar w-12 h-12 mr-3">
                <div className="ig-avatar-inner">
                  <img
                    src={chat.user.avatar}
                    alt={chat.user.username}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">{chat.user.username}</span>
                  <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground truncate mr-2">
                    {chat.lastMessage}
                  </span>
                  {chat.unread && (
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {selectedChat ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center">
              <button 
                onClick={() => setSelectedChat(null)}
                className="lg:hidden mr-3 p-2 hover:bg-muted rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="ig-avatar w-8 h-8 mr-3">
                <div className="ig-avatar-inner">
                  <img
                    src={selectedChat.user.avatar}
                    alt={selectedChat.user.username}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              <div>
                <h2 className="font-semibold text-sm">{selectedChat.user.username}</h2>
                <p className="text-xs text-muted-foreground">Active now</p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="p-2 hover:bg-muted rounded-full transition-colors">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-muted rounded-full transition-colors">
                <VideoIcon className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-muted rounded-full transition-colors">
                <Info className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {selectedChat.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.sent
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sent ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <form onSubmit={sendMessage} className="p-4 border-t border-border">
            <div className="flex items-center space-x-3">
              <button type="button" className="p-2 hover:bg-muted rounded-full transition-colors">
                <Smile className="w-5 h-5" />
              </button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Message..."
                  className="w-full px-4 py-2 bg-muted border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              {newMessage.trim() ? (
                <button
                  type="submit"
                  className="text-primary font-semibold hover:text-primary/80 transition-colors"
                >
                  Send
                </button>
              ) : (
                <button type="button" className="p-2 hover:bg-muted rounded-full transition-colors">
                  <Send className="w-5 h-5" />
                </button>
              )}
            </div>
          </form>
        </div>
      ) : (
        <div className="hidden lg:flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="p-6 border-2 border-foreground rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Send className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-light mb-2">Your Messages</h3>
            <p className="text-muted-foreground mb-4">Send private photos and messages to a friend or group.</p>
            <button className="ig-btn-primary">Send Message</button>
          </div>
        </div>
      )}
    </div>
  );
}