import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import './App.css';

function UploadPost({ user }) {
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleUpload = async () => {
    if (!caption || !imageUrl) {
      alert('Please fill in both fields ✍️');
      return;
    }

    try {
      await addDoc(collection(db, 'posts'), {
        username: user.email,
        caption,
        imageUrl,
        createdAt: serverTimestamp(),
        likes: [],
      });
      setCaption('');
      setImageUrl('');
    } catch (error) {
      console.error('Error uploading post:', error);
    }
  };

  return (
    <div className="upload-form">
      <input
        type="text"
        placeholder="Enter a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button onClick={handleUpload}>Upload Post</button>
    </div>
  );
}

export default UploadPost;
