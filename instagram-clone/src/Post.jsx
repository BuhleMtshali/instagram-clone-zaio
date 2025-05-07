import React from 'react';
import './App.css';

function Post({ username, caption, imageUrl }) {
  return (
    <div className="post">
      <h4>{username}</h4>
      <img src={imageUrl} alt="post" />
      <p><strong>{username}</strong> {caption}</p>
    </div>
  );
}

export default Post;

