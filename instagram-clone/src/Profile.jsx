import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';
import app from './firebase';
import Post from './Post';

function Profile({ user }) {
  const [myPosts, setMyPosts] = useState([]);
  const db = getFirestore(app);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "posts"),
      where("userId", "==", user.uid),
      // optional: orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMyPosts(postsData);
    });
    return () => unsubscribe();
  }, [user, db]);

  return (
    <div>
      <h2>{user.displayName || user.email}'s Profile</h2>
      {myPosts.map(({ id, caption, imageUrl }) => (
        <Post key={id} username={user.displayName || user.email} caption={caption} imageUrl={imageUrl} />
      ))}
    </div>
  );
}
export default Profile;
