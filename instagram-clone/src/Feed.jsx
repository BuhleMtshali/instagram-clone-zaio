import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import app from './firebase';
import Post from './Post'; // a component to display a post

function Feed() {
  const [posts, setPosts] = useState([]);
  const db = getFirestore(app);

  useEffect(() => {
    const postsQuery = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const postList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postList);
    });

    // Clean up listener on unmount
    return () => unsubscribe();
  }, [db]);

  return (
    <div>
      {posts.map(({ id, username, caption, imageUrl }) => (
        <Post key={id} username={username} caption={caption} imageUrl={imageUrl} />
      ))}
    </div>
  );
}
export default Feed;
