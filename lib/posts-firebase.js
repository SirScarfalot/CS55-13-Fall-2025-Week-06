//Load the initialized firebase database
import {database} from './firebase';
//Load vital database manipulation tools
import { collection, getDocs, query, where, documentId } from 'firebase/firestore';

// Helper function that fetches all posts from Firebase Firestore and returns them as an array
async function getFireStuff(){
  // Create a reference to the "posts" collection in the Firebase database
  const thePosts = collection(database, "posts");
  //Populate that reference with the data from the database
  const gottenPosts = await getDocs(thePosts);
  // Transform the Firebase documents into a JavaScript array with id and document data
  const jsonStuff = gottenPosts.docs.map(doc => ({id: doc.id, ...doc.data()}));
  //Return the array
  return jsonStuff;
}

// Function that retrieves all posts, sorts them alphabetically by title, and returns a simplified array
export async function getSortedPostsData() {
  //Fetch the posts from Firebase in array format
  const jsonParsed = await getFireStuff();
  //Sort the posts alphabetically by title
  jsonParsed.sort(function (a, b){
    return a.title.localeCompare(b.title);
  });
  //Return a simplified array with just ID, title and date data
  return jsonParsed.map(item => {
    //create a new object with only the essential post properties
    return {
      id: item.id.toString(),
      title: item.title,
      date: item.date
    }
  });
}
// Function that retrieves all post IDs and formats them for Next.js dynamic routing
export async function getAllPostIds() {
  // Get the parsed array data containing all posts
  const jsonParsed = await getFireStuff();
  //pass the ID data as a parameter
  return jsonParsed.map(item => {
    //Give the ID data to pass along
    return {
      params:{
        id: item.id.toString()
      }
    }
  })
}
// Function that retrieves a specific post by ID and returns its data or a default invalid post
export async function getPostData(id){
  // Create a reference to the "posts" collection for querying a specific document
  const myCollectionRef = collection(database, "posts");
  //Query that document
  const searchQuery = query(
    myCollectionRef,
    where(
      documentId(),
      "==",
      id
    )
  );
  //Get the document that was queried
  const querySnapshot = await getDocs(searchQuery);
  // Transform the query results into a JavaScript array with id and document data
  const theSnapshot = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));

  //Check if the array exists, if not, deliver a default array
  if (theSnapshot.length === 0){
    //Return the default array
    return {
      id: id,
      title: 'Not valid',
      date: '1992-06-19',
      content: 'invalid',
      image: '/images/profile.jpg'
    }
  } else {
    //Return the existing array
    return theSnapshot[0];
  }
}