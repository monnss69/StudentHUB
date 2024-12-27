import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

const UploadButton = () => {
  return (
    <Link to="/create-post">
      <button
        className="fixed bottom-12 right-12 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg 
                  shadow-lg flex items-center space-x-2 transition-colors duration-200 
                  disabled:bg-blue-400 disabled:cursor-not-allowed"
      >
          <Upload size={30} />
          <span className="text-lg">Upload Post</span>
      </button>
    </Link>
  );
};

export default UploadButton;