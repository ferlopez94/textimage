const getPixels = require('get-pixels');

// Get colors for each pixel
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