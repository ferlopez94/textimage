const getPixels = require('get-pixels');

// Process:
// Get colors for each pixel
// Obtain 2-dimensional array, where each element contains the rgba values for a given pixel
// Crop 2-dimensional array to obtain values for a subimage
   // Get predominant color for a given subimage
   // Store predominant color in rowLetterColors array
   // Store predominant colors for each row
// Write letters

getPixels("scene.png", function (err, pixels) {
   if (err) {
      console.log("Bad image path", err);
      return;
   }

   const pixelColors = [];
   const image = {};

   image.width = pixels.shape[0];
   image.height = pixels.shape[1];
   image.channels = pixels.shape[2];

   console.log('image', image);
});