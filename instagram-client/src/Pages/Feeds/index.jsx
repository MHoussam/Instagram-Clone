import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../../Components/SearchBar";
import Post from "../../Components/Post";
import Logout from "../../Components/Logout";
import PostsList from "../../Components/PostsList";
import "../../styles/feeds.css";
import logoPic from "../../assets/images/logo.png"

const Feeds = () => {
  const [users, setUsers] = useState([]);
      
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      
      const data = {
        token: localStorage.getItem('token')
      };

      console.log(data.token)
      const response = await axios.post("http://localhost:8000/api/getUsers", data);

      setUsers(response.data);
      console.log('Users:', response.data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
      <div className="flex">
        <div className="left-content width-10 flex column">
          <div className="logo">
            <img src={logoPic} className="logoPic" />
          </div>
          <div className="post height-100 flex center">
            <Post />
          </div>
        </div>
        <div className="postsList width-60 flex center">
            <PostsList />
        </div>
        <div className="flex column width-30">
          <div className="logout flex">
            <Logout />
          </div>
          <div className="searchBar height-100 flex column center">
            <SearchBar users={users} />
          </div>
      </div>
      </div>
  );
};

export default Feeds;