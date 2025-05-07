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

  if (!currentUser) return null;

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

      {/* Heart Icon and Count */}
      <div className="icons">
      <div style={styles.likeContainer}>
        <span
          className="material-icons"
          onClick={toggleLike}
          style={{
            ...styles.heartIcon,
            color: hasLiked ? 'red' : '#888',
          }}
        >
          {hasLiked ? 'favorite' : 'favorite_border'}
        </span>
        <div style={styles.likeCount}>{likes.length} {likes.length === 1 ? 'like' : 'likes'}</div>
      </div>

      {currentUser.email === username && (
      <div onClick={handleDelete} style={styles.deleteBtn}>
      <span className="material-icons" style={styles.deleteIcon}>
      delete_outline
      </span>
      </div>
        )}
        </div>
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
    color: '#333',
    background: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  image: {
    width: '100%',
    maxHeight: '350px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '0.5rem',
  },
  likeContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '0.5rem',
    marginBottom: '1rem',
    cursor: 'pointer',
  },
  heartIcon: {
    fontSize: '28px',
    transition: 'color 0.3s ease',
  },
  likeCount: {
    marginTop: '4px',
    fontSize: '14px',
    color: '#444',
  },
  deleteBtn: {
    color: '#0095F6',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Post;
