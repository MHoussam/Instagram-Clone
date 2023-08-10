import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../../Components/SearchBar";
import Post from "../../Components/Post";
import Logout from "../../Components/Logout";

const Feeds = () => {
  const [users, setUsers] = useState([]);
      
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        "http://localhost:8000/api/getUsers",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUsers(response.data);
      console.log('Users:', response.data);
    } catch (e) {
      console.log(e);
    }
  }
  
  const [filteredUsers, setFilteredUsers] = useState([]);

  return (
    <div className="flex">
      <SearchBar users={users} />
      <Post />
      <Logout />
    </div>
  );
};

export default Feeds;