import React, { useState, useEffect } from 'react';
import { doc, updateDoc, arrayUnion, arrayRemove, onSnapshot, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import './App.css';

function Post({ id, username, caption, imageUrl, currentUser }) {
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const postRef = doc(db, 'posts', id);
    const unsubscribe = onSnapshot(postRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setLikes(docSnap.data().likes || []);
        setComments(data.comments || []);
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

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const postRef = doc(db, 'posts', id);
    await updateDoc(postRef, {
      comments: arrayUnion({
        user: currentUser.email,
        text: newComment,
        createdAt: new Date().toISOString()
      })
    });

    setNewComment('');
  };


  return (
    <div style={styles.post}>
      <h3>{username}</h3>
      <img src={imageUrl} alt="post" style={styles.image} />
      <p>
        <strong>{username}</strong> {caption}
      </p>

      <div style={styles.actionRow}>
        <span className="material-icons" onClick={toggleLike} style={{ ...styles.icon, color: hasLiked ? 'red' : 'gray' }}>
          favorite
        </span>
        <span>{likes.length} likes</span>

        <span className="material-icons" onClick={() => setShowComments(!showComments)} style={styles.icon}>
          chat_bubble_outline
        </span>
        <span>{comments.length} comments</span>
      </div>

      {showComments && (
        <div style={styles.commentSection}>
          {comments.map((comment, index) => (
            <p key={index}>
              <strong>{comment.user}</strong>: {comment.text}
            </p>
          ))}
          <form onSubmit={handleCommentSubmit} style={styles.commentForm}>
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              style={styles.commentInput}
            />
            <button type="submit" style={styles.commentBtn}>
              Post
            </button>
          </form>
        </div>
      )}

      {currentUser.email === username && (
        <div onClick={handleDelete} style={styles.deleteBtn}>
          <span className="material-icons" style={styles.deleteIcon}>
            delete_outline
          </span>
        </div>
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
  actionRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
  },
  
  icon: {
    cursor: 'pointer',
    fontSize: '24px',
  },
  
  commentSection: {
    marginTop: '1rem',
    padding: '0.5rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
  },
  
  commentForm: {
    display: 'flex',
    marginTop: '0.5rem',
    gap: '0.5rem',
  },
  
  commentInput: {
    flex: 1,
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  
  commentBtn: {
    padding: '0.5rem 1rem',
    backgroundColor: '#0095f6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  
};

export default Post;
