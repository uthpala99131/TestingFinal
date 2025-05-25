"use client";
import React, { useState, useRef, useEffect } from "react";
import { UserPlus, LogOut, User, Settings, Map, ChevronDown, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const UserAccountButton = () => {
  const [user, setUser] = useState(null); // null means not logged in
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // true for login, false for signup
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setIsLogin(true); // Reset to login form when closing
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const switchToSignup = () => setIsLogin(false);
  const switchToLogin = () => setIsLogin(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    if (isLogin) {
      // Mock login: replace with real auth logic
      const mockUser = { 
        username: formData.get('username') || formData.get('email').split('@')[0], 
        email: formData.get('email') 
      };
      setUser(mockUser);
    } else {
      // Mock signup: replace with real auth logic
      const mockUser = { 
        username: formData.get('username'), 
        email: formData.get('email') 
      };
      setUser(mockUser);
    }
    closeModal();
  };

  const handleLogout = () => {
    setUser(null);
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {!user ? (
        <button
          onClick={openModal}
          className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-200 flex items-center gap-2 shadow-sm"
        >
          <UserPlus size={18} />
          <span>Sign Up</span>
        </button>
      ) : (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 transition-all duration-200"
          >
            <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-800">{user.username}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <ChevronDown
              size={16}
              className={`text-gray-500 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10 border border-gray-200">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="font-medium text-gray-800">{user.username}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>

              <button className="flex items-center gap-2 px-4 py-2 text-gray-700 w-full text-left hover:bg-red-50">
                <User size={16} />
                <span>Edit Profile</span>
              </button>

              <Link href="/trips" passHref>
                <button className="flex items-center gap-2 px-4 py-2 text-red-800 w-full text-left hover:bg-red-50">
                  <Map size={16} />
                  <span>My Trips</span>
                </button>
              </Link>

              <button className="flex items-center gap-2 px-4 py-2 text-red-600 w-full text-left hover:bg-red-50">
                <Settings size={16} />
                <span>Settings</span>
              </button>

              <div className="border-t border-gray-100 my-1" />

              <button
                className="flex items-center gap-2 px-4 py-2 text-red-600 w-full text-left hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Login / Signup Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md transform transition-all">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="text-gray-600">
                {isLogin 
                  ? "Sign in to your account to continue" 
                  : "Join us and start your journey"
                }
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {isLogin ? "Email or Username" : "Email"}
                </label>
                <input
                  type={isLogin ? "text" : "email"}
                  name={isLogin ? "username" : "email"}
                  placeholder={isLogin ? "Enter email or username" : "Enter your email"}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              )}

              {isLogin && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-sm text-red-600 hover:text-red-800 transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-medium shadow-lg"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={isLogin ? switchToSignup : switchToLogin}
                  className="text-red-600 hover:text-red-800 font-medium transition-colors"
                >
                  {isLogin ? "Create Account" : "Sign In"}
                </button>
              </p>
            </div>

            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserAccountButton;