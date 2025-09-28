// Import the Node.js file system module for reading files
import fs from 'fs';
// Import the Node.js path module for handling file and directory paths
import path from 'path';

// Create a path to the 'data' directory in the current working directory
const dataSpot = path.join(process.cwd(), 'data');

// Helper function that reads and parses the posts.json file from the data directory
function getJSON(){
  // Create the full file path to the posts.json file in the data directory
  const fileSpot = path.join(dataSpot, 'posts.json');
  // Read the contents of the posts.json file as a UTF-8 encoded string
  const jsonToParse = fs.readFileSync(fileSpot, 'utf8');
  // Parse the JSON string into a JavaScript object
  const jsonParsed = JSON.parse(jsonToParse);
  // Return the parsed JSON object containing the posts data
  return jsonParsed;
}

// Function that retrieves all posts, sorts them alphabetically by title, and returns a simplified array
export function getSortedPostsData(){
  // Get the parsed JSON data containing all posts
  const jsonParsed = getJSON();
  // Sort the parsed JSON data alphabetically by title
  jsonParsed.sort(function (a, b){
  // Sort the JSON data alphabetically
    return a.title.localeCompare(b.title);
  });
  // simplify the array to include just the id, title, and date data
  return jsonParsed.map(item => {
    // Create a new object with only the essential post properties
    return {
      id: item.id.toString(),
      title: item.title,
      date: item.date
    }
  });
}

// Function that retrieves all post IDs and formats them for Next.js dynamic routing
export function getAllPostIds() {
  // Get the parsed JSON data containing all posts
  const jsonParsed = getJSON();
  // Pass the id data as a parameter
  return jsonParsed.map(item => {
    // Give the id data to the function to pass along
    return {
      params:{
        id: item.id.toString()
      }
    }
  })
}

// Function that retrieves a specific post by ID and returns its data or a default invalid post
export function getPostData(id){
  // Get the parsed JSON data containing all posts
  const jsonParsed = getJSON();
  // Filter the posts array to find the post with the matching ID
  const objReturned = jsonParsed.filter(obj =>{
    // Compare the post's ID (converted to string) with the provided ID parameter
    return obj.id.toString() === id;
  });
  // Check if no post was found with the given ID
  if (objReturned.length === 0){
    // If no post was found, return a default object
    return {
      id: id,
      title: 'Not valid',
      date: '',
      content: 'invalid',
      image: '/images/profile.jpg'
    }
  } else {
    // Return the found post data if a matching post was found
    return objReturned[0];
  }
}