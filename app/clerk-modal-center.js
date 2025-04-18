// This script ensures that Clerk modals stay centered on the screen
if (typeof window !== 'undefined') {
  // Run after the page loads
  document.addEventListener('DOMContentLoaded', () => {
    // Function to check for and center modals
    const centerClerkModals = () => {
      // Look for any Clerk modals that might be open
      const modalBackdrops = document.querySelectorAll('.cl-modalBackdrop');
      const modals = document.querySelectorAll('.cl-modal');
      
      if (modalBackdrops.length > 0) {
        // Ensure backdrop covers the entire viewport
        modalBackdrops.forEach(backdrop => {
          backdrop.style.position = 'fixed';
          backdrop.style.top = '0';
          backdrop.style.left = '0';
          backdrop.style.width = '100vw';
          backdrop.style.height = '100vh';
          backdrop.style.display = 'flex';
          backdrop.style.alignItems = 'center';
          backdrop.style.justifyContent = 'center';
        });
      }
      
      if (modals.length > 0) {
        // Center each modal
        modals.forEach(modal => {
          modal.style.position = 'absolute';
          modal.style.top = '50%';
          modal.style.left = '50%';
          modal.style.transform = 'translate(-50%, -50%)';
          modal.style.margin = '0';
          modal.style.maxHeight = '90vh';
        });
      }
    };
    
    // Check for modals immediately
    centerClerkModals();
    
    // Set up a mutation observer to detect when modals are added to the DOM
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          centerClerkModals();
        }
      });
    });
    
    // Start observing the document body for changes
    observer.observe(document.body, { 
      childList: true,
      subtree: true
    });
    
    // Also check when window is resized
    window.addEventListener('resize', centerClerkModals);
  });
} 