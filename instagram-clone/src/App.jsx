import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import AuthForm from './AuthForm';
import Header from './Header';
import Feed from './Feed';
import UploadPost from './UploadPost';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <header>
        <img src="https://cdn-icons-png.flaticon.com/512/87/87390.png" alt="camera" />
        <h1>InstaClone</h1>
      </header>

      <div className="auth-info">
        {user ? (
          <>
            {user.email}
            <button onClick={() => signOut(auth)} className="logout-button">Logout</button>
          </>
        ) : (
          <p>Please sign in.</p>
        )}
      </div>

      {user && <UploadPost user={user} />}

      <Feed />
    </div>
  );
}

export default App;
