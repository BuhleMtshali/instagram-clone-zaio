import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "./firebase";

const auth = getAuth(app);

// Sign Up
async function signUp(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Signed up user:", userCredential.user);
  } catch (error) {
    console.error("Sign-up error:", error.message);
  }
}

// Sign In
async function logIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Logged in user:", userCredential.user);
  } catch (error) {
    console.error("Login error:", error.message);
  }
}

// Sign Out
async function logOut() {
  try {
    await signOut(auth);
    console.log("Logged out successfully");
  } catch (error) {
    console.error("Logout error:", error.message);
  }
}

export { signUp, logIn, logOut };
