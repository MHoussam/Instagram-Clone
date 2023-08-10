import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../../styles/post.css';

const Post = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('');
  
    const handleModalOpen = () => {
      setIsModalOpen(true);
    };
  
    const handleModalClose = () => {
      setIsModalOpen(false);
    };
  
    const handleCaptionChange = (event) => {
      setCaption(event.target.value);
    };

    const handleImage = (event) => {
        setImage(event.target.files[0]);
    };

    const handlePost = async () => {
        const formData = new FormData();
        formData.append('user_id', localStorage.getItem('id'));
        formData.append('photo', image);
        formData.append('caption', caption);
        formData.append('token', localStorage.getItem('token'));

        const response = await axios.post("http://localhost:8000/api/post", formData);
        console.log('Posting:', image, caption, response.data);
        setCaption('');
        handleModalClose();
      };
  
    return (
      <div>
        <button className="post-btn" onClick={handleModalOpen}>
          Post
        </button>
  
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleModalClose}
          className="modal"
          overlayClassName="overlay"
        >

          <div className='flex column'>
          <div>
            <input
              type="file"
              onChange={handleImage}
            />
            </div>
            <div>
            <input
              type="text"
              placeholder="Caption"
              value={caption}
              onChange={handleCaptionChange}
            />
            </div>
            <div>
            <button onClick={handleModalClose}>Close</button>
            <button onClick={handlePost}>Post</button>
            </div>
          </div>
        </Modal>
      </div>
    );
  };
  
  export default Post;