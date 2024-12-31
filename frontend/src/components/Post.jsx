import React from 'react';

const Post = ({ post, author }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div>
            <h2 className="font-semibold text-lg text-gray-800">{post.Title}</h2>
            <p className="text-sm text-gray-600">
              Posted by {author.username} • {new Date(post.CreatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <p className="text-gray-700 mb-4">{post.Content}</p>

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
          0 comments
        </span>
      </div>
    </div>
  );
};

export default Post;