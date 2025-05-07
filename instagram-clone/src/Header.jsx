// components/Header.jsx
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

function Header({ user }) {
  return (
    <header>
      <h1>📸 InstaClone</h1>
      <div>
        <span>{user.email}</span>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </header>
  );
}

export default Header;
