import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SearchBar = ({ users }) => {
  const [query, setQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showList, setShowList] = useState(false);
  const [data, setData] = useState({
    following_id: '',
    followed_id: '', 
    token: ''
  })  

  const handleSearch = (query) => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest('.search-bar')) {
      setShowList(false);
    }
  };

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    handleSearch(newQuery);
    setShowList(newQuery !== "");
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleFollow = (user_id)=>{
    try{
      const newData = {
        following_id: localStorage.getItem('id'),
        followed_id: user_id,
        token: localStorage.getItem('token')
      };
  
      setData(newData);
      handleFollowData();
    }catch(e){
      console.log(e)
    }
  }

  const handleFollowData = async () => {
    try {
      console.log(data);
      const response = await axios.post("http://localhost:8000/api/followUsers", data);
      console.log(response.data)
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <div className='search flex center'>
      <div className="search-bar flex column center">
        <input type="text" placeholder="Search users" className='search-bar-input' value={query} onChange={handleInputChange} />
        {showList && (
          <ul className='search-list flex column'>
            {filteredUsers.map((user) => (
              <li>
                <div className="search-list flex pointer" key={user.id}> 
                  <div>
                    {user.name}
                  </div>

                  <button className="follow-btn pointer" onClick={() => handleFollow(user.id)}>Follow</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;