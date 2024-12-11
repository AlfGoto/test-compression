import sharp from "sharp"

const inputFile = document.getElementById('input-file');
const convertButton = document.getElementById('convert-button');

convertButton.addEventListener('click', async () => {
  const file = inputFile.files[0];

  // Check if a file is selected
  if (!file) {
    alert('Please select an image file.');
    return;
  }

  // Create a URL object from the file
  const fileUrl = URL.createObjectURL(file);

  // Use a library like `sharp` to process the image
  const webpImage = await sharp(fileUrl)
    .resize({ width: 720 })
    .webp()
    .toBuffer();

  // Create a Blob from the WebP image data
  const webpBlob = new Blob([webpImage], { type: 'image/webp' });

  // Create a download link
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(webpBlob);
  downloadLink.download = 'converted.webp';
  downloadLink.click();

  // Clean up the URL objects
  URL.revokeObjectURL(fileUrl);
  URL.revokeObjectURL(downloadLink.href);
});