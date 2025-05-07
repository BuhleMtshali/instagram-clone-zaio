
// components/UploadPost.jsx
import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from "./firebase";

function UploadPost({ user }) {
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'posts'), {
        username: user.email,
        caption,
        imageUrl,
        createdAt: serverTimestamp(),
      });
      setCaption('');
      setImageUrl('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input
        type="text"
        placeholder="Enter a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        required
      />
      <button type="submit">Upload Post</button>
    </form>
  );
}

export default UploadPost;
