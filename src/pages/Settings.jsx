import { useState } from 'react';
import { ChevronRight, User, Lock, Bell, Eye, HelpCircle, LogOut, Shield } from 'lucide-react';

export default function Settings() {
  const [activeSection, setActiveSection] = useState('account');

  const settingsCategories = [
    {
      id: 'account',
      title: 'Account',
      icon: User,
      items: [
        { title: 'Edit Profile', subtitle: 'Name, username, website, bio' },
        { title: 'Change Password', subtitle: 'Update your password' },
        { title: 'Account Privacy', subtitle: 'Control who can see your content' },
        { title: 'Close Friends', subtitle: 'Share with a smaller group' },
        { title: 'Blocked Accounts', subtitle: 'Manage blocked users' }
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: Shield,
      items: [
        { title: 'Account Privacy', subtitle: 'Private or public account' },
        { title: 'Activity Status', subtitle: 'Show when you\'re active' },
        { title: 'Story Controls', subtitle: 'Control who can see your stories' },
        { title: 'Comments', subtitle: 'Control comments on your posts' },
        { title: 'Tags and Mentions', subtitle: 'Control tags and mentions' },
        { title: 'Two-Factor Authentication', subtitle: 'Add an extra layer of security' }
      ]
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      items: [
        { title: 'Push Notifications', subtitle: 'Likes, comments, and other updates' },
        { title: 'Email Notifications', subtitle: 'Get notified via email' },
        { title: 'SMS Notifications', subtitle: 'Get notified via SMS' }
      ]
    },
    {
      id: 'display',
      title: 'Display & Accessibility',
      icon: Eye,
      items: [
        { title: 'Theme', subtitle: 'Light or dark mode' },
        { title: 'Language', subtitle: 'Choose your language' },
        { title: 'Accessibility', subtitle: 'Screen reader and other tools' }
      ]
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: HelpCircle,
      items: [
        { title: 'Help Center', subtitle: 'Get answers to common questions' },
        { title: 'Report a Problem', subtitle: 'Let us know about issues' },
        { title: 'Terms of Service', subtitle: 'Read our terms' },
        { title: 'Privacy Policy', subtitle: 'Read our privacy policy' },
        { title: 'Community Guidelines', subtitle: 'Read our guidelines' }
      ]
    }
  ];

  const activeCategory = settingsCategories.find(cat => cat.id === activeSection);

  return (
    <div className="flex h-screen">
      {/* Settings Navigation */}
      <div className={`w-full lg:w-80 border-r border-border bg-background ${activeSection !== 'menu' ? 'hidden lg:block' : 'block'}`}>
        <div className="p-4 border-b border-border">
          <h1 className="text-2xl font-semibold">Settings</h1>
        </div>
        
        <div className="overflow-y-auto">
          {settingsCategories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveSection(category.id)}
                className={`w-full flex items-center justify-between p-4 text-left hover:bg-muted transition-colors ${
                  activeSection === category.id ? 'bg-muted border-r-2 border-primary' : ''
                }`}
              >
                <div className="flex items-center">
                  <Icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{category.title}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground lg:hidden" />
              </button>
            );
          })}
          
          {/* Logout */}
          <button className="w-full flex items-center p-4 text-left hover:bg-muted transition-colors text-destructive">
            <LogOut className="w-5 h-5 mr-3" />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </div>

      {/* Settings Content */}
      <div className={`flex-1 ${activeSection === 'menu' ? 'hidden lg:block' : 'block'}`}>
        {activeSection !== 'menu' && activeCategory && (
          <div>
            {/* Header */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center">
                <button 
                  onClick={() => setActiveSection('menu')}
                  className="lg:hidden mr-3 p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <h2 className="text-xl font-semibold">{activeCategory.title}</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Manage your {activeCategory.title.toLowerCase()} settings and preferences
                  </p>
                </div>
              </div>
            </div>

            {/* Settings Items */}
            <div className="p-6">
              <div className="space-y-1">
                {activeCategory.items.map((item, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center justify-between p-4 hover:bg-muted rounded-lg transition-colors text-left"
                  >
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{item.subtitle}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>

            {/* Special Sections */}
            {activeSection === 'account' && (
              <div className="p-6 border-t border-border">
                <div className="bg-muted rounded-lg p-4">
                  <h3 className="font-semibold text-sm mb-2">Account Information</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    See information about your account, download an archive of your data, or learn about your account deactivation options.
                  </p>
                  <button className="text-primary text-sm font-semibold mt-2 hover:underline">
                    Learn more
                  </button>
                </div>
              </div>
            )}

            {activeSection === 'privacy' && (
              <div className="p-6 border-t border-border">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-start">
                    <Shield className="w-5 h-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-sm text-primary mb-2">Security Tip</h3>
                      <p className="text-xs text-primary/80 leading-relaxed">
                        Enable two-factor authentication to keep your account secure. We recommend using an authenticator app.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeSection === 'menu' && (
          <div className="hidden lg:flex lg:items-center lg:justify-center lg:h-full">
            <div className="text-center">
              <div className="p-6 bg-muted rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <User className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Select a Setting</h3>
              <p className="text-muted-foreground">Choose a category from the left to manage your preferences.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}