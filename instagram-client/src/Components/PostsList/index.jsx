import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../../styles/postsList.css";

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

//   const fetchFollowingPosts = async () => {
//       const userPosts = await fetchPosts();
//       return userPosts;
//   };

    const handleLike = async (postId) => {
        try {
        const data = {
            user_id: localStorage.getItem('id'),
            post_id: postId,
            token: localStorage.getItem('token')
        };
        const response = await axios.post('http://localhost:8000/api/likePost', data);
        console.log('Liked: ', response.data);
        } catch (error) {
        console.log(error);
        }
    };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Posts from Users You're Following</h1>
      <div className='postCards flex column'>
        {posts.map((post) => (
            <div key={post.id}>
            <div className="card pointer"
                // onClick={() => handleNavigate(contact.id)}
            >
                <div className="name bold flex center">
                    {post.user_name}
                </div>
                <img src={`http://localhost:8000/${post.photo}`}  alt="Avatar" className="card-pic" />
                <div className="container flex center">
                    {post.caption}
                </div>
                <div className="like flex center pointer">
                    <button className="like-btn" onClick={() => handleLike(post.id)}>
                        Like
                    </button>
                </div>
            </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default PostsList;