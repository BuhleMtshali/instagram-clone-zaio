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
    <div className='main-container'>
      <header>
        <img src="/src/assets/favicon.png" alt="camera" />
        <h1>InstaClone</h1>
      </header>

      <div className="auth-info">
        {user ? (
          <>
            <h1>Welcome {user.email} 👋</h1>
            <Feed user={user} />
            <UploadPost user={user} />
            <button onClick={() => signOut(auth)} className="logout-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <p>Please sign in.</p>
            <AuthForm />
          </>
        )}
      </div>
    </div>
  );
}


export default App;
