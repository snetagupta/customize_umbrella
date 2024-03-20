// Array of umbrella images for each theme color
const images = [
  "./images/Blue umbrella.png",
  "./images/Pink umbrella.png",
  "./images/Yello umbrella.png",
];

// Select all theme buttons
const themeButtons = document.querySelectorAll('button[id^="theme-"]');

// Select the umbrella image element
const umbrellaImage = document.querySelector(".umbrella");

// Add click event listeners to each theme button
themeButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    // Get the selected theme color from the button's data attribute
    const color = button.dataset.theme;

    // Extract the RGB values from the hex color
    const red = parseInt(color.substring(1, 3), 16);
    const green = parseInt(color.substring(3, 5), 16);
    const blue = parseInt(color.substring(5, 7), 16);

    // Set the alpha value to 0.7 (30% opacity)
    const rgbaColor = `rgba(${red}, ${green}, ${blue}, 0.3)`;

    // Set the --bg-main variable to the color with reduced opacity
    document.documentElement.style.setProperty("--bg-main", rgbaColor);

    // Change the umbrella image
    umbrellaImage.src = images[index];
  });
});

// Select the upload button and add change event listener
const uploadButton = document.querySelector("#upload");

uploadButton.addEventListener("change", uploadLogo);

// Function to handle uploaded logo
function uploadLogo() {
  const icon = document.querySelector("#icon");
  const fileInput = document.getElementById("upload");
  const file = fileInput.files[0];

  if (file) {
    // Check if the file type is either "image/png" or "image/jpeg"
    if (!file.type.includes("image/png") && !file.type.includes("image/jpeg")) {
      // Display an error message
      alert("Please select a PNG or JPEG image file.");
      return;
    }

    // Check if the file size exceeds 5MB (in bytes)
    if (file.size > 5 * 1024 * 1024) {
      // Display an error message
      alert("File size cannot exceed 5MB.");
      return;
    }

    // Display loader icon while the file is being read
    icon.src = "./images/loader_icon.svg";

    // Set the upload text to the name of the selected file
    const uploadText = document.querySelector(".upload-text");
    uploadText.textContent = file.name.slice(0, 20);

    // Create a FileReader object to read the file
    const reader = new FileReader();

    // Set the onload event handler to display the uploaded image
    reader.onload = function (e) {
      const uploadedImage = e.target.result;
      const logo = document.createElement("img");
      logo.src = uploadedImage;
      logo.id = "logo";

      // Clear the logo container and append the uploaded image
      const logoContainer = document.querySelector(".logo-container");
      logoContainer.innerHTML = "";
      logoContainer.appendChild(logo);
    };

    // Read the selected file as a data URL
    reader.readAsDataURL(file);

    // Display the upload icon
    icon.src = "./images/upload_icon.svg";
  }
}
