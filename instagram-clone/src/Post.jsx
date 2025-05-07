// src/components/Post.jsx
import React from 'react';

function Post({ username, caption, imageUrl }) {
  return (
    <div className="post">
      <h3>{username}</h3>
      <img src={imageUrl} alt="post" width="300" />
      <p><strong>{username}</strong> {caption}</p>
    </div>
  );
}

export default Post;
