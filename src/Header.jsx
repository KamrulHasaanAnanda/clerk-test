import React from 'react';


import {

    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
} from '@clerk/nextjs'

const Header = () => {
    return (
        <header className="bg-white border-b border-gray-200">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo/Brand */}
                    <div className="flex-shrink-0">
                        <h1 className="text-xl font-bold text-indigo-600">TestClerk</h1>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex md:space-x-8">
                        <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                            Home
                        </a>
                        <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                            Features
                        </a>
                        <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                            About
                        </a>
                    </div>

                    {/* Auth Section */}
                    <div className="flex items-center gap-4">
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200">
                                    Sign in modal
                                </button>
                            </SignInButton>
                        </SignedOut>

                        <SignedOut>
                            <SignInButton mode="redirect">
                                <button className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200">
                                    Sign in redirect
                                </button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton
                                appearance={{
                                    elements: {
                                        avatarBox: "w-10 h-10 rounded-full border-2 border-gray-200 hover:border-indigo-500 transition-colors duration-200"
                                    }
                                }}
                            />
                        </SignedIn>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;