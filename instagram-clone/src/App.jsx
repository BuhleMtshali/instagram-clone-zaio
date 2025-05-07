import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
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
    <div className="App">
      {user ? (
        <>
          <Header user={user} />
          <UploadPost user={user} />
          <Feed />
        </>
      ) : (
        <AuthForm />
      )}
    </div>
  );
}

export default App;
