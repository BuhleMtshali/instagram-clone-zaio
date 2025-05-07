// components/Header.jsx
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import './App.css';

function Header({ user }) {
  return (
    <header>
      <div>
        <span>{user.email}</span>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </header>
  );
}

export default Header;
