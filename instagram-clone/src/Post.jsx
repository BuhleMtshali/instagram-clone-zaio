import React, { useState, useEffect } from 'react';
import { doc, updateDoc, arrayUnion, arrayRemove, onSnapshot, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import './App.css';

function Post({ id, username, caption, imageUrl, currentUser }) {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const postRef = doc(db, 'posts', id);
    const unsubscribe = onSnapshot(postRef, (docSnap) => {
      if (docSnap.exists()) {
        setLikes(docSnap.data().likes || []);
      }
    });

    return () => unsubscribe();
  }, [id]);

  const hasLiked = likes.includes(currentUser.email);

  const toggleLike = async () => {
    const postRef = doc(db, 'posts', id);
    if (hasLiked) {
      await updateDoc(postRef, {
        likes: arrayRemove(currentUser.email),
      });
    } else {
      await updateDoc(postRef, {
        likes: arrayUnion(currentUser.email),
      });
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deleteDoc(doc(db, 'posts', id));
    }
  };

  return (
    <div style={styles.post}>
      <h3>{username}</h3>
      <img src={imageUrl} alt="post" style={styles.image} />
      <p>
        <strong>{username}</strong> {caption}
      </p>
      <button onClick={toggleLike} style={styles.likeBtn}>
        {hasLiked ? '💔 Unlike' : '❤️ Like'} ({likes.length})
      </button>

      {currentUser.email === username && (
        <button onClick={handleDelete} style={styles.deleteBtn}>
          🗑 Delete
        </button>
      )}
    </div>
  );
}

const styles = {
  post: {
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '1rem',
    margin: '1rem 0',
    textAlign: 'left',
    background: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  image: {
    width: '100%',
    maxHeight: '400px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '0.5rem',
  },
  likeBtn: {
    backgroundColor: '#0095f6',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    marginRight: '0.5rem',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  deleteBtn: {
    backgroundColor: '#ff4d4d',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Post;