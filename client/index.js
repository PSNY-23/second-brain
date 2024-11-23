let data = {q: 'https://en.wikipedia.org/wiki/Shivaji'};
let key = "27d7498ae5de0c272c9009d59c3383f6";

fetch('https://api.linkpreview.net', {
  method: 'POST',
  headers: {
    'X-Linkpreview-Api-Key': key,
    'Content-Type': 'application/json',  // Important to specify that you're sending JSON data
  },
  mode: 'cors',  // This is generally fine for cross-origin requests
  body: JSON.stringify(data),  // Convert the data object to JSON string
})
  .then(res => res.json())  // Parse the response as JSON
  .then(response => {
    console.log(response);  // Corrected the 'Response' to 'response' (variable names are case-sensitive)
  })
  .catch(error => {
    console.error('Error:', error);  // It's good to handle any potential errors
  });
