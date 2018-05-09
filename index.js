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

   // Obtain 2-dimensional array, where each element contains the rgba values for a given pixel
   let i, j, index = 0;
   let rowColors = [];

   for (i = 0; i < image.height; i++) {
      rowColors = [];

      for (j = 0; j < image.width; j++) {
         rowColors.push([pixels.data[index], pixels.data[index + 1], pixels.data[index + 2], pixels.data[index + 3]]);
         index += image.channels;
      }

      pixelColors.push(rowColors);
   }

   console.log(pixels.data[0], pixels.data[1], pixels.data[2], pixels.data[3]);
   console.log(pixels.data[4], pixels.data[5], pixels.data[6], pixels.data[7]);
   console.log(pixelColors[0][0], pixelColors[0][1], pixelColors[0][2], pixelColors[0][3], pixelColors[0][4]);
   console.log(pixelColors[1][0], pixelColors[1][1], pixelColors[1][2], pixelColors[1][3], pixelColors[1][4]);
   // console.log('pixels.data', pixels.data);
   console.log('pixels.data.length', pixels.data.length);
   console.log('pixelColors.length', pixelColors.length);
   console.log('pixelColors[0].length', pixelColors[0].length);
});