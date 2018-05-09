const getPixels = require('get-pixels');
const palette = require('get-rgba-palette');
const gm = require('gm');

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
   
   const letterWidth = 11;
   const letterHeight = 15;
   const horizontalLetters = parseInt(image.width / letterWidth);
   const verticalLetters = parseInt(image.height / letterHeight);

   console.log('image', image);
   console.log(`letterWidth = ${letterWidth}.\tletterHeight = ${letterHeight}`);
   console.log(`horizontalLetters = ${horizontalLetters}.\tverticalLetters = ${verticalLetters}`);

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

   // Crop 2-dimensional array to obtain values for subimages with the size of a letter
   const letterColors = [];

   for (let x = 0; x < image.height; x += letterHeight) {
      if (image.height - x < letterHeight) {
         // console.log(`x = ${x}. No support for letterHeight`);
         break;
      }

      const rowLetterColors = [];

      for (let y = 0; y < image.width; y += letterWidth) {
         if (image.width - y < letterWidth) {
            // console.log(`y = ${y}. No support for letterWidth`);
            break;
         }
         let subimagePixelColors = [];

         for (let i = x; i < x + letterHeight; i++) {
            for (let j = y; j < y + letterWidth; j++) {
               subimagePixelColors.push(...pixelColors[i][j]);
            }
         }

         // Get predominant color for a given subimage
         const colors = palette(subimagePixelColors, 1);

         // Store predominant color in rowLetterColors array
         rowLetterColors.push(colors[0]);
      }

      // Store predominant colors for each row
      letterColors.push(rowLetterColors);
   }

   console.log('letterColors.length', letterColors.length);
   console.log('letterColors[0].length', letterColors[0].length);
   console.log('letterColors[0][0]', letterColors[0][0]);
   console.log('letterColors[29][52]', letterColors[29][52]);

   // Write letters
   const outputImage = gm(image.width, image.height, "#000000").font('arial', 14);

   for (i = 1; i <= verticalLetters; i++) {
      for (j = 1; j <= horizontalLetters; j++) {
         const color = letterColors[i - 1][j - 1];

         outputImage.fill(`rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3] - 255})`)
            .drawText((j - 1) * 11.1, 15 * i,  j % 2 === 0 ? '1' : '0');
      }
   }

   outputImage.write("scene-text.jpg", function (err) {
      if (err) {
         console.log('err', err);
      }

      console.log('Image created successfully');
   });
});