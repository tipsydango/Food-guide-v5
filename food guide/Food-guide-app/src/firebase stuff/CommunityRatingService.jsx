import { db } from '../Firebase';
import { collection, getDocs } from 'firebase/firestore';

export const getRatings = async () => {
  const usersCol = collection(db, "users");  
  const usersSnap = await getDocs(usersCol); 

  const allRatings = {};  

 
  for (const userDoc of usersSnap.docs) {
    const userId = userDoc.id;  
    console.log(`Fetching ratings for user: ${userId}`);

    
    const listDocRef = doc(db, `users/${userId}/ratings/list`);
    const listDoc = await getDoc(listDocRef);

    if (!listDoc.exists()) {
      console.warn(`No 'list' document found for user: ${userId}`);
      continue;
    }

    const ratingData = listDoc.data();  

    
    if (ratingData) {
     
      for (const [mealId, ratingInfo] of Object.entries(ratingData)) {
        const rating = ratingInfo.rating;  

       
        if (!allRatings[mealId]) {
          allRatings[mealId] = { total: 0, count: 0 };
        }

        
        allRatings[mealId].total += rating;
        allRatings[mealId].count += 1;
      }
    } else {
      console.warn(`No 'list' field found in 'list' document for user: ${userId}`);
    }
  }

  console.log("All ratings data:", allRatings);  
  return allRatings;  
};

export const calculateAverage = (allRatings) => {
  try {
    const averages = {};

    for (const mealId in allRatings) {
      const { total, count } = allRatings[mealId];
      averages[mealId] = (total / count).toFixed(2);
    }

    console.log("Calculated averages:", averages);
    return averages;

  } catch (error) {
    console.error("Error calculating average ratings:", error);
    throw new Error("Failed to calculate averages.");
  }
};