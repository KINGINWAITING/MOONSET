// This script ensures that Clerk modals stay centered on the screen
// and adds professional user interaction enhancements with 3D styling
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
          backdrop.style.zIndex = '50';
          backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
          backdrop.style.backdropFilter = 'blur(8px)';
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
          modal.style.zIndex = '51';
        });
        
        // Apply 3D styling
        enhanceModalStyling();
      }
    };
    
    // Function to apply 3D styling to modal elements
    const enhanceModalStyling = () => {
      // Apply 3D styling to form elements
      
      // Style social buttons with black background
      const socialButtons = document.querySelectorAll('.cl-socialButtonsBlockButton');
      socialButtons.forEach(button => {
        button.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
        button.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        button.style.transition = 'all 0.2s ease';
        button.style.borderRadius = '8px';
        
        // Add hover effects with event listeners
        button.addEventListener('mouseenter', () => {
          button.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
          button.style.transform = 'translateY(-2px)';
          button.style.boxShadow = '0 5px 10px rgba(0, 0, 0, 0.2)';
        });
        
        button.addEventListener('mouseleave', () => {
          button.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
          button.style.transform = 'translateY(0)';
          button.style.boxShadow = 'none';
        });
      });
      
      // Style input fields with 3D effects
      const inputFields = document.querySelectorAll('.cl-formFieldInput');
      inputFields.forEach(input => {
        input.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        input.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        input.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1) inset, 0 1px 0 rgba(255, 255, 255, 0.05)';
        input.style.transition = 'all 0.2s ease';
        input.style.borderRadius = '8px';
        input.style.padding = '12px 16px';
        input.style.color = 'var(--foreground, white)';
        
        // Add focus effects
        input.addEventListener('focus', () => {
          input.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1) inset, 0 1px 0 rgba(255, 255, 255, 0.05), 0 0 0 3px rgba(59, 130, 246, 0.3)';
          input.style.transform = 'translateY(-1px)';
          input.style.borderColor = '#3b82f6';
        });
        
        input.addEventListener('blur', () => {
          input.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1) inset, 0 1px 0 rgba(255, 255, 255, 0.05)';
          input.style.transform = 'translateY(0)';
          input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        });
      });
      
      // Style buttons with 3D effects
      const buttons = document.querySelectorAll('.cl-formButtonPrimary');
      buttons.forEach(button => {
        button.style.backgroundColor = '#3b82f6';
        button.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1) inset, 0 -1px 0 rgba(0, 0, 0, 0.2) inset';
        button.style.transition = 'all 0.2s ease';
        button.style.borderRadius = '8px';
        button.style.border = 'none';
        button.style.padding = '10px 16px';
        button.style.fontWeight = '600';
        
        // Add hover and active effects
        button.addEventListener('mouseenter', () => {
          button.style.backgroundColor = '#2563eb';
          button.style.transform = 'translateY(-2px)';
          button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15), 0 1px 0 rgba(255, 255, 255, 0.1) inset, 0 -1px 0 rgba(0, 0, 0, 0.2) inset';
        });
        
        button.addEventListener('mouseleave', () => {
          button.style.backgroundColor = '#3b82f6';
          button.style.transform = 'translateY(0)';
          button.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1) inset, 0 -1px 0 rgba(0, 0, 0, 0.2) inset';
        });
        
        button.addEventListener('mousedown', () => {
          button.style.transform = 'translateY(1px)';
          button.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1) inset, 0 -1px 0 rgba(0, 0, 0, 0.2) inset';
        });
        
        button.addEventListener('mouseup', () => {
          button.style.transform = 'translateY(-2px)';
          button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15), 0 1px 0 rgba(255, 255, 255, 0.1) inset, 0 -1px 0 rgba(0, 0, 0, 0.2) inset';
        });
      });
      
      // Style the card with 3D shadow and backdrop blur
      const cards = document.querySelectorAll('.cl-card');
      cards.forEach(card => {
        card.style.backgroundColor = 'rgba(30, 30, 47, 0.95)';
        card.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05)';
        card.style.borderRadius = '16px';
        card.style.border = 'none';
        card.style.backdropFilter = 'blur(12px)';
        card.style.WebkitBackdropFilter = 'blur(12px)';
      });
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
    
    // Check after a delay to catch any dynamically loaded content
    setTimeout(centerClerkModals, 1000);
  });
} 