import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../../Components/SearchBar";
import Post from "../../Components/Post";
import Logout from "../../Components/Logout";
import PostsList from "../../Components/PostsList";

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
    <div className="flex column">
      <div className="flex">
      <SearchBar users={users} />
      <Post />
      <Logout />
      </div>
      <div>
      <PostsList />
      </div>
    </div>
  );
};

export default Feeds;