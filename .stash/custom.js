// Helper function to perform the path replacement and formatting
function processPathForURL(path) {
  console.log("processPathForURL input path:", path); // Log input

  // Remove any leading slashes and quotes
  let modifiedPath = path.replace(/^["/]+/, "");
  console.log("processPathForURL after removing leading chars:", modifiedPath);

  // Replace mnt/storage/nas/ with Z:/ at the beginning of the path
  modifiedPath = modifiedPath.replace(/^mnt\/storage\/nas\//, "Z:/");
  console.log("processPathForURL modifiedPath after replace:", modifiedPath);

  // Remove any trailing double quote that might have been part of the original text
  modifiedPath = modifiedPath.replace(/"$/, "");
  console.log(
    "processPathForURL modifiedPath after removing trailing quote:",
    modifiedPath,
  ); // Log after removing trailing quote

  // Ensure correct slashes for file URL (Windows style Z:\ needs to become Z:/ for file://)
  const formattedPath = modifiedPath.replace(/\\/g, "/");
  console.log("processPathForURL formattedPath for URL:", formattedPath); // Log path before creating URL

  return formattedPath;
}

// Function to create button group for file links
function createFileButtonGroup(link, correctFileUrl, processedPath) {
  // Create a button group container
  const buttonGroup = document.createElement("div");
  buttonGroup.className = "btn-group";
  buttonGroup.style.marginRight = "5px";
  buttonGroup.setAttribute("data-processed", "true");

  // Create the file button
  const fileButton = document.createElement("a");
  fileButton.className = "btn btn-secondary";
  fileButton.href = correctFileUrl;
  fileButton.target = "_blank";
  fileButton.textContent = "file";
  fileButton.style.marginRight = "2px";

  // Create the copy path button
  const copyButton = document.createElement("button");
  copyButton.className = "btn btn-secondary";
  copyButton.textContent = "copy path";
  copyButton.onclick = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(processedPath).then(() => {
      const originalText = copyButton.textContent;
      copyButton.textContent = "copied!";
      setTimeout(() => {
        copyButton.textContent = originalText;
      }, 1000);
    });
  };

  // Add buttons to the group
  buttonGroup.appendChild(fileButton);
  buttonGroup.appendChild(copyButton);

  return buttonGroup;
}

// Function to update link text AND href based on href
let isUpdating = false; // Flag to prevent recursive updates

function updateLinkText() {
  if (isUpdating) return; // Prevent recursive updates
  isUpdating = true;

  try {
    // Find all link elements
    document.querySelectorAll("a").forEach((link) => {
      const originalHref = link.href;
      if (originalHref.startsWith("file://")) {
        // Skip if the link text already matches the expected format
        if (
          link.textContent.startsWith('"') &&
          link.textContent.endsWith('"')
        ) {
          return;
        }

        // Skip if this link has already been processed
        if (link.closest('[data-processed="true"]')) {
          return;
        }

        console.log("File Page - Found file link with href:", originalHref);

        // Decode the URI, remove 'file://', to get the raw path part
        let rawPath = decodeURIComponent(originalHref.replace("file://", ""));

        // Use the helper function to process the raw path
        const processedPath = processPathForURL(rawPath);
        console.log("File Page - Processed path from href:", processedPath);

        // Create the correct file:// URL using the processed path
        const correctFileUrl = `file://${processedPath}`;
        console.log("File Page - Corrected file URL:", correctFileUrl);

        // If the link has the btn class, create a button group with two buttons
        if (link.classList.contains("btn")) {
          const buttonGroup = createFileButtonGroup(
            link,
            correctFileUrl,
            processedPath,
          );
          link.replaceWith(buttonGroup);
        } else {
          // For non-button links, update as before
          if (link.href !== correctFileUrl) {
            link.href = correctFileUrl;
            console.log("File Page - Updated link href to:", link.href);
          }
          link.textContent = '"' + processedPath + '"';
          console.log("File Page - Updated link text to:", link.textContent);
        }
      }
    });
  } finally {
    isUpdating = false;
  }
}

// Create a new MutationObserver instance
const observer = new MutationObserver((mutations) => {
  // Only process if we're not already updating
  if (isUpdating) return;

  let shouldUpdate = false;
  mutations.forEach((mutation) => {
    // Check if any of the added nodes contain file links that need updating
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        // Skip if the node or its parent is already processed
        if (node.closest('[data-processed="true"]')) {
          return;
        }
        const links = node.querySelectorAll(
          'a[href^="file://"]:not([data-processed="true"])',
        );
        if (links.length > 0) {
          shouldUpdate = true;
        }
      }
    });
  });

  if (shouldUpdate) {
    console.log(
      "MutationObserver detected new file links. Running updateLinkText.",
    );
    updateLinkText();
  }
});

// Start observing the document body for DOM mutations
observer.observe(document.body, {
  childList: true,
  subtree: true,
});

// Initial run of updateLinkText to fix any file links present on page load
updateLinkText();
