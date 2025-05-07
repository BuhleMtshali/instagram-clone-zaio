import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import Post from './Post';
import './App.css';

function Feed({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postsQuery = query(
      collection(db, 'posts'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const postList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {posts.map(({ id, username, caption, imageUrl }) => (
        <Post
        key={id}
        id={id}
        username={username}
        caption={caption}
        imageUrl={imageUrl}
        currentUser={user}
        />
      ))}
    </div>
  );
}

export default Feed;
