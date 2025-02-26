// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for anchor links
  setupSmoothScrolling();
  
  // Setup dark mode toggle
  setupDarkModeToggle();
  
  // OS detection for download section
  detectOperatingSystem();
  
  // Add animations on scroll
  setupScrollAnimations();
  
  // Make navbar fixed on scroll
  setupNavbarBehavior();
});

// Smooth scrolling function
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 70,
                  behavior: 'smooth'
              });
          }
      });
  });
}

// Dark mode toggle function
function setupDarkModeToggle() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const moonIcon = '<i class="fas fa-moon"></i>';
  const sunIcon = '<i class="fas fa-sun"></i>';
  
  // Check for saved user preference, otherwise use system preference
  if (localStorage.getItem('darkMode') === 'enabled') {
      enableDarkMode(darkModeToggle, sunIcon);
  } else if (localStorage.getItem('darkMode') === 'disabled') {
      disableDarkMode(darkModeToggle, moonIcon);
  } else {
      // Check system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          enableDarkMode(darkModeToggle, sunIcon);
      }
  }
  
  // Dark mode toggle event
  darkModeToggle.addEventListener('click', function() {
      if (document.body.classList.contains('dark-mode')) {
          disableDarkMode(darkModeToggle, moonIcon);
          localStorage.setItem('darkMode', 'disabled');
      } else {
          enableDarkMode(darkModeToggle, sunIcon);
          localStorage.setItem('darkMode', 'enabled');
      }
  });
}

function enableDarkMode(toggle, icon) {
  document.body.classList.add('dark-mode');
  document.body.classList.remove('light-mode');
  toggle.innerHTML = icon;
}

function disableDarkMode(toggle, icon) {
  document.body.classList.add('light-mode');
  document.body.classList.remove('dark-mode');
  toggle.innerHTML = icon;
}

// Detect user's operating system
function detectOperatingSystem() {
  const detectedOS = document.getElementById('detectedOS');
  const osName = document.getElementById('osName');
  const recommendedDownload = document.getElementById('recommendedDownload');
  
  let os = "Unknown OS";
  let downloadLink = "#download";
  
  // Simple OS detection
  const userAgent = window.navigator.userAgent;
  
  if (userAgent.indexOf("Windows") !== -1) {
      os = "Windows";
      downloadLink = "#windows";
  } else if (userAgent.indexOf("Mac") !== -1) {
      os = "macOS";
      downloadLink = "#macos";
  } else if (userAgent.indexOf("Linux") !== -1) {
      os = "Linux";
      downloadLink = "#linux";
  }
  
  // Update DOM
  if (detectedOS) detectedOS.textContent = os;
  if (osName) osName.textContent = os;
  if (recommendedDownload) recommendedDownload.setAttribute('href', downloadLink);
  
  // Automatically select the appropriate tab
  if (os !== "Unknown OS") {
      const tabId = os.toLowerCase() + "-tab";
      const tab = document.getElementById(tabId);
      if (tab) {
          // Wait for Bootstrap to initialize
          setTimeout(() => {
              const bsTab = new bootstrap.Tab(tab);
              bsTab.show();
          }, 100);
      }
  }
}

// Add animations when elements come into view
function setupScrollAnimations() {
  // Add fade-in class to all major sections
  const sections = document.querySelectorAll('section, .hero');
  
  // Create observer
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('fade-in');
              observer.unobserve(entry.target);
          }
      });
  }, {
      root: null,
      threshold: 0.1 // Trigger when 10% of the element is visible
  });
  
  // Observe each section
  sections.forEach(section => {
      observer.observe(section);
  });
  
  // Add animation to feature boxes
  const featureBoxes = document.querySelectorAll('.feature-box');
  featureBoxes.forEach((box, index) => {
      box.style.animationDelay = `${index * 0.1}s`;
  });
}

// Navbar behavior on scroll
function setupNavbarBehavior() {
  const navbar = document.getElementById('mainNav');
  const scrollThreshold = 100;
  
  window.addEventListener('scroll', () => {
      if (window.scrollY > scrollThreshold) {
          navbar.classList.add('navbar-shrink');
      } else {
          navbar.classList.remove('navbar-shrink');
      }
  });
}

// Video play button functionality
document.addEventListener('click', function(e) {
  if (e.target.closest('.play-button') || e.target.closest('.video-placeholder')) {
      alert('Video playback would start here in the actual implementation.');
      // In a real implementation, you would:
      // 1. Hide the placeholder image
      // 2. Load and play the actual video
  }
});