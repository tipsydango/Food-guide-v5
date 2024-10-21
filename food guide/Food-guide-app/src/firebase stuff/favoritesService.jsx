import { db } from '../Firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore'; // Ensure getDoc is imported

// Upload or update favorite meals for a specific user
export const uploadFavorite = async (userId, favorites) => {
  try {
    const userFavoritesRef = doc(db, "users", userId, "favorites", "list");
    // Use setDoc without merge to fully replace the document with updated favorites
    await setDoc(userFavoritesRef, favorites);
  } catch (error) {
    console.error("Error uploading favorite:", error);
    throw new Error("Failed to upload favorite");
  }
};

// Fetch favorites for a specific user
export const fetchFavorites = async (userId) => {
  try {
    const userFavoritesRef = doc(db, "users", userId, "favorites", "list");
    const favoritesDocSnap = await getDoc(userFavoritesRef); // getDoc should now be defined

    if (!favoritesDocSnap.exists()) {
      throw new Error("No favorites document exists!");
    }

    const data = favoritesDocSnap.data();
    return data || {};
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw error;
  }
};