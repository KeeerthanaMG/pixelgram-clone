import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    fullName: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would handle authentication
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-sm w-full">
        <div className="bg-card border border-border rounded-lg p-8 mb-4">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold ig-text-gradient mb-6">Instagram</h1>
            {isLogin ? (
              <p className="text-muted-foreground text-sm">
                Sign up to see photos and videos from your friends.
              </p>
            ) : (
              <p className="text-muted-foreground text-sm">
                Sign up to see photos and videos from your friends.
              </p>
            )}
          </div>

          {/* Facebook Login Button */}
          {isLogin && (
            <button className="w-full bg-primary text-primary-foreground font-semibold py-2 px-4 rounded-lg mb-4 hover:bg-primary/90 transition-colors">
              Log in with Facebook
            </button>
          )}

          {/* Divider */}
          <div className="flex items-center mb-4">
            <div className="flex-1 border-t border-border"></div>
            <span className="px-4 text-muted-foreground text-sm font-semibold">OR</span>
            <div className="flex-1 border-t border-border"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {!isLogin && (
              <>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-muted border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-muted border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </>
            )}
            
            <input
              type="text"
              name="username"
              placeholder={isLogin ? "Phone number, username, or email" : "Username"}
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-muted border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
            
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 pr-10 bg-muted border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground font-semibold py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors mt-4"
            >
              {isLogin ? 'Log in' : 'Sign up'}
            </button>
          </form>

          {/* Forgot Password */}
          {isLogin && (
            <div className="text-center mt-4">
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
          )}

          {/* Terms */}
          {!isLogin && (
            <p className="text-xs text-muted-foreground text-center mt-4 leading-relaxed">
              By signing up, you agree to our{' '}
              <a href="#" className="text-primary hover:underline">Terms</a>,{' '}
              <a href="#" className="text-primary hover:underline">Data Policy</a> and{' '}
              <a href="#" className="text-primary hover:underline">Cookies Policy</a>.
            </p>
          )}
        </div>

        {/* Switch Form */}
        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <p className="text-sm">
            {isLogin ? "Don't have an account?" : "Have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary font-semibold ml-1 hover:underline"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>

        {/* App Store Links */}
        <div className="text-center mt-6">
          <p className="text-sm mb-4">Get the app.</p>
          <div className="flex justify-center space-x-2">
            <img
              src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png"
              alt="Download on the App Store"
              className="h-10"
            />
            <img
              src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png"
              alt="Get it on Google Play"
              className="h-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}