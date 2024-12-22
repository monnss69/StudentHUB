import React from 'react';
import mockData from '../../test.json';

const PlatformSupport = () => {
  // Filter posts for Platform Support category
  const supportPosts = mockData.posts.filter(
    post => post.category === "Platform Support"
  );

  return (
    <div className="p-6">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Platform Support</h1>

      {/* Posts Container */}
      <div className="space-y-4">
        {supportPosts.map((post) => (
          <div 
            key={post.id} 
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
          >
            {/* Post Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img 
                  src={mockData.users.find(user => user.id === post.authorId)?.avatarUrl} 
                  alt="avatar" 
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h2 className="font-semibold text-lg text-gray-800">{post.title}</h2>
                  <p className="text-sm text-gray-600">
                    Posted by {post.author} • {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Post Content */}
            <p className="text-gray-700 mb-4">{post.content}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm" // Changed color to purple
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Post Footer */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center text-gray-600 text-sm">
              <span className="flex items-center">
                <svg 
                  className="w-5 h-5 mr-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                {post.commentCount} comments
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformSupport;