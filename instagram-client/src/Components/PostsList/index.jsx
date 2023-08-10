import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostsList = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {

      const data = {
        following_id: localStorage.getItem('id'),
        token: localStorage.getItem('token')
      };

      const response = await axios.post('http://localhost:8000/api/getPosts', data);
      console.log('whatL');
      console.log(response.data);
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFollowingPosts = async () => {
      const userPosts = await fetchPosts();
      return userPosts;
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Posts from Users You're Following</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.caption}</h3>
        </div>
      ))}
    </div>
  );
};

export default PostsList;