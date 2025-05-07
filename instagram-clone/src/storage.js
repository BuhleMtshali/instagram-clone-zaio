import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import app from "./firebase";

const storage = getStorage(app);
const db = getFirestore(app);

export async function uploadPost(file, caption, user) {
  try {
    // 1. Upload image to Storage
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);

    // 2. Save post data to Firestore
    await addDoc(collection(db, "posts"), {
      caption: caption,
      imageUrl: imageUrl,
      username: user.displayName || user.email,
      userId: user.uid,
      createdAt: serverTimestamp(),
    });

    console.log("Post uploaded successfully!");
  } catch (error) {
    console.error("Error uploading post:", error);
  }
}
