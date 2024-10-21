import { doc, getDoc, setDoc } from "firebase/firestore"; // Import Firestore functions
import { db } from "../Firebase"; // Import Firestore instance

// Upload or update rating for a specific meal
export const uploadRating = async (userId, mealId, rating) => {
  try {
    const userRatingsRef = doc(db, 'users', userId, 'ratings', 'list'); // Reference to the 'list' document
    await setDoc(userRatingsRef, {
      [mealId]: { rating } // Set the rating for the specific mealId
    }, { merge: true }); // Merge the new rating into existing data
  } catch (error) {
    console.error("Error uploading rating:", error);
    throw new Error("Failed to upload rating");
  }
};

// Fetch ratings for a specific user from the "list" field inside the "ratings" subcollection
export const fetchRatings = async (userId) => {
  try {
    // Reference to the "list" document in the "ratings" subcollection
    const ratingsDocRef = doc(db, "users", userId, "ratings", "list");
    const ratingsDocSnap = await getDoc(ratingsDocRef); // Fetch the document

    if (!ratingsDocSnap.exists()) {
      throw new Error("No ratings document exists!");
    }

    const data = ratingsDocSnap.data(); // Get the document data
    console.log("Fetched Ratings Data:", data); // Log the fetched data

    return data || {}; // Return the ratings object (if it exists)
  } catch (error) {
    console.error("Error fetching ratings:", error);
    throw error; // Re-throw the error to be handled by the calling function
  }
};