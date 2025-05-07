import React, { useState } from 'react';
import { db } from './firebase'; // your firebase.js file
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from './AuthContext'; // assuming you're managing auth context

const UploadPost = () => {
  const [caption, setCaption] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const { currentUser } = useAuth(); // to get current user ID

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!imageFile || !caption) return alert('Please select an image and write a caption.');

    const reader = new FileReader();
    reader.readAsDataURL(imageFile);

    reader.onloadend = async () => {
      const base64Image = reader.result;

      try {
        await addDoc(collection(db, 'posts'), {
          caption,
          image: base64Image,
          userId: currentUser.uid,
          createdAt: serverTimestamp(),
        });

        setCaption('');
        setImageFile(null);
        alert('Post uploaded!');
      } catch (err) {
        console.error(err);
        alert('Error uploading post.');
      }
    };
  };

  return (
    <form onSubmit={handleUpload} className="upload-form">
      <input
        type="text"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Write a caption..."
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
        required
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadPost;
