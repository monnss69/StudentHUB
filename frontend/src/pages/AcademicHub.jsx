import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api.ts';
import Post from '../components/Post.jsx';
import UploadButton from '../components/UploadButton.jsx';

const AcademicHub = () => {
  const [academicPosts, setAcademicPosts] = useState([]);
  const [postAuthors, setPostAuthors] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Get all posts from the Academic Hub category
        const posts = await apiService.getCategoryPosts("Academic Hub");

        const authors = await Promise.all(
          posts.map(post => apiService.getUsersID(post.AuthorID))
        );

        const authorsMap = authors.reduce((map, author) => {
          map[author.id] = author;
          return map;
        }, {});

        setPostAuthors(authorsMap);
        setAcademicPosts(posts);
        setLoading(false);
      } catch (err) {
        console.error("Error details:", err);
        setError(err.message || "An error occurred");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Loading state
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!academicPosts?.length) return <div>No posts found</div>;
  console.log(postAuthors);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Academic Hub</h1>

      <div className="space-y-4">
        {academicPosts.map((post) => (
          <Post 
            key={post.ID}
            post={post}
            author={postAuthors[post.AuthorID]}
          />
        ))}
      </div>

      <UploadButton />
    </div>
  );
};

export default AcademicHub;
