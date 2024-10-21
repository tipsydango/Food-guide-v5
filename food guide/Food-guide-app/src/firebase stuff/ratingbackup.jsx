// ratingService.js
import { db } from "../Firebase"; // Import the Firestore instance
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

// Upload a rating
export const uploadRating = async (userId, mealId, rating) => {
  try {
    // Create a reference to the user's document in the userRatings collection
    const docRef = doc(db, "userRatings", userId);

    // Update the document with the new rating for the specific meal
    await setDoc(docRef, {
      [mealId]: { rating }
    }, { merge: true }); // Use merge to avoid overwriting other fields
  } catch (error) {
    console.error("Error uploading rating:", error);
  }
};

// Fetch ratings
export const fetchRatings = async (userId) => {
  try {
    // Create a reference to the user's document in the userRatings collection
    const docRef = doc(db, "userRatings", userId);

    // Fetch the document snapshot
    const docSnap = await getDoc(docRef);

    // Check if the document exists and return its data
    if (docSnap.exists()) {
      return docSnap.data(); // Return the ratings data
    } else {
      return {}; // Return an empty object if no data is found
    }
  } catch (error) {
    console.error("Error fetching ratings:", error);
    return {}; // Return an empty object in case of an error
  }
};